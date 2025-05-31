"use client"

import { useState } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function ResendVerificationForm() {
  const supabase = createClientComponentClient()
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    setMessage("")
    setIsLoading(true)

    try {
      // Supabase resends verification email when you call signUp with existing unverified email
      const { error } = await supabase.auth.signUp({
        email,
        password: "dummy", // Required but ignored for existing users
        options: {
          emailRedirectTo: `${location.origin}/auth/callback`,
        },
      })
      
      if (error) {
        setError(error.message)
      } else {
        setMessage("Verification email resent. Please check your inbox.")
      }
    } catch (error) {
      setError("An unexpected error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="name@example.com"
          disabled={isLoading}
          required
        />
      </div>
      <Button type="submit" disabled={isLoading} className="w-full">
        {isLoading ? "Sending..." : "Resend Verification Email"}
      </Button>
      {error && <div className="text-sm text-red-500">{error}</div>}
      {message && <div className="text-sm text-green-500">{message}</div>}
    </form>
  )
} 