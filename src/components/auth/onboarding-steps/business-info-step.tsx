import { UseFormReturn } from "react-hook-form"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

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

interface BusinessInfoStepProps {
  form: UseFormReturn<any>
  isLoading: boolean
}

export function BusinessInfoStep({ form, isLoading }: BusinessInfoStepProps) {
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
            {form.formState.errors.business_name.message?.toString()}
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
        {form.formState.errors.business_type && (
          <p className="text-sm text-red-500">
            {form.formState.errors.business_type.message?.toString()}
          </p>
        )}
      </div>
    </div>
  )
} 