"use client"

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { PaywallOverlay } from "./PaywallOverlay"
import { LineChartComponent } from "./charts"

interface MarketForecastProps {
  report: any
  isAuthenticated: boolean | null
  subscriptionStatus: string | null
  COLORS: string[]
}

export function MarketForecast({ report, isAuthenticated, subscriptionStatus, COLORS }: MarketForecastProps) {
  // Préparons des données sécurisées pour le graphique
  const safeData = report?.forecastData?.map((item: any) => {
    if (typeof item === 'object' && item !== null) {
      // S'assurer que year et value sont des valeurs utilisables
      let year = item.year;
      if (typeof year === 'object') {
        year = JSON.stringify(year);
      } else if (typeof year !== 'string') {
        year = String(year);
      }
      
      let value = typeof item.value === 'number' ? item.value : parseInt(String(item.value), 10);
      if (isNaN(value)) {
        value = 0;
      }
      
      return { year, value };
    }
    return { year: "N/A", value: 0 };
  }) || [];
  
  return (
    <Card className="relative">
      <CardHeader>
        <CardTitle>Growth Forecast</CardTitle>
        <CardDescription>Market growth projections and future outlook</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="h-[300px]">
            <LineChartComponent
              data={safeData}
              series={[
                { dataKey: "value", color: COLORS[0], name: "Market Size" }
              ]}
              xAxisKey="year"
            />
          </div>
        </div>
      </CardContent>
      {(!isAuthenticated || (subscriptionStatus !== 'active' && subscriptionStatus !== 'trialing')) && <PaywallOverlay isAuthenticated={isAuthenticated} />}
    </Card>
  )
} 