import { UseFormReturn } from "react-hook-form"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

interface AdditionalInfoStepProps {
  form: UseFormReturn<any>
  isLoading: boolean
}

export function AdditionalInfoStep({ form, isLoading }: AdditionalInfoStepProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="business_description" className="text-base font-medium">Business Description</Label>
            <span className="text-sm text-red-500">Required</span>
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
              {form.formState.errors.business_description.message?.toString()}
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
              {form.formState.errors.website_url.message?.toString()}
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
} 