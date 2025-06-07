"use client"

import { createContext, useContext, useEffect, useState, useRef } from "react"
import { useRouter } from "next/navigation"
import type { User } from "@supabase/supabase-js"
import { 
  getAuthToken, 
  getCurrentUser, 
  onAuthStateChange, 
  clearSessionCache,
  type AuthState 
} from "@/lib/auth"

type AuthContextType = {
  user: User | null
  loading: boolean
  getToken: () => Promise<string | null>
  authLoading: boolean
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  getToken: async () => null,
  authLoading: true,
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [authLoading, setAuthLoading] = useState(true)
  const router = useRouter()
  const initialized = useRef(false)

  // Use the centralized auth utility
  const getToken = async (): Promise<string | null> => {
    try {
      return await getAuthToken()
    } catch (error) {
      console.error('Error getting auth token:', error)
      return null
    }
  }

  useEffect(() => {
    // Prevent multiple initializations
    if (initialized.current) return
    initialized.current = true

    // Initialize auth state
    const initializeAuth = async () => {
      try {
        const currentUser = await getCurrentUser()
        setUser(currentUser)
      } catch (error) {
        console.error('Error initializing auth:', error)
        setUser(null)
      } finally {
        setLoading(false)
        setAuthLoading(false)
      }
    }

    initializeAuth()

    // Listen for auth state changes - SINGLE LISTENER
    const { data: { subscription } } = onAuthStateChange((authState: AuthState) => {
      console.log('Auth state change:', {
        event: 'AUTH_STATE_CHANGE',
        hasUser: !!authState.user,
        loading: authState.loading
      })
      
      setUser(authState.user)
      setLoading(authState.loading)
      setAuthLoading(false)
      
      // Handle sign out
      if (!authState.user && !authState.loading) {
        clearSessionCache()
        router.push("/")
      }
    })

    return () => {
      subscription.unsubscribe()
      initialized.current = false
    }
  }, [router])

  return (
    <AuthContext.Provider value={{ user, loading, getToken, authLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
} 