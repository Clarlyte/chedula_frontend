'use client'

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Icons } from "@/components/icons"
import { useAuth } from "@/components/providers/auth-provider"

const profileFormSchema = z.object({
  business_name: z.string().min(2, "Business name must be at least 2 characters"),
  contact_email: z.string().email("Invalid email address"),
  phone_number: z.string().min(10, "Phone number must be at least 10 digits"),
  business_address: z.string().min(5, "Address must be at least 5 characters"),
  business_description: z.string().max(500, "Description must be less than 500 characters").optional(),
  website_url: z.string().url("Invalid URL").optional().or(z.literal("")),
})

const notificationFormSchema = z.object({
  email_notifications: z.boolean(),
  sms_notifications: z.boolean(),
  booking_reminders: z.boolean(),
  marketing_emails: z.boolean(),
  system_updates: z.boolean(),
})

const preferenceFormSchema = z.object({
  timezone: z.string(),
  date_format: z.string(),
  language: z.string(),
  theme: z.enum(["light", "dark", "system"]),
})

type ProfileFormData = z.infer<typeof profileFormSchema>
type NotificationFormData = z.infer<typeof notificationFormSchema>
type PreferenceFormData = z.infer<typeof preferenceFormSchema>

export function SettingsForm() {
  const { user } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("profile")

  const profileForm = useForm<ProfileFormData>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      business_name: "",
      contact_email: "",
      phone_number: "",
      business_address: "",
      business_description: "",
      website_url: "",
    },
  })

  const notificationForm = useForm<NotificationFormData>({
    resolver: zodResolver(notificationFormSchema),
    defaultValues: {
      email_notifications: true,
      sms_notifications: true,
      booking_reminders: true,
      marketing_emails: false,
      system_updates: true,
    },
  })

  const preferenceForm = useForm<PreferenceFormData>({
    resolver: zodResolver(preferenceFormSchema),
    defaultValues: {
      timezone: "UTC",
      date_format: "MM/DD/YYYY",
      language: "en",
      theme: "system",
    },
  })

  async function onProfileSubmit(data: ProfileFormData) {
    setIsLoading(true)
    try {
      // TODO: Implement profile update
      console.log("Profile data:", data)
    } catch (error) {
      console.error("Error updating profile:", error)
    } finally {
      setIsLoading(false)
    }
  }

  async function onNotificationSubmit(data: NotificationFormData) {
    setIsLoading(true)
    try {
      // TODO: Implement notification settings update
      console.log("Notification settings:", data)
    } catch (error) {
      console.error("Error updating notification settings:", error)
    } finally {
      setIsLoading(false)
    }
  }

  async function onPreferenceSubmit(data: PreferenceFormData) {
    setIsLoading(true)
    try {
      // TODO: Implement preferences update
      console.log("Preferences:", data)
    } catch (error) {
      console.error("Error updating preferences:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="profile">Profile</TabsTrigger>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
        <TabsTrigger value="preferences">Preferences</TabsTrigger>
      </TabsList>

      <TabsContent value="profile">
        <Card>
          <CardHeader>
            <CardTitle>Profile Settings</CardTitle>
            <CardDescription>
              Update your business information and contact details.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="business_name">Business Name</Label>
                  <Input
                    id="business_name"
                    {...profileForm.register("business_name")}
                    disabled={isLoading}
                  />
                  {profileForm.formState.errors.business_name && (
                    <p className="text-sm text-red-500">
                      {profileForm.formState.errors.business_name.message?.toString()}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contact_email">Contact Email</Label>
                  <Input
                    id="contact_email"
                    type="email"
                    {...profileForm.register("contact_email")}
                    disabled={isLoading}
                  />
                  {profileForm.formState.errors.contact_email && (
                    <p className="text-sm text-red-500">
                      {profileForm.formState.errors.contact_email.message?.toString()}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone_number">Phone Number</Label>
                  <Input
                    id="phone_number"
                    type="tel"
                    {...profileForm.register("phone_number")}
                    disabled={isLoading}
                  />
                  {profileForm.formState.errors.phone_number && (
                    <p className="text-sm text-red-500">
                      {profileForm.formState.errors.phone_number.message?.toString()}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="business_address">Business Address</Label>
                  <Textarea
                    id="business_address"
                    {...profileForm.register("business_address")}
                    disabled={isLoading}
                  />
                  {profileForm.formState.errors.business_address && (
                    <p className="text-sm text-red-500">
                      {profileForm.formState.errors.business_address.message?.toString()}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="business_description">Business Description</Label>
                  <Textarea
                    id="business_description"
                    {...profileForm.register("business_description")}
                    disabled={isLoading}
                  />
                  {profileForm.formState.errors.business_description && (
                    <p className="text-sm text-red-500">
                      {profileForm.formState.errors.business_description.message?.toString()}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="website_url">Website URL</Label>
                  <Input
                    id="website_url"
                    type="url"
                    {...profileForm.register("website_url")}
                    disabled={isLoading}
                  />
                  {profileForm.formState.errors.website_url && (
                    <p className="text-sm text-red-500">
                      {profileForm.formState.errors.website_url.message?.toString()}
                    </p>
                  )}
                </div>
              </div>

              <Button type="submit" disabled={isLoading}>
                {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
                Save Changes
              </Button>
            </form>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="notifications">
        <Card>
          <CardHeader>
            <CardTitle>Notification Settings</CardTitle>
            <CardDescription>
              Configure how you want to receive notifications.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={notificationForm.handleSubmit(onNotificationSubmit)} className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications via email
                    </p>
                  </div>
                  <Switch
                    checked={notificationForm.watch("email_notifications")}
                    onCheckedChange={(checked: boolean) => notificationForm.setValue("email_notifications", checked)}
                    disabled={isLoading}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>SMS Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications via SMS
                    </p>
                  </div>
                  <Switch
                    checked={notificationForm.watch("sms_notifications")}
                    onCheckedChange={(checked: boolean) => notificationForm.setValue("sms_notifications", checked)}
                    disabled={isLoading}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Booking Reminders</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive reminders for upcoming bookings
                    </p>
                  </div>
                  <Switch
                    checked={notificationForm.watch("booking_reminders")}
                    onCheckedChange={(checked: boolean) => notificationForm.setValue("booking_reminders", checked)}
                    disabled={isLoading}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Marketing Emails</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive marketing and promotional emails
                    </p>
                  </div>
                  <Switch
                    checked={notificationForm.watch("marketing_emails")}
                    onCheckedChange={(checked: boolean) => notificationForm.setValue("marketing_emails", checked)}
                    disabled={isLoading}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>System Updates</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications about system updates
                    </p>
                  </div>
                  <Switch
                    checked={notificationForm.watch("system_updates")}
                    onCheckedChange={(checked: boolean) => notificationForm.setValue("system_updates", checked)}
                    disabled={isLoading}
                  />
                </div>
              </div>

              <Button type="submit" disabled={isLoading}>
                {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
                Save Changes
              </Button>
            </form>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="preferences">
        <Card>
          <CardHeader>
            <CardTitle>Preferences</CardTitle>
            <CardDescription>
              Customize your application preferences.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={preferenceForm.handleSubmit(onPreferenceSubmit)} className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Input
                    id="timezone"
                    {...preferenceForm.register("timezone")}
                    disabled={isLoading}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="date_format">Date Format</Label>
                  <Input
                    id="date_format"
                    {...preferenceForm.register("date_format")}
                    disabled={isLoading}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="language">Language</Label>
                  <Input
                    id="language"
                    {...preferenceForm.register("language")}
                    disabled={isLoading}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="theme">Theme</Label>
                  <Input
                    id="theme"
                    {...preferenceForm.register("theme")}
                    disabled={isLoading}
                  />
                </div>
              </div>

              <Button type="submit" disabled={isLoading}>
                {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
                Save Changes
              </Button>
            </form>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
} 