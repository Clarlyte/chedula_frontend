import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const res = NextResponse.next()
  const pathname = request.nextUrl.pathname

  try {
    // Create a Supabase client configured to use cookies
    const supabase = createMiddlewareClient({ req: request, res })

    // Get session and refresh if needed
    const { data: { session } } = await supabase.auth.getSession()
    
    // If no session, try to refresh
    if (!session) {
      await supabase.auth.refreshSession()
    }

    // Protected dashboard routes
    if (pathname.startsWith('/dashboard')) {
      if (!session) {
        // Redirect to login if no session
        const redirectUrl = new URL('/login', request.url)
        redirectUrl.searchParams.set('redirect', pathname)
        return NextResponse.redirect(redirectUrl)
      }
    }

    // Auth routes - redirect to dashboard if already logged in
    if (pathname === '/login' || pathname === '/signup') {
      if (session) {
        return NextResponse.redirect(new URL('/dashboard', request.url))
      }
    }

    // Onboarding route - check if user needs onboarding
    if (pathname === '/onboarding') {
      if (!session) {
        return NextResponse.redirect(new URL('/login', request.url))
      }
    }

    return res
  } catch (error) {
    // If middleware fails, let the request continue
    console.error('Middleware error:', error)
    return res
  }
}

export const config = {
  matcher: [
    // Only match specific paths, not static assets
    '/dashboard/:path*',
    '/login',
    '/signup', 
    '/onboarding'
  ],
} 