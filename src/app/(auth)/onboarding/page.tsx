import { Metadata } from "next"
import { OnboardingForm } from "@/components/auth/onboarding-form"

export const metadata: Metadata = {
  title: "Complete Your Profile",
  description: "Set up your business profile to get started",
}

export default function OnboardingPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-2 sm:px-4 bg-background">
      <div className="w-full max-w-md sm:max-w-lg md:max-w-2xl bg-card rounded-lg shadow-lg p-4 sm:p-8">
        <div className="space-y-6 text-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold">Complete Your Profile</h1>
          <p className="text-muted-foreground text-base sm:text-lg">
            Tell us about your business to get started with scheduling
          </p>
        </div>
        <OnboardingForm />
      </div>
    </div>
  )
} 