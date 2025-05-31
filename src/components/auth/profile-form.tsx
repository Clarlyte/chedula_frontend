"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/contexts/AuthContext"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function ProfileForm() {
  const { user } = useAuth()
  const [profile, setProfile] = useState({ business_name: "", contact_email: "" })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  useEffect(() => {
    async function fetchProfile() {
      setLoading(true)
      setError("")
      const res = await fetch("/api/v1/users/profile/", {
        headers: { Authorization: `Bearer ${user?.id}` }
      })
      if (!res.ok) setError("Failed to load profile")
      else setProfile(await res.json())
      setLoading(false)
    }
    if (user) fetchProfile()
  }, [user])

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(""); setSuccess("")
    const res = await fetch("/api/v1/users/profile/", {
      method: "PUT",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${user?.id}` },
      body: JSON.stringify(profile)
    })
    if (!res.ok) setError("Failed to update profile")
    else setSuccess("Profile updated!")
  }

  if (loading) return <div>Loading...</div>
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <Label>Business Name</Label>
      <Input value={profile.business_name} onChange={e => setProfile({ ...profile, business_name: e.target.value })} />
      <Label>Contact Email</Label>
      <Input value={profile.contact_email} onChange={e => setProfile({ ...profile, contact_email: e.target.value })} />
      <Button type="submit">Save</Button>
      {error && <div className="text-red-500">{error}</div>}
      {success && <div className="text-green-500">{success}</div>}
    </form>
  )
} 