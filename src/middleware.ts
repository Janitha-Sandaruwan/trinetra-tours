import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from 'jose'

const getSecret = () =>
  new TextEncoder().encode(process.env.JWT_SECRET ?? 'dev-fallback-secret-32-bytes!!')

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Allow /admin/login through without a session
  if (pathname === '/admin/login') {
    return NextResponse.next()
  }

  const token = request.cookies.get('admin_session')?.value

  if (!token) {
    return NextResponse.redirect(new URL('/admin/login', request.url))
  }

  try {
    await jwtVerify(token, getSecret())
    return NextResponse.next()
  } catch {
    // Expired or invalid token — clear cookie and redirect
    const response = NextResponse.redirect(new URL('/admin/login', request.url))
    response.cookies.delete('admin_session')
    return response
  }
}

export const config = {
  matcher: ['/admin/:path*'],
}
