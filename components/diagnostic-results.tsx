import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { AlertCircle } from "lucide-react"

export function DiagnosticResults() {
  // Mock results based on the diagnostic quiz
  const results = [
    { name: "Health & Energy", value: 45, color: "bg-emerald-400" },
    { name: "Mental & Emotions", value: 30, color: "bg-blue-400" },
    { name: "Relationships", value: 70, color: "bg-purple-400" },
    { name: "Work & Finance", value: 55, color: "bg-amber-400" },
    { name: "Personal Growth", value: 40, color: "bg-cyan-400" },
  ]

  // Calculate overall score
  const overallScore = Math.round(results.reduce((sum, item) => sum + item.value, 0) / results.length)

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Overall Life Balance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-slate-500">Your Score</span>
            <span className="text-2xl font-bold text-teal-700">{overallScore}%</span>
          </div>
          <Progress value={overallScore} className="h-3 bg-slate-100" indicatorClassName="bg-teal-500" />

          <div className="mt-4 p-3 bg-amber-50 rounded-md border border-amber-100 flex">
            <AlertCircle className="h-5 w-5 text-amber-500 mr-2 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-amber-800">
              Your life balance could use some attention. We've identified key areas where small changes could make a
              big difference.
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Detailed Results</h3>

        {results.map((result) => (
          <Card key={result.name} className="overflow-hidden">
            <CardContent className="p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">{result.name}</span>
                <span className="text-sm text-slate-500">{result.value}%</span>
              </div>
              <Progress value={result.value} className="h-2 bg-slate-100" indicatorClassName={result.color} />

              <p className="text-xs text-slate-500 mt-2">
                {result.value < 40
                  ? "This area needs significant attention"
                  : result.value < 70
                    ? "Room for improvement in this area"
                    : "You're doing well in this area"}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
