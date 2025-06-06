/**
 * Centralized Authentication Utility
 * Industry standard implementation with proper session management
 */

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import type { User, Session } from '@supabase/supabase-js'
import type { Database } from '@/types/supabase'

// Singleton pattern for client
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
const SESSION_CACHE_TTL = 5 * 60 * 1000 // 5 minutes

/**
 * Get current session with intelligent caching
 * Industry standard: Minimize API calls, implement proper caching
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
      // Clear cache on error
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
 * Industry standard: Implement exponential backoff and token refresh
 */
export async function getAuthToken(): Promise<string | null> {
  const MAX_RETRY_ATTEMPTS = 3
  const RETRY_DELAY = 1000 // 1 second base delay
  
  for (let attempt = 1; attempt <= MAX_RETRY_ATTEMPTS; attempt++) {
    try {
      // First, try to get current session
      let session = await getCurrentSession()
      
      // If no session or token is expired, try refresh
      if (!session || isTokenExpiringSoon(session)) {
        console.log(`Attempt ${attempt}: Refreshing session...`)
        session = await refreshSession()
      }
      
      if (session?.access_token) {
        return session.access_token
      }
      
      // If we still don't have a token, wait and retry
      if (attempt < MAX_RETRY_ATTEMPTS) {
        const delay = RETRY_DELAY * Math.pow(2, attempt - 1) // Exponential backoff
        await new Promise(resolve => setTimeout(resolve, delay))
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
      // Clear cache on refresh failure
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
 * Auth event listener for real-time updates
 */
export function onAuthStateChange(callback: (authState: AuthState) => void) {
  const supabase = getSupabaseClient()
  
  return supabase.auth.onAuthStateChange(async (event, session) => {
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
} 