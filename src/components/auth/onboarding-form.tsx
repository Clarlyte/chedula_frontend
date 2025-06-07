'use client'

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { Icons } from "@/components/icons"
import { userService } from "@/lib/api"
import { BusinessInfoStep } from "./onboarding-steps/business-info-step"
import { ContactInfoStep } from "./onboarding-steps/contact-info-step"
import { AdditionalInfoStep } from "./onboarding-steps/additional-info-step"

const formSchema = z.object({
  business_name: z.string().min(2, "Business name must be at least 2 characters"),
  contact_email: z.string().email("Invalid email address"),
  phone_number: z.string().min(10, "Phone number must be at least 10 digits"),
  business_address: z.string().min(5, "Address must be at least 5 characters"),
  business_type: z.string(),
  business_description: z.string().min(10, "Business description must be at least 10 characters").max(500, "Description must be less than 500 characters"),
  website_url: z.string().url("Invalid URL").optional().or(z.literal("")),
})

type FormData = z.infer<typeof formSchema>

const steps = [
  { id: 'business-info', title: 'Business Information', description: 'Tell us about your business' },
  { id: 'contact-info', title: 'Contact Details', description: 'How can customers reach you?' },
  { id: 'additional-info', title: 'Additional Information', description: 'Add more details about your services' },
]

export function OnboardingForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [currentStep, setCurrentStep] = useState(0)

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      business_name: "",
      contact_email: "",
      phone_number: "",
      business_address: "",
      business_type: "camera_rental",
      business_description: "",
      website_url: "",
    },
    mode: "onChange", // Enable real-time validation
  })

  // Load existing profile data
  useEffect(() => {
    const loadProfileData = async () => {
      try {
        const { data: profileData, error: profileError } = await userService.getProfile()
        
        if (!profileError && profileData) {
          form.reset({
            business_name: profileData.business_name || "",
            contact_email: profileData.contact_email || "",
            phone_number: profileData.phone_number || "",
            business_address: profileData.business_address || "",
            business_type: profileData.business_type || "camera_rental",
            business_description: profileData.business_description || "",
            website_url: profileData.website_url || "",
          })
        }
      } catch (err) {
        console.error("Error loading profile data:", err)
      }
    }
    
    loadProfileData()
  }, [form])

  const nextStep = async () => {
    // Validate current step before proceeding
    const fieldsToValidate = getFieldsForStep(currentStep)
    const isValid = await form.trigger(fieldsToValidate)
    
    if (isValid) {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1))
    }
  }

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0))
  }

  const getFieldsForStep = (step: number): (keyof FormData)[] => {
    switch (step) {
      case 0:
        return ['business_name', 'business_type']
      case 1:
        return ['contact_email', 'phone_number', 'business_address']
      case 2:
        return ['business_description'] // Business description is now required
      default:
        return []
    }
  }

  const isStepValid = async (step: number) => {
    const fieldsToValidate = getFieldsForStep(step)
    const result = await form.trigger(fieldsToValidate)
    return result
  }

  async function onSubmit(data: FormData) {
    setIsLoading(true)
    setError(null)

    try {
      const { data: responseData, error: onboardingError } = await userService.completeOnboarding(data)
      
      if (onboardingError) {
        throw new Error(onboardingError.message || "Failed to complete onboarding")
      }

      router.push("/dashboard/chat")
      router.refresh()
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <BusinessInfoStep form={form} isLoading={isLoading} />
      case 1:
        return <ContactInfoStep form={form} isLoading={isLoading} />
      case 2:
        return <AdditionalInfoStep form={form} isLoading={isLoading} />
      default:
        return null
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{steps[currentStep].title}</CardTitle>
        <CardDescription>{steps[currentStep].description}</CardDescription>
        <Progress value={(currentStep + 1) * (100 / steps.length)} className="mt-4" />
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {renderStep()}

          {error && (
            <p className="text-sm text-red-500 bg-red-50 p-3 rounded-md border border-red-200">
              {error}
            </p>
          )}

          <div className="flex justify-between gap-4">
            {currentStep > 0 && (
              <Button
                type="button"
                variant="outline"
                onClick={prevStep}
                disabled={isLoading}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous
              </Button>
            )}
            
            {currentStep < steps.length - 1 ? (
              <Button
                type="button"
                onClick={nextStep}
                disabled={isLoading}
                className="ml-auto"
              >
                Next
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button
                type="submit"
                disabled={isLoading}
                className="ml-auto"
              >
                {isLoading && (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )}
                Complete Setup
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  )
} 