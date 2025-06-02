"use client"

import { User } from "@supabase/supabase-js"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"

interface DashboardHeaderProps {
  user: User
}

export function DashboardHeader({ user }: DashboardHeaderProps) {
  const router = useRouter()
  const supabase = createClientComponentClient()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push("/login")
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="responsive-container flex h-16 items-center justify-between">
        <Link href="/dashboard" className="flex items-center gap-0 group">
          <Image 
            src="/images/logo.svg" 
            alt="Chedula Logo" 
            width={50} 
            height={50} 
            className="h-14 w-14 sm:h-16 sm:w-16 interactive-icon"
          />
          <span className="text-lg sm:text-xl font-bold">
            Chedula
          </span>
        </Link>
        
        <div className="flex items-center gap-2 sm:gap-4">
          <span className="text-sm text-muted-foreground hidden sm:block">
            Welcome, {user.email}
          </span>
          <button
            onClick={handleSignOut}
            className="border border-gold-500/30 hover:border-gold-500/80 hover:bg-gold-500/10 px-4 py-2 text-sm rounded-md transition-colors"
          >
            Log out
          </button>
        </div>
      </div>
    </header>
  )
} 