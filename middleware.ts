import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const session = request.cookies.get('session')
  const authToken = request.cookies.get('auth-token')
  const userInfo = request.cookies.get('user_info')
  
  // Protect dashboard and other authenticated routes
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    // Check if any of the authentication cookies exist
    if (!session && !authToken && !userInfo) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ]
} 