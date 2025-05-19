"use client"

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { PaywallOverlay } from "./PaywallOverlay"

interface RegionalAnalysisProps {
  report: any
  isAuthenticated: boolean | null
  subscriptionStatus: string | null
}

export function RegionalAnalysis({ report, isAuthenticated, subscriptionStatus }: RegionalAnalysisProps) {
  return (
    <Card className="relative">
      <CardHeader>
        <CardTitle>Regional Analysis</CardTitle>
        <CardDescription>Geographic distribution and regional market insights</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {report?.regions?.map((region: any, index: number) => (
            <div key={index} className="p-4 rounded-lg bg-muted/20">
              <h3 className="text-lg font-semibold">{region?.name || 'Unnamed Region'}</h3>
              <p className="text-sm text-muted-foreground">Market Share: {region?.share || 'N/A'}</p>
              <p className="mt-2">{region?.description || 'No description available'}</p>
            </div>
          ))}
        </div>
      </CardContent>
      {(!isAuthenticated || (subscriptionStatus !== 'active' && subscriptionStatus !== 'trialing')) && <PaywallOverlay isAuthenticated={isAuthenticated} />}
    </Card>
  )
} 