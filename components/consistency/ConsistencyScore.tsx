import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { supabase } from '@/lib/supabase'
import type { ConsistencyScore, Priority } from '@/lib/types/consistency'

export function ConsistencyScore() {
  const [scores, setScores] = useState<ConsistencyScore[]>([])
  const [priorities, setPriorities] = useState<Priority[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      // Fetch priorities
      const { data: prioritiesData, error: prioritiesError } = await supabase
        .from('priorities')
        .select('*')
        .order('created_at', { ascending: false })

      if (prioritiesError) throw prioritiesError
      setPriorities(prioritiesData)

      // Fetch latest consistency scores
      const { data: scoresData, error: scoresError } = await supabase
        .from('consistency_scores')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5)

      if (scoresError) throw scoresError
      setScores(scoresData)
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'bg-green-500'
    if (score >= 50) return 'bg-yellow-500'
    return 'bg-red-500'
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Consistency Score</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {scores.map((score) => {
            const priority = priorities.find((p) => p.id === score.priorityId)
            return (
              <div key={score.id} className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium">{priority?.title}</span>
                  <span className="text-sm text-gray-500">{score.score}%</span>
                </div>
                <Progress
                  value={score.score}
                  className={`h-2 ${getScoreColor(score.score)}`}
                />
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
} 