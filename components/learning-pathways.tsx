import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export function LearningPathways() {
  const pathways = [
    {
      id: "mindfulness",
      title: "Mindfulness Mastery",
      description: "Build a consistent mindfulness practice",
      progress: 15,
      recommended: true,
    },
    {
      id: "energy",
      title: "Energy Optimization",
      description: "Maximize your daily energy levels",
      progress: 0,
      recommended: false,
    },
    {
      id: "relationships",
      title: "Relationship Harmony",
      description: "Deepen your connections with others",
      progress: 0,
      recommended: false,
    },
  ]

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Your Pathways</h3>
        <Link href="/learning/pathways" className="text-sm text-teal-600 flex items-center">
          View all
          <ArrowRight className="h-3 w-3 ml-1" />
        </Link>
      </div>

      <div className="space-y-3">
        {pathways.map((pathway) => (
          <Link href={`/learning/pathways/${pathway.id}`} key={pathway.id}>
            <Card className={pathway.recommended ? "border-teal-200" : ""}>
              <CardHeader className="pb-2">
                <div className="flex justify-between">
                  <div>
                    <CardTitle className="text-base">{pathway.title}</CardTitle>
                    <CardDescription>{pathway.description}</CardDescription>
                  </div>
                  {pathway.recommended && (
                    <span className="text-xs bg-teal-100 text-teal-800 px-2 py-1 rounded-full h-fit">Recommended</span>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center text-xs text-slate-500 mb-1">
                  <span>Progress</span>
                  <span>{pathway.progress}%</span>
                </div>
                <Progress value={pathway.progress} className="h-1.5 bg-slate-100" indicatorClassName="bg-teal-500" />
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
