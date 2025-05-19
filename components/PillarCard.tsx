import React from 'react'
import { ArrowRightIcon } from 'lucide-react'
import Link from 'next/link'

interface PillarProps {
  pillar: {
    id: string
    title: string
    description: string
    progress: number
    goals: number
    color: string
  }
}

export function PillarCard({ pillar }: PillarProps) {
  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className={`${pillar.color} px-4 py-3`}>
        <h3 className="font-semibold text-sm">{pillar.title}</h3>
      </div>
      <div className="p-4">
        <p className="text-gray-600 text-sm mb-4">{pillar.description}</p>
        <div className="mb-4">
          <div className="flex justify-between mb-1.5 text-sm">
            <span className="text-gray-600">Progression</span>
            <span className="font-medium">{pillar.progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full"
              style={{
                width: `${pillar.progress}%`,
              }}
            ></div>
          </div>
        </div>
        <Link
          href={`/${pillar.id}`}
          className="w-full py-2.5 px-4 bg-gray-50 text-sm text-gray-700 rounded-lg hover:bg-gray-100 flex items-center justify-center font-medium"
        >
          <span>Voir détails</span>
          <ArrowRightIcon className="ml-2 h-4 w-4" />
        </Link>
      </div>
    </div>
  )
} 