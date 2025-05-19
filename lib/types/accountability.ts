export type AccountabilityBuddy = {
  id: string
  userId: string
  buddyEmail: string
  buddyName: string
  status: 'pending' | 'accepted' | 'rejected'
  createdAt: string
  updatedAt: string
}

export type AccountabilityPact = {
  id: string
  userId: string
  buddyId: string
  title: string
  description: string
  deadline: string
  status: 'active' | 'completed' | 'failed'
  createdAt: string
  updatedAt: string
}

export type WeeklyReport = {
  id: string
  userId: string
  buddyId: string
  content: string
  weekStart: string
  weekEnd: string
  createdAt: string
} 