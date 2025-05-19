import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

import type { NextRequest } from "next/server"

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get("code")
  const redirectTo = requestUrl.searchParams.get("redirect")

  console.error("=== AUTH CALLBACK ===")
  console.error("Code present:", code ? "yes" : "no")
  console.error("Redirect to (initial):", redirectTo)

  const cookieStore = cookies()
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore })

  if (code) {
    try {
      const { error } = await supabase.auth.exchangeCodeForSession(code)
      if (error) {
        console.error("Error exchanging code for session:", error)
        // It's important to redirect to an error page or login,
        // not try to proceed with fetching user status if session exchange failed.
        return NextResponse.redirect(`${requestUrl.origin}/login?error=auth_failed`)
      }
    } catch (error) {
      console.error("Critical error in auth exchange:", error)
      return NextResponse.redirect(`${requestUrl.origin}/login?error=auth_exchange_failed`)
    }
  }

  // After session is potentially established, get the user
  const { data: { user } } = await supabase.auth.getUser()

  if (user) {
    // If user exists, fetch their subscription status
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('subscription_status')
      .eq('id', user.id)
      .single()

    if (userError) {
      console.error("Error fetching user subscription status:", userError)
      // Decide on a default redirect or error display if status fetch fails
      // For now, let's proceed to default redirection logic below
    } else if (userData) {
      const status = userData.subscription_status as string
      console.error("User subscription status:", status)
      if (status === 'active' || status === 'trialing') {
        // If there was a specific redirect intended (e.g., from trying to access a protected page), honor it.
        // Otherwise, redirect to dashboard.
        const finalRedirect = redirectTo || '/dashboard'
        console.error(`Redirecting active/trialing user to: ${finalRedirect}`)
        return NextResponse.redirect(`${requestUrl.origin}${finalRedirect.startsWith('/') ? finalRedirect : '/' + finalRedirect}`)
      }
    }
  } else {
    // No user session after code exchange (or if no code was present and no session existed)
    console.error("No user session after auth callback processing.")
    // Fall through to default redirection, which might be /login or /pricing
  }

  // Default redirection if not handled above
  // This will apply if user is not active/trialing, or if user data couldn't be fetched
  // Or if there was a specific `redirectTo` that wasn't for active/trialing user initially.
  const finalDefaultRedirect = redirectTo || '/pricing'
  console.error(`Default redirection to: ${finalDefaultRedirect}`)
  return NextResponse.redirect(`${requestUrl.origin}${finalDefaultRedirect.startsWith('/') ? finalDefaultRedirect : '/' + finalDefaultRedirect}`)
}
