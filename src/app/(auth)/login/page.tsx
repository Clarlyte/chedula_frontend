import { Metadata } from "next"
import Link from "next/link"
import { UserLoginForm } from "@/components/auth/user-login-form"
import { AuthHeader } from "@/components/auth/auth-header"

export const metadata: Metadata = {
  title: "Login",
  description: "Login to your account",
}

export default function LoginPage() {
  return (
    <div className="flex-1 flex flex-col">
      <AuthHeader />
      <div className="flex-1 flex items-center justify-center py-4 sm:py-8">
        <div className="w-full max-w-[350px] mx-auto px-4 sm:px-6">
          <div className="flex flex-col space-y-6">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Welcome back
              </h1>
              <p className="text-sm text-muted-foreground">
                Enter your email to sign in to your account
              </p>
            </div>
            <UserLoginForm />
            <p className="text-center text-sm text-muted-foreground">
              <Link
                href="/signup"
                className="hover:text-brand underline underline-offset-4"
              >
                Don&apos;t have an account? Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
} 