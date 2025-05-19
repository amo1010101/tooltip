"use client"

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { PaywallOverlay } from "./PaywallOverlay"

interface TrendsSectionProps {
  report: any
  isAuthenticated: boolean | null
  subscriptionStatus: string | null
}

export function TrendsSection({ report, isAuthenticated, subscriptionStatus }: TrendsSectionProps) {
  const renderTrends = () => {
    if (!report || !report.trends || !report.trends.length) return <p className="text-muted-foreground">No trends data available</p>;
    return (
      <div className="space-y-4">
        {report.trends.map((trend: string, index: number) => (
          <div key={index} className="p-4 rounded-lg bg-muted/20">
            <h3 className="text-lg font-semibold">{trend}</h3>
          </div>
        ))}
      </div>
    );
  };

  return (
    <Card className="relative">
      <CardHeader>
        <CardTitle>Market Trends</CardTitle>
        <CardDescription>Key trends shaping the market</CardDescription>
      </CardHeader>
      <CardContent>
        {renderTrends()}
      </CardContent>
      {(!isAuthenticated || (subscriptionStatus !== 'active' && subscriptionStatus !== 'trialing')) && <PaywallOverlay isAuthenticated={isAuthenticated} />}
    </Card>
  )
} 