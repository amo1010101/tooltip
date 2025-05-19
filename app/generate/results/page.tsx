"use client"

import { useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { VerticalTabs, VerticalTabsContent, VerticalTabsList, VerticalTabsTrigger } from "@/components/ui/vertical-tabs"
import { ReportLoader } from "@/components/report-loader"
import { ResponsiveHeader } from "@/components/responsive-header"

import { useReport } from "./hooks/useReport"
import {
  MarketOverview,
  MarketSegments,
  MarketForecast,
  RegionalAnalysis,
  SwotAnalysis,
  TrendsSection,
  SidebarActions,
  CompetitorAnalysis,
  ConsumerInsights,
  TechnologyInnovation,
  RegulatoryAnalysis
} from "@/components/report-sections"

export default function ResultsPage() {
  const searchParams = useSearchParams()
  const keyword = searchParams.get("keyword")
  const url = searchParams.get("url")
  const geographicArea = searchParams.get("geographicArea")
  
  const {
    report,
    loading,
    error,
    activeTab,
    setActiveTab,
    isGeneratingPDF,
    reportSaved,
    saveError,
    isAuthenticated,
    subscriptionStatus,
    sourceType,
    sourceValue,
    geographicArea: area,
    COLORS,
    handleDownloadPDF
  } = useReport({ keyword, url, geographicArea })

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
            <h2 className="text-xl sm:text-2xl font-bold mb-2">{error}</h2>
            <p className="text-muted-foreground mb-6">There was an error generating your report.</p>
            <Button asChild>
              <Link href="/generate">Try Again</Link>
            </Button>
          </div>
        </main>
      </div>
    )
  }

  // Afficher le loader pendant le chargement initial
  if (loading) {
    return <ReportLoader keyword={keyword || url || ""} mode="loading" geographicArea={geographicArea || "Worldwide"} />
  }

  return (
    <div className="flex min-h-screen flex-col">
      <ResponsiveHeader />
      <main className="flex-1">
        <div className="container px-4 py-4 sm:py-6 md:px-6 md:py-8">
          <div className="mb-4 sm:mb-6">
            <Button variant="ghost" size="sm" asChild className="mb-2 sm:mb-4">
              <Link href="/generate">
                <ArrowLeft className="mr-2 h-4 w-4" />
                <span className="text-sm">Back to Generator</span>
              </Link>
            </Button>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight">{report?.title || "Market Report"}</h1>
            <p className="mt-2 text-sm sm:text-base text-muted-foreground whitespace-pre-line">{report?.summary}</p>
            <div className="mt-3 sm:mt-4 flex flex-wrap gap-2">
              <div className="inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-semibold">
                AI Generated
              </div>
              <div className="inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-semibold">
                {area || "Global"}
              </div>
              {reportSaved && (
                <div className="inline-flex items-center rounded-md bg-green-100 border-green-300 border px-2 py-0.5 text-xs font-semibold text-green-800">
                  Rapport sauvegardé
                </div>
              )}
              {saveError && (
                <div className="inline-flex items-center rounded-md bg-red-100 border-red-300 border px-2 py-0.5 text-xs font-semibold text-red-800">
                  Erreur: {saveError}
                </div>
              )}
            </div>
          </div>
          
          {/* Updated layout: Grid with vertical tabs on left, content on right */}
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
            
            {/* Content area */}
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

          {/* Report sidebar with details and actions */}
          <div className="mt-6">
            <div className="container px-4 md:px-6">
              <SidebarActions
                report={report}
                isAuthenticated={isAuthenticated}
                subscriptionStatus={subscriptionStatus}
                sourceType={sourceType}
                sourceValue={sourceValue}
                isGeneratingPDF={isGeneratingPDF}
                handleDownloadPDF={handleDownloadPDF}
                geographicArea={area}
              />
            </div>
          </div>
        </div>
      </main>
      {isGeneratingPDF && <ReportLoader keyword={sourceValue} mode="generating" geographicArea={area} />}
    </div>
  )
}
