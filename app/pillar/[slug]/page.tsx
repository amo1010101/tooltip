"use client"

import { useState } from "react"
import { notFound } from "next/navigation"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { ArrowLeft, CheckCircle2 } from "lucide-react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { use } from "react"

type Action = {
  id: string
  title: string
  completed: boolean
  effort: number // Impact sur le score quand complété
}

type SubPillar = {
  id: string
  name: string
  value: number
  actions: Action[]
}

type Pillar = {
  slug: string
  name: string
  value: number
  goal: number
  subPillars: SubPillar[]
}

const PILLARS: Pillar[] = [
  {
    slug: "health-energy",
    name: "Health & Energy",
    value: 65,
    goal: 80,
    subPillars: [
      {
        id: "medical",
        name: "Suivi médical",
        value: 70,
        actions: [
          { id: "checkup", title: "Faire un bilan médical annuel", completed: false, effort: 10 },
          { id: "dentist", title: "Visite chez le dentiste", completed: false, effort: 5 },
          { id: "vision", title: "Contrôle de la vue", completed: false, effort: 5 }
        ]
      },
      {
        id: "sport",
        name: "Sport",
        value: 60,
        actions: [
          { id: "workout", title: "3 séances de sport par semaine", completed: false, effort: 10 },
          { id: "steps", title: "10,000 pas par jour", completed: false, effort: 5 },
          { id: "stretch", title: "Étirements quotidiens", completed: false, effort: 5 }
        ]
      },
      {
        id: "nutrition",
        name: "Bien manger",
        value: 65,
        actions: [
          { id: "water", title: "Boire 2L d'eau par jour", completed: false, effort: 5 },
          { id: "fruits", title: "5 fruits et légumes par jour", completed: false, effort: 10 },
          { id: "meal-prep", title: "Préparer ses repas à l'avance", completed: false, effort: 5 }
        ]
      }
    ]
  },
  {
    slug: "mental-emotions",
    name: "Mental & Emotions",
    value: 45,
    goal: 80,
    subPillars: [
      {
        id: "mindfulness",
        name: "Mindfulness",
        value: 50,
        actions: [
          { id: "meditation", title: "Méditer 10 minutes par jour", completed: false, effort: 10 },
          { id: "breathing", title: "Exercices de respiration", completed: false, effort: 5 },
          { id: "present", title: "Pratiquer la pleine conscience", completed: false, effort: 5 }
        ]
      },
      {
        id: "gratitude",
        name: "Grateful",
        value: 40,
        actions: [
          { id: "journal", title: "Tenir un journal de gratitude", completed: false, effort: 10 },
          { id: "thanks", title: "Exprimer sa gratitude aux autres", completed: false, effort: 5 },
          { id: "positive", title: "Noter 3 moments positifs par jour", completed: false, effort: 5 }
        ]
      },
      {
        id: "stability",
        name: "Stability",
        value: 45,
        actions: [
          { id: "routine", title: "Maintenir une routine quotidienne", completed: false, effort: 10 },
          { id: "sleep", title: "8h de sommeil régulier", completed: false, effort: 5 },
          { id: "boundaries", title: "Poser des limites saines", completed: false, effort: 5 }
        ]
      }
    ]
  },
  {
    slug: "relationships",
    name: "Relationships",
    value: 70,
    goal: 80,
    subPillars: [
      {
        id: "friend",
        name: "Amie",
        value: 75,
        actions: [
          { id: "meetup", title: "Rencontrer une amie régulièrement", completed: false, effort: 10 },
          { id: "call", title: "Appeler une amie régulièrement", completed: false, effort: 5 },
          { id: "support", title: "Apporter de l'aide à une amie", completed: false, effort: 5 }
        ]
      },
      {
        id: "love",
        name: "Vie sentimentale",
        value: 65,
        actions: [
          { id: "date", title: "Planifier un rendez-vous régulier", completed: false, effort: 10 },
          { id: "communication", title: "Faire de la communication régulière", completed: false, effort: 5 },
          { id: "empathy", title: "Montrer de l'empathie", completed: false, effort: 5 }
        ]
      },
      {
        id: "interaction",
        name: "Interaction avec les autres",
        value: 70,
        actions: [
          { id: "help", title: "Aider quelqu'un", completed: false, effort: 10 },
          { id: "listen", title: "Écouter attentivement", completed: false, effort: 5 },
          { id: "respect", title: "Montrer du respect", completed: false, effort: 5 }
        ]
      }
    ]
  },
  {
    slug: "work-finance",
    name: "Work & Finance",
    value: 55,
    goal: 80,
    subPillars: [
      {
        id: "wealth",
        name: "Wealth (Money)",
        value: 50,
        actions: [
          { id: "budget", title: "Établir et suivre un budget", completed: false, effort: 10 },
          { id: "invest", title: "Investir de l'argent", completed: false, effort: 5 },
          { id: "save", title: "Épargner régulièrement", completed: false, effort: 5 }
        ]
      },
      {
        id: "work",
        name: "Work",
        value: 60,
        actions: [
          { id: "career", title: "Poursuivre sa carrière", completed: false, effort: 10 },
          { id: "skills", title: "Se perfectionner", completed: false, effort: 5 },
          { id: "passion", title: "Trouver de l'engagement", completed: false, effort: 5 }
        ]
      },
      {
        id: "professional",
        name: "Professional skills",
        value: 55,
        actions: [
          { id: "learning", title: "Continuer à apprendre", completed: false, effort: 10 },
          { id: "networking", title: "Faire de la réseautique", completed: false, effort: 5 },
          { id: "leadership", title: "Améliorer sa gestion de projet", completed: false, effort: 5 }
        ]
      }
    ]
  },
  {
    slug: "personal-growth",
    name: "Personal Growth",
    value: 60,
    goal: 80,
    subPillars: [
      {
        id: "cognitive",
        name: "Cognitive Skills",
        value: 65,
        actions: [
          { id: "reading", title: "Lire régulièrement", completed: false, effort: 10 },
          { id: "learning", title: "Apprendre de nouvelles choses", completed: false, effort: 5 },
          { id: "problem-solving", title: "Résoudre des problèmes", completed: false, effort: 5 }
        ]
      },
      {
        id: "culture",
        name: "Culture",
        value: 55,
        actions: [
          { id: "travel", title: "Voyager", completed: false, effort: 10 },
          { id: "art", title: "Pratiquer un art", completed: false, effort: 5 },
          { id: "music", title: "Écouter de la musique", completed: false, effort: 5 }
        ]
      },
      {
        id: "productivity",
        name: "Productivité",
        value: 60,
        actions: [
          { id: "schedule", title: "Planifier son temps", completed: false, effort: 10 },
          { id: "focus", title: "Travailler en toute concentration", completed: false, effort: 5 },
          { id: "prioritize", title: "Prioriser ses tâches", completed: false, effort: 5 }
        ]
      }
    ]
  },
]

export default function PillarPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params)
  const [pillarData, setPillarData] = useState(() => {
    const pillar = PILLARS.find((p) => p.slug === resolvedParams.slug)
    if (!pillar) notFound()
    return pillar
  })

  const toggleAction = (subPillarId: string, actionId: string) => {
    setPillarData(currentPillar => {
      const newPillar = { ...currentPillar }
      const subPillar = newPillar.subPillars.find(sp => sp.id === subPillarId)
      if (!subPillar) return currentPillar

      // Toggle action completion
      const action = subPillar.actions.find(a => a.id === actionId)
      if (!action) return currentPillar
      action.completed = !action.completed

      // Recalculate subPillar value
      const totalEffort = subPillar.actions.reduce((sum, a) => sum + a.effort, 0)
      const completedEffort = subPillar.actions
        .filter(a => a.completed)
        .reduce((sum, a) => sum + a.effort, 0)
      subPillar.value = Math.round((completedEffort / totalEffort) * 100)

      // Recalculate pillar value
      newPillar.value = Math.round(
        newPillar.subPillars.reduce((sum, sp) => sum + sp.value, 0) / newPillar.subPillars.length
      )

      return newPillar
    })
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-4">
      <div className="w-full max-w-2xl">
        <div className="flex items-center mb-6">
          <Button variant="ghost" size="sm" className="text-[#2D3648]" asChild>
            <Link href="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>

        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-4">{pillarData.name}</h1>
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex justify-between items-center mb-2">
              <span className="text-base font-medium">Overall Progress</span>
              <span className="text-base text-slate-600">{pillarData.value}% / {pillarData.goal}%</span>
            </div>
            <Progress value={pillarData.value} className="h-2" />
          </div>
        </div>

        <div className="space-y-6">
          {pillarData.subPillars.map((subPillar) => (
            <Card key={subPillar.id}>
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <span>{subPillar.name}</span>
                  <span className="text-base text-slate-600">{subPillar.value}%</span>
                </CardTitle>
                <Progress value={subPillar.value} className="h-2" />
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {subPillar.actions.map((action) => (
                    <button
                      key={action.id}
                      className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-colors ${
                        action.completed
                          ? "bg-emerald-50 text-emerald-900"
                          : "bg-slate-50 hover:bg-slate-100"
                      }`}
                      onClick={() => toggleAction(subPillar.id, action.id)}
                    >
                      <span className="flex items-center">
                        <CheckCircle2
                          className={`h-5 w-5 mr-2 ${
                            action.completed ? "text-emerald-500" : "text-slate-300"
                          }`}
                        />
                        {action.title}
                      </span>
                      <span className="text-sm text-slate-500">+{action.effort}%</span>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </main>
  )
} 