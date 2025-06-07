import { UseFormReturn } from "react-hook-form"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

interface ContactInfoStepProps {
  form: UseFormReturn<any>
  isLoading: boolean
}

export function ContactInfoStep({ form, isLoading }: ContactInfoStepProps) {
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
            {form.formState.errors.contact_email.message?.toString()}
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
            {form.formState.errors.phone_number.message?.toString()}
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
            {form.formState.errors.business_address.message?.toString()}
          </p>
        )}
      </div>
    </div>
  )
} 