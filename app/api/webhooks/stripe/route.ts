import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { getSupabaseAdminClient } from '@/lib/supabase/client'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-03-31.basil',
})

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(req: Request) {
  try {
    console.log('[STRIPE WEBHOOK] Received webhook request')
    const body = await req.text()
    const signature = req.headers.get('stripe-signature')

    if (!signature) {
      console.error('[STRIPE WEBHOOK] Missing stripe-signature header')
      return NextResponse.json(
        { error: 'Missing stripe-signature header' },
        { status: 400 }
      )
    }

    console.log('[STRIPE WEBHOOK] Constructing event with signature', signature.substring(0, 20) + '...')
    const event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
    console.log('[STRIPE WEBHOOK] Event constructed successfully', { type: event.type, id: event.id })
    
    // Log more details about the Supabase client initialization
    console.log('[STRIPE WEBHOOK] Initializing Supabase admin client')
    const supabase = getSupabaseAdminClient()
    console.log('[STRIPE WEBHOOK] Supabase admin client initialized with URL:', process.env.NEXT_PUBLIC_SUPABASE_URL)

    // Immediately check for existing users to verify connection works
    const { data: userCheck, error: userCheckError } = await supabase
      .from('users')
      .select('count')
      .limit(1)

    console.log('[STRIPE WEBHOOK] Supabase connection check:', { 
      success: !userCheckError, 
      data: userCheck, 
      error: userCheckError 
    })

    switch (event.type) {
      case 'checkout.session.completed': {
        console.log('[STRIPE WEBHOOK] Processing checkout.session.completed')
        const session = event.data.object as Stripe.Checkout.Session
        console.log('[STRIPE WEBHOOK] Session data', { 
          id: session.id,
          customer: session.customer,
          subscription: session.subscription,
          metadata: session.metadata 
        })
        
        if (!session.metadata?.supabase_user_id) {
          console.error('[STRIPE WEBHOOK] No supabase_user_id in session metadata')
          throw new Error('No supabase_user_id in session metadata')
        }

        // Check if user exists before updating
        const { data: existingUser, error: getUserError } = await supabase
          .from('users')
          .select('*')
          .eq('id', session.metadata.supabase_user_id)
          .single()
        
        console.log('[STRIPE WEBHOOK] Existing user check', { 
          found: !!existingUser,
          hasStripeCustomerId: existingUser?.stripe_customer_id ? true : false,
          user: existingUser, 
          error: getUserError,
          userId: session.metadata.supabase_user_id 
        })

        console.log('[STRIPE WEBHOOK] Retrieving subscription', session.subscription)
        const subscription = await stripe.subscriptions.retrieve(session.subscription as string)
        console.log('[STRIPE WEBHOOK] Subscription retrieved', { 
          id: subscription.id, 
          status: subscription.status,
          customer: subscription.customer,
          items: subscription.items.data.map(item => ({
            id: item.id,
            plan: item.plan ? {
              id: item.plan.id,
              product: item.plan.product,
              amount: item.plan.amount
            } : null
          }))
        })
        
        const currentPeriodEnd = (subscription as any).current_period_end || Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60 // Default to 30 days from now
        console.log('[STRIPE WEBHOOK] Current period end', new Date(currentPeriodEnd * 1000).toISOString())

        // Update user subscription status
        console.log('[STRIPE WEBHOOK] Updating user', session.metadata.supabase_user_id)
        
        const updateData = {
          stripe_customer_id: session.customer as string,
          subscription_status: subscription.status,
          subscription_id: subscription.id,
          current_period_end: new Date(currentPeriodEnd * 1000).toISOString(),
          cancel_at_period_end: subscription.cancel_at_period_end || false,
          canceled_at: subscription.canceled_at ? new Date(subscription.canceled_at * 1000).toISOString() : null,
          cancellation_feedback: subscription.cancellation_details?.feedback || null
        }
        
        console.log('[STRIPE WEBHOOK] Update data:', updateData)
        
        // Debug raw query
        console.log('[STRIPE WEBHOOK] Raw SQL equivalent:', 
          `UPDATE users SET 
          stripe_customer_id = '${session.customer}', 
          subscription_status = '${subscription.status}', 
          subscription_id = '${subscription.id}', 
          current_period_end = '${new Date(currentPeriodEnd * 1000).toISOString()}'
          WHERE id = '${session.metadata.supabase_user_id}'`
        )
        
        const { data, error } = await supabase
          .from('users')
          .update(updateData)
          .eq('id', session.metadata.supabase_user_id)
          .select()
        
        if (error) {
          console.error('[STRIPE WEBHOOK] Error updating user', {
            errorMessage: error.message,
            errorDetails: error.details,
            errorCode: error.code,
            errorHint: error.hint,
            fullError: JSON.stringify(error)
          })
          
          // Log the table structure to verify column names
          const { data: tableInfo, error: tableError } = await supabase
            .from('users')
            .select('*')
            .limit(1)
          
          console.log('[STRIPE WEBHOOK] Table info check:', { 
            columns: tableInfo && tableInfo.length > 0 ? Object.keys(tableInfo[0] || {}) : [],
            data: tableInfo,
            error: tableError ? {
              message: tableError.message,
              details: tableError.details,
              code: tableError.code
            } : null
          })
          
          // Try an alternative approach - insert if not exists with upsert
          console.log('[STRIPE WEBHOOK] Trying upsert as alternative')
          const { data: upsertData, error: upsertError } = await supabase
            .from('users')
            .upsert({
              id: session.metadata.supabase_user_id,
              ...updateData
            })
            .select()
            
          console.log('[STRIPE WEBHOOK] Upsert result:', { 
            data: upsertData, 
            error: upsertError ? {
              message: upsertError.message,
              details: upsertError.details,
              code: upsertError.code,
              hint: upsertError.hint
            } : null
          })
        } else {
          console.log('[STRIPE WEBHOOK] User updated successfully', data)
          
          // Verify update by retrieving user again
          const { data: verifyUser, error: verifyError } = await supabase
            .from('users')
            .select('*')
            .eq('id', session.metadata.supabase_user_id)
            .single()
          
          console.log('[STRIPE WEBHOOK] Verify update result:', { 
            updated: verifyUser, 
            error: verifyError,
            hasCustomerId: verifyUser?.stripe_customer_id === session.customer,
            hasSubscriptionStatus: verifyUser?.subscription_status === subscription.status
          })
        }

        break
      }

      case 'customer.subscription.updated':
      case 'customer.subscription.deleted': {
        console.log(`[STRIPE WEBHOOK] Processing ${event.type}`)
        const subscription = event.data.object as Stripe.Subscription
        console.log('[STRIPE WEBHOOK] Subscription data', { 
          id: subscription.id, 
          status: subscription.status,
          customer: subscription.customer,
          cancel_at_period_end: subscription.cancel_at_period_end,
          canceled_at: subscription.canceled_at ? new Date(subscription.canceled_at * 1000).toISOString() : null,
          cancellation_feedback: subscription.cancellation_details?.feedback || null
        })
        
        // Check if user exists with this customer ID
        const { data: existingUser, error: getUserError } = await supabase
          .from('users')
          .select('*')
          .eq('stripe_customer_id', subscription.customer as string)
          .single()
        
        console.log('[STRIPE WEBHOOK] Existing user with customer ID check', { 
          user: existingUser, 
          error: getUserError,
          customerId: subscription.customer 
        })
        
        const currentPeriodEnd = (subscription as any).current_period_end || Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60 // Default to 30 days from now
        console.log('[STRIPE WEBHOOK] Current period end', new Date(currentPeriodEnd * 1000).toISOString())

        // Update user subscription status
        console.log('[STRIPE WEBHOOK] Updating user with stripe_customer_id', subscription.customer)
        
        const updateData = {
          subscription_status: subscription.status,
          subscription_id: subscription.id,
          current_period_end: new Date(currentPeriodEnd * 1000).toISOString(),
          cancel_at_period_end: subscription.cancel_at_period_end || false,
          canceled_at: subscription.canceled_at ? new Date(subscription.canceled_at * 1000).toISOString() : null,
          cancellation_feedback: subscription.cancellation_details?.feedback || null
        }
        
        console.log('[STRIPE WEBHOOK] Update data:', updateData)
        
        const { data, error } = await supabase
          .from('users')
          .update(updateData)
          .eq('stripe_customer_id', subscription.customer as string)
          .select()
        
        if (error) {
          console.error('[STRIPE WEBHOOK] Error updating user', error)
          
          // If no rows were updated, try to find the user by subscription_id as a fallback
          console.log('[STRIPE WEBHOOK] Trying fallback update by subscription_id')
          const { data: fallbackData, error: fallbackError } = await supabase
            .from('users')
            .update(updateData)
            .eq('subscription_id', subscription.id)
            .select()
          
          console.log('[STRIPE WEBHOOK] Fallback update result:', { 
            data: fallbackData, 
            error: fallbackError 
          })
        } else {
          console.log('[STRIPE WEBHOOK] User updated successfully', data)
          console.log('[STRIPE WEBHOOK] Rows affected:', data?.length || 0)
        }

        break
      }
    }

    console.log('[STRIPE WEBHOOK] Webhook processed successfully')
    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('[STRIPE WEBHOOK] Error processing webhook:', error)
    return NextResponse.json(
      { error: 'Error processing webhook' },
      { status: 500 }
    )
  }
} 