'use client'

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Icons } from "@/components/icons"
import { userService } from "@/lib/api"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, ArrowRight } from "lucide-react"

const businessTypes = [
  { value: 'camera_rental', label: 'Camera Rental', icon: '📸' },
  { value: 'equipment_rental', label: 'Equipment Rental', icon: '🔧' },
  { value: 'professional_services', label: 'Professional Services', icon: '💼' },
  { value: 'consulting', label: 'Consulting', icon: '🤝' },
  { value: 'beauty_wellness', label: 'Beauty & Wellness', icon: '💅' },
  { value: 'fitness_training', label: 'Fitness Training', icon: '💪' },
  { value: 'home_services', label: 'Home Services', icon: '🏠' },
  { value: 'other', label: 'Other', icon: '✨' },
]

const formSchema = z.object({
  business_name: z.string().min(2, "Business name must be at least 2 characters"),
  contact_email: z.string().email("Invalid email address"),
  phone_number: z.string().min(10, "Phone number must be at least 10 digits"),
  business_address: z.string().min(5, "Address must be at least 5 characters"),
  business_type: z.string(),
  business_description: z.string().max(500, "Description must be less than 500 characters").optional(),
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

  const nextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1))
  }

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0))
  }

  async function onSubmit(data: FormData) {
    setIsLoading(true)
    setError(null)

    try {
      const { data: responseData, error: onboardingError } = await userService.completeOnboarding(data)
      
      if (onboardingError) {
        throw new Error(onboardingError.message || "Failed to complete onboarding")
      }

      router.push("/dashboard")
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
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="business_name">Business Name</Label>
              <Input
                id="business_name"
                {...form.register("business_name")}
                disabled={isLoading}
                placeholder="Enter your business name"
              />
              {form.formState.errors.business_name && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.business_name.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="business_type">Business Type</Label>
              <Select
                value={form.getValues("business_type")}
                onValueChange={(value: string) => form.setValue("business_type", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select your business type" />
                </SelectTrigger>
                <SelectContent>
                  {businessTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      <span className="flex items-center gap-2">
                        <span>{type.icon}</span>
                        <span>{type.label}</span>
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        )
      case 1:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="contact_email">Contact Email</Label>
              <Input
                id="contact_email"
                type="email"
                {...form.register("contact_email")}
                disabled={isLoading}
                placeholder="business@example.com"
              />
              {form.formState.errors.contact_email && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.contact_email.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone_number">Phone Number</Label>
              <Input
                id="phone_number"
                type="tel"
                {...form.register("phone_number")}
                disabled={isLoading}
                placeholder="+1 (555) 000-0000"
              />
              {form.formState.errors.phone_number && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.phone_number.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="business_address">Business Address</Label>
              <Textarea
                id="business_address"
                {...form.register("business_address")}
                disabled={isLoading}
                placeholder="Enter your business address"
              />
              {form.formState.errors.business_address && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.business_address.message}
                </p>
              )}
            </div>
          </div>
        )
      case 2:
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="business_description" className="text-base font-medium">Business Description</Label>
                  <span className="text-sm text-muted-foreground">Optional</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Help customers understand your business better by providing a detailed description of your services and unique selling points.
                </p>
                <div className="relative">
                  <Textarea
                    id="business_description"
                    {...form.register("business_description")}
                    disabled={isLoading}
                    placeholder="Describe your business, services, and what makes you unique. This will help customers understand your offerings better."
                    className="min-h-[150px] resize-none bg-background/50 border-gold-500/30 text-gold-400 focus-visible:ring-gold-500/50"
                  />
                  <div className="absolute bottom-2 right-2 text-xs text-muted-foreground bg-background/80 px-2 py-1 rounded">
                    {form.watch("business_description")?.length || 0}/500 characters
                  </div>
                </div>
                {form.formState.errors.business_description && (
                  <p className="text-sm text-red-500">
                    {form.formState.errors.business_description.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="website_url" className="text-base font-medium">Website URL</Label>
                  <span className="text-sm text-muted-foreground">Optional</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Add your business website to help customers learn more about your services and view your portfolio.
                </p>
                <div className="relative">
                  <Input
                    id="website_url"
                    type="url"
                    {...form.register("website_url")}
                    disabled={isLoading}
                    placeholder="https://your-business.com"
                    className="pr-8"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg className="h-4 w-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </div>
                </div>
                {form.formState.errors.website_url && (
                  <p className="text-sm text-red-500">
                    {form.formState.errors.website_url.message}
                  </p>
                )}
              </div>
            </div>

            <div className="bg-muted/50 p-4 rounded-lg space-y-2">
              <h4 className="text-sm font-medium">💡 Tips for a Great Profile</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Be specific about your services and expertise</li>
                <li>• Highlight what makes your business unique</li>
                <li>• Include any certifications or special qualifications</li>
                <li>• Add your website to showcase your portfolio</li>
              </ul>
            </div>
          </div>
        )
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