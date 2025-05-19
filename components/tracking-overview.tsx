import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, Award } from "lucide-react"

export function TrackingOverview() {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Overview</h3>

      <div className="grid grid-cols-2 gap-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center">
              <TrendingUp className="h-4 w-4 mr-2 text-teal-500" />
              Weekly Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-teal-700">68%</div>
            <Progress value={68} className="h-2 mt-2" />
            <p className="text-xs text-slate-500 mt-2">+12% from last week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center">
              <Award className="h-4 w-4 mr-2 text-amber-500" />
              Achievements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">7</div>
            <div className="flex items-center gap-1 mt-2">
              <div className="h-2 w-2 rounded-full bg-amber-400"></div>
              <div className="h-2 w-2 rounded-full bg-amber-400"></div>
              <div className="h-2 w-2 rounded-full bg-amber-400"></div>
              <div className="h-2 w-2 rounded-full bg-amber-200"></div>
              <div className="h-2 w-2 rounded-full bg-amber-200"></div>
            </div>
            <p className="text-xs text-slate-500 mt-2">3 new this week</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
