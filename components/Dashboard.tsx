import React from 'react'
import { PillarCard } from './PillarCard'
import { ProgressSummary } from './ProgressSummary'

const pillars = [
  {
    id: 'health-energy',
    title: 'Health & Energy',
    description: 'Physical well-being, energy and vitality',
    progress: 65,
    goals: 3,
    color: 'bg-red-100 text-red-800',
  },
  {
    id: 'mental-emotions',
    title: 'Mental & Emotions',
    description: 'Emotional balance and mental well-being',
    progress: 45,
    goals: 4,
    color: 'bg-purple-100 text-purple-800',
  },
  {
    id: 'relations',
    title: 'Relations',
    description: 'Personal and social relationships',
    progress: 70,
    goals: 3,
    color: 'bg-pink-100 text-pink-800',
  },
  {
    id: 'work-finance',
    title: 'Work & Finance',
    description: 'Career, finances and professional development',
    progress: 55,
    goals: 5,
    color: 'bg-blue-100 text-blue-800',
  },
  {
    id: 'self-development',
    title: 'Self Development',
    description: 'Learning, culture and personal growth',
    progress: 60,
    goals: 4,
    color: 'bg-green-100 text-green-800',
  },
]

export function Dashboard() {
  return (
    <div className="space-y-6">
      <ProgressSummary pillars={pillars} />
      <h2 className="text-xl font-semibold text-gray-800 mt-6">
        My Pillars
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pillars.map((pillar) => (
          <PillarCard key={pillar.id} pillar={pillar} />
        ))}
      </div>
    </div>
  )
} 