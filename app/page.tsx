"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, BarChart2, Search, Zap, LineChart, PieChart, TrendingUp, CheckCircle } from "lucide-react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ResponsiveHeader } from "@/components/responsive-header"
import { getSupabaseClient } from "@/lib/supabase/client"

export default function HomePage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("overview")
  const [isVisible, setIsVisible] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    setIsVisible(true)
    checkAuthStatus()
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

  const handleGenerateReport = () => {
    router.push('/generate')
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      const basePath = '/generate'
      router.push(`${basePath}/results?keyword=${encodeURIComponent(searchTerm.trim())}`)
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <ResponsiveHeader />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-background to-background/80 pt-16 md:pt-24">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] z-0"></div>
        <div className="container relative z-10">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col gap-4"
            >
              <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                <Zap className="mr-1 h-3 w-3" />
                <span>Supercharge Your Market Research With AI</span>
              </div>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                <span className="block">Instant</span> <span className="block text-primary">Market Reports</span>{" "}
                <span className="block">In Seconds</span>
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Transform your research process with AI-powered market analysis. Get comprehensive reports on any
                industry instantly, so you can focus on strategy and execution.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <Button size="lg" className="w-full sm:w-auto" onClick={handleGenerateReport}>
                  Generate Report
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Link href="/reports">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    Browse Reports
                  </Button>
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.9 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="relative mx-auto w-full max-w-[500px] rounded-xl border bg-background p-2 shadow-xl"
            >
              <div className="rounded-lg bg-muted p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-red-500"></div>
                    <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                    <div className="h-3 w-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="text-xs text-muted-foreground">Insytra AI</div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-2 rounded-md border bg-background p-2">
                    <Search className="h-4 w-4 text-muted-foreground" />
                    <Input
                      type="text"
                      placeholder="Enter industry or product name..."
                      className="border-0 bg-transparent p-0 shadow-none focus-visible:ring-0"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Button size="sm" variant="default" onClick={handleSearch}>
                      Generate
                    </Button>
                  </div>
                  <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="overview">Overview</TabsTrigger>
                      <TabsTrigger value="trends">Trends</TabsTrigger>
                      <TabsTrigger value="competitors">Competitors</TabsTrigger>
                    </TabsList>
                    <TabsContent value="overview" className="space-y-4 mt-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold">Market Size</h3>
                        <span className="text-lg font-bold">$4.2B</span>
                      </div>
                      <div className="h-[120px] w-full rounded-md bg-primary/10 flex items-center justify-center">
                        <LineChart className="h-16 w-16 text-primary/60" />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="rounded-md bg-muted p-2">
                          <div className="text-xs text-muted-foreground">Growth Rate</div>
                          <div className="text-lg font-semibold">12.4%</div>
                        </div>
                        <div className="rounded-md bg-muted p-2">
                          <div className="text-xs text-muted-foreground">Forecast</div>
                          <div className="text-lg font-semibold">$7.8B by 2028</div>
                        </div>
                      </div>
                    </TabsContent>
                    <TabsContent value="trends" className="space-y-4 mt-4">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="h-5 w-5 text-green-500" />
                        <span className="font-medium">Sustainability focus increasing</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <TrendingUp className="h-5 w-5 text-green-500" />
                        <span className="font-medium">Digital transformation accelerating</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <TrendingUp className="h-5 w-5 text-green-500" />
                        <span className="font-medium">Remote work solutions expanding</span>
                      </div>
                      <div className="h-[80px] w-full rounded-md bg-primary/10 flex items-center justify-center">
                        <BarChart2 className="h-12 w-12 text-primary/60" />
                      </div>
                    </TabsContent>
                    <TabsContent value="competitors" className="space-y-4 mt-4">
                      <div className="h-[120px] w-full rounded-md bg-primary/10 flex items-center justify-center">
                        <PieChart className="h-16 w-16 text-primary/60" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">Company A</span>
                          <span className="font-semibold">32%</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="font-medium">Company B</span>
                          <span className="font-semibold">28%</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="font-medium">Company C</span>
                          <span className="font-semibold">15%</span>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
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
              Powerful AI-Driven Market Intelligence
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="mt-4 text-xl text-muted-foreground max-w-3xl mx-auto"
            >
              Our platform combines cutting-edge AI with comprehensive data sources to deliver actionable insights in
              seconds.
            </motion.p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
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

      {/* Animated Illustrations Section (replacing logos) */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Transforming Research for Organizations Worldwide
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="flex flex-col items-center"
            >
              <div className="relative h-40 w-40 mb-6">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-32 w-32 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 opacity-20 animate-pulse"></div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <BarChart2 className="h-16 w-16 text-primary" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2">Data-Driven Decisions</h3>
              <p className="text-center text-muted-foreground">
                Organizations using our platform make decisions 3x faster with comprehensive market data.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex flex-col items-center"
            >
              <div className="relative h-40 w-40 mb-6">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-32 w-32 rounded-full bg-gradient-to-r from-green-500 to-teal-500 opacity-20 animate-pulse"></div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <LineChart className="h-16 w-16 text-primary" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2">Growth Acceleration</h3>
              <p className="text-center text-muted-foreground">
                Companies leveraging our insights grow revenue 2.5x faster than competitors.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="flex flex-col items-center"
            >
              <div className="relative h-40 w-40 mb-6">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-32 w-32 rounded-full bg-gradient-to-r from-orange-500 to-red-500 opacity-20 animate-pulse"></div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <PieChart className="h-16 w-16 text-primary" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2">Strategic Insights</h3>
              <p className="text-center text-muted-foreground">
                90% of users discover new market opportunities within their first month.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 md:py-24 bg-muted/50">
        <div className="container">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.value}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                viewport={{ once: true }}
                className="flex flex-col items-center text-center"
              >
                <div className="text-4xl font-bold text-primary mb-2">{stat.value}</div>
                <p className="text-xl font-medium mb-4">{stat.label}</p>
                <p className="text-muted-foreground">{stat.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-primary/5">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-3xl font-bold tracking-tight sm:text-4xl"
            >
              Ready to Transform Your Market Research?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="mt-4 text-xl text-muted-foreground"
            >
              Join thousands of businesses making smarter decisions with AI-powered market intelligence.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="mt-8 flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link href="/generate">
                <Button size="lg" className="w-full sm:w-auto">
                  Generate Your First Report
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/pricing">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  View Pricing
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <div className="text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-3xl font-bold tracking-tight sm:text-4xl"
            >
              What Our Users Say
            </motion.h2>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                viewport={{ once: true }}
              >
                <Card className="h-full">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="h-5 w-5 text-yellow-500"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                            clipRule="evenodd"
                          />
                        </svg>
                      ))}
                    </div>
                    <p className="mb-4 italic">"{testimonial.quote}"</p>
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-primary font-bold">{testimonial.name.charAt(0)}</span>
                      </div>
                      <div>
                        <p className="font-semibold">{testimonial.name}</p>
                        <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                      </div>
                    </div>
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
                AI-powered market research platform delivering instant, comprehensive reports for smarter business
                decisions.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h3 className="font-semibold mb-4">Product</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="/features" className="text-muted-foreground hover:text-foreground">
                      Features
                    </Link>
                  </li>
                  <li>
                    <Link href="/pricing" className="text-muted-foreground hover:text-foreground">
                      Pricing
                    </Link>
                  </li>
                  <li>
                    <Link href="/reports" className="text-muted-foreground hover:text-foreground">
                      Reports
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-4">Company</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="/about" className="text-muted-foreground hover:text-foreground">
                      About
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
                <h3 className="font-semibold mb-4">Legal</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="/privacy" className="text-muted-foreground hover:text-foreground">
                      Privacy
                    </Link>
                  </li>
                  <li>
                    <Link href="/terms" className="text-muted-foreground hover:text-foreground">
                      Terms
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-12 border-t pt-8 text-center text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} Insytra. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

const features = [
  {
    title: "Instant Market Reports",
    description:
      "Generate comprehensive market reports in seconds with our AI-powered platform. No more waiting for weeks or paying thousands.",
    icon: <Zap className="h-6 w-6 text-primary" />,
  },
  {
    title: "Competitive Analysis",
    description:
      "Identify key competitors, their market share, strategies, and positioning to understand your competitive landscape.",
    icon: <BarChart2 className="h-6 w-6 text-primary" />,
  },
  {
    title: "Market Sizing & Forecasting",
    description:
      "Access accurate market size data and future growth projections to identify opportunities and plan your strategy.",
    icon: <LineChart className="h-6 w-6 text-primary" />,
  },
  {
    title: "Consumer Insights",
    description:
      "Understand customer preferences, behaviors, and trends to align your products and marketing with market demands.",
    icon: <Search className="h-6 w-6 text-primary" />,
  },
  {
    title: "Trend Analysis",
    description:
      "Stay ahead of industry trends and emerging opportunities with our real-time trend identification and analysis.",
    icon: <TrendingUp className="h-6 w-6 text-primary" />,
  },
  {
    title: "Custom Reports",
    description:
      "Generate tailored reports for specific industries, regions, or business questions with our flexible AI system.",
    icon: <CheckCircle className="h-6 w-6 text-primary" />,
  },
]

const stats = [
  {
    value: "85%",
    label: "Time Saved",
    description: "Our users save up to 85% of the time traditionally spent on market research and analysis.",
  },
  {
    value: "3.5x",
    label: "ROI Increase",
    description: "Companies using our platform report 3.5x higher ROI on their market research investments.",
  },
  {
    value: "10,000+",
    label: "Reports Generated",
    description: "Our platform has generated over 10,000 comprehensive market reports across 75+ industries.",
  },
]

const testimonials = [
  {
    quote:
      "Insytra has transformed how we approach market research. What used to take weeks now takes minutes, and the insights are incredibly valuable.",
    name: "Sarah Johnson",
    title: "Marketing Director, TechCorp",
  },
  {
    quote:
      "The competitive analysis feature alone has paid for itself many times over. We identified gaps in the market that led to our most successful product launch ever.",
    name: "Michael Chen",
    title: "Product Manager, InnovateCo",
  },
  {
    quote:
      "As a startup founder, I don't have the budget for traditional market research. Insytra gives me enterprise-level insights at a fraction of the cost.",
    name: "Elena Rodriguez",
    title: "CEO, GrowthStartup",
  },
]
