"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/components/providers/auth-provider"

export function SubscriptionStatus() {
  const { user } = useAuth()
  const [status, setStatus] = useState<any>(null)

  useEffect(() => {
    async function fetchStatus() {
      const res = await fetch("/api/v1/users/subscription/", {
        headers: { Authorization: `Bearer ${user?.id}` }
      })
      if (res.ok) setStatus(await res.json())
    }
    if (user) fetchStatus()
  }, [user])

  if (!status) return null
  return (
    <div className="mb-4">
      <div>Plan: {status.subscription_plan}</div>
      <div>Status: {status.subscription_status}</div>
      {status.trial_ends_at && (
        <div>Trial ends: {new Date(status.trial_ends_at).toLocaleDateString()}</div>
      )}
    </div>
  )
} 