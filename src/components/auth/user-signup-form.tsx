'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Icons } from "@/components/icons"
import { cn } from "@/lib/utils"
import { authHelpers } from "@/lib/auth"
import { userService } from "@/lib/api"

interface UserRegisterFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserRegisterForm({ className, ...props }: UserRegisterFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)
    setError(null)
    setMessage(null)

    const formData = new FormData(event.currentTarget)
    const email = formData.get("email") as string
    const password = formData.get("password") as string
    const fullName = formData.get("fullName") as string

    try {
      // Sign up with Supabase and include metadata for trial setup
      const { data, error: signUpError } = await authHelpers.signUp(
        email,
        password,
        {
          full_name: fullName,
          subscription_tier: 'freemium', // Start with freemium
          trial_eligible: true,
          signup_source: 'web_app',
          signup_timestamp: new Date().toISOString(),
        }
      )

      if (signUpError) {
        setError(signUpError.message)
        return
      }

      if (!data.user) {
        setError("Registration failed - no user created")
        return
      }

      // Show confirmation message
      setMessage(
        "Registration successful! Please check your email to verify your account. " +
        "After verification, you'll have access to a 7-day free trial with full features."
      )

      // If user is immediately confirmed (for development), handle profile creation
      if (data.session) {
        try {
          // Verify token with backend to create initial profile
          const { data: verifyData, error: verifyError } = await userService.verifyToken(
            data.session.access_token
          )

          if (verifyError) {
            console.error("Backend verification failed during signup:", verifyError)
          }

          // Redirect to onboarding
          setTimeout(() => {
            router.push("/onboarding")
          }, 2000)
        } catch (error) {
          console.error("Error during post-signup setup:", error)
          // Still redirect to onboarding
          setTimeout(() => {
            router.push("/onboarding")
          }, 2000)
        }
      } else {
        // Redirect to email verification page
        setTimeout(() => {
          router.push("/verify-email")
        }, 2000)
      }

    } catch (error: any) {
      console.error("Registration error:", error)
      setError(error.message || "An unexpected error occurred during registration")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              name="fullName"
              placeholder="John Doe"
              type="text"
              autoCapitalize="words"
              autoComplete="name"
              disabled={isLoading}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              disabled={isLoading}
              required
              minLength={6}
              placeholder="Minimum 6 characters"
            />
          </div>
          <div className="text-xs text-muted-foreground">
            🎉 <strong>Free 7-day trial!</strong> Get full access to all features including:
            <ul className="mt-1 ml-4 list-disc text-xs">
              <li>AI-powered scheduling assistant</li>
              <li>Unlimited bookings</li>
              <li>Custom booking pages</li>
              <li>Contract generation</li>
              <li>Customer management</li>
            </ul>
          </div>
          {error && (
            <div className="text-sm text-red-500 bg-red-50 p-3 rounded-md border border-red-200">
              {error}
            </div>
          )}
          {message && (
            <div className="text-sm text-green-600 bg-green-50 p-3 rounded-md border border-green-200">
              {message}
            </div>
          )}
          <Button disabled={isLoading} className="w-full">
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Start Free Trial
          </Button>
        </div>
      </form>
    </div>
  )
} 