import { isAuthenticated } from './auth'
import { getSupabaseClient } from './supabase/client'

export async function redirectToCheckout(priceId: string, isAnnual: boolean) {
  try {
    console.log('Checking authentication...')
    const authenticated = await isAuthenticated()
    console.log('Authentication status:', authenticated)
    
    if (!authenticated) {
      console.log('User not authenticated, redirecting to login...')
      // Store the priceId and isAnnual in localStorage to use after login
      localStorage.setItem('stripe_checkout', JSON.stringify({ priceId, isAnnual }))
      // Redirect to login page
      window.location.href = '/login?redirect=/pricing'
      return
    }

    console.log('Creating checkout session...')
    const supabase = getSupabaseClient()
    const { data: { session } } = await supabase.auth.getSession()
    
    if (!session) {
      console.error('No active session found')
      return
    }
    
    const token = session.access_token
    console.log('Token length:', token?.length)
    console.log('Token format:', token?.substring(0, 20) + '...')
    
    const response = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        priceId,
        isAnnual,
      }),
    })

    console.log('Checkout session response:', response.status)
    const data = await response.json()
    console.log('Checkout session data:', data)

    if (data.url) {
      window.location.href = data.url
    } else if (data.error) {
      console.error('Error from checkout session:', data.error)
    }
  } catch (error) {
    console.error('Error redirecting to checkout:', error)
  }
} 

export async function redirectToCustomerPortal() {
  try {
    console.log('Checking authentication...')
    const authenticated = await isAuthenticated()
    console.log('Authentication status:', authenticated)
    
    if (!authenticated) {
      console.log('User not authenticated, redirecting to login...')
      window.location.href = '/login?redirect=/settings'
      return
    }

    // Get the user's session to obtain the access token
    const supabase = getSupabaseClient()
    const { data: { session } } = await supabase.auth.getSession()
    
    if (!session) {
      console.error('No active session found')
      return
    }
    
    const token = session.access_token
    console.log('Got access token for API request')

    console.log('Creating customer portal session...')
    const response = await fetch('/api/create-portal-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })

    console.log('Customer portal session response:', response.status)
    const data = await response.json()
    console.log('Customer portal session data:', data)

    if (data.url) {
      window.location.href = data.url
    } else if (data.error) {
      console.error('Error from customer portal session:', data.error)
    }
  } catch (error) {
    console.error('Error redirecting to customer portal:', error)
  }
} 