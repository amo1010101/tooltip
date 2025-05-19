import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { supabase } from '@/lib/supabase'
import type { WeeklyFeedback } from '@/lib/types/consistency'

export function WeeklyFeedback() {
  const [feedback, setFeedback] = useState<WeeklyFeedback | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchLatestFeedback()
  }, [])

  const fetchLatestFeedback = async () => {
    try {
      const { data: user } = await supabase.auth.getUser()
      if (!user.user) throw new Error('No user found')

      const { data, error } = await supabase
        .from('weekly_feedback')
        .select('*')
        .eq('user_id', user.user.id)
        .order('created_at', { ascending: false })
        .limit(1)
        .single()

      if (error) throw error
      setFeedback(data)
    } catch (error) {
      console.error('Error fetching weekly feedback:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div>Loading...</div>
  }

  if (!feedback) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Weekly Feedback</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500">No feedback available yet.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Weekly Feedback</CardTitle>
        <p className="text-sm text-gray-500">
          {new Date(feedback.weekStart).toLocaleDateString()} -{' '}
          {new Date(feedback.weekEnd).toLocaleDateString()}
        </p>
      </CardHeader>
      <CardContent>
        <p className="text-gray-700">{feedback.content}</p>
      </CardContent>
    </Card>
  )
} 