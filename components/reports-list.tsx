"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getSupabaseClient } from "@/lib/supabase/client"
import Link from "next/link"
import { BarChart3, LineChart } from "lucide-react"

interface ReportsListProps {
  userId: string
  searchTerm: string
}

// Helper function to format market size
const formatMarketSize = (marketSizeData: any): string => {
  let dataObject: any = null;

  // Try to parse if it's a string containing JSON
  if (typeof marketSizeData === 'string') {
    try {
      dataObject = JSON.parse(marketSizeData);
    } catch (e) {
      // Not valid JSON, treat as a primitive string later
      console.warn("Failed to parse marketSizeData string:", marketSizeData, e);
      dataObject = marketSizeData;
    }
  } else {
    // Assume it's already an object or primitive
    dataObject = marketSizeData;
  }

  // Now check the (potentially parsed) object or primitive
  if (typeof dataObject === 'object' && dataObject !== null) {
    if (dataObject.value !== undefined && dataObject.value !== null) {
      // Format the value (e.g., ensure it's a number, handle formatting if needed)
      const numericValue = Number(dataObject.value);
      // Basic formatting: use locale string for numbers, otherwise use the value as is
      const formattedValue = !isNaN(numericValue) ? numericValue.toLocaleString(undefined, { maximumFractionDigits: 2 }) : dataObject.value; 
      return `${formattedValue}${dataObject.unit ? ' ' + dataObject.unit : ''}`;
    }
  } else if (dataObject !== undefined && dataObject !== null) {
    // Handle primitives (could be the original string if JSON parse failed, or an original primitive)
    return String(dataObject);
  }

  return "N/A";
};

// Helper function to format growth rate
const formatGrowthRate = (growthRateData: any): string => {
  let dataObject: any = null;

  // Try to parse if it's a string containing JSON
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

  // Now check the (potentially parsed) object or primitive
  if (typeof dataObject === 'object' && dataObject !== null) {
    // Check for value first, then cagr
    const rateValue = dataObject.value ?? dataObject.cagr;
    if (rateValue !== undefined && rateValue !== null) {
        const numericValue = Number(rateValue);
        // Format as percentage if it's a number
        return !isNaN(numericValue) ? `${numericValue}%` : `${rateValue}%`; 
    }
  } else if (dataObject !== undefined && dataObject !== null) {
     // Handle primitives: Check if it looks like a number to add %
     const num = Number(dataObject);
     if (!isNaN(num)) {
         return `${num}%`;
     }
     // Otherwise, return as string
     return String(dataObject);
  }

  return "N/A";
};

export function ReportsList({ userId, searchTerm }: ReportsListProps) {
  const [reports, setReports] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchReports() {
      try {
        setLoading(true)
        const supabase = getSupabaseClient()
        const { data, error } = await supabase
          .from("reports")
          .select("*")
          .eq("user_id", userId)
          .ilike("keyword", `%${searchTerm}%`) // Apply search filter
          .order("created_at", { ascending: false })

        if (error) {
          console.error("Error fetching reports:", error)
        } else {
          setReports(data || [])
        }
      } catch (error) {
        console.error("Error fetching reports:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchReports()
  }, [userId, searchTerm])

  if (loading) {
    return <div>Loading reports...</div>
  }

  if (reports.length === 0) {
    return <div>No reports found.</div>
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {reports.map((report) => (
        <Link key={report.id} href={`/reports/${report.id}`}>
          <Card className="hover:shadow-md transition-shadow cursor-pointer border-blue-100">
            <CardHeader>
              <CardTitle className="line-clamp-1">{report.title || report.keyword}</CardTitle>
              <CardDescription>Created at: {new Date(report.created_at).toLocaleDateString()}</CardDescription>
            </CardHeader>
            <CardContent>
              {report.content ? (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium">Market Size:</div>
                    <div className="text-sm">
                      {formatMarketSize(report.content.marketSize)}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium">Growth Rate:</div>
                    <div className="text-sm">
                      {formatGrowthRate(report.content.growthRate)}
                    </div>
                  </div>
                  <div className="flex items-center gap-1 mt-3">
                    {report.content.keyPlayersData && <BarChart3 className="h-4 w-4 text-muted-foreground" />}
                    {report.content.forecastData && <LineChart className="h-4 w-4 text-muted-foreground" />}
                  </div>
                </div>
              ) : (
                <div>
                  <p className="text-sm">
                    Market Size: 
                    {formatMarketSize(report.market_size)}
                  </p>
                  <p className="text-sm">
                    Growth Rate: 
                    {formatGrowthRate(report.growth_rate)}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}
