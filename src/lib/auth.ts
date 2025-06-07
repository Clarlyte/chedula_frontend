/**
 * Centralized Authentication Utility
 * Single source of truth for all Supabase authentication
 */

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import type { User, Session } from '@supabase/supabase-js'
import type { Database } from '@/types/supabase'

// SINGLE Supabase client instance - this is the only one that should exist
let supabaseClient: ReturnType<typeof createClientComponentClient<Database>> | null = null

export function getSupabaseClient() {
  if (!supabaseClient) {
    supabaseClient = createClientComponentClient<Database>()
  }
  return supabaseClient
}

// Session cache with proper invalidation
interface SessionCache {
  session: Session | null
  timestamp: number
  ttl: number
}

let sessionCache: SessionCache | null = null
const SESSION_CACHE_TTL = 2 * 60 * 1000 // 2 minutes (reduced from 5)

/**
 * Get current session with intelligent caching
 */
export async function getCurrentSession(): Promise<Session | null> {
  const supabase = getSupabaseClient()
  
  // Check cache first
  if (sessionCache && (Date.now() - sessionCache.timestamp) < sessionCache.ttl) {
    return sessionCache.session
  }
  
  try {
    // Try to get session from Supabase
    const { data: { session }, error } = await supabase.auth.getSession()
    
    if (error) {
      console.warn('Session retrieval error:', error)
      sessionCache = null
      return null
    }
    
    // Update cache
    sessionCache = {
      session,
      timestamp: Date.now(),
      ttl: SESSION_CACHE_TTL
    }
    
    return session
  } catch (error) {
    console.error('Failed to get session:', error)
    sessionCache = null
    return null
  }
}

/**
 * Get authentication token with retry logic
 */
export async function getAuthToken(): Promise<string | null> {
  const MAX_RETRY_ATTEMPTS = 2 // Reduced from 3
  const RETRY_DELAY = 500 // Reduced from 1000
  
  for (let attempt = 1; attempt <= MAX_RETRY_ATTEMPTS; attempt++) {
    try {
      let session = await getCurrentSession()
      
      // If no session or token is expired, try refresh
      if (!session || isTokenExpiringSoon(session)) {
        session = await refreshSession()
      }
      
      if (session?.access_token) {
        return session.access_token
      }
      
      // If we still don't have a token, wait and retry
      if (attempt < MAX_RETRY_ATTEMPTS) {
        await new Promise(resolve => setTimeout(resolve, RETRY_DELAY))
      }
      
    } catch (error) {
      console.error(`Token retrieval attempt ${attempt} failed:`, error)
      
      if (attempt === MAX_RETRY_ATTEMPTS) {
        return null
      }
    }
  }
  
  return null
}

/**
 * Refresh session with proper error handling
 */
async function refreshSession(): Promise<Session | null> {
  const supabase = getSupabaseClient()
  
  try {
    const { data: { session }, error } = await supabase.auth.refreshSession()
    
    if (error) {
      console.warn('Session refresh failed:', error.message)
      sessionCache = null
      return null
    }
    
    // Update cache with new session
    if (session) {
      sessionCache = {
        session,
        timestamp: Date.now(),
        ttl: SESSION_CACHE_TTL
      }
    }
    
    return session
  } catch (error) {
    console.error('Session refresh error:', error)
    sessionCache = null
    return null
  }
}

/**
 * Check if token is expiring soon (within 5 minutes)
 */
function isTokenExpiringSoon(session: Session): boolean {
  if (!session.expires_at) return false
  
  const expiryTime = session.expires_at * 1000 // Convert to milliseconds
  const now = Date.now()
  const fiveMinutes = 5 * 60 * 1000
  
  return (expiryTime - now) < fiveMinutes
}

/**
 * Clear session cache (call on logout)
 */
export function clearSessionCache(): void {
  sessionCache = null
}

/**
 * Get current user with caching
 */
export async function getCurrentUser(): Promise<User | null> {
  const session = await getCurrentSession()
  return session?.user ?? null
}

/**
 * Check if user is authenticated
 */
export async function isAuthenticated(): Promise<boolean> {
  const session = await getCurrentSession()
  return !!session?.user
}

/**
 * Industry standard auth state management
 */
export interface AuthState {
  user: User | null
  session: Session | null
  loading: boolean
  error: string | null
}

/**
 * Auth event listener for real-time updates - SINGLE LISTENER
 */
let authSubscription: any = null

export function onAuthStateChange(callback: (authState: AuthState) => void) {
  const supabase = getSupabaseClient()
  
  // Remove existing listener to prevent duplicates
  if (authSubscription) {
    authSubscription.unsubscribe()
  }
  
  const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
    // Update cache
    if (session) {
      sessionCache = {
        session,
        timestamp: Date.now(),
        ttl: SESSION_CACHE_TTL
      }
    } else {
      sessionCache = null
    }
    
    // Call callback with new state
    callback({
      user: session?.user ?? null,
      session,
      loading: false,
      error: null
    })
  })
  
  // Store the subscription for cleanup
  authSubscription = subscription
  
  return { data: { subscription } }
}

// Authentication helper functions - consolidated
export const authHelpers = {
  // Sign up with email and password
  signUp: async (email: string, password: string, metadata?: any) => {
    const supabase = getSupabaseClient()
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: metadata,
      },
    })
    return { data, error }
  },

  // Sign in with email and password
  signIn: async (email: string, password: string) => {
    const supabase = getSupabaseClient()
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    return { data, error }
  },

  // Sign out
  signOut: async () => {
    const supabase = getSupabaseClient()
    clearSessionCache()
    const { error } = await supabase.auth.signOut()
    return { error }
  },

  // Reset password
  resetPassword: async (email: string) => {
    const supabase = getSupabaseClient()
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    })
    return { data, error }
  },

  // Update password
  updatePassword: async (password: string) => {
    const supabase = getSupabaseClient()
    const { data, error } = await supabase.auth.updateUser({
      password,
    })
    return { data, error }
  },

  // Get current session
  getSession: async () => {
    const session = await getCurrentSession()
    return { session, error: null }
  },
} 