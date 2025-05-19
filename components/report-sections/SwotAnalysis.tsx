"use client"

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { PaywallOverlay } from "./PaywallOverlay"

interface SwotAnalysisProps {
  report: any
  isAuthenticated: boolean | null
  subscriptionStatus: string | null
}

export function SwotAnalysis({ report, isAuthenticated, subscriptionStatus }: SwotAnalysisProps) {
  return (
    <Card className="relative">
      <CardHeader>
        <CardTitle>SWOT Analysis</CardTitle>
        <CardDescription>Strengths, Weaknesses, Opportunities, and Threats in the industry</CardDescription>
      </CardHeader>
      <CardContent>
        {report?.swot ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="border-l-4 border-l-green-500 bg-green-50 dark:bg-green-950/20">
              <CardHeader className="p-4">
                <CardTitle className="text-lg text-green-700 dark:text-green-400">Strengths</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <ul className="list-disc list-inside space-y-2">
                  {report.swot.strengths.map((strength: string, index: number) => (
                    <li key={index} className="text-sm">{strength}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-red-500 bg-red-50 dark:bg-red-950/20">
              <CardHeader className="p-4">
                <CardTitle className="text-lg text-red-700 dark:text-red-400">Weaknesses</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <ul className="list-disc list-inside space-y-2">
                  {report.swot.weaknesses.map((weakness: string, index: number) => (
                    <li key={index} className="text-sm">{weakness}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-blue-500 bg-blue-50 dark:bg-blue-950/20">
              <CardHeader className="p-4">
                <CardTitle className="text-lg text-blue-700 dark:text-blue-400">Opportunities</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <ul className="list-disc list-inside space-y-2">
                  {report.swot.opportunities.map((opportunity: string, index: number) => (
                    <li key={index} className="text-sm">{opportunity}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-amber-500 bg-amber-50 dark:bg-amber-950/20">
              <CardHeader className="p-4">
                <CardTitle className="text-lg text-amber-700 dark:text-amber-400">Threats</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <ul className="list-disc list-inside space-y-2">
                  {report.swot.threats.map((threat: string, index: number) => (
                    <li key={index} className="text-sm">{threat}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="text-center p-6">
            <p className="text-muted-foreground">SWOT analysis not available for this report</p>
          </div>
        )}
      </CardContent>
      {(!isAuthenticated || (subscriptionStatus !== 'active' && subscriptionStatus !== 'trialing')) && <PaywallOverlay isAuthenticated={isAuthenticated} />}
    </Card>
  )
} 