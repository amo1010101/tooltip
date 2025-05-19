"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  BarChart2,
  Zap,
  LineChart,
  Search,
  TrendingUp,
  CheckCircle,
  ArrowRight,
  Globe,
  PieChart,
  Users,
  Shield,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ResponsiveHeader } from "@/components/responsive-header"

export default function FeaturesPage() {
  const [activeTab, setActiveTab] = useState("market-analysis")
  const [isVisible, setIsVisible] = useState(true)

  return (
    <div className="flex min-h-screen flex-col">
      <ResponsiveHeader />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-background to-background/80 pt-16 md:pt-24">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] z-0"></div>
        <div className="container relative z-10">
          <div className="mx-auto max-w-3xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col gap-4"
            >
              <div className="inline-flex mx-auto items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                <Zap className="mr-1 h-3 w-3" />
                <span>AI-Powered Market Intelligence</span>
              </div>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                Powerful Features for <span className="text-primary">Market Research</span>
              </h1>
              <p className="max-w-[600px] mx-auto text-muted-foreground md:text-xl">
                Discover how our AI-powered platform transforms market research with comprehensive data analysis and
                visualization tools.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-4 justify-center">
                <Link href="/generate">
                  <Button size="lg" className="w-full sm:w-auto">
                    Try It Free
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/pricing">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    View Pricing
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Tabs Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Explore Our Features</h2>
            <p className="mt-4 text-xl text-muted-foreground max-w-3xl mx-auto">
              Our platform combines cutting-edge AI with comprehensive data sources to deliver actionable insights in
              seconds.
            </p>
          </div>

          <Tabs
            defaultValue="market-analysis"
            value={activeTab}
            onValueChange={setActiveTab}
            className="mx-auto max-w-4xl"
          >
            <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-8">
              <TabsTrigger value="market-analysis">Market Analysis</TabsTrigger>
              <TabsTrigger value="competitive-intel">Competitive Intel</TabsTrigger>
              <TabsTrigger value="trend-forecasting">Trend Forecasting</TabsTrigger>
              <TabsTrigger value="visualization">Visualization</TabsTrigger>
            </TabsList>

            <TabsContent value="market-analysis" className="space-y-4">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold mb-4">Comprehensive Market Analysis</h3>
                  <p className="text-muted-foreground mb-6">
                    Get detailed market size data, growth rates, and segmentation analysis for any industry in seconds.
                    Our AI analyzes millions of data points to provide accurate and up-to-date market information.
                  </p>
                  <ul className="space-y-2">
                    {[
                      "Global and regional market sizing",
                      "Growth rate projections",
                      "Market segmentation analysis",
                      "Industry value chain mapping",
                      "Market share distribution",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-muted rounded-lg p-6 flex items-center justify-center">
                  <div className="relative w-full max-w-[400px] aspect-square flex items-center justify-center">
                    <div className="absolute inset-0 bg-primary/10 rounded-full animate-pulse"></div>
                    <PieChart className="h-32 w-32 text-primary" />
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="competitive-intel" className="space-y-4">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold mb-4">Competitive Intelligence</h3>
                  <p className="text-muted-foreground mb-6">
                    Identify key competitors, their market share, strategies, and positioning to understand your
                    competitive landscape and find opportunities for differentiation.
                  </p>
                  <ul className="space-y-2">
                    {[
                      "Competitor identification and profiling",
                      "Market share analysis",
                      "Competitive positioning maps",
                      "SWOT analysis of key players",
                      "Competitive strategy insights",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-muted rounded-lg p-6 flex items-center justify-center">
                  <div className="relative w-full max-w-[400px] aspect-square flex items-center justify-center">
                    <div className="absolute inset-0 bg-primary/10 rounded-full animate-pulse"></div>
                    <Users className="h-32 w-32 text-primary" />
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="trend-forecasting" className="space-y-4">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold mb-4">Trend Forecasting</h3>
                  <p className="text-muted-foreground mb-6">
                    Stay ahead of industry trends and emerging opportunities with our real-time trend identification and
                    analysis. Predict market movements before they happen.
                  </p>
                  <ul className="space-y-2">
                    {[
                      "5-year market forecasts",
                      "Emerging trend identification",
                      "Consumer behavior predictions",
                      "Technology adoption curves",
                      "Regulatory impact analysis",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-muted rounded-lg p-6 flex items-center justify-center">
                  <div className="relative w-full max-w-[400px] aspect-square flex items-center justify-center">
                    <div className="absolute inset-0 bg-primary/10 rounded-full animate-pulse"></div>
                    <TrendingUp className="h-32 w-32 text-primary" />
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="visualization" className="space-y-4">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold mb-4">Data Visualization</h3>
                  <p className="text-muted-foreground mb-6">
                    Transform complex market data into clear, actionable visualizations. Our platform generates
                    beautiful charts and graphs that make insights easy to understand and share.
                  </p>
                  <ul className="space-y-2">
                    {[
                      "Interactive market share charts",
                      "Growth trend visualizations",
                      "Regional distribution maps",
                      "Segment comparison graphs",
                      "Exportable reports in multiple formats",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-muted rounded-lg p-6 flex items-center justify-center">
                  <div className="relative w-full max-w-[400px] aspect-square flex items-center justify-center">
                    <div className="absolute inset-0 bg-primary/10 rounded-full animate-pulse"></div>
                    <BarChart2 className="h-32 w-32 text-primary" />
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Key Features Grid */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Key Features</h2>
            <p className="mt-4 text-xl text-muted-foreground max-w-3xl mx-auto">
              Our platform offers a comprehensive suite of tools to supercharge your market research.
            </p>
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

      {/* Footer */}
      <footer className="border-t bg-muted/30 py-12">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between gap-8">
            <div className="mb-8 md:mb-0">
              <div className="flex items-center gap-2 mb-4">
                <BarChart2 className="h-6 w-6 text-blue-600" />
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
    title: "Global Coverage",
    description:
      "Access market data from over 100 countries and regions with detailed regional breakdowns and analysis.",
    icon: <Globe className="h-6 w-6 text-primary" />,
  },
  {
    title: "Data Visualization",
    description:
      "Transform complex market data into clear, actionable visualizations with our interactive charts and graphs.",
    icon: <PieChart className="h-6 w-6 text-primary" />,
  },
  {
    title: "Custom Reports",
    description:
      "Generate tailored reports for specific industries, regions, or business questions with our flexible AI system.",
    icon: <CheckCircle className="h-6 w-6 text-primary" />,
  },
  {
    title: "Data Security",
    description:
      "Your data is always secure with enterprise-grade encryption and compliance with global data protection regulations.",
    icon: <Shield className="h-6 w-6 text-primary" />,
  },
]
