"use client"

import { Lock } from "lucide-react"
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card"
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
  ResponsiveContainer,
} from "recharts"

interface MarketOverviewProps {
  report: any
  isAuthenticated: boolean | null
  COLORS: string[]
}

// Helper function to format market size (copied from reports-list.tsx)
const formatMarketSize = (marketSizeData: any): string => {
  let dataObject: any = null;

  if (typeof marketSizeData === 'string') {
    try {
      dataObject = JSON.parse(marketSizeData);
    } catch (e) {
      console.warn("Failed to parse marketSizeData string:", marketSizeData, e);
      dataObject = marketSizeData;
    }
  } else {
    dataObject = marketSizeData;
  }

  if (typeof dataObject === 'object' && dataObject !== null) {
    // Support both 'value' and other keys like 'valueBillionUSD'
    const sizeValue = dataObject.value ?? dataObject.valueBillionUSD; 
    if (sizeValue !== undefined && sizeValue !== null) {
      const numericValue = Number(sizeValue);
      const formattedValue = !isNaN(numericValue) ? numericValue.toLocaleString(undefined, { maximumFractionDigits: 2 }) : sizeValue;
      // Determine unit - prioritize 'unit', fallback based on key name if needed
      const unit = dataObject.unit ?? (dataObject.valueBillionUSD ? 'billion USD' : ''); 
      return `${formattedValue}${unit ? ' ' + unit : ''}`;
    }
  } else if (dataObject !== undefined && dataObject !== null) {
    return String(dataObject);
  }

  return "N/A";
};

// Helper function to format growth rate (copied from reports-list.tsx)
const formatGrowthRate = (growthRateData: any): string => {
  let dataObject: any = null;

  if (typeof growthRateData === 'string') {
    try {
      dataObject = JSON.parse(growthRateData);
    } catch (e) {
      console.warn("Failed to parse growthRateData string:", growthRateData, e);
      dataObject = growthRateData;
    }
  } else {
    dataObject = growthRateData;
  }

  if (typeof dataObject === 'object' && dataObject !== null) {
    const rateValue = dataObject.value ?? dataObject.cagr;
    if (rateValue !== undefined && rateValue !== null) {
        const numericValue = Number(rateValue);
        // Always add % for growth rates
        return !isNaN(numericValue) ? `${numericValue}%` : `${rateValue}%`;
    }
  } else if (dataObject !== undefined && dataObject !== null) {
     const num = Number(dataObject);
     // Add % if it's a primitive number
     return !isNaN(num) ? `${num}%` : String(dataObject);
  }

  return "N/A";
};

export function MarketOverview({ report, isAuthenticated, COLORS }: MarketOverviewProps) {
  // Fonction pour tronquer les noms longs sur mobile
  const truncateLabel = (label: string, maxLength = 15) => {
    if (typeof window !== "undefined" && window.innerWidth < 640 && label.length > maxLength) {
      return label.substring(0, maxLength) + "..."
    }
    return label
  }

  const renderKeyPlayers = () => {
    if (!report?.keyPlayersData) return <p className="text-muted-foreground">No key players data available</p>
    return (
      <div className="space-y-4">
        {report.keyPlayersData.map((item: any, index: number) => (
          <div key={index} className="p-4 rounded-lg bg-muted/20">
            <h3 className="text-lg font-semibold">{item.name}</h3>
            <p className="text-sm text-muted-foreground">Market Share: {item.share}%</p>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <Card className="overflow-hidden border shadow-sm">
          <CardHeader className="p-3 sm:p-4 bg-muted/50">
            <CardTitle className="text-sm sm:text-base">Market Size</CardTitle>
          </CardHeader>
          <CardContent className="p-3 sm:p-4 pt-3">
            <p className="text-base sm:text-xl font-semibold">{formatMarketSize(report?.marketSize)}</p>
          </CardContent>
        </Card>
        <Card className="overflow-hidden border shadow-sm">
          <CardHeader className="p-3 sm:p-4 bg-muted/50">
            <CardTitle className="text-sm sm:text-base">Growth Rate</CardTitle>
          </CardHeader>
          <CardContent className="p-3 sm:p-4 pt-3">
            <p className="text-base sm:text-xl font-semibold">{formatGrowthRate(report?.growthRate)}</p>
          </CardContent>
        </Card>
      </div>

      {/* Key Players Chart */}
      <Card className="overflow-hidden border shadow-sm">
        <CardHeader className="p-3 sm:p-4 bg-muted/50">
          <CardTitle className="text-sm sm:text-base">Key Players Market Share</CardTitle>
          <CardDescription className="text-xs sm:text-sm">
            Major companies in the industry and their market share
          </CardDescription>
        </CardHeader>
        <CardContent className="p-3 sm:p-4 pt-0">
          <div id="key-players-chart" className="w-full mt-4">
            <div className="min-w-full">
              <ResponsiveContainer width="100%" height={300}>
                <RechartsBarChart
                  data={
                    report?.keyPlayersData?.map((item: any) => ({
                      ...item,
                      name: truncateLabel(item.name),
                    })) || []
                  }
                  layout="vertical"
                  margin={{ top: 5, right: 20, left: 60, bottom: 5 }}
                >
                  <defs>
                    {(report?.keyPlayersData || []).map((entry: any, index: number) => (
                      <linearGradient
                        key={`gradient-${index}`}
                        id={`colorBar${index}`}
                        x1="0"
                        y1="0"
                        x2="1"
                        y2="0"
                      >
                        <stop offset="0%" stopColor={COLORS[index % COLORS.length]} stopOpacity={0.8} />
                        <stop
                          offset="100%"
                          stopColor={COLORS[(index + 1) % COLORS.length]}
                          stopOpacity={0.8}
                        />
                      </linearGradient>
                    ))}
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" />
                  <XAxis
                    type="number"
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    type="category"
                    dataKey="name"
                    tick={{ fontSize: 12 }}
                    width={60}
                    tickFormatter={(value) => truncateLabel(value, 10)}
                    stroke="hsl(var(--muted-foreground))"
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--background))",
                      borderRadius: "8px",
                      border: "1px solid hsl(var(--border))",
                      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                      padding: "8px 12px",
                      fontSize: "12px",
                      color: "hsl(var(--foreground))",
                    }}
                  />
                  <Bar dataKey="share" name="Market Share (%)" radius={[0, 4, 4, 0]} barSize={24}>
                    {(report?.keyPlayersData || []).map((entry: any, index: number) => (
                      <Cell key={`cell-${index}`} fill={`url(#colorBar${index})`} stroke="none" />
                    ))}
                  </Bar>
                </RechartsBarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="overflow-hidden border shadow-sm">
        <CardHeader className="p-3 sm:p-4 bg-muted/50">
          <CardTitle className="text-sm sm:text-base">Key Players</CardTitle>
        </CardHeader>
        <CardContent className="p-3 sm:p-4 pt-3">
          {renderKeyPlayers()}
        </CardContent>
      </Card>

      {/* Trends et Challenges */}
      <div className="grid gap-4 sm:grid-cols-2">
        <Card className="overflow-hidden border shadow-sm">
          <CardHeader className="p-3 sm:p-4 bg-muted/50">
            <CardTitle className="text-sm sm:text-base">Trends</CardTitle>
          </CardHeader>
          <CardContent className="p-3 sm:p-4 pt-3">
            <ul className="list-disc pl-5 space-y-1 text-sm">
              {(isAuthenticated ? report?.trends || [] : (report?.trends || []).slice(0, 2)).map((trend: string, index: number) => (
                <li key={index}>{trend}</li>
              ))}
              {!isAuthenticated && report?.trends && report.trends.length > 2 && (
                <li className="text-muted-foreground italic">
                  <Lock className="inline h-3 w-3 mr-1" />
                  {report.trends.length - 2} more trends (premium)
                </li>
              )}
            </ul>
          </CardContent>
        </Card>
        <Card className="overflow-hidden border shadow-sm">
          <CardHeader className="p-3 sm:p-4 bg-muted/50">
            <CardTitle className="text-sm sm:text-base">Challenges</CardTitle>
          </CardHeader>
          <CardContent className="p-3 sm:p-4 pt-3">
            <ul className="list-disc pl-5 space-y-1 text-sm">
              {(isAuthenticated ? report?.challenges || [] : (report?.challenges || []).slice(0, 2)).map(
                (challenge: string, index: number) => (
                  <li key={index}>{challenge}</li>
                ),
              )}
              {!isAuthenticated && report?.challenges && report.challenges.length > 2 && (
                <li className="text-muted-foreground italic">
                  <Lock className="inline h-3 w-3 mr-1" />
                  {report.challenges.length - 2} more challenges (premium)
                </li>
              )}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Opportunities */}
      <Card className="overflow-hidden border shadow-sm">
        <CardHeader className="p-3 sm:p-4 bg-muted/50">
          <CardTitle className="text-sm sm:text-base">Opportunities</CardTitle>
        </CardHeader>
        <CardContent className="p-3 sm:p-4 pt-3">
          <ul className="list-disc pl-5 space-y-1 text-sm">
            {(isAuthenticated ? report?.opportunities || [] : (report?.opportunities || []).slice(0, 2)).map(
              (opportunity: string, index: number) => (
                <li key={index}>{opportunity}</li>
              ),
            )}
            {!isAuthenticated && report?.opportunities && report.opportunities.length > 2 && (
              <li className="text-muted-foreground italic">
                <Lock className="inline h-3 w-3 mr-1" />
                {report.opportunities.length - 2} more opportunities (premium)
              </li>
            )}
          </ul>
        </CardContent>
      </Card>

      {/* Forecast */}
      <Card className="overflow-hidden border shadow-sm">
        <CardHeader className="p-3 sm:p-4 bg-muted/50">
          <CardTitle className="text-sm sm:text-base">Forecast</CardTitle>
        </CardHeader>
        <CardContent className="p-3 sm:p-4 pt-3">
          {isAuthenticated ? (
            <p className="text-sm">
              {typeof report?.forecast === 'object' 
                ? JSON.stringify(report?.forecast) 
                : report?.forecast}
            </p>
          ) : (
            <>
              <p className="text-sm">
                {typeof report?.forecast === 'object'
                  ? JSON.stringify(report?.forecast).split(".").slice(0, 2).join(".") + "."
                  : report?.forecast?.split(".").slice(0, 2).join(".") + "."}
              </p>
              <div className="mt-3 flex items-center justify-center p-3 bg-muted/30 rounded-md">
                <Lock className="h-4 w-4 mr-2 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                  Full forecast available with premium subscription
                </p>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
} 