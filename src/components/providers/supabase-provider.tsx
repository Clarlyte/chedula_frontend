"use client"

import type React from "react"

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useRouter } from "next/navigation"
import { createContext, useContext, useEffect } from "react"
import type { Database } from "@/types/supabase"

type SupabaseContext = {
  supabase: ReturnType<typeof createClientComponentClient<Database>>
}

const Context = createContext<SupabaseContext | undefined>(undefined)

export function SupabaseProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const supabase = createClientComponentClient<Database>()

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      router.refresh()
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [router, supabase])

  return (
    <Context.Provider value={{ supabase }}>
      {children}
    </Context.Provider>
  )
}

export const useSupabase = () => {
  const context = useContext(Context)

  if (context === undefined) {
    throw new Error("useSupabase must be used inside SupabaseProvider")
  }

  return context
}
