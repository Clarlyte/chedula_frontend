import { Metadata } from "next"
import Link from "next/link"
import { UserRegisterForm } from "@/components/auth/user-signup-form"
import { AuthHeader } from "@/components/auth/auth-header"

export const metadata: Metadata = {
  title: "Register",
  description: "Create a new account",
}

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <AuthHeader />
      <div className="flex-1 container flex items-center justify-center py-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Create an account
            </h1>
            <p className="text-sm text-muted-foreground">
              Enter your email below to create your account
            </p>
          </div>
          <UserRegisterForm />
          <p className="px-8 text-center text-sm text-muted-foreground">
            <Link
              href="/login"
              className="hover:text-brand underline underline-offset-4"
            >
              Already have an account? Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
} 