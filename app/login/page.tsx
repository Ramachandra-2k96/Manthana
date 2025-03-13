"use client";

import type React from "react";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { IconHome, IconRocket, IconStars, IconPlanet } from "@tabler/icons-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { 
  signInWithEmailAndPassword,
  onAuthStateChanged,
  getAuth
} from "firebase/auth";
import { auth } from "@/lib/firebase";
import { toast } from "sonner";
import dynamic from "next/dynamic";

// Dynamically import StarBackground with SSR disabled
const StarBackground = dynamic(() => import("../signup/Star"), { ssr: false });

export default function LoginForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Check for existing session on component mount
  useEffect(() => {
    const checkExistingSession = () => {
      // Check for auth-token cookie
      const cookies = document.cookie.split(';');
      const authTokenCookie = cookies.find(cookie => cookie.trim().startsWith('auth-token='));
      
      if (authTokenCookie) {
        // Verify the token on the server side
        fetch("/api/auth/verify-session", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then(response => {
          if (response.ok) {
            // If token is valid, redirect to dashboard
            router.push("/dashboard");
          }
        })
        .catch(error => {
          console.error("Error verifying session:", error);
        });
      }
    };
    
    // Also listen for Firebase auth state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, set cookies and redirect
        handleUserSession(user);
      }
    });
    
    checkExistingSession();
    
    return () => unsubscribe();
  }, [router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  // Consolidated function to handle user session setup
  const handleUserSession = async (user: any) => {
    try {
      const token = await user.getIdToken();

      // Set the auth-token cookie
      document.cookie = `auth-token=${token}; path=/; max-age=3600; SameSite=Strict`;

      // Set the user_info cookie with proper encoding
      const userInfo = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || (user.email ? `${user.email.split("@")[0]}` : "User")
      };
      document.cookie = `user_info=${encodeURIComponent(JSON.stringify(userInfo))}; path=/; max-age=3600; SameSite=Strict`;

      // Send token to session endpoint
      const sessionResponse = await fetch("/api/auth/session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      });

      if (!sessionResponse.ok) {
        throw new Error("Failed to create session");
      }

      const { uid } = await sessionResponse.json();

      // Update user data in MongoDB
      await fetch(`/api/users/${uid}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: user.email,
          displayName: user.displayName || (user.email ? `${user.email.split("@")[0]}` : "User"),
          photoURL: user.photoURL,
          lastLogin: new Date().toISOString(),
        }),
      });

      toast.success("Successfully logged in!");
      router.push("/dashboard");
    } catch (error: any) {
      console.error("Session handling error:", error);
      toast.error("Error setting up session. Please try again.");
    }
  };

  const handleEmailLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Basic validation
      if (!formData.email || !formData.password) {
        toast.error("Please fill in all fields");
        setIsLoading(false);
        return;
      }

      // Proceed with password login
      const userCredential = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      
      await handleUserSession(userCredential.user);
    } catch (error: any) {
      switch (error.code) {
        case "auth/user-not-found":
          toast.error("Invalid email or password");
          break;
        case "auth/wrong-password":
          toast.error("Invalid email or password");
          break;
        case "auth/invalid-email":
          toast.error("Invalid email address");
          break;
        case "auth/too-many-requests":
          toast.error("Too many attempts. Please try again later.");
          break;
        default:
          toast.error(error.message || "An error occurred. Please try again.");
          console.error("Login error:", error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-8 md:px-8 lg:px-12">
      <StarBackground/>
      <div className="relative w-full max-w-md rounded-2xl bg-gray-840 bg-opacity-50 p-6 shadow-2xl backdrop-blur-md border border-gray-800 sm:p-8 overflow-hidden">
        <div className="absolute inset-0 z-0 bg-gradient-radial from-indigo-500/5 via-transparent to-transparent opacity-70"></div>
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-cyan-300 to-blue-500"></div>
        <div className="absolute -top-24 -right-24 h-48 w-48 rounded-full bg-blue-500/10 blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 h-48 w-48 rounded-full bg-purple-500/10 blur-3xl"></div>
        
        <div className="mb-8 flex items-center justify-between relative z-10">
          <Link
            href="/"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-700 text-gray-300 transition-colors hover:border-gray-500 hover:text-white hover:bg-gray-900/50"
          >
            <IconHome className="h-4 w-4" />
          </Link>
          <div className="flex items-center space-x-2">
            <IconStars className="h-5 w-5 text-cyan-300" />
            <IconPlanet className="h-4 w-4 text-purple-400" />
          </div>
        </div>

        <div className="space-y-4 text-center relative z-10">
          <h2 className="bg-gradient-to-r from-cyan-300 via-white to-purple-400 bg-clip-text text-2xl font-bold text-transparent sm:text-3xl">
            Return to Manthana
          </h2>
          <p className="mx-auto max-w-sm text-sm text-gray-300 sm:text-base">
            Sign in to continue your cosmic journey at SMVITM's premier college fest.
          </p>
        </div>

        <form className="mt-8 space-y-6 relative z-10" onSubmit={handleEmailLogin}>
          <LabelInputContainer>
            <Label htmlFor="email" className="text-gray-200">
              Email Address
            </Label>
            <Input
              id="email"
              placeholder="you@example.com"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              disabled={isLoading}
              className="border-gray-700 bg-gray-900/60 text-white placeholder:text-gray-500 focus:border-cyan-600 focus:ring-cyan-600 focus:ring-1 ring-0 focus:ring-offset-0"
            />
          </LabelInputContainer>

          <LabelInputContainer>
            <div className="flex items-center justify-between">
              <Label htmlFor="password" className="text-gray-200">
                Password
              </Label>
              <Link
                href="/forgot-password"
                className="text-sm text-gray-400 hover:text-white"
              >
                Forgot password?
              </Link>
            </div>
            <Input
              id="password"
              placeholder="••••••••"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
              disabled={isLoading}
              className="border-gray-700 bg-gray-900/60 text-white placeholder:text-gray-500 focus:border-cyan-600 focus:ring-cyan-600 focus:ring-1 ring-0 focus:ring-offset-0"
            />
          </LabelInputContainer>

          <button
            className="group/btn relative block h-11 w-full overflow-hidden rounded-lg bg-gradient-to-r from-gray-900 via-slate-800 to-gray-900 font-medium text-white shadow-lg transition-all duration-300 hover:scale-[1.01]  active:scale-[0.99]"
            type="submit"
          >
            <div className="relative z-10 flex items-center justify-center">
              <IconRocket className="h-4 w-4 mr-2" />
             <span className="relative z-10">{isLoading ? "Launching..." : "Launch"}</span>
            </div>
            <SpaceGradient />
          </button>
          <p className="text-center text-sm text-gray-300">
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="font-medium text-cyan-300 underline-offset-4 hover:underline"
            >
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

// Add this new component for the space gradient effect
const SpaceGradient = () => {
  return (
    <div className="absolute inset-0 h-full w-full bg-[radial-gradient(circle_at_top_left,theme(colors.indigo.500/0.3),transparent_40%),radial-gradient(circle_at_bottom_right,theme(colors.purple.500/0.3),transparent_40%)] opacity-0 transition-opacity duration-300 group-hover/btn:opacity-100"></div>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("space-y-2", className)}>
      {children}
    </div>
  );
};