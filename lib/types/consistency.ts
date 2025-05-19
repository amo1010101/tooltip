export type Priority = {
  id: string
  userId: string
  title: string
  description?: string
  importance: number // 1-5
  createdAt: string
  updatedAt: string
}

export type Activity = {
  id: string
  userId: string
  priorityId: string
  title: string
  description?: string
  effort: number // 1-5
  date: string
  createdAt: string
}

export type ConsistencyScore = {
  id: string
  userId: string
  priorityId: string
  score: number // 0-100
  weekStart: string
  weekEnd: string
  createdAt: string
}

export type WeeklyFeedback = {
  id: string
  userId: string
  content: string
  weekStart: string
  weekEnd: string
  createdAt: string
} 