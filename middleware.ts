import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verifyToken } from './lib/auth'

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // Only protect admin routes
  if (pathname.startsWith('/admin')) {
    // Allow the login page (and any explicit public admin pages)
    const PUBLIC_PATHS = ['/admin/login']
    if (PUBLIC_PATHS.includes(pathname)) {
      const token = req.cookies.get('token')?.value
      if (token && await verifyToken(token)) {
        return NextResponse.redirect(new URL('/admin', req.url))
      }
      return NextResponse.next()
    }

    const token = req.cookies.get('token')?.value
    const payload = await verifyToken(token)
    if (!payload) {
      const url = req.nextUrl.clone()
      url.pathname = '/admin/login'
      url.searchParams.set('next', pathname)
      return NextResponse.redirect(url)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*']
}
