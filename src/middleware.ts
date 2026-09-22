import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createServerClient } from '@supabase/ssr'

// Multi-tenant role isolation middleware.
// Intercepts requests to /portal/* routes, validates the user's role
// array against Supabase, and blocks access if they lack the required role.

const ROLE_ROUTES: Record<string, string> = {
  '/portal/admin': 'admin',
  '/portal/groomer': 'groomer',
  '/portal/grooming': 'grooming_customer',
  '/portal/shop': 'shop_customer',
  '/portal/learner': 'learner',
}

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: { headers: request.headers },
  })

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey) {
    return response
  }

  const supabase = createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      getAll() { return request.cookies.getAll() },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) => request.cookies.set({ name, value, ...options }))
        response = NextResponse.next({ request })
        cookiesToSet.forEach(({ name, value, options }) => response.cookies.set({ name, value, ...options }))
      },
    },
  })

  const { data: { user } } = await supabase.auth.getUser()
  const pathname = request.nextUrl.pathname

  const matchedPrefix = Object.keys(ROLE_ROUTES).find(prefix => pathname.startsWith(prefix))

  if (matchedPrefix) {
    if (!user) {
      return NextResponse.redirect(new URL('/login', request.url))
    }

    const requiredRole = ROLE_ROUTES[matchedPrefix]

    const { data: rolesData } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', user.id)

    const userRoles = rolesData?.map(r => r.role) || []

    if (!userRoles.includes(requiredRole)) {
      return NextResponse.redirect(new URL('/portal/unauthorized', request.url))
    }
  }

  return response
}

export const config = {
  matcher: ['/portal/:path*'],
}
