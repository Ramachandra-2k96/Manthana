"use client"

import type React from "react"
import Link from "next/link"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { IconBrandGoogle, IconHome } from "@tabler/icons-react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { auth } from "@/lib/firebase" // We'll only need auth from Firebase
import { createUserWithEmailAndPassword } from "firebase/auth"

// College options
const COLLEGE_OPTIONS = [
  { value: "smvitm", label: "Shri Madhwa Vadiraja Institute of Technology" },
  { value: "mit", label: "Manipal Institute of Technology" },
  // Add more colleges as needed
]

export default function SignupFormDemo() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    password2: "",
    college: ""
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    try {
      // Basic validation
      if (!formData.firstname || !formData.lastname || !formData.email || !formData.college) {
        toast.error("Please fill in all fields")
        return
      }

      // Password validation
      if (formData.password.length < 6) {
        toast.error("Password must be at least 6 characters long")
        return
      }

      if (formData.password !== formData.password2) {
        toast.error("Passwords do not match!")
        return
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(formData.email)) {
        toast.error("Please enter a valid email address")
        return
      }

      // Create user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      )

      // Get the user object
      const user = userCredential.user
      
      // Get the ID token
      const token = await user.getIdToken()
      
      // Set the auth-token cookie
      document.cookie = `auth-token=${token}; path=/; max-age=3600; SameSite=Strict`
      
      // Set the user_info cookie with proper encoding
      const userInfo = {
        uid: user.uid,
        email: user.email,
        displayName: user.email ? `${user.email.split("@")[0]}` : "User"
      }
      document.cookie = `user_info=${encodeURIComponent(JSON.stringify(userInfo))}; path=/; max-age=3600; SameSite=Strict`
      
      // Send token to session endpoint
      const sessionResponse = await fetch("/api/auth/session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      })
      
      if (!sessionResponse.ok) {
        throw new Error("Failed to create session")
      }
      
      const { uid } = await sessionResponse.json()

      // Save user details to MongoDB through API route
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstname: formData.firstname,
          lastname: formData.lastname,
          email: formData.email,
          college: formData.college,
          firebaseUid: user.uid,
          createdAt: new Date().toISOString()
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to save user data')
      }

      toast.success("Account created successfully!")
      router.push("/dashboard")
    } catch (error: any) {
      // Enhanced Firebase error handling
      const errorCode = error?.code
      switch (errorCode) {
        case 'auth/email-already-in-use':
          toast.error("This email is already registered")
          break
        case 'auth/invalid-email':
          toast.error("Invalid email address")
          break
        case 'auth/operation-not-allowed':
          toast.error("Email/password accounts are not enabled. Please contact support.")
          break
        case 'auth/weak-password':
          toast.error("Password is too weak. Please use at least 6 characters")
          break
        case 'auth/too-many-requests':
          toast.error("Too many failed attempts. Please try again later or reset your password.")
          break
        case 'auth/network-request-failed':
          toast.error("Network error. Please check your internet connection.")
          break
        default:
          console.error("Signup error:", error)
          toast.error(error.message || "An unexpected error occurred. Please try again later.")
      }

      // Add error handling for MongoDB save
      if (error.message === 'Failed to save user data') {
        toast.error("Account created but failed to save additional details. Please contact support.")
      }
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-black px-4 py-8 md:px-8 lg:px-12">
      <div className="relative w-full max-w-md rounded-2xl bg-black/95 p-6 shadow-2xl backdrop-blur-sm sm:p-8">
        <div className="mb-8 flex items-center justify-between">
          <Link
            href="/"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-800 text-gray-400 transition-colors hover:border-gray-600 hover:text-white"
          >
            <IconHome className="h-4 w-4" />
          </Link>
        </div>

        <div className="space-y-4 text-center">
          <h2 className="bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-2xl font-bold text-transparent sm:text-3xl">
            Welcome to Varnothsava
          </h2>
          <p className="mx-auto max-w-sm text-sm text-gray-400 sm:text-base">
            Join us at SMVITM's premier college fest celebrating creativity, innovation, and culture.
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="grid gap-4 md:grid-cols-2">
            <LabelInputContainer>
              <Label htmlFor="firstname" className="text-gray-200">
                First name
              </Label>
              <Input
                id="firstname"
                placeholder="Tyler"
                type="text"
                className="border-gray-800 bg-gray-950 text-white placeholder:text-gray-500 focus:border-gray-600 focus:ring-gray-600 focus:ring-1 ring-0 focus:ring-offset-0"
                value={formData.firstname}
                onChange={handleInputChange}
              />
            </LabelInputContainer>
            <LabelInputContainer>
              <Label htmlFor="lastname" className="text-gray-200">
                Last name
              </Label>
              <Input
                id="lastname"
                placeholder="Durden"
                type="text"
                className="border-gray-800 bg-gray-950 text-white placeholder:text-gray-500 focus:border-gray-600 focus:ring-gray-600 focus:ring-1 ring-0 focus:ring-offset-0"
                value={formData.lastname}
                onChange={handleInputChange}
              />
            </LabelInputContainer>
          </div>

          <LabelInputContainer>
            <Label htmlFor="college" className="text-gray-200">
              College
            </Label>
            <select
              id="college"
              value={formData.college}
              onChange={handleInputChange}
              className="w-full rounded-md border border-gray-800 bg-gray-950 px-3 py-2 text-white placeholder:text-gray-500 focus:border-gray-600 focus:ring-gray-600 focus:ring-1 ring-0 focus:ring-offset-0"
              required
            >
              <option value="">Select your college</option>
              {COLLEGE_OPTIONS.map((college) => (
                <option key={college.value} value={college.value}>
                  {college.label}
                </option>
              ))}
            </select>
          </LabelInputContainer>

          <LabelInputContainer>
            <Label htmlFor="email" className="text-gray-200">
              Email Address
            </Label>
            <Input
              id="email"
              placeholder="you@example.com"
              type="email"
              className="border-gray-800 bg-gray-950 text-white placeholder:text-gray-500 focus:border-gray-600 focus:ring-gray-600 focus:ring-1 ring-0 focus:ring-offset-0"
              value={formData.email}
              onChange={handleInputChange}
            />
          </LabelInputContainer>

          <LabelInputContainer>
            <Label htmlFor="password" className="text-gray-200">
              Password
            </Label>
            <Input
              id="password"
              placeholder="••••••••"
              type="password"
              className="border-gray-800 bg-gray-950 text-white placeholder:text-gray-500 focus:border-gray-600 focus:ring-gray-600 focus:ring-1 ring-0 focus:ring-offset-0"
              value={formData.password}
              onChange={handleInputChange}
            />
          </LabelInputContainer>

          <LabelInputContainer>
            <Label htmlFor="password2" className="text-gray-200">
              Re-enter password
            </Label>
            <Input
              id="password2"
              placeholder="••••••••"
              type="password"
              className="border-gray-800 bg-gray-950 text-white placeholder:text-gray-500 focus:border-gray-600 focus:ring-gray-600 focus:ring-1 ring-0 focus:ring-offset-0"
              value={formData.password2}
              onChange={handleInputChange}
            />
          </LabelInputContainer>

          <button
            className="group/btn relative block h-11 w-full overflow-hidden rounded-lg bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 font-medium text-white shadow-lg transition-all duration-300 hover:scale-[1.01] hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-black active:scale-[0.99]"
            type="submit"
          >
            <span className="relative z-10">Sign up</span>
            <BottomGradient />
          </button>
      

          <p className="text-center text-sm text-gray-400">
            Already have an account?{" "}
            <Link href="/login" className="font-medium text-white underline-offset-4 hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}

const BottomGradient = () => {
  return (
    <>
      <span className="absolute inset-x-0 -bottom-px h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition-all duration-500 group-hover/btn:opacity-100" />
      <span className="absolute inset-x-10 -bottom-px mx-auto h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition-all duration-500 group-hover/btn:opacity-100" />
    </>
  )
}

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => {
  return <div className={cn("flex flex-col space-y-2", className)}>{children}</div>
}
