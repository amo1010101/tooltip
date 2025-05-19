import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { CheckCircle2, Circle } from "lucide-react"

export function TrackingGoals() {
  const goals = [
    {
      id: "1",
      title: "Morning meditation",
      category: "Mental & Emotions",
      target: "5 days per week",
      progress: 60,
      color: "bg-blue-400",
    },
    {
      id: "2",
      title: "Physical activity",
      category: "Health & Energy",
      target: "30 minutes daily",
      progress: 40,
      color: "bg-emerald-400",
    },
    {
      id: "3",
      title: "Connect with friends",
      category: "Relationships",
      target: "2 times per week",
      progress: 100,
      color: "bg-purple-400",
      completed: true,
    },
    {
      id: "4",
      title: "Read or learn something new",
      category: "Personal Growth",
      target: "15 minutes daily",
      progress: 75,
      color: "bg-cyan-400",
    },
  ]

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Current Goals</h3>

      <div className="space-y-3">
        {goals.map((goal) => (
          <Card key={goal.id} className={goal.completed ? "border-teal-200 bg-teal-50/50" : ""}>
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center">
                    {goal.completed ? (
                      <CheckCircle2 className="h-4 w-4 text-teal-600 mr-2" />
                    ) : (
                      <Circle className="h-4 w-4 text-slate-300 mr-2" />
                    )}
                    <h4 className="font-medium">{goal.title}</h4>
                  </div>
                  <div className="flex items-center mt-1">
                    <span className="text-xs text-slate-500">{goal.category}</span>
                    <span className="text-xs text-slate-400 mx-2">•</span>
                    <span className="text-xs text-slate-500">Target: {goal.target}</span>
                  </div>
                </div>
                <span className="text-sm font-medium">{goal.progress}%</span>
              </div>
              <Progress value={goal.progress} className="h-1.5 mt-3 bg-slate-100" indicatorClassName={goal.color} />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
