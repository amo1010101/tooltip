import { supabase } from '@/lib/supabase'
import type { AccountabilityBuddy, AccountabilityPact, WeeklyReport } from '@/lib/types/accountability'

export async function addBuddy(
  userId: string,
  buddyEmail: string,
  buddyName: string
): Promise<AccountabilityBuddy> {
  try {
    const { data, error } = await supabase
      .from('accountability_buddies')
      .insert([
        {
          user_id: userId,
          buddy_email: buddyEmail,
          buddy_name: buddyName,
          status: 'pending',
        },
      ])
      .select()
      .single()

    if (error) throw error

    // TODO: Send email invitation to buddy
    // This would be implemented with a service like SendGrid or AWS SES

    return data
  } catch (error) {
    console.error('Error adding buddy:', error)
    throw error
  }
}

export async function createPact(
  userId: string,
  buddyId: string,
  title: string,
  description: string,
  deadline: Date
): Promise<AccountabilityPact> {
  try {
    const { data, error } = await supabase
      .from('accountability_pacts')
      .insert([
        {
          user_id: userId,
          buddy_id: buddyId,
          title,
          description,
          deadline: deadline.toISOString(),
          status: 'active',
        },
      ])
      .select()
      .single()

    if (error) throw error

    // TODO: Send notification to buddy about new pact
    // This would be implemented with a service like SendGrid or AWS SES

    return data
  } catch (error) {
    console.error('Error creating pact:', error)
    throw error
  }
}

export async function generateWeeklyReport(
  userId: string,
  buddyId: string,
  weekStart: Date,
  weekEnd: Date
): Promise<WeeklyReport> {
  try {
    // Fetch consistency scores for the week
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

    // Fetch active pacts
    const { data: pacts, error: pactsError } = await supabase
      .from('accountability_pacts')
      .select('*')
      .eq('user_id', userId)
      .eq('buddy_id', buddyId)
      .eq('status', 'active')

    if (pactsError) throw pactsError

    // Generate report content
    const reportContent = [
      'Weekly Progress Report:',
      '',
      'Consistency Scores:',
      ...scores.map(
        (score) =>
          `- ${score.priorities.title}: ${score.score}% consistency`
      ),
      '',
      'Active Pacts:',
      ...pacts.map(
        (pact) =>
          `- ${pact.title}: Due ${new Date(pact.deadline).toLocaleDateString()}`
      ),
    ].join('\n')

    // Save the report
    const { data, error: saveError } = await supabase
      .from('weekly_reports')
      .insert([
        {
          user_id: userId,
          buddy_id: buddyId,
          content: reportContent,
          week_start: weekStart.toISOString(),
          week_end: weekEnd.toISOString(),
        },
      ])
      .select()
      .single()

    if (saveError) throw saveError

    // TODO: Send report to buddy
    // This would be implemented with a service like SendGrid or AWS SES

    return data
  } catch (error) {
    console.error('Error generating weekly report:', error)
    throw error
  }
} 