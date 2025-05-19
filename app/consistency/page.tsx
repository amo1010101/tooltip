'use client'

import { useState, useEffect } from 'react'
import { ConsistencyScore } from '@/components/consistency/ConsistencyScore'
import { AddPriority } from '@/components/consistency/AddPriority'
import { AddActivity } from '@/components/consistency/AddActivity'
import { WeeklyFeedback } from '@/components/consistency/WeeklyFeedback'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { supabase } from '@/lib/supabase'
import { calculateConsistencyScore, generateWeeklyFeedback } from '@/lib/services/consistency'
import type { Priority, Activity } from '@/lib/types/consistency'

export default function ConsistencyPage() {
  const [priorities, setPriorities] = useState<Priority[]>([])
  const [activities, setActivities] = useState<Activity[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const { data: user } = await supabase.auth.getUser()
      if (!user.user) throw new Error('No user found')

      // Fetch priorities
      const { data: prioritiesData, error: prioritiesError } = await supabase
        .from('priorities')
        .select('*')
        .eq('user_id', user.user.id)
        .order('created_at', { ascending: false })

      if (prioritiesError) throw prioritiesError
      setPriorities(prioritiesData)

      // Fetch activities
      const { data: activitiesData, error: activitiesError } = await supabase
        .from('activities')
        .select('*')
        .eq('user_id', user.user.id)
        .order('created_at', { ascending: false })

      if (activitiesError) throw activitiesError
      setActivities(activitiesData)

      // Calculate scores for the current week
      const now = new Date()
      const weekStart = new Date(now.setDate(now.getDate() - now.getDay()))
      const weekEnd = new Date(now.setDate(now.getDate() + 6))

      // Calculate scores for each priority
      for (const priority of prioritiesData) {
        await calculateConsistencyScore(
          user.user.id,
          priority.id,
          weekStart,
          weekEnd
        )
      }

      // Generate weekly feedback
      await generateWeeklyFeedback(user.user.id, weekStart, weekEnd)
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handlePriorityAdded = (priority: Priority) => {
    setPriorities((prev) => [priority, ...prev])
  }

  const handleActivityAdded = (activity: Activity) => {
    setActivities((prev) => [activity, ...prev])
    // Recalculate scores after adding an activity
    fetchData()
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Consistency Score</h1>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="space-y-8">
          <ConsistencyScore />
          <WeeklyFeedback />
        </div>

        <div>
          <Tabs defaultValue="priority">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="priority">Add Priority</TabsTrigger>
              <TabsTrigger value="activity">Add Activity</TabsTrigger>
            </TabsList>
            <TabsContent value="priority">
              <AddPriority onPriorityAdded={handlePriorityAdded} />
            </TabsContent>
            <TabsContent value="activity">
              <AddActivity
                priorities={priorities}
                onActivityAdded={handleActivityAdded}
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
} 