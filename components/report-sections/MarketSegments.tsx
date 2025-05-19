"use client"

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { PaywallOverlay } from "./PaywallOverlay"

interface MarketSegmentsProps {
  report: any
  isAuthenticated: boolean | null
  subscriptionStatus: string | null
}

export function MarketSegments({ report, isAuthenticated, subscriptionStatus }: MarketSegmentsProps) {
  return (
    <Card className="relative">
      <CardHeader>
        <CardTitle>Market Segments</CardTitle>
        <CardDescription>Detailed analysis of market segments and their distribution</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {report?.segments?.map((segment: any, index: number) => (
            <div key={index} className="p-4 rounded-lg bg-muted/20">
              <h3 className="text-lg font-semibold">{segment?.name || 'Unnamed Segment'}</h3>
              <p className="text-sm text-muted-foreground">Market Share: {segment?.share || 'N/A'}</p>
              <p className="mt-2">{segment?.description || 'No description available'}</p>
            </div>
          ))}
        </div>
      </CardContent>
      {(!isAuthenticated || (subscriptionStatus !== 'active' && subscriptionStatus !== 'trialing')) && <PaywallOverlay />}
    </Card>
  )
} 