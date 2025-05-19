import { supabase } from '@/lib/supabase'
import type { Activity, Priority, ConsistencyScore } from '@/lib/types/consistency'

export async function calculateConsistencyScore(
  userId: string,
  priorityId: string,
  weekStart: Date,
  weekEnd: Date
): Promise<number> {
  try {
    // Fetch activities for the priority in the given week
    const { data: activities, error: activitiesError } = await supabase
      .from('activities')
      .select('*')
      .eq('user_id', userId)
      .eq('priority_id', priorityId)
      .gte('date', weekStart.toISOString())
      .lte('date', weekEnd.toISOString())

    if (activitiesError) throw activitiesError

    // Fetch the priority
    const { data: priority, error: priorityError } = await supabase
      .from('priorities')
      .select('*')
      .eq('id', priorityId)
      .single()

    if (priorityError) throw priorityError

    // Calculate total effort
    const totalEffort = activities.reduce((sum, activity) => sum + activity.effort, 0)
    
    // Calculate expected effort based on importance
    // For importance 5, we expect 5 activities with effort 5
    const expectedEffort = priority.importance * 5

    // Calculate score (0-100)
    const score = Math.min(Math.round((totalEffort / expectedEffort) * 100), 100)

    // Save the score
    const { error: saveError } = await supabase.from('consistency_scores').insert([
      {
        user_id: userId,
        priority_id: priorityId,
        score,
        week_start: weekStart.toISOString(),
        week_end: weekEnd.toISOString(),
      },
    ])

    if (saveError) throw saveError

    return score
  } catch (error) {
    console.error('Error calculating consistency score:', error)
    throw error
  }
}

export async function generateWeeklyFeedback(
  userId: string,
  weekStart: Date,
  weekEnd: Date
): Promise<string> {
  try {
    // Fetch all consistency scores for the week
    const { data: scores, error: scoresError } = await supabase
      .from('consistency_scores')
      .select(`
        *,
        priorities (
          title
        )
      `)
      .eq('user_id', userId)
      .gte('week_start', weekStart.toISOString())
      .lte('week_end', weekEnd.toISOString())

    if (scoresError) throw scoresError

    // Generate feedback based on scores
    const feedback = scores.map((score) => {
      const priority = score.priorities as { title: string }
      if (score.score >= 80) {
        return `Great job on ${priority.title}! You're very consistent.`
      } else if (score.score >= 50) {
        return `You're making progress on ${priority.title}, but there's room for improvement.`
      } else {
        return `Consider focusing more on ${priority.title} next week.`
      }
    }).join(' ')

    // Save the feedback
    const { error: saveError } = await supabase.from('weekly_feedback').insert([
      {
        user_id: userId,
        content: feedback,
        week_start: weekStart.toISOString(),
        week_end: weekEnd.toISOString(),
      },
    ])

    if (saveError) throw saveError

    return feedback
  } catch (error) {
    console.error('Error generating weekly feedback:', error)
    throw error
  }
} 