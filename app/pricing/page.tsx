"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import { BarChart2, Check, ArrowRight, Zap, Users, Briefcase, UserCheck, FileText, X } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { ResponsiveHeader } from "@/components/responsive-header"
import { Badge } from "@/components/ui/badge"
import { getSupabaseClient } from "@/lib/supabase/client"

export default function PricingPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { addToast } = useToast()
  const [isAnnual, setIsAnnual] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [currentPlan, setCurrentPlan] = useState<string | null>(null)
  const [subscriptionStatus, setSubscriptionStatus] = useState<string | null>(null)

  useEffect(() => {
    async function checkAuthAndSubscription() {
      try {
        const supabase = getSupabaseClient()
        const { data: { session } } = await supabase.auth.getSession()
        setIsLoggedIn(!!session)

        if (session) {
          const { data: userData, error } = await supabase
            .from('users')
            .select('subscription_status')
            .eq('id', session.user.id)
            .single()

          if (!error && userData) {
            const status = userData.subscription_status as string
            setSubscriptionStatus(status)
            // Si l'utilisateur a un abonnement actif ou en essai, rediriger vers le dashboard
            if (status === 'active' || status === 'trialing') {
              router.push('/dashboard')
            }
          }
        }
      } catch (error) {
        console.error('Error checking auth status:', error)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuthAndSubscription()
  }, [router])

  const handleUpgrade = async (plan: 'pro' | 'enterprise') => {
    if (!isLoggedIn) {
      router.push('/login?redirect=/pricing')
      return
    }

    try {
      setIsLoading(true)
      let priceId: string
      
      if (plan === 'pro') {
        priceId = isAnnual ? 'price_1ROKyqLgOG3WtKuUU8VT4BsJ' : 'price_1ROKvcLgOG3WtKuUrmTKrIIX'
      } else {
        priceId = isAnnual ? 'price_1ROKx9LgOG3WtKuUnAXbJ00p' : 'price_1ROKwZLgOG3WtKuUIQ2CGLCu'
      }
      
      // Get authentication token from Supabase
      const supabase = getSupabaseClient()
      const { data: { session } } = await supabase.auth.getSession()
      const token = session?.access_token
      
      if (!token) {
        throw new Error('Authentication token is missing')
      }
      
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

      const data = await response.json()
      
      if (data.url) {
        window.location.href = data.url
      } else {
        throw new Error(data.error || 'Failed to create checkout session')
      }
    } catch (error) {
      console.error('Error creating checkout session:', error)
      addToast({
        title: 'Error',
        description: 'Failed to create checkout session. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleEnterpriseContact = () => {
    router.push('/contact')
  }

  const plans = [
    {
      name: "Free",
      price: isAnnual ? "0" : "0",
      description: "Perfect for getting started",
      features: [
        "Basic market reports",
        "Limited report generation",
        "Community support",
        "Basic analytics",
      ],
      buttonText: isLoggedIn ? "Your Current Plan" : "Get Started",
      buttonVariant: "outline" as const,
      href: isLoggedIn ? "#" : "/login?redirect=pricing",
      isCurrentPlan: currentPlan === 'free',
      disabled: currentPlan === 'free',
    },
    {
      name: "Pro",
      price: isAnnual ? "990" : "99",
      description: "For professionals and small teams",
      features: [
        "Unlimited market reports",
        "Advanced report generation",
        "Priority support",
        "Advanced analytics",
        "Custom report templates",
        "API access",
      ],
      buttonText: isLoggedIn ? (currentPlan === 'active' ? "Your Current Plan" : "Start 7-day free trial") : "Start 7-day free trial",
      buttonVariant: "default" as const,
      onClick: () => handleUpgrade('pro'),
      isCurrentPlan: currentPlan === 'active',
      disabled: currentPlan === 'active',
      popular: true,
    },
    {
      name: "Enterprise",
      price: isAnnual ? "4990" : "499",
      description: "For large organizations",
      features: [
        "Everything in Pro",
        "Dedicated account manager",
        "Custom integrations",
        "SLA guarantee",
        "Team management",
        "Advanced security",
      ],
      buttonText: isLoggedIn ? (currentPlan === 'enterprise' ? "Your Current Plan" : "Start 7-day free trial") : "Contact Sales",
      buttonVariant: "outline" as const,
      onClick: () => isLoggedIn ? handleUpgrade('enterprise') : handleEnterpriseContact,
      isCurrentPlan: currentPlan === 'enterprise',
      disabled: currentPlan === 'enterprise',
    },
  ]

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col">
        <ResponsiveHeader />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">Loading...</div>
        </main>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <ResponsiveHeader />

      <main className="flex-1">
        <div className="container px-4 py-16">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Simple, transparent pricing</h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Choose the plan that's right for you. All plans include a 7-day free trial.
            </p>
          </div>

          <div className="mt-12 flex justify-center">
            <div className="flex items-center gap-4">
              <span className={!isAnnual ? "font-medium" : "text-muted-foreground"}>Monthly</span>
              <Switch checked={isAnnual} onCheckedChange={setIsAnnual} />
              <span className={isAnnual ? "font-medium" : "text-muted-foreground"}>Annual</span>
              <Badge variant="secondary" className="ml-2">
                Save 20%
              </Badge>
            </div>
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-3">
            {plans.map((plan) => (
              <motion.div
                key={plan.name}
                whileHover={!plan.disabled ? { scale: 1.02 } : undefined}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Card className={`${plan.popular ? "border-primary" : ""} ${plan.isCurrentPlan ? "ring-2 ring-primary" : ""} ${plan.disabled ? "opacity-75" : ""}`}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>{plan.name}</span>
                      {plan.popular && (
                        <Badge variant="default" className="ml-2">
                          Popular
                        </Badge>
                      )}
                      {plan.isCurrentPlan && (
                        <Badge variant="secondary" className="ml-2">
                          Current Plan
                        </Badge>
                      )}
                    </CardTitle>
                    <CardDescription>{plan.description}</CardDescription>
                    <div className="mt-4">
                      <span className="text-4xl font-bold">${plan.price}</span>
                      <span className="text-muted-foreground">/{isAnnual ? "year" : "month"}</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-4">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-green-500" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    {plan.onClick ? (
                      <Button 
                        className="w-full" 
                        variant={plan.buttonVariant} 
                        onClick={plan.onClick}
                        disabled={plan.disabled}
                      >
                        {plan.buttonText}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    ) : (
                      <Button 
                        className="w-full" 
                        variant={plan.buttonVariant} 
                        asChild
                        disabled={plan.disabled}
                      >
                        <Link href={plan.href}>
                          {plan.buttonText}
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <h2 className="text-2xl font-bold">Frequently asked questions</h2>
            <div className="mt-8 grid gap-8 md:grid-cols-2">
              <div className="rounded-lg border p-6">
                <h3 className="font-medium">What happens after my trial?</h3>
                <p className="mt-2 text-muted-foreground">
                  After your 7-day trial, you'll be automatically subscribed to the plan you selected. You can cancel
                  anytime.
                </p>
              </div>
              <div className="rounded-lg border p-6">
                <h3 className="font-medium">Can I change plans later?</h3>
                <p className="mt-2 text-muted-foreground">
                  Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing
                  cycle.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
