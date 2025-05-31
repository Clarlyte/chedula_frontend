import { Metadata } from "next"
import Link from "next/link"
import { AuthHeader } from "@/components/auth/auth-header"

export const metadata: Metadata = {
  title: "Verify Email",
  description: "Check your email to verify your account",
}

export default function VerifyEmailPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <AuthHeader />
      <div className="flex-1 container flex items-center justify-center py-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px] text-center">
          <div className="flex flex-col space-y-2">
            <h1 className="text-2xl font-semibold tracking-tight">
              Check your email
            </h1>
            <p className="text-sm text-muted-foreground">
              We've sent a verification link to your email address. Please click the link to verify your account and complete your registration.
            </p>
          </div>
          
          <div className="rounded-lg border bg-card p-6 space-y-4">
            <div className="flex items-center justify-center w-12 h-12 mx-auto bg-primary/10 rounded-full">
              <svg
                className="w-6 h-6 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium">Email sent!</h3>
              <p className="text-sm text-muted-foreground">
                If you don't see the email in your inbox, please check your spam folder.
              </p>
            </div>
          </div>

          <div className="text-center text-sm text-muted-foreground space-y-2">
            <p>Didn't receive the email?</p>
            <Link
              href="/resend-verification"
              className="text-primary hover:text-primary/80 underline underline-offset-4"
            >
              Resend verification email
            </Link>
          </div>

          <div className="text-center">
            <Link
              href="/login"
              className="text-sm text-muted-foreground hover:text-primary underline underline-offset-4"
            >
              Back to login
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
} 