import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createClient } from '@supabase/supabase-js'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-03-31.basil',
})

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export async function POST(request: Request) {
  try {
    console.log('Creating customer portal session...')
    
    // Get the Authorization header
    const authHeader = request.headers.get('Authorization')
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.error('No valid Authorization header')
      return NextResponse.json(
        { error: 'No valid Authorization header' },
        { status: 401 }
      )
    }
    
    // Extract the token
    const token = authHeader.substring(7) // Remove 'Bearer ' prefix
    console.log('Got auth token from header')
    
    // Create a Supabase client using the token
    const supabase = createClient(supabaseUrl, supabaseKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
      global: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    })
    
    console.log('Getting user...')
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    
    if (userError) {
      console.error('User error:', userError)
      return NextResponse.json(
        { error: 'Authorization error' },
        { status: 401 }
      )
    }

    if (!user) {
      console.error('No user found')
      return NextResponse.json(
        { error: 'User not found' },
        { status: 401 }
      )
    }

    console.log('User authenticated:', user.id)

    // Get the user's stripe_customer_id from the users table
    const { data: userData, error: profileError } = await supabase
      .from('users')
      .select('stripe_customer_id')
      .eq('id', user.id)
      .single()

    if (profileError || !userData || !userData.stripe_customer_id) {
      console.error('No Stripe customer ID found for user')
      return NextResponse.json(
        { error: 'No subscription found' },
        { status: 400 }
      )
    }

    // Create a customer portal session
    const portalSession = await stripe.billingPortal.sessions.create({
      customer: userData.stripe_customer_id,
      return_url: `${process.env.NEXT_PUBLIC_APP_URL}/settings`,
    })

    console.log('Customer portal session created successfully')
    return NextResponse.json({ url: portalSession.url })
  } catch (error) {
    console.error('Error creating customer portal session:', error)
    return NextResponse.json(
      { error: 'Error creating customer portal session' },
      { status: 500 }
    )
  }
} 