"use client"

import { useState, useEffect } from "react"
import { getSupabaseClient } from "@/lib/supabase/client"
import { generateReportPDF } from "@/utils/generate-pdf"
import { enhanceReportData } from "@/utils/report-utils" // Import the enhancer
import { useToast } from "@/components/ui/use-toast"

// Reuse the Report interface (consider moving to a shared types file)
interface Report {
  title: string;
  summary: string;
  marketSize: string;
  growthRate: string;
  keyPlayers: string[];
  keyPlayersData: Array<{
    name: string;
    share: number;
  }>;
  segments: Array<{
    name: string;
    description: string;
    share: string;
    value?: number;
  }>;
  regions: Array<{
    name: string;
    description: string;
    share: string;
    value?: number;
  }>;
  trends: string[];
  challenges: string[];
  opportunities: string[];
  forecast: string;
  forecastData: Array<{
    year: number;
    value: number;
  }>;
  swot?: {
    strengths: string[];
    weaknesses: string[];
    opportunities: string[];
    threats: string[];
  };
  consumerData?: {
    demographics: Array<{
      age: string;
      value: number;
    }>;
    preferences: Array<{
      name: string;
      value: number;
    }>;
    purchaseFactors: Array<{
      factor: string;
      value: number;
    }>;
    behaviorTrends: Array<{
      trend: string;
      impact: string;
      description: string;
    }>;
  };
  technologyData?: {
    adoptionTimeline: Array<{
      year: string;
      technologies: Record<string, number>;
    }>;
    rdInvestment: Array<{
      sector: string;
      value: number;
    }>;
    techImpact: Array<{
      technology: string;
      value: number;
    }>;
    innovationTrends: Array<{
      trend: string;
      impact: string;
      readiness: string;
      description: string;
    }>;
  };
  regulatoryData?: {
    regulations: Array<{
      name: string;
      region: string;
      impact: string;
      status: string;
      description: string;
      compliance: string;
      deadline: string;
      penalty: string;
    }>;
    considerations: string[];
  };
  competitorsData?: {
    profiles: Array<{
      name: string;
      share: number;
      strengths: string[];
      weaknesses: string[];
      strategies: string[];
    }>;
    rdInvestment: Array<{
      name: string;
      value: number;
    }>;
    strategicPosition: Array<{
      name: string;
      value: number;
    }>;
  };
}



export function useSavedReport(reportId: string | null) {
  const [report, setReport] = useState<Report | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("overview")
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
  const [subscriptionStatus, setSubscriptionStatus] = useState<string | null>(null)
  const [keyword, setKeyword] = useState<string>("") // Keyword for PDF generation
  const [geographicArea, setGeographicArea] = useState<string>("Global") // Geographic Area for PDF
  const { addToast } = useToast()


  // Palette de couleurs (same as useReport)
  const COLORS = [
    "hsl(var(--primary))",
    "hsl(var(--chart-1))",
    "hsl(var(--chart-2))",
    "hsl(var(--chart-3))",
    "hsl(var(--chart-4))",
    "hsl(var(--chart-5))",
    "hsl(var(--chart-6))",
    "hsl(var(--chart-7))",
    "hsl(var(--chart-8))",
    "hsl(var(--chart-9))",
    "hsl(var(--chart-10))",
    "hsl(var(--chart-11))",
    "hsl(var(--chart-12))",
    "hsl(var(--destructive))",
    "hsl(var(--warning))",
    "hsl(var(--success))",
  ]

  // Vérifier l'authentification et statut (copied from useReport)
  useEffect(() => {
    const checkAuth = async () => {
      const supabase = getSupabaseClient()
      const { data } = await supabase.auth.getSession()
      const isAuth = !!data.session
      setIsAuthenticated(isAuth)
      
      if (isAuth && data.session) {
        const { data: userData, error } = await supabase
          .from('users')
          .select('subscription_status')
          .eq('id', data.session.user.id)
          .single()
          
        if (!error && userData) {
          setSubscriptionStatus(userData.subscription_status as string)
        } else if (error) {
          console.error("Error fetching subscription status:", error)
        }
      }
    }

    checkAuth()
  }, [])

  // Fetch the saved report from Supabase
  useEffect(() => {
    async function fetchReport() {
      if (!reportId) {
        setError("No report ID provided")
        setLoading(false)
        return
      }

      if (isAuthenticated === null) {
        // Wait for authentication check to complete
        return;
      }

      try {
        setLoading(true)
        const supabase = getSupabaseClient()

        const { data: reportData, error: reportError } = await supabase
          .from("reports")
          .select("*, user:users(subscription_status)") // Fetch user status along
          .eq("id", reportId)
          .single()

        if (reportError) {
          if (reportError.code === 'PGRST116') { // Code for "Not found"
             setError("Report not found or you don\'t have permission to view it.")
          } else {
             throw reportError
          }
        }

        if (!reportData) {
          setError("Report not found or you don\'t have permission to view it.")
          setLoading(false)
          return
        }

        // Set keyword and geographic area from fetched data if available
        setKeyword(reportData.keyword || "Market Analysis")
        setGeographicArea(reportData.geographic_area || "Global")

        // Use the stored content and enhance it
        if (reportData.content) {
          const enhanced = enhanceReportData(reportData.content)
          // Ensure the cast is applied correctly before setting state
          setReport(enhanced as Report)
        } else {
          // Handle case where report exists but has no content
          console.warn(`Report ${reportId} found but has no content.`) 
          setError("Report data is missing or corrupted.") // Passing string here
          setReport(null) // Also clear the report state
        }

        // setError(null) // Should be called only if reportData.content exists and enhancement succeeds
      } catch (err: any) {
        console.error("Error fetching report:", err)
        setError(err.message || "Failed to load report. Please try again.")
      } finally {
        setLoading(false)
      }
    }

    fetchReport()
  }, [reportId, isAuthenticated]) // Depend on reportId and authentication status

  // Fonction pour télécharger le PDF (adapted from useReport)
  const handleDownloadPDF = async () => {
    if (!report) return

    try {
      setIsGeneratingPDF(true)

      // Note: Activating tabs might not be necessary if rendering is handled differently now
      // Consider if the charts are always rendered or if this logic is still needed.
      // const tabs = ["overview", "segments", "regions", "forecast", "competitors", "trends", "consumer", "technology", "regulatory", "swot"];
      // const originalTab = activeTab;
      // const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
      // for (const tab of tabs) {
      //   setActiveTab(tab);
      //   await wait(100); 
      // }
      // setActiveTab(originalTab);
      // await wait(100);

      // Generate and download the PDF using fetched keyword/area - Remove geographicArea argument
      await generateReportPDF(report, keyword)

    } catch (error) {
      console.error("Error generating PDF:", error)
      addToast({
        variant: "destructive",
        title: "Error generating PDF",
        description: "An error occurred while generating the PDF. Please try again.",
      })
    } finally {
      setIsGeneratingPDF(false)
    }
  }

  return {
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
    keyword, // Expose keyword for potential use in UI
    geographicArea // Expose geographicArea for potential use in UI
  }
} 