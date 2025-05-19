'use client'

import { useState, useEffect } from 'react'
import { AddBuddy } from '@/components/accountability/AddBuddy'
import { CreatePact } from '@/components/accountability/CreatePact'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { supabase } from '@/lib/supabase'
import type { AccountabilityBuddy, AccountabilityPact } from '@/lib/types/accountability'
import { useAuth } from '@/lib/auth-context'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

export default function AccountabilityPage() {
  const [buddies, setBuddies] = useState<AccountabilityBuddy[]>([])
  const [pacts, setPacts] = useState<AccountabilityPact[]>([])
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.push('/auth/login?redirectedFrom=/accountability')
      return
    }
    fetchData()
  }, [user, router])

  const fetchData = async () => {
    if (!user) return

    try {
      console.log('Fetching data for user:', user.id)
      
      // Fetch buddies
      const { data: buddiesData, error: buddiesError } = await supabase
        .from('accountability_buddies')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (buddiesError) {
        console.error('Error fetching buddies:', buddiesError)
        throw buddiesError
      }
      
      console.log('Buddies fetched:', buddiesData)
      setBuddies(buddiesData || [])

      // Fetch pacts
      const { data: pactsData, error: pactsError } = await supabase
        .from('accountability_pacts')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (pactsError) {
        console.error('Error fetching pacts:', pactsError)
        throw pactsError
      }
      
      console.log('Pacts fetched:', pactsData)
      setPacts(pactsData || [])
    } catch (error) {
      console.error('Error fetching data:', error)
      toast.error('Une erreur est survenue lors du chargement des données')
    } finally {
      setLoading(false)
    }
  }

  const handleBuddyAdded = (buddy: AccountabilityBuddy) => {
    setBuddies((prev) => [buddy, ...prev])
    toast.success('Buddy ajouté avec succès')
  }

  const handlePactCreated = (pact: AccountabilityPact) => {
    setPacts((prev) => [pact, ...prev])
    toast.success('Pacte créé avec succès')
  }

  if (!user) {
    return null
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2">Chargement...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Accountability</h1>

      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <Tabs defaultValue="buddy">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="buddy">Add Buddy</TabsTrigger>
              <TabsTrigger value="pact">Create Pact</TabsTrigger>
            </TabsList>
            <TabsContent value="buddy">
              <AddBuddy onBuddyAdded={handleBuddyAdded} />
            </TabsContent>
            <TabsContent value="pact">
              <CreatePact buddies={buddies} onPactCreated={handlePactCreated} />
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Your Buddies</CardTitle>
            </CardHeader>
            <CardContent>
              {buddies.length === 0 ? (
                <p className="text-gray-500">No buddies yet.</p>
              ) : (
                <ul className="space-y-4">
                  {buddies.map((buddy) => (
                    <li key={buddy.id} className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">{buddy.buddyName}</p>
                        <p className="text-sm text-gray-500">{buddy.buddyEmail}</p>
                      </div>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          buddy.status === 'accepted'
                            ? 'bg-green-100 text-green-800'
                            : buddy.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {buddy.status}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Active Pacts</CardTitle>
            </CardHeader>
            <CardContent>
              {pacts.length === 0 ? (
                <p className="text-gray-500">No active pacts.</p>
              ) : (
                <ul className="space-y-4">
                  {pacts.map((pact) => (
                    <li key={pact.id} className="space-y-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">{pact.title}</p>
                          <p className="text-sm text-gray-500">{pact.description}</p>
                        </div>
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            pact.status === 'completed'
                              ? 'bg-green-100 text-green-800'
                              : pact.status === 'active'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {pact.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500">
                        Due: {new Date(pact.deadline).toLocaleDateString()}
                      </p>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 