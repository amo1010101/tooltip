"use client"

import { useState, useEffect } from "react"
import { generateReport } from "@/app/actions/generate-report"
import { getSupabaseClient } from "@/lib/supabase/client"
import { generateReportPDF } from "@/utils/generate-pdf"

// Types
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
  // Nouvelles données pour plus de contenu
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

interface UseReportProps {
  keyword: string | null;
  url: string | null;
  geographicArea?: string | null;
}

export function useReport({ keyword, url, geographicArea }: UseReportProps) {
  const [report, setReport] = useState<Report | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("overview")
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false)
  const [reportSaved, setReportSaved] = useState(false)
  const [saveError, setSaveError] = useState<string | null>(null)
  const [activePieIndex, setActivePieIndex] = useState(0)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
  const [subscriptionStatus, setSubscriptionStatus] = useState<string | null>(null)
  const [sourceType, setSourceType] = useState<"keyword" | "url">(keyword ? "keyword" : "url")
  const [sourceValue, setSourceValue] = useState(keyword || url || "")
  const [area, setArea] = useState(geographicArea || "Worldwide")

  // Palette de couleurs adaptée au site
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

  // Vérifier l'authentification
  useEffect(() => {
    const checkAuth = async () => {
      const supabase = getSupabaseClient()
      const { data } = await supabase.auth.getSession()
      const isAuth = !!data.session
      setIsAuthenticated(isAuth)
      
      if (isAuth && data.session) {
        // Récupérer le statut d'abonnement
        const { data: userData, error } = await supabase
          .from('users')
          .select('subscription_status')
          .eq('id', data.session.user.id)
          .single()
          
        if (!error && userData) {
          setSubscriptionStatus(userData.subscription_status as string)
        }
      }
    }

    checkAuth()
  }, [])

  // Récupérer le rapport
  useEffect(() => {
    // Set the source type and value based on provided parameters
    if (keyword) {
      setSourceType("keyword")
      setSourceValue(keyword)
    } else if (url) {
      setSourceType("url")
      setSourceValue(url)
    }
    
    async function fetchReport() {
      if (!keyword && !url) {
        setError("No search criteria provided")
        setLoading(false)
        return
      }

      try {
        let reportData: any = null

        // Call the server action to generate the report
        if (keyword) {
          reportData = await generateReport(keyword, undefined, area)
        } else if (url) {
          reportData = await generateReport(undefined, url, area)
        }

        if (!reportData) {
          throw new Error("No report data returned")
        }

        // Générer des données complémentaires si elles n'existent pas dans la réponse API
        const enhancedReport = enhanceReportData(reportData);

        setReport(enhancedReport)
      } catch (err: any) {
        setError(`Failed to generate report: ${err.message}`)
        console.error("Error generating report:", err)
      } finally {
        setLoading(false)
      }
    }

    if (isAuthenticated !== null) {
      fetchReport()
    }
  }, [keyword, url, area, isAuthenticated])

  // Fonction pour améliorer les données du rapport avec des données supplémentaires si nécessaire
  const enhanceReportData = (reportData: any): Report => {
    // Traitement des données des acteurs clés
    if (reportData.keyPlayersData) {
      reportData.keyPlayersData = reportData.keyPlayersData.map((player: any) => ({
        ...player,
        share: Number(player.share),
      }))
    } else if (reportData.keyPlayers) {
      reportData.keyPlayersData = reportData.keyPlayers.map((name: string, index: number) => ({
        name,
        share: 30 - index * 5,
      }))
    }

    // Traitement des segments
    if (reportData.segments) {
      reportData.segments = reportData.segments.map((segment: any) => {
        if (!segment.value && segment.share) {
          const value = parseInt(segment.share)
          return { ...segment, value: isNaN(value) ? 10 : value }
        }
        return segment
      })
    }

    // Traitement des régions
    if (reportData.regions) {
      reportData.regions = reportData.regions.map((region: any) => {
        if (!region.value && region.share) {
          const value = parseInt(region.share)
          return { ...region, value: isNaN(value) ? 10 : value }
        }
        return region
      })
    }

    // Essayer d'extraire plus de données des tendances et défis s'ils existent
    if (!reportData.consumerData && reportData.trends) {
      reportData.consumerData = generateConsumerData(reportData);
    }
    
    if (!reportData.technologyData && (reportData.trends || reportData.opportunities)) {
      reportData.technologyData = generateTechnologyData(reportData);
    }
    
    if (!reportData.regulatoryData && (reportData.challenges || reportData.trends)) {
      reportData.regulatoryData = generateRegulatoryData(reportData);
    }
    
    if (!reportData.competitorsData && reportData.keyPlayersData) {
      reportData.competitorsData = generateCompetitorData(reportData);
    }

    return reportData;
  }

  // Génère des données sur les consommateurs à partir des tendances et défis
  const generateConsumerData = (reportData: any) => {
    const behaviors = reportData.trends
      .filter((trend: string) => 
        trend.toLowerCase().includes('consommateur') || 
        trend.toLowerCase().includes('client') || 
        trend.toLowerCase().includes('acheteur') ||
        trend.toLowerCase().includes('consumer') ||
        trend.toLowerCase().includes('customer')
      )
      .slice(0, 5);

    return {
      demographics: [
        { age: "18-24", value: 15 },
        { age: "25-34", value: 30 },
        { age: "35-44", value: 25 },
        { age: "45-54", value: 20 },
        { age: "55+", value: 10 },
      ],
      preferences: [
        { name: "Online", value: 60 },
        { name: "In-Store", value: 25 },
        { name: "Mobile App", value: 15 },
      ],
      purchaseFactors: [
        { factor: "Price", value: 85 },
        { factor: "Quality", value: 78 },
        { factor: "Brand Reputation", value: 65 },
        { factor: "Sustainability", value: 45 },
        { factor: "Convenience", value: 72 },
      ],
      behaviorTrends: behaviors.map((trend: string, index: number) => ({
        trend,
        impact: ["High", "Medium", "Very High", "Medium", "High"][index % 5],
        description: [
          "Growing trend with significant influence on purchasing decisions.",
          "Rapidly evolving consumer preference with long-term market implications.",
          "Emerging pattern affecting specific market segments.",
          "Established behavior pattern driving product development.",
          "Recent shift in consumer attitudes with measurable market impact."
        ][index % 5]
      }))
    };
  }

  // Génère des données sur la technologie à partir des tendances et opportunités
  const generateTechnologyData = (reportData: any) => {
    const techTrends = [...(reportData.trends || []), ...(reportData.opportunities || [])]
      .filter((item: string) => 
        item.toLowerCase().includes('technolog') || 
        item.toLowerCase().includes('innovat') || 
        item.toLowerCase().includes('digital') ||
        item.toLowerCase().includes('ia') ||
        item.toLowerCase().includes('ai') ||
        item.toLowerCase().includes('cloud') ||
        item.toLowerCase().includes('data')
      )
      .slice(0, 6);

    return {
      adoptionTimeline: [
        { year: "2020", technologies: { AI: 20, IoT: 15, Blockchain: 10, Cloud: 40, "5G": 5 } },
        { year: "2021", technologies: { AI: 35, IoT: 25, Blockchain: 20, Cloud: 55, "5G": 15 } },
        { year: "2022", technologies: { AI: 50, IoT: 40, Blockchain: 30, Cloud: 70, "5G": 30 } },
        { year: "2023", technologies: { AI: 65, IoT: 55, Blockchain: 40, Cloud: 80, "5G": 50 } },
        { year: "2024", technologies: { AI: 80, IoT: 70, Blockchain: 50, Cloud: 90, "5G": 70 } },
      ],
      rdInvestment: [
        { sector: "Software", value: 45 },
        { sector: "Hardware", value: 30 },
        { sector: "Services", value: 25 },
        { sector: "Research", value: 20 },
        { sector: "Patents", value: 15 },
      ],
      techImpact: [
        { technology: "Artificial Intelligence", value: 85 },
        { technology: "Internet of Things", value: 75 },
        { technology: "Cloud Computing", value: 90 },
        { technology: "Blockchain", value: 45 },
        { technology: "5G", value: 70 },
        { technology: "Quantum Computing", value: 25 },
      ],
      innovationTrends: techTrends.map((trend: string, index: number) => ({
        trend,
        impact: ["Very High", "High", "Medium", "High", "Medium", "Very High"][index % 6],
        readiness: ["High", "Medium", "Low", "Medium", "High", "Medium"][index % 6],
        description: [
          "Revolutionizing core processes with significant market disruption potential.",
          "Creating new solution categories with strong growth metrics.",
          "Enhancing efficiency and scalability across the value chain.",
          "Early-stage development with long-term strategic implications.",
          "Driving competitive advantage through operational excellence.",
          "Creating new customer engagement paradigms with broad applications."
        ][index % 6]
      }))
    };
  }

  // Génère des données réglementaires à partir des défis et tendances
  const generateRegulatoryData = (reportData: any) => {
    const regItems = [...(reportData.challenges || []), ...(reportData.trends || [])]
      .filter((item: string) => 
        item.toLowerCase().includes('regul') || 
        item.toLowerCase().includes('légis') || 
        item.toLowerCase().includes('législ') ||
        item.toLowerCase().includes('règlement') ||
        item.toLowerCase().includes('loi') ||
        item.toLowerCase().includes('compliance') ||
        item.toLowerCase().includes('politique')
      )
      .slice(0, 6);

    const regulations = regItems.map((item: string, index: number) => {
      const statuses = ["Enforced", "Phase-in", "Proposed", "Enforced", "Phase-in", "Proposed"];
      const regions = ["European Union", "United States", "Global", "France", "European Union", "United States"];
      const impacts = ["High", "Medium", "High", "Medium", "High", "Medium"];
      const deadlines = ["Implemented", "2024", "2025", "Implemented", "2024", "Unknown"];
      
      return {
        name: item,
        region: regions[index % 6],
        impact: impacts[index % 6],
        status: statuses[index % 6],
        description: `Regulatory framework impacting ${item.toLowerCase()}.`,
        compliance: index % 2 === 0 ? "Mandatory" : "Variable based on criteria",
        deadline: deadlines[index % 6],
        penalty: "Varies by jurisdiction"
      };
    });

    return {
      regulations: regulations.length > 0 ? regulations : [
        {
          name: "GDPR Compliance",
          region: "European Union",
          impact: "High",
          status: "Enforced",
          description: "General Data Protection Regulation impacting data collection, storage, and processing practices.",
          compliance: "Mandatory",
          deadline: "Implemented",
          penalty: "Up to €20 million or 4% of global revenue"
        },
        {
          name: "Digital Services Act (DSA)",
          region: "European Union",
          impact: "High",
          status: "Phase-in",
          description: "New framework to regulate digital services and ensure user protection online.",
          compliance: "Mandatory for online platforms",
          deadline: "February 2024",
          penalty: "Up to 6% of global turnover"
        }
      ],
      considerations: [
        "Companies must maintain continuous monitoring of evolving regulatory landscapes.",
        "Cross-border operations require adherence to multiple regulatory frameworks simultaneously.",
        "Privacy-by-design and security-by-design principles are increasingly mandated by regulations.",
        "Data localization requirements vary significantly by region.",
        "Demonstrable compliance through documentation and processes is essential.",
        "Appointment of dedicated compliance officers for key regulations is becoming standard practice."
      ]
    };
  }

  // Génère des données sur les concurrents à partir des acteurs clés
  const generateCompetitorData = (reportData: any) => {
    return {
      profiles: reportData.keyPlayersData.map((player: any, index: number) => ({
        name: player.name,
        share: player.share,
        strengths: [
          ["Strong R&D", "Customer focus", "Price leader", "Innovation leader"][index % 4],
          ["Global presence", "Regional focus", "Diversified", "Specialized"][index % 4],
          ["Expanding", "Stable", "Growing", "Emerging"][index % 4]
        ],
        weaknesses: [
          ["Limited innovation", "High prices", "Regional focus only", "Narrow product range"][index % 4],
          ["Limited market presence", "Quality issues", "Customer service", "Supply chain challenges"][index % 4]
        ],
        strategies: [
          ["Expansion", "Diversification", "Cost leadership", "Premium positioning"][index % 4],
          ["Market penetration", "Innovation focus", "Consolidation", "Strategic partnerships"][index % 4]
        ]
      })),
      rdInvestment: reportData.keyPlayersData.map((player: any) => ({
        name: player.name,
        value: 20 + Math.floor(player.share)
      })),
      strategicPosition: [
        { name: "Quality", value: 85 },
        { name: "Price", value: 65 },
        { name: "Innovation", value: 78 },
        { name: "Market Share", value: 55 },
        { name: "Customer Loyalty", value: 72 },
      ]
    };
  }

  // Fonction pour télécharger le PDF
  const handleDownloadPDF = async () => {
    if (!report) return

    try {
      setIsGeneratingPDF(true)

      // Assurez-vous que tous les onglets sont rendus pour capturer les graphiques
      // Nous allons temporairement activer chaque onglet pour rendre ses graphiques
      const tabs = ["overview", "segments", "regions", "forecast"]
      const originalTab = activeTab

      // Fonction pour attendre un court instant pour le rendu
      const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

      // Activer chaque onglet brièvement pour s'assurer que les graphiques sont rendus
      for (const tab of tabs) {
        setActiveTab(tab)
        await wait(500) // Attendre que le DOM soit mis à jour
      }

      // Revenir à l'onglet d'origine
      setActiveTab(originalTab)
      await wait(500)

      // Simuler un délai pour montrer l'animation de chargement
      await wait(3000)

      // Générer et télécharger le PDF
      await generateReportPDF(report, keyword || url || "")
    } catch (error) {
      console.error("Error generating PDF:", error)
      alert("Une erreur s'est produite lors de la génération du PDF. Veuillez réessayer.")
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
    reportSaved,
    setReportSaved,
    saveError,
    setSaveError,
    activePieIndex,
    setActivePieIndex,
    isAuthenticated,
    subscriptionStatus,
    sourceType,
    sourceValue,
    geographicArea: area,
    COLORS,
    handleDownloadPDF
  }
} 