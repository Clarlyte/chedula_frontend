import { Metadata } from "next"
import Link from "next/link"
import { AuthHeader } from "@/components/auth/auth-header"
import { ResendVerificationForm } from "@/components/auth/resend-verification-form"

export const metadata: Metadata = {
  title: "Resend Verification",
  description: "Resend your email verification link",
}

export default function ResendVerificationPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <AuthHeader />
      <div className="flex-1 container flex items-center justify-center py-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Resend verification email
            </h1>
            <p className="text-sm text-muted-foreground">
              Enter your email address and we'll send you a new verification link
            </p>
          </div>
          
          <ResendVerificationForm />
          
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