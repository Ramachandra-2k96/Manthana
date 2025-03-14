"use client"

import type React from "react"
import Link from "next/link"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { IconHome, IconRocket, IconStars, IconPlanet } from "@tabler/icons-react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { auth } from "@/lib/firebase"
import { createUserWithEmailAndPassword } from "firebase/auth"
import dynamic from "next/dynamic"

// Dynamically import StarBackground with SSR disabled
const StarBackground = dynamic(() => import("./Star"), { ssr: false })

const COLLEGE_OPTIONS = [
  { value: "smvitm", label: "Shri Madhwa Vadiraja Institute of Technology" },
  { value: "mit", label: "Manipal Institute of Technology" },
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
      if (!formData.firstname || !formData.email || !formData.college) {
        toast.error("Please fill in all required fields")
        return
      }

      if (formData.password.length < 6) {
        toast.error("Password must be at least 6 characters long")
        return
      }

      if (formData.password !== formData.password2) {
        toast.error("Passwords do not match!")
        return
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(formData.email)) {
        toast.error("Please enter a valid email address")
        return
      }

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      )

      const user = userCredential.user
      const token = await user.getIdToken()

      document.cookie = `auth-token=${token}; path=/; max-age=3600; SameSite=Strict`

      const userInfo = {
        uid: user.uid,
        email: user.email,
        displayName: user.email ? `${user.email.split("@")[0]}` : "User"
      }
      document.cookie = `user_info=${encodeURIComponent(JSON.stringify(userInfo))}; path=/; max-age=3600; SameSite=Strict`

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

      if (error.message === 'Failed to save user data') {
        toast.error("Account created but failed to save additional details. Please contact support.")
      }
    }
  }

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
            Journey to Manthana
          </h2>
          <p className="mx-auto max-w-sm text-sm text-gray-300 sm:text-base">
            Launch into SMVITM's premier college fest celebrating creativity, innovation, and cosmic culture.
          </p>
        </div>

        <form className="mt-8 space-y-6 relative z-10" onSubmit={handleSubmit}>
          <div className="grid gap-4 md:grid-cols-2">
            <LabelInputContainer>
              <Label htmlFor="firstname" className="text-gray-200 flex items-center">
                First name <span className="text-red-400 ml-1">*</span>
              </Label>
              <Input
                id="firstname"
                placeholder="Tyler"
                type="text"
                className="border-gray-700 bg-gray-900/60 text-white placeholder:text-gray-500 focus:border-cyan-600 focus:ring-cyan-600 focus:ring-1 ring-0 focus:ring-offset-0"
                value={formData.firstname}
                onChange={handleInputChange}
                required
              />
            </LabelInputContainer>
            <LabelInputContainer>
              <Label htmlFor="lastname" className="text-gray-200">
                Last name <span className="text-gray-500">(optional)</span>
              </Label>
              <Input
                id="lastname"
                placeholder="Durden"
                type="text"
                className="border-gray-700 bg-gray-900/60 text-white placeholder:text-gray-500 focus:border-zinc-700/60 focus:ring-zinc-700/60 focus:ring-1 ring-0 focus:ring-offset-0"
                value={formData.lastname}
                onChange={handleInputChange}
              />
            </LabelInputContainer>
          </div>

          <LabelInputContainer>
            <Label htmlFor="college" className="text-gray-200 flex items-center">
              College <span className="text-red-400 ml-1">*</span>
            </Label>
            <select
              id="college"
              value={formData.college}
              onChange={handleInputChange}
              className="w-full rounded-md border border-gray-700 bg-gray-900/60 px-3 py-2 text-white placeholder:text-gray-500 focus:border-cyan-600 focus:ring-cyan-600 focus:ring-1 ring-0 focus:ring-offset-0"
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
            <Label htmlFor="email" className="text-gray-200 flex items-center">
              Email Address <span className="text-red-400 ml-1">*</span>
            </Label>
            <Input
              id="email"
              placeholder="you@example.com"
              type="email"
              className="border-gray-700 bg-gray-900/60 text-white placeholder:text-gray-500 focus:border-cyan-600 focus:ring-cyan-600 focus:ring-1 ring-0 focus:ring-offset-0"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </LabelInputContainer>

          <LabelInputContainer>
            <Label htmlFor="password" className="text-gray-200 flex items-center">
              Password <span className="text-red-400 ml-1">*</span>
            </Label>
            <Input
              id="password"
              placeholder="••••••••"
              type="password"
              className="border-gray-700 bg-gray-900/60 text-white placeholder:text-gray-500 focus:border-cyan-600 focus:ring-cyan-600 focus:ring-1 ring-0 focus:ring-offset-0"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </LabelInputContainer>

          <LabelInputContainer>
            <Label htmlFor="password2" className="text-gray-200 flex items-center">
              Re-enter password <span className="text-red-400 ml-1">*</span>
            </Label>
            <Input
              id="password2"
              placeholder="••••••••"
              type="password"
              className="border-gray-700 bg-gray-900/60 text-white placeholder:text-gray-500 focus:border-cyan-600 focus:ring-cyan-600 focus:ring-1 ring-0 focus:ring-offset-0"
              value={formData.password2}
              onChange={handleInputChange}
              required
            />
          </LabelInputContainer>

          <button
            className="group/btn relative block h-11 w-full overflow-hidden rounded-lg bg-gradient-to-r from-gray-900 via-slate-800 to-gray-900 font-medium text-white shadow-lg transition-all duration-300 hover:scale-[1.01] hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-black active:scale-[0.99]"
            type="submit"
          >
            <div className="relative z-10 flex items-center justify-center">
              <IconRocket className="h-4 w-4 mr-2" />
              <span>Launch Account</span>
            </div>
            <SpaceGradient />
          </button>

          <p className="text-center text-sm text-gray-300">
            Already have an account?{" "}
            <Link href="/login" className="font-medium text-cyan-400 underline-offset-4 hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
      </div>
  )
}

const SpaceGradient = () => {
  return (
    <>
      <span className="absolute inset-x-0 -bottom-px h-px w-full bg-gradient-to-r from-transparent via-cyan-400 to-purple-500 opacity-0 transition-all duration-500 group-hover/btn:opacity-100" />
      <span className="absolute inset-x-10 -bottom-px mx-auto h-px w-1/2 bg-gradient-to-r from-transparent via-cyan-300 to-transparent opacity-0 blur-sm transition-all duration-500 group-hover/btn:opacity-100" />
      <span className="absolute top-0 left-0 right-0 h-full w-full bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-500/5 opacity-0 transition-all duration-500 group-hover/btn:opacity-100" />
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