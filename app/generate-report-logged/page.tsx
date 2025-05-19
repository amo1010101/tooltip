"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowRight, BarChart2, Search, Sparkles, Lightbulb, TrendingUp, Zap } from "lucide-react"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { ResponsiveHeader } from "@/components/responsive-header"
import { getSupabaseClient } from "@/lib/supabase/client"

export default function GenerateReportLoggedPage() {
  const router = useRouter()
  const [keyword, setKeyword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!keyword.trim()) {
      setError("Please enter a keyword to generate a report")
      return
    }

    setError(null)
    setIsLoading(true)

    try {
      const supabase = getSupabaseClient()
      const { data: { session } } = await supabase.auth.getSession()

      if (!session) {
        router.push('/login')
        return
      }

      // Redirect to results page with the keyword
      router.push(`/generate/results?keyword=${encodeURIComponent(keyword.trim())}`)
    } catch (error) {
      console.error('Error:', error)
      setError('An error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const popularKeywords = [
    "Electric Vehicles",
    "Renewable Energy",
    "Artificial Intelligence",
    "Cloud Computing",
    "Sustainable Fashion",
    "Digital Health",
  ]

  const exampleReports = [
    {
      title: "Electric Vehicles Market Report",
      description:
        "Comprehensive analysis of the global EV market, including growth projections, key players, and regional insights.",
      icon: <TrendingUp className="h-5 w-5 text-blue-500" />,
    },
    {
      title: "AI in Healthcare Market Analysis",
      description:
        "Detailed overview of AI applications in healthcare, market size, adoption trends, and future outlook.",
      icon: <Sparkles className="h-5 w-5 text-blue-500" />,
    },
    {
      title: "Renewable Energy Industry Insights",
      description:
        "In-depth analysis of the renewable energy sector, including solar, wind, and hydroelectric power markets.",
      icon: <Zap className="h-5 w-5 text-blue-500" />,
    },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <ResponsiveHeader />

      <main className="flex-1 bg-gradient-to-b from-white to-blue-50">
        <div className="container px-4 py-8 md:py-16">
          <div className="mx-auto max-w-3xl text-center mb-8 md:mb-12">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl text-gray-900">
                Generate Your <span className="text-blue-600">Market Report</span>
              </h1>
              <p className="mt-4 text-lg text-gray-600 md:text-xl">
                Enter a keyword, industry, or product to generate a comprehensive market report powered by AI.
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mx-auto max-w-2xl"
          >
            <Card className="border-2 border-blue-100 shadow-lg">
              <CardContent className="p-6 md:p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                      <Input
                        type="text"
                        placeholder="e.g., Electric Vehicles, Renewable Energy, AI..."
                        className="pl-10 h-12 text-base border-blue-200 focus:border-blue-500"
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                      />
                    </div>
                    {error && <div className="text-red-500 text-sm font-medium">{error}</div>}
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-12 text-base bg-blue-600 hover:bg-blue-700"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <span className="flex items-center">
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Generating Report...
                      </span>
                    ) : (
                      <span className="flex items-center">
                        Generate Report
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </span>
                    )}
                  </Button>
                </form>

                <div className="mt-6">
                  <p className="text-sm text-gray-500 mb-2">Popular keywords:</p>
                  <div className="flex flex-wrap gap-2">
                    {popularKeywords.map((kw) => (
                      <button
                        key={kw}
                        type="button"
                        className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 hover:bg-blue-100 transition-colors"
                        onClick={() => setKeyword(kw)}
                      >
                        {kw}
                      </button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-16"
          >
            <h2 className="text-2xl font-bold text-center mb-8 text-gray-900">Example Reports</h2>
            <div className="grid gap-6 md:grid-cols-3">
              {exampleReports.map((report, index) => (
                <Card key={index} className="border border-blue-100 hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                        {report.icon}
                      </div>
                      <h3 className="font-semibold text-gray-900">{report.title}</h3>
                    </div>
                    <p className="text-sm text-gray-600">{report.description}</p>
                    <Button
                      variant="ghost"
                      className="mt-4 text-blue-600 hover:text-blue-700 hover:bg-blue-50 p-0"
                      onClick={() => setKeyword(report.title.split(" ")[0])}
                    >
                      Try this example
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-16 mx-auto max-w-3xl text-center"
          >
            <div className="bg-blue-50 border border-blue-100 rounded-lg p-6 md:p-8">
              <div className="flex justify-center mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                  <Lightbulb className="h-6 w-6 text-blue-600" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">How It Works</h3>
              <p className="text-gray-600 mb-6">
                Our AI analyzes millions of data points from trusted sources to generate comprehensive market reports in
                seconds. Each report includes market size, growth trends, competitive landscape, and future projections.
              </p>
              <div className="flex justify-center gap-4">
                <Link href="/pricing">
                  <Button variant="outline" className="border-blue-200 text-blue-600 hover:bg-blue-50">
                    View Pricing
                  </Button>
                </Link>
                <Link href="/reports">
                  <Button variant="outline" className="border-blue-200 text-blue-600 hover:bg-blue-50">
                    Browse Reports
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      <footer className="border-t py-8 bg-white">
        <div className="container px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <BarChart2 className="h-5 w-5 text-blue-600" />
              <span className="font-semibold">Insytra</span>
            </div>
            <p className="text-sm text-gray-500">© {new Date().getFullYear()} Insytra. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
} 