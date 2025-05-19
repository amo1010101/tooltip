import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, AlertCircle, Lightbulb } from "lucide-react"

export function DailySummary() {
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  })

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-xl font-medium text-teal-800">{today}</h2>
        <p className="text-sm text-slate-500 mt-1">Your gentle AI feedback</p>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base flex items-center text-emerald-700">
            <CheckCircle2 className="h-5 w-5 mr-2 text-emerald-500" />
            What went well
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm">
          <ul className="space-y-2">
            <li>You took a 20-minute walk outside today, which helped your physical wellbeing.</li>
            <li>You connected with a friend over lunch, nurturing your relationships.</li>
            <li>You completed your work tasks efficiently, creating space for personal time.</li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base flex items-center text-amber-700">
            <AlertCircle className="h-5 w-5 mr-2 text-amber-500" />
            Areas to watch
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm">
          <ul className="space-y-2">
            <li>Your stress levels seem elevated compared to your baseline.</li>
            <li>You've been spending less time on mindfulness practices this week.</li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base flex items-center text-blue-700">
            <Lightbulb className="h-5 w-5 mr-2 text-blue-500" />
            Gentle suggestions
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm">
          <ul className="space-y-2">
            <li>Consider a 5-minute breathing exercise before bed tonight.</li>
            <li>Tomorrow might be a good day to prioritize one meaningful task rather than many small ones.</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
