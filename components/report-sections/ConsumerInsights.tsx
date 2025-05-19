"use client"

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { PaywallOverlay } from "./PaywallOverlay"
import { BarChartComponent, PieChartComponent } from "./charts"

interface ConsumerInsightsProps {
  report: any
  isAuthenticated: boolean | null
  subscriptionStatus: string | null
  COLORS: string[]
}

export function ConsumerInsights({ report, isAuthenticated, subscriptionStatus, COLORS }: ConsumerInsightsProps) {
  // Utiliser les données provenant de l'API si disponibles, sinon utiliser des données par défaut
  const consumerData = report?.consumerData || {
    demographics: [],
    preferences: [],
    purchaseFactors: [],
    behaviorTrends: []
  };

  return (
    <Card className="relative">
      <CardHeader>
        <CardTitle>Consumer Insights</CardTitle>
        <CardDescription>Detailed analysis of consumer preferences, demographics, and behavior</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Age Distribution</h3>
            <div className="h-[300px]">
              <BarChartComponent 
                data={consumerData.demographics}
                dataKey="value"
                xAxisKey="age"
                colors={[COLORS[2]]}
                legendName="Percentage (%)"
              />
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Purchase Preferences</h3>
            <div className="h-[300px]">
              <PieChartComponent 
                data={consumerData.preferences}
                dataKey="value"
                colors={COLORS}
                activeShape
                showLegend
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Purchase Decision Factors</h3>
            <div className="h-[300px]">
              <BarChartComponent
                data={consumerData.purchaseFactors}
                dataKey="value"
                xAxisKey="factor"
                colors={[COLORS[5]]}
                legendName="Importance Score (0-100)"
              />
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Consumer Segment Overview</h3>
            <Card className="p-4 border shadow-sm">
              <div className="space-y-3">
                {report?.segments?.slice(0, 3).map((segment: any, index: number) => (
                  <div key={index} className="flex items-start">
                    <div 
                      className="h-4 w-4 mt-1 mr-2 rounded-full" 
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    />
                    <div>
                      <h4 className="text-sm font-medium">{segment.name}</h4>
                      <p className="text-xs text-muted-foreground">{segment.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-semibold text-lg">Key Consumer Behavior Trends</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {consumerData.behaviorTrends.map((item: any, index: number) => (
              <Card key={index} className="border shadow-sm">
                <CardHeader className="p-4 bg-muted/30">
                  <CardTitle className="text-base">{item.trend}</CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Impact:</span>
                    <span className={`text-sm font-medium ${
                      item.impact === "Very High" ? "text-red-500" :
                      item.impact === "High" ? "text-orange-500" :
                      item.impact === "Medium" ? "text-yellow-500" :
                      "text-green-500"
                    }`}>{item.impact}</span>
                  </div>
                  <p className="mt-2 text-sm">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            ))}

            {consumerData.behaviorTrends.length === 0 && 
              <div className="col-span-full text-center text-muted-foreground p-4">
                No specific consumer behavior trends are available for this market report.
              </div>
            }
          </div>
        </div>
      </CardContent>
      {(!isAuthenticated || (subscriptionStatus !== 'active' && subscriptionStatus !== 'trialing')) && <PaywallOverlay isAuthenticated={isAuthenticated} />}
    </Card>
  )
} 