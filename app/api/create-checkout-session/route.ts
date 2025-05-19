import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-03-31.basil',
})

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export async function POST(request: Request) {
  try {
    console.log('Creating checkout session...')
    
    // Get the Authorization header
    const authHeader = request.headers.get('Authorization')
    console.log('Auth header received:', authHeader ? 'Present' : 'Missing')
    console.log('Auth header format:', authHeader?.substring(0, 20) + '...')
    
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

    // Get the price ID and billing period from the request body
    const { priceId, isAnnual } = await request.json()

    if (!priceId) {
      return NextResponse.json(
        { error: 'Price ID is required' },
        { status: 400 }
      )
    }

    const checkoutSession = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      subscription_data: {
        trial_period_days: 7,
      },
      success_url: `${request.headers.get('origin')}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${request.headers.get('origin')}/pricing`,
      metadata: {
        supabase_user_id: user.id
      }
    })

    if (!checkoutSession.url) {
      throw new Error('No checkout URL returned from Stripe')
    }

    console.log('Checkout session created successfully')
    return NextResponse.json({ url: checkoutSession.url })
  } catch (error) {
    console.error('Error creating checkout session:', error)
    return NextResponse.json(
      { error: 'Error creating checkout session' },
      { status: 500 }
    )
  }
} 