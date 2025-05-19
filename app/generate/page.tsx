"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowRight, BarChart2, Search, Sparkles, Lightbulb, TrendingUp, Zap, Globe, ShoppingCart, ShoppingBag, Package, X } from "lucide-react"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { ResponsiveHeader } from "@/components/responsive-header"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

interface KeywordBadgeProps {
  keyword: string;
  onRemove: () => void;
}

const KeywordBadge: React.FC<KeywordBadgeProps> = ({ keyword, onRemove }) => {
  return (
    <div className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700">
      {keyword}
      <button
        type="button"
        onClick={onRemove}
        className="rounded-full p-1 hover:bg-blue-200 transition-colors"
      >
        <X className="h-3 w-3" />
      </button>
    </div>
  )
}

export default function GeneratePage() {
  const router = useRouter()
  const [keyword, setKeyword] = useState("")
  const [showKeywordBadge, setShowKeywordBadge] = useState(false)
  const [url, setUrl] = useState("")
  const [searchMode, setSearchMode] = useState<"keyword" | "url">("keyword")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [geoOption, setGeoOption] = useState<"worldwide" | "custom">("worldwide")
  const [customGeoArea, setCustomGeoArea] = useState("")

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search)
      const keywordParam = urlParams.get('keyword')
      if (keywordParam) {
        setKeyword(decodeURIComponent(keywordParam))
        setShowKeywordBadge(true)
      }
    }
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (searchMode === "keyword" && !keyword.trim()) {
      setError("Please enter a keyword to generate a report")
      return
    }

    if (searchMode === "url" && !url.trim()) {
      setError("Please enter a URL to generate a report")
      return
    }

    setError(null)
    setIsLoading(true)

    // Get the final geographic area value based on user's selection
    const geographicArea = geoOption === "worldwide" ? "Worldwide" : customGeoArea.trim()

    // Redirect to results page with the appropriate parameter
    if (searchMode === "keyword") {
      router.push(`/generate/results?keyword=${encodeURIComponent(keyword.trim())}&geographicArea=${encodeURIComponent(geographicArea)}`)
    } else {
      router.push(`/generate/results?url=${encodeURIComponent(url.trim())}&geographicArea=${encodeURIComponent(geographicArea)}`)
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

  const exampleUrls = [
    {
      url: "https://www.amazon.com/Apple-MacBook-16-inch-10-core-16-core/dp/B09JQKBQSB",
      icon: <ShoppingCart className="h-4 w-4 text-orange-500 mr-2" />,
      name: "Amazon"
    },
    {
      url: "https://www.etsy.com/listing/1215592144/custom-pet-portrait-pet-portrait-custom",
      icon: <ShoppingBag className="h-4 w-4 text-teal-500 mr-2" />,
      name: "Etsy"
    },
    {
      url: "https://tesla-motors.myshopify.com/products/men-raven-lightweight-zip-up-bomber-jacket",
      icon: <Package className="h-4 w-4 text-green-500 mr-2" />,
      name: "Shopify"
    },
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
                Enter a keyword, industry, product, or URL to generate a comprehensive market report powered by AI.
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
                <Tabs defaultValue="keyword" onValueChange={(value) => setSearchMode(value as "keyword" | "url")}>
                  <TabsList className="grid w-full grid-cols-2 mb-6">
                    <TabsTrigger value="keyword">
                      <Search className="h-4 w-4 mr-2" />
                      Keyword
                    </TabsTrigger>
                    <TabsTrigger value="url">
                      <Globe className="h-4 w-4 mr-2" />
                      Service or Product URL
                    </TabsTrigger>
                  </TabsList>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <TabsContent value="keyword" className="space-y-2 mt-0">
                      <div className="relative">
                        {showKeywordBadge ? (
                          <div className="mb-2">
                            <KeywordBadge 
                              keyword={keyword} 
                              onRemove={() => {
                                setShowKeywordBadge(false)
                                setKeyword("")
                              }} 
                            />
                          </div>
                        ) : (
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
                        )}
                      </div>
                      
                      <div className="mt-6 space-y-3">
                        <div className="text-sm font-medium mb-2">Geographic Area:</div>
                        <RadioGroup 
                          defaultValue="worldwide" 
                          value={geoOption}
                          onValueChange={(value) => setGeoOption(value as "worldwide" | "custom")}
                          className="flex flex-col space-y-2"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="worldwide" id="worldwide-keyword" />
                            <Label htmlFor="worldwide-keyword" className="cursor-pointer">Worldwide</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="custom" id="custom-keyword" />
                            <Label htmlFor="custom-keyword" className="cursor-pointer">Custom Location</Label>
                          </div>
                        </RadioGroup>
                        
                        {geoOption === "custom" && (
                          <div className="relative mt-2">
                            <Globe className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                            <Input
                              type="text"
                              placeholder="Countries, United States, World City, Atlanta..."
                              className="pl-10 h-12 text-base border-blue-200 focus:border-blue-500"
                              value={customGeoArea}
                              onChange={(e) => setCustomGeoArea(e.target.value)}
                            />
                          </div>
                        )}
                      </div>
                      
                      <div className="mt-4">
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
                    </TabsContent>

                    <TabsContent value="url" className="space-y-2 mt-0">
                      <div className="relative">
                        <Globe className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                        <Input
                          type="url"
                          placeholder="e.g., https://www.tesla.com/models"
                          className="pl-10 h-12 text-base border-blue-200 focus:border-blue-500"
                          value={url}
                          onChange={(e) => setUrl(e.target.value)}
                        />
                      </div>
                      
                      <div className="mt-6 space-y-3">
                        <div className="text-sm font-medium mb-2">Geographic Area:</div>
                        <RadioGroup 
                          defaultValue="worldwide" 
                          value={geoOption}
                          onValueChange={(value) => setGeoOption(value as "worldwide" | "custom")}
                          className="flex flex-col space-y-2"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="worldwide" id="worldwide-url" />
                            <Label htmlFor="worldwide-url" className="cursor-pointer">Worldwide</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="custom" id="custom-url" />
                            <Label htmlFor="custom-url" className="cursor-pointer">Custom Location</Label>
                          </div>
                        </RadioGroup>
                        
                        {geoOption === "custom" && (
                          <div className="relative mt-2">
                            <Globe className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                            <Input
                              type="text"
                              placeholder="Countries, United States, World City, Atlanta..."
                              className="pl-10 h-12 text-base border-blue-200 focus:border-blue-500"
                              value={customGeoArea}
                              onChange={(e) => setCustomGeoArea(e.target.value)}
                            />
                          </div>
                        )}
                      </div>
                      
                      <div className="mt-4">
                        <p className="text-sm text-gray-500 mb-2">Example URLs:</p>
                        <div className="flex flex-col gap-2">
                          {exampleUrls.map((item) => (
                            <button
                              key={item.url}
                              type="button"
                              className="text-left text-sm text-blue-600 hover:text-blue-800 hover:underline truncate flex items-center"
                              onClick={() => setUrl(item.url)}
                            >
                              {item.icon}
                              <span className="font-medium mr-2">{item.name}:</span>
                              <span className="truncate">{item.url}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    </TabsContent>

                    {error && <div className="text-red-500 text-sm font-medium">{error}</div>}

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
                </Tabs>
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
