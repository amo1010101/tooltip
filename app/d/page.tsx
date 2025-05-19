"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, BarChart2, Search, Zap, LineChart as LucideLineChart, PieChart, TrendingUp, CheckCircle } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ResponsiveHeader } from "@/components/responsive-header"
import { getSupabaseClient } from "@/lib/supabase/client"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

interface Metric {
  number: string;
  description: string;
}

interface GrowthData {
  year: number;
  value: number;
}

export default function DynamicLanding() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("overview")
  const [isVisible, setIsVisible] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [dynamicTitle, setDynamicTitle] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [metrics, setMetrics] = useState<Metric[]>([])
  const [growth, setGrowth] = useState<GrowthData[]>([])

  useEffect(() => {
    setIsVisible(true)
    checkAuthStatus()
    fetchDynamicTitle()
  }, [])

  const checkAuthStatus = async () => {
    try {
      const supabase = getSupabaseClient()
      const { data: { session } } = await supabase.auth.getSession()
      setIsLoggedIn(!!session)
    } catch (error) {
      console.error('Error checking auth status:', error)
    }
  }

  const fetchDynamicTitle = async () => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search)
      const utmTerm = urlParams.get('utm_term')
      
      if (!utmTerm) {
        setDynamicTitle("Rapport de recherche de marché personnalisé")
        setIsLoading(false)
        return
      }

      try {
        const response = await fetch(`/api/generate-title?utm_term=${encodeURIComponent(utmTerm)}`)
        const data = await response.json()
        console.log('API Response:', data)
        setDynamicTitle(data.title)
        setMetrics(data.metrics || [])
        setGrowth(data.growth || [])
      } catch (error) {
        console.error('Error fetching title:', error)
        setDynamicTitle("Rapport de recherche de marché personnalisé")
      } finally {
        setIsLoading(false)
      }
    }
  }

  const handleGenerateReport = () => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search)
      const utmTerm = urlParams.get('utm_term')
      router.push(`/generate?keyword=${encodeURIComponent(dynamicTitle || '')}`)
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      const basePath = '/generate'
      router.push(`${basePath}/results?keyword=${encodeURIComponent(searchTerm.trim())}`)
    }
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col">
        <ResponsiveHeader />
        <div className="flex items-center justify-center flex-1">
          <div className="flex items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            <p className="ml-4 text-lg text-gray-600">Searching our report database...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <ResponsiveHeader />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-background to-background/80 pt-8 md:pt-12">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] z-0"></div>
        <div className="container relative z-10">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-10 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col gap-3"
            >
              <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                <Zap className="mr-1 h-3 w-3" />
                <span>Customized report available</span>
              </div>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                {dynamicTitle}
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Access our in-depth analysis with exclusive data and strategic insights.
              </p>
              <div className="mt-8">
                <Button size="lg" onClick={handleGenerateReport}>
                  Access the Report
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.95 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="relative"
            >
              <div className="relative rounded-lg border bg-background p-6">
                <div className="mb-4">
                  <h2 className="text-xl font-bold mb-1">Key Report Highlights</h2>
                  <p className="text-sm text-muted-foreground">
                    A comprehensive market overview with up-to-date data
                  </p>
                </div>

                <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-3">
                  <TabsList className="grid w-full grid-cols-1 h-8">
                    <TabsTrigger value="overview" className="text-xs">Overview</TabsTrigger>
                  </TabsList>
                  <TabsContent value="overview" className="space-y-4">
                    <div className="grid grid-cols-1 gap-3">
                      {metrics.map((metric, index) => (
                        <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-primary/5 border border-primary/10">
                          <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                          <div>
                            <span className="font-bold text-xl text-primary">{metric.number}</span>
                            <p className="text-muted-foreground text-xs mt-0.5">{metric.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    {growth.length > 0 && (
                      <div className="mt-4">
                        <h3 className="text-sm font-semibold mb-2">Market Evolution</h3>
                        <div className="relative h-[200px] w-full">
                          <div className="absolute inset-0 z-10 backdrop-blur-sm rounded-lg border bg-white/50 flex items-center justify-center flex-col p-4">
                            <p className="text-sm font-medium text-center mb-3">Access the full report to see detailed analysis</p>
                            <Button size="sm" onClick={handleGenerateReport}>
                              Access the full report
                              <ArrowRight className="ml-2 h-3 w-3" />
                            </Button>
                          </div>
                          <div className="h-[200px] w-full p-2 rounded-lg bg-card border">
                            <ResponsiveContainer width="100%" height="100%">
                              <LineChart data={growth} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                <XAxis 
                                  dataKey="year" 
                                  stroke="#6b7280"
                                  tick={{ fill: '#6b7280', fontSize: 12 }}
                                />
                                <YAxis 
                                  stroke="#6b7280"
                                  tick={{ fill: '#6b7280', fontSize: 12 }}
                                  tickFormatter={(value) => `${value}%`}
                                />
                                <Tooltip 
                                  contentStyle={{ 
                                    backgroundColor: '#fff',
                                    border: '1px solid #e5e7eb',
                                    borderRadius: '0.5rem',
                                    fontSize: '12px'
                                  }}
                                  formatter={(value: any) => [`${value}%`, 'Growth']}
                                />
                                <Line
                                  type="monotone"
                                  dataKey="value"
                                  stroke="#2563eb"
                                  strokeWidth={2}
                                  dot={{ r: 4, fill: '#2563eb', strokeWidth: 2 }}
                                  activeDot={{ r: 6 }}
                                />
                              </LineChart>
                            </ResponsiveContainer>
                          </div>
                        </div>
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Animated Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-wave-pattern bg-repeat-x bg-contain"></div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container">
          <div className="text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl"
            >
              Contenu du rapport
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="mt-4 text-xl text-muted-foreground max-w-3xl mx-auto"
            >
              Une analyse complète et détaillée pour prendre les meilleures décisions.
            </motion.p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: <BarChart2 className="h-6 w-6 text-primary" />,
                title: "Market Analysis",
                description: "Market size, key segments and growth forecasts"
              },
              {
                icon: <LucideLineChart className="h-6 w-6 text-primary" />,
                title: "Trends",
                description: "Recent and future market developments"
              },
              {
                icon: <PieChart className="h-6 w-6 text-primary" />,
                title: "Competition",
                description: "Analysis of key players and their positioning"
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                viewport={{ once: true }}
              >
                <Card className="h-full">
                  <CardContent className="p-6">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-bold">{feature.title}</h3>
                    <p className="mt-2 text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/30 py-12">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between gap-8">
            <div className="mb-8 md:mb-0">
              <div className="flex items-center gap-2 mb-4">
                <BarChart2 className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold">Insytra</span>
              </div>
              <p className="text-muted-foreground max-w-xs">
                Plateforme de recherche de marché propulsée par l'IA pour des décisions stratégiques éclairées.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h3 className="font-semibold mb-4">Produit</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="/features" className="text-muted-foreground hover:text-foreground">
                      Fonctionnalités
                    </Link>
                  </li>
                  <li>
                    <Link href="/pricing" className="text-muted-foreground hover:text-foreground">
                      Tarifs
                    </Link>
                  </li>
                  <li>
                    <Link href="/reports" className="text-muted-foreground hover:text-foreground">
                      Rapports
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-4">Entreprise</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="/about" className="text-muted-foreground hover:text-foreground">
                      À propos
                    </Link>
                  </li>
                  <li>
                    <Link href="/blog" className="text-muted-foreground hover:text-foreground">
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact" className="text-muted-foreground hover:text-foreground">
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-4">Légal</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="/privacy" className="text-muted-foreground hover:text-foreground">
                      Confidentialité
                    </Link>
                  </li>
                  <li>
                    <Link href="/terms" className="text-muted-foreground hover:text-foreground">
                      Conditions
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-12 border-t pt-8 text-center text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} Insytra. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  )
} 