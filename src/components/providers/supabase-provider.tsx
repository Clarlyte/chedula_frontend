"use client"

import type React from "react"
import { createContext, useContext } from "react"
import { getSupabaseClient } from "@/lib/auth"
import type { Database } from "@/types/supabase"

type SupabaseContext = {
  supabase: ReturnType<typeof getSupabaseClient>
}

const Context = createContext<SupabaseContext | undefined>(undefined)

export function SupabaseProvider({
  children,
}: {
  children: React.ReactNode
}) {
  // Use the singleton client from our auth utility
  const supabase = getSupabaseClient()

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
