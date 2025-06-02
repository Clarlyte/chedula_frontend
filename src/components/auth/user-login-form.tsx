'use client'

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Icons } from "@/components/icons"
import { cn } from "@/lib/utils"
import { authHelpers, userService } from "@/lib/api"

interface UserLoginFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserLoginForm({ className, ...props }: UserLoginFormProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectTo = searchParams.get('redirect') || '/dashboard'
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)
    setError(null)

    const formData = new FormData(event.currentTarget)
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    try {
      // Sign in with Supabase
      const { data, error: signInError } = await authHelpers.signIn(email, password)

      if (signInError) {
        setError(signInError.message)
        return
      }

      if (!data.session) {
        setError("Authentication failed - no session created")
        return
      }

      // Verify token with backend
      const { data: verifyData, error: verifyError } = await authHelpers.verifyToken(
        data.session.access_token
      )

      console.log("verifyData", verifyData, "verifyError", verifyError);

      if (verifyError) {
        console.error("Backend verification failed:", verifyError);
        setError("Authentication failed. Please try again.");
        setIsLoading(false);
        return;
      }

      // Check if user profile exists and is complete
      const { data: profileData, error: profileError } = await userService.getProfile()

      console.log("profileData", profileData, "profileError", profileError);
      console.log("is_onboarded status:", profileData?.is_onboarded);

      if (profileError && profileError.status !== 404) {
        console.error("Error fetching profile:", profileError);
        setError("Could not fetch profile. Please try again.");
        setIsLoading(false);
        return;
      }

      // Determine where to redirect based on profile status
      if (!profileData || !profileData.business_name || !profileData.business_type || !profileData.is_onboarded) {
        // User needs to complete onboarding
        console.log("Redirecting to onboarding - missing data or not onboarded");
        console.log("Redirect reason:", {
          hasProfileData: !!profileData,
          hasBusinessName: !!profileData?.business_name,
          hasBusinessType: !!profileData?.business_type,
          isOnboarded: profileData?.is_onboarded
        });
        router.push("/onboarding")
      } else {
        // User has completed onboarding - redirect to intended page or dashboard
        console.log("Redirecting to:", redirectTo);
        router.push(redirectTo)
      }

      router.refresh()
    } catch (error: any) {
      console.error("Login error:", error)
      setError(error.message || "An unexpected error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-4">
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
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <Link
                href="/reset-password"
                className="text-sm text-muted-foreground hover:text-primary underline underline-offset-4"
              >
                Forgot password?
              </Link>
            </div>
            <Input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              disabled={isLoading}
              required
            />
          </div>
          {error && (
            <p className="text-sm text-red-500">{error}</p>
          )}
          <Button disabled={isLoading} className="w-full">
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Sign In
          </Button>
        </div>
      </form>
    </div>
  )
} 