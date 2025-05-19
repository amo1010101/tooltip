"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Save, User, Mail, Lock, Bell, Shield, CreditCard } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { ResponsiveHeader } from "@/components/responsive-header"
import { getSupabaseClient } from "@/lib/supabase/client"
import { useToast } from "@/components/ui/use-toast"
import { redirectToCustomerPortal } from "@/lib/stripe"

export default function SettingsPage() {
  const router = useRouter()
  const { addToast } = useToast()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [subscription, setSubscription] = useState<any>(null)
  const [loadingPortal, setLoadingPortal] = useState(false)

  // Form states
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")

  useEffect(() => {
    async function getUser() {
      try {
        const supabase = getSupabaseClient()
        const {
          data: { session },
        } = await supabase.auth.getSession()

        if (session) {
          setUser(session.user)
          setEmail(session.user.email || "")
          setName(session.user.user_metadata?.full_name || "")

          // Récupérer les informations de souscription
          const { data: userData, error } = await supabase
            .from('users')
            .select('subscription_status, subscription_id, current_period_end, cancel_at_period_end, canceled_at')
            .eq('id', session.user.id)
            .single()

          if (error) throw error
          setSubscription(userData)
        }
      } catch (error) {
        console.error("Error fetching user:", error)
      } finally {
        setLoading(false)
      }
    }

    getUser()
  }, [])

  const handleSaveProfile = async () => {
    try {
      setSaving(true)
      const supabase = getSupabaseClient()

      const { error } = await supabase.auth.updateUser({
        data: { full_name: name },
      })

      if (error) throw error

      addToast({
        title: "Profile updated",
        description: "Your profile information has been updated successfully.",
      })
    } catch (error: any) {
      addToast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to update profile. Please try again.",
      })
    } finally {
      setSaving(false)
    }
  }

  const handleCustomerPortal = async () => {
    try {
      setLoadingPortal(true)
      await redirectToCustomerPortal()
    } catch (error: any) {
      addToast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to access customer portal. Please try again.",
      })
    } finally {
      setLoadingPortal(false)
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col">
        <ResponsiveHeader />
        <main className="flex-1 flex items-center justify-center">
          <div className="animate-pulse">Loading...</div>
        </main>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="flex min-h-screen flex-col">
        <ResponsiveHeader />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
            <p className="mb-6">Please log in to access your settings.</p>
            <Link href="/login">
              <Button className="bg-blue-600 hover:bg-blue-700">Login</Button>
            </Link>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <ResponsiveHeader />

      <main className="flex-1 bg-gradient-to-b from-white to-blue-50">
        <div className="container px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <Button variant="ghost" size="sm" asChild className="mb-2">
                <Link href="/dashboard">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  <span className="text-sm">Back to Dashboard</span>
                </Link>
              </Button>
              <h1 className="text-3xl font-bold tracking-tight">Account Settings</h1>
              <p className="text-muted-foreground">Manage your account preferences and settings</p>
            </div>
          </div>

          <Tabs defaultValue="profile" className="space-y-8">
            <TabsList className="w-full md:w-auto grid grid-cols-2 md:grid-cols-4 gap-2">
              <TabsTrigger value="profile" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>Profile</span>
              </TabsTrigger>
              <TabsTrigger value="notifications" className="flex items-center gap-2">
                <Bell className="h-4 w-4" />
                <span>Notifications</span>
              </TabsTrigger>
              <TabsTrigger value="security" className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                <span>Security</span>
              </TabsTrigger>
              <TabsTrigger value="billing" className="flex items-center gap-2">
                <CreditCard className="h-4 w-4" />
                <span>Billing</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>Update your account profile information and email address.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                          <Input
                            id="name"
                            placeholder="John Doe"
                            className="pl-10"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                          <Input id="email" placeholder="john@example.com" className="pl-10" value={email} disabled />
                        </div>
                        <p className="text-xs text-muted-foreground">To change your email, please contact support.</p>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex justify-end">
                    <Button onClick={handleSaveProfile} disabled={saving}>
                      {saving ? (
                        <>
                          <div className="h-4 w-4 border-2 border-t-transparent border-white rounded-full animate-spin mr-2"></div>
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save className="mr-2 h-4 w-4" />
                          Save Changes
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notifications">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                  <CardDescription>Manage how and when you receive notifications.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Email Notifications</h3>
                        <p className="text-sm text-muted-foreground">Receive email notifications about your account.</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">New Report Alerts</h3>
                        <p className="text-sm text-muted-foreground">Get notified when new reports are available.</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Marketing Communications</h3>
                        <p className="text-sm text-muted-foreground">Receive updates about new features and offers.</p>
                      </div>
                      <Switch />
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button>
                      <Save className="mr-2 h-4 w-4" />
                      Save Preferences
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="security">
              <Card>
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                  <CardDescription>Manage your password and security preferences.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="current-password">Current Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                        <Input id="current-password" type="password" className="pl-10" />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="new-password">New Password</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                          <Input id="new-password" type="password" className="pl-10" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirm-password">Confirm New Password</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                          <Input id="confirm-password" type="password" className="pl-10" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex justify-end">
                    <Button>
                      <Save className="mr-2 h-4 w-4" />
                      Update Password
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="billing">
              <Card>
                <CardHeader>
                  <CardTitle>Billing Information</CardTitle>
                  <CardDescription>Manage your subscription and payment methods.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="bg-muted p-4 rounded-lg">
                      <h3 className="font-medium mb-2">Current Plan</h3>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-lg font-bold">
                            {subscription?.subscription_status === 'active'
                              ? 'Premium Plan'
                              : subscription?.subscription_status === 'trialing'
                              ? 'Premium Plan (Trialing)'
                              : 'Free Plan'}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {(subscription?.subscription_status === 'active' || subscription?.subscription_status === 'trialing')
                              ? 'Full access to all market reports'
                              : 'Basic access to market reports'}
                          </p>
                          {(subscription?.subscription_status === 'active' || subscription?.subscription_status === 'trialing') && subscription?.current_period_end && (
                            <p className="text-sm text-muted-foreground mt-1">
                              {subscription.cancel_at_period_end ? (
                                <>
                                  <span className="text-yellow-500 font-medium">Subscription scheduled to cancel. </span>
                                  Access valid until: {new Date(subscription.current_period_end).toLocaleDateString()}.
                                  {subscription.canceled_at && (
                                    <> Cancellation requested on: {new Date(subscription.canceled_at).toLocaleDateString()}.</>
                                  )}
                                </>
                              ) : (
                                <>Next billing date: {new Date(subscription.current_period_end).toLocaleDateString()}</>
                              )}
                            </p>
                          )}
                        </div>
                        {(subscription?.subscription_status === 'active' || subscription?.subscription_status === 'trialing') ? (
                          <Button
                            variant="outline"
                            onClick={handleCustomerPortal}
                            disabled={loadingPortal}
                          >
                            {loadingPortal ? (
                              <>
                                <div className="h-4 w-4 border-2 border-t-transparent border-current rounded-full animate-spin mr-2"></div>
                                Loading...
                              </>
                            ) : (
                              <>
                                <CreditCard className="mr-2 h-4 w-4" />
                                Manage Subscription
                              </>
                            )}
                          </Button>
                        ) : (
                          <Button variant="outline" asChild>
                            <Link href="/pricing">Upgrade</Link>
                          </Button>
                        )}
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="font-medium mb-2">Payment Methods</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        {(subscription?.subscription_status === 'active' || subscription?.subscription_status === 'trialing')
                          ? 'Manage your payment methods in the customer portal.'
                          : 'No payment methods added yet.'}
                      </p>
                      {(subscription?.subscription_status === 'active' || subscription?.subscription_status === 'trialing') ? (
                        <Button variant="outline" onClick={handleCustomerPortal} disabled={loadingPortal}>
                          {loadingPortal ? (
                            <>
                              <div className="h-4 w-4 border-2 border-t-transparent border-current rounded-full animate-spin mr-2"></div>
                              Loading...
                            </>
                          ) : (
                            <>
                              <CreditCard className="mr-2 h-4 w-4" />
                              Manage Payment Methods
                            </>
                          )}
                        </Button>
                      ) : (
                        <Button variant="outline" asChild>
                          <Link href="/pricing">
                            <CreditCard className="mr-2 h-4 w-4" />
                            Add Payment Method
                          </Link>
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
