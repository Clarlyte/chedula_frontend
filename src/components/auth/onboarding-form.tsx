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

const businessTypes = [
  { value: 'camera_rental', label: 'Camera Rental' },
  { value: 'equipment_rental', label: 'Equipment Rental' },
  { value: 'professional_services', label: 'Professional Services' },
  { value: 'consulting', label: 'Consulting' },
  { value: 'beauty_wellness', label: 'Beauty & Wellness' },
  { value: 'fitness_training', label: 'Fitness Training' },
  { value: 'home_services', label: 'Home Services' },
  { value: 'other', label: 'Other' },
]

const formSchema = z.object({
  business_name: z.string().min(2, "Business name must be at least 2 characters"),
  contact_email: z.string().email("Invalid email address"),
  phone_number: z.string().min(10, "Phone number must be at least 10 digits"),
  business_address: z.string().min(5, "Address must be at least 5 characters"),
  business_type: z.string(),
  business_description: z.string().optional(),
  website_url: z.string().url("Invalid URL").optional().or(z.literal("")),
})

type FormData = z.infer<typeof formSchema>

export function OnboardingForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

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
          console.log("Pre-populating form with existing data:", profileData);
          
          // Pre-populate form with existing data
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
        console.error("Error loading profile data:", err);
      }
    }
    
    loadProfileData()
  }, [form])

  async function onSubmit(data: FormData) {
    setIsLoading(true)
    setError(null)

    try {
      console.log("Submitting onboarding data:", data);
      const { data: responseData, error: onboardingError } = await userService.completeOnboarding(data)
      
      console.log("Onboarding response:", responseData);
      console.log("Onboarding error:", onboardingError);
      console.log("is_onboarded in response:", responseData?.is_onboarded);
      
      if (onboardingError) {
        throw new Error(onboardingError.message || "Failed to complete onboarding")
      }

      console.log("Onboarding successful, redirecting to dashboard");
      // Redirect to dashboard after successful onboarding completion
      router.push("/dashboard")
      router.refresh()
    } catch (err: any) {
      console.error("Onboarding failed:", err);
      setError(err.message || "An unexpected error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-4">
        {/* Business Name */}
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

        {/* Contact Email */}
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

        {/* Phone Number */}
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

        {/* Business Address */}
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

        {/* Business Type */}
        <div className="space-y-2">
          <Label htmlFor="business_type">Business Type</Label>
          <Select
            onChange={e => form.setValue("business_type", e.target.value)}
            value={form.getValues("business_type")}
          >
            {businessTypes.map((type) => (
              <SelectItem key={type.value} value={type.value}>
                {type.label}
              </SelectItem>
            ))}
          </Select>
          {form.formState.errors.business_type && (
            <p className="text-sm text-red-500">
              {form.formState.errors.business_type.message}
            </p>
          )}
        </div>

        {/* Business Description */}
        <div className="space-y-2">
          <Label htmlFor="business_description">Business Description (Optional)</Label>
          <Textarea
            id="business_description"
            {...form.register("business_description")}
            disabled={isLoading}
            placeholder="Tell us about your business"
          />
        </div>

        {/* Website URL */}
        <div className="space-y-2">
          <Label htmlFor="website_url">Website URL (Optional)</Label>
          <Input
            id="website_url"
            type="url"
            {...form.register("website_url")}
            disabled={isLoading}
            placeholder="https://your-business.com"
          />
          {form.formState.errors.website_url && (
            <p className="text-sm text-red-500">
              {form.formState.errors.website_url.message}
            </p>
          )}
        </div>
      </div>

      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading && (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        )}
        Complete Setup
      </Button>
    </form>
  )
} 