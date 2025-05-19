"use client"

import { useParams } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, FileText, Globe } from "lucide-react"

import { Button } from "@/components/ui/button"
import { VerticalTabs, VerticalTabsContent, VerticalTabsList, VerticalTabsTrigger } from "@/components/ui/vertical-tabs"
import { ReportLoader } from "@/components/report-loader"
import { ResponsiveHeader } from "@/components/responsive-header"

// Import the new hook
import { useSavedReport } from "./hooks/useSavedReport"
// Import shared components
import {
  MarketOverview,
  MarketSegments,
  MarketForecast,
  RegionalAnalysis,
  SwotAnalysis,
  TrendsSection,
  CompetitorAnalysis,
  ConsumerInsights,
  TechnologyInnovation,
  RegulatoryAnalysis,
  SidebarActions // Assuming SidebarActions can be reused/adapted
} from "@/components/report-sections"

export default function ReportViewPage() {
  const params = useParams()
  const reportId = params.id as string

  // Use the new hook
  const {
    report,
    loading,
    error,
    activeTab,
    setActiveTab,
    isGeneratingPDF,
    isAuthenticated,
    subscriptionStatus,
    COLORS,
    handleDownloadPDF,
    keyword,
    geographicArea
  } = useSavedReport(reportId)

  // Error handling (similar to generate/results)
  if (error) {
    return (
      <div className="flex min-h-screen flex-col">
        <ResponsiveHeader />
        <main className="flex-1 container py-6 sm:py-12 px-4">
          <div className="flex flex-col items-center justify-center h-[50vh] text-center">
            <div className="text-destructive mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-10 w-10 sm:h-12 sm:w-12 mx-auto"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" x2="12" y1="8" y2="12" />
                <line x1="12" x2="12.01" y1="16" y2="16" />
              </svg>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold mb-2">Error Loading Report</h2>
            <p className="text-muted-foreground mb-6">{error}</p>
            <Button asChild>
              <Link href="/my-reports">Back to My Reports</Link>
            </Button>
          </div>
        </main>
      </div>
    )
  }

  // Loading state
  if (loading || !report) { // Ensure report is loaded too
    return <ReportLoader keyword={keyword || "Report"} mode="loading" geographicArea={geographicArea} />
  }

  // Main component structure (adapted from generate/results)
  return (
    <div className="flex min-h-screen flex-col">
      <ResponsiveHeader />
      <main className="flex-1">
        <div className="container px-4 py-4 sm:py-6 md:px-6 md:py-8">
          <div className="mb-4 sm:mb-6">
            <Button variant="ghost" size="sm" asChild className="mb-2 sm:mb-4">
              <Link href="/my-reports"> {/* Link back to my-reports */}
                <ArrowLeft className="mr-2 h-4 w-4" />
                <span className="text-sm">Back to My Reports</span>
              </Link>
            </Button>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight">{report.title || "Market Report"}</h1>
            <p className="mt-2 text-sm sm:text-base text-muted-foreground whitespace-pre-line">{report.summary}</p>
            <div className="mt-3 sm:mt-4 flex flex-wrap gap-2">
              <div className="inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-semibold">
                <FileText className="mr-1 h-3 w-3" />
                AI Generated
              </div>
              <div className="inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-semibold">
                <Globe className="mr-1 h-3 w-3" />
                {geographicArea || "Global"}
              </div>
              {/* Add other badges if needed, e.g., saved status? */}
            </div>
          </div>
          
          {/* Grid layout with vertical tabs */}
          <div className="grid gap-6 lg:grid-cols-[250px_1fr]">
            {/* Vertical tabs navigation */}
            <div className="bg-background rounded-lg border shadow-sm p-2">
              <VerticalTabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
                <VerticalTabsList className="flex flex-col gap-1">
                  <VerticalTabsTrigger value="overview">Overview</VerticalTabsTrigger>
                  <VerticalTabsTrigger value="segments">Market Segments</VerticalTabsTrigger>
                  <VerticalTabsTrigger value="regions">Regional Analysis</VerticalTabsTrigger>
                  <VerticalTabsTrigger value="forecast">Growth Forecast</VerticalTabsTrigger>
                  <VerticalTabsTrigger value="competitors">Competitor Analysis</VerticalTabsTrigger>
                  <VerticalTabsTrigger value="swot">SWOT Analysis</VerticalTabsTrigger>
                  <VerticalTabsTrigger value="trends">Market Trends</VerticalTabsTrigger>
                  <VerticalTabsTrigger value="consumer">Consumer Insights</VerticalTabsTrigger>
                  <VerticalTabsTrigger value="technology">Technology & Innovation</VerticalTabsTrigger>
                  <VerticalTabsTrigger value="regulatory">Regulatory Analysis</VerticalTabsTrigger>
                </VerticalTabsList>
              </VerticalTabs>
            </div>
            
            {/* Content area using shared components */}
            <div>
              <VerticalTabs value={activeTab}>
                <VerticalTabsContent value="overview">
                  <MarketOverview 
                    report={report} 
                    isAuthenticated={isAuthenticated} 
                    COLORS={COLORS} 
                  />
                </VerticalTabsContent>
                
                <VerticalTabsContent value="segments">
                  <MarketSegments 
                    report={report}
                    isAuthenticated={isAuthenticated}
                    subscriptionStatus={subscriptionStatus}
                  />
                </VerticalTabsContent>
                
                <VerticalTabsContent value="regions">
                  <RegionalAnalysis 
                    report={report}
                    isAuthenticated={isAuthenticated}
                    subscriptionStatus={subscriptionStatus}
                  />
                </VerticalTabsContent>
                
                <VerticalTabsContent value="forecast">
                  <MarketForecast
                    report={report}
                    isAuthenticated={isAuthenticated}
                    subscriptionStatus={subscriptionStatus}
                    COLORS={COLORS}
                  />
                </VerticalTabsContent>
                
                <VerticalTabsContent value="competitors">
                  <CompetitorAnalysis
                    report={report}
                    isAuthenticated={isAuthenticated}
                    subscriptionStatus={subscriptionStatus}
                    COLORS={COLORS}
                  />
                </VerticalTabsContent>
                
                <VerticalTabsContent value="swot">
                  <SwotAnalysis
                    report={report}
                    isAuthenticated={isAuthenticated}
                    subscriptionStatus={subscriptionStatus}
                  />
                </VerticalTabsContent>
                
                <VerticalTabsContent value="trends">
                  <TrendsSection
                    report={report}
                    isAuthenticated={isAuthenticated}
                    subscriptionStatus={subscriptionStatus}
                  />
                </VerticalTabsContent>
                
                <VerticalTabsContent value="consumer">
                  <ConsumerInsights
                    report={report}
                    isAuthenticated={isAuthenticated}
                    subscriptionStatus={subscriptionStatus}
                    COLORS={COLORS}
                  />
                </VerticalTabsContent>
                
                <VerticalTabsContent value="technology">
                  <TechnologyInnovation
                    report={report}
                    isAuthenticated={isAuthenticated}
                    subscriptionStatus={subscriptionStatus}
                    COLORS={COLORS}
                  />
                </VerticalTabsContent>
                
                <VerticalTabsContent value="regulatory">
                  <RegulatoryAnalysis
                    report={report}
                    isAuthenticated={isAuthenticated}
                    subscriptionStatus={subscriptionStatus}
                    COLORS={COLORS}
                  />
                </VerticalTabsContent>
              </VerticalTabs>
            </div>
          </div>

          {/* Report sidebar with actions - Reusing SidebarActions */}
          {/* Need to check if props match or need adjustment */}
          <div className="mt-6">
            <div className="container px-4 md:px-6">
              <SidebarActions
                report={report}
                isAuthenticated={isAuthenticated}
                subscriptionStatus={subscriptionStatus}
                // Pass keyword/geographicArea instead of sourceType/sourceValue if needed by SidebarActions
                sourceType={undefined} // Or adjust SidebarActions to accept keyword/area
                sourceValue={keyword}
                isGeneratingPDF={isGeneratingPDF}
                handleDownloadPDF={handleDownloadPDF}
                geographicArea={geographicArea}
                // Add props to indicate this is a saved report if needed (e.g., disable save button)
                isSavedReport={true}
              />
            </div>
          </div>
        </div>
      </main>
      {/* PDF Generation Loader */}
      {isGeneratingPDF && <ReportLoader keyword={keyword} mode="generating" geographicArea={geographicArea} />}
    </div>
  )
}
