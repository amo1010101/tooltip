import React from 'react'

interface StatCardProps {
  title: string
  value: string | number
  description: string
}

function StatCard({ title, value, description }: StatCardProps) {
  return (
    <div className="bg-gray-50 rounded-lg p-3 md:p-4">
      <h3 className="text-xs font-medium text-gray-500">{title}</h3>
      <p className="text-xl md:text-2xl font-bold text-gray-800 mt-1">
        {value}
      </p>
      <p className="text-xs text-gray-500 mt-1">{description}</p>
    </div>
  )
}

interface ProgressSummaryProps {
  pillars: Array<{
    progress: number
    goals: number
  }>
}

export function ProgressSummary({ pillars }: ProgressSummaryProps) {
  const averageProgress = Math.round(
    pillars.reduce((sum, pillar) => sum + pillar.progress, 0) / pillars.length,
  )

  return (
    <div className="bg-white shadow rounded-lg p-4 md:p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Mon tableau de bord
      </h2>
      <div className="space-y-4 md:space-y-0 md:grid md:grid-cols-3 md:gap-4 mb-6">
        <StatCard
          title="Progression globale"
          value={`${averageProgress}%`}
          description="Moyenne de tous les piliers"
        />
        <StatCard
          title="Objectifs actifs"
          value={pillars.reduce((sum, p) => sum + p.goals, 0)}
          description="À travers tous les piliers"
        />
        <StatCard
          title="Dernière évaluation"
          value="Il y a 7j"
          description="Prochaine dans 23j"
        />
      </div>
      <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 flex items-start">
        <div className="bg-blue-100 rounded-full p-1.5 mr-3">
          <svg
            className="w-4 h-4 text-blue-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
        </div>
        <div>
          <h3 className="font-medium text-blue-800 text-sm">Conseil du jour</h3>
          <p className="text-xs text-blue-700 mt-1">
            Consacrez au moins 15 minutes par jour à chaque pilier pour
            maintenir un développement équilibré.
          </p>
        </div>
      </div>
    </div>
  )
} 