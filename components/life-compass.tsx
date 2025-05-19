"use client"

import { useState } from "react"
import Link from "next/link"
import { Progress } from "@/components/ui/progress"
import { calculateLifeBalance } from "@/lib/architecture"

function slugify(str: string) {
  return str.toLowerCase().replace(/\s+&\s+/g, "-").replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")
}

type LifePillar = {
  id: string
  name: string
  value: number
  color: string
  goal?: number
}

export function LifeCompass() {
  const [pillars] = useState<LifePillar[]>([
    { id: "health-energy", name: "Health & Energy", value: 65, color: "#94B4C1", goal: 80 },
    { id: "mental-emotions", name: "Mental & Emotions", value: 45, color: "#94B4C1", goal: 80 },
    { id: "relationships", name: "Relationships", value: 70, color: "#94B4C1", goal: 80 },
    { id: "work-finance", name: "Work & Finance", value: 55, color: "#94B4C1", goal: 80 },
    { id: "personal-growth", name: "Personal Growth", value: 60, color: "#94B4C1", goal: 80 },
  ])

  const overallScore = calculateLifeBalance(pillars)

  return (
    <div className="grid grid-cols-1 gap-4">
      {pillars.map((pillar) => (
        <Link
          key={pillar.id}
          href={`/pillar/${pillar.id}`}
          className="block group"
        >
          <div className="bg-white rounded-2xl p-4 shadow-md group-hover:shadow-lg transition-shadow cursor-pointer">
            <div className="flex justify-between items-center mb-2">
              <span className="text-base font-semibold" style={{ color: '#213448' }}>{pillar.name}</span>
              <span className="text-base font-medium" style={{ color: '#547792' }}>{pillar.value}% / {pillar.goal}%</span>
            </div>
            <div className="relative h-4">
              {/* Barre d'objectif (fond) */}
              <Progress value={pillar.goal} className="h-2 bg-[#547792] absolute top-1/2 -translate-y-1/2 w-full rounded-full" indicatorClassName="bg-[#547792]" />
              {/* Barre de score actuel (devant) */}
              <Progress value={pillar.value} className="h-2 absolute top-1/2 -translate-y-1/2 w-full rounded-full" indicatorClassName="bg-[#94B4C1]" />
            </div>
          </div>
        </Link>
      ))}

      <div className="mt-4 bg-white rounded-2xl p-4 border border-[#94B4C1]">
        <div className="flex justify-between items-center mb-2">
          <span className="text-base font-semibold" style={{ color: '#213448' }}>Life Balance Score</span>
          <span className="text-base font-medium" style={{ color: '#547792' }}>{overallScore}%</span>
        </div>
        <Progress value={overallScore} className="h-3 bg-[#547792] rounded-full" indicatorClassName="bg-[#94B4C1]" />
      </div>
    </div>
  )
}
