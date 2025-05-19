import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  
  // Get the current path
  const { pathname } = req.nextUrl

  // Skip middleware for public routes
  if (pathname.startsWith('/auth') || 
      pathname.startsWith('/_next') || 
      pathname.startsWith('/static') || 
      pathname.startsWith('/_vercel') || 
      pathname === '/favicon.ico' || 
      pathname === '/robots.txt' ||
      pathname === '/api/complete-onboarding') {
    return res
  }

  // Get onboarding status from cookies
  const onboardingCompleted = req.cookies.get('onboarding_completed')?.value === 'true'

  // If onboarding is not completed and user is not on onboarding pages
  if (!onboardingCompleted && !pathname.startsWith('/onboarding')) {
    return NextResponse.redirect(new URL('/onboarding', req.url))
  }

  // If onboarding is completed and user tries to access onboarding pages
  if (onboardingCompleted && pathname.startsWith('/onboarding')) {
    return NextResponse.redirect(new URL('/', req.url))
  }

  return res
}

export const config = {
  matcher: [
    '/profile/:path*',
    '/pillar/:path*',
    '/learning/:path*',
    '/tracking/:path*',
    '/accountability/:path*',
    '/summary/:path*',
    '/diagnostic/:path*',
    '/((?!auth|api/complete-onboarding|_next|static|_vercel|favicon.ico|robots.txt).*)',
  ],
} 