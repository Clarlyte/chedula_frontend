"use client"

import { useState } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function ResetPasswordForm() {
  const supabase = createClientComponentClient()
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(""); setMessage("")
    const { error } = await supabase.auth.resetPasswordForEmail(email)
    if (error) setError(error.message)
    else setMessage("Check your email for a password reset link.")
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <Label htmlFor="email">Email</Label>
      <Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
      <Button type="submit">Send Reset Link</Button>
      {error && <div className="text-red-500">{error}</div>}
      {message && <div className="text-green-500">{message}</div>}
    </form>
  )
} 