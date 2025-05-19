import Link from "next/link"
import { ArrowRight, BarChart2, Users, Award, Globe, BookOpen, Zap } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ResponsiveHeader } from "@/components/responsive-header"

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <ResponsiveHeader />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-b from-white to-blue-50 pt-16 md:pt-24 pb-16">
          <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] z-0"></div>
          <div className="container relative z-10">
            <div className="mx-auto max-w-3xl text-center">
              <div className="flex flex-col gap-4">
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                  About <span className="text-blue-600">Insytra</span>
                </h1>
                <p className="max-w-[600px] mx-auto text-muted-foreground md:text-xl">
                  Transforming market research with AI to help businesses make smarter decisions faster.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="py-16 md:py-24">
          <div className="container">
            <div className="grid gap-12 md:grid-cols-2 items-center">
              <div>
                <h2 className="text-3xl font-bold tracking-tight mb-6">Our Story</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Insytra was founded in 2023 with a simple but powerful mission: to democratize access to
                    high-quality market research.
                  </p>
                  <p>
                    Traditional market research is expensive, time-consuming, and often inaccessible to smaller
                    businesses and startups. We saw an opportunity to leverage the latest advancements in artificial
                    intelligence to change that.
                  </p>
                  <p>
                    Our platform combines cutting-edge AI with comprehensive data sources to deliver actionable market
                    insights in seconds, not weeks. This allows businesses of all sizes to make data-driven decisions
                    without the traditional barriers of cost and time.
                  </p>
                </div>
              </div>
              <div className="relative">
                <div className="absolute -inset-4 bg-blue-50 rounded-xl -z-10 transform rotate-3"></div>
                <div className="relative bg-white rounded-lg shadow-lg p-6 border">
                  <div className="flex justify-center mb-6">
                    <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center">
                      <BookOpen className="h-8 w-8 text-blue-600" />
                    </div>
                  </div>
                  <blockquote className="text-center">
                    <p className="text-lg font-medium italic mb-4">
                      "We believe that access to quality market intelligence shouldn't be limited to those with the
                      biggest budgets."
                    </p>
                    <footer className="text-sm text-muted-foreground">— Insytra Founding Team</footer>
                  </blockquote>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Values Section */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight">Our Values</h2>
              <p className="mt-4 text-xl text-muted-foreground max-w-3xl mx-auto">
                The principles that guide everything we do
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              <Card className="border-blue-100">
                <CardContent className="p-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                    <Zap className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Innovation</h3>
                  <p className="text-muted-foreground">
                    We continuously push the boundaries of what's possible with AI and market research technology.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-blue-100">
                <CardContent className="p-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                    <Award className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Quality</h3>
                  <p className="text-muted-foreground">
                    We're committed to delivering accurate, reliable, and actionable market insights you can trust.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-blue-100">
                <CardContent className="p-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                    <Globe className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Accessibility</h3>
                  <p className="text-muted-foreground">
                    We believe quality market research should be accessible to businesses of all sizes, anywhere in the
                    world.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 md:py-24">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight">Our Team</h2>
              <p className="mt-4 text-xl text-muted-foreground max-w-3xl mx-auto">
                Meet the people behind Insytra
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  name: "Alex Johnson",
                  role: "CEO & Co-Founder",
                  bio: "Former research analyst with 10+ years experience in market intelligence.",
                },
                {
                  name: "Sarah Chen",
                  role: "CTO & Co-Founder",
                  bio: "AI specialist with background in machine learning and data science.",
                },
                {
                  name: "Michael Rodriguez",
                  role: "Head of Research",
                  bio: "Industry veteran with expertise in global market analysis and forecasting.",
                },
                {
                  name: "Emma Wilson",
                  role: "Lead Data Scientist",
                  bio: "Expert in natural language processing and predictive analytics.",
                },
                {
                  name: "David Kim",
                  role: "Head of Product",
                  bio: "Product strategist focused on creating intuitive user experiences.",
                },
                {
                  name: "Olivia Martinez",
                  role: "Customer Success Lead",
                  bio: "Dedicated to helping clients get the most value from our platform.",
                },
              ].map((member, index) => (
                <Card key={index} className="border-blue-100">
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center text-center">
                      <div className="mb-4 h-24 w-24 rounded-full bg-blue-100 flex items-center justify-center">
                        <Users className="h-12 w-12 text-blue-300" />
                      </div>
                      <h3 className="text-xl font-bold">{member.name}</h3>
                      <p className="text-blue-600 mb-2">{member.role}</p>
                      <p className="text-sm text-muted-foreground">{member.bio}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-blue-50">
          <div className="container">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-bold tracking-tight">Ready to Get Started?</h2>
              <p className="mt-4 text-xl text-muted-foreground mb-8">
                Join thousands of businesses making smarter decisions with AI-powered market intelligence.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/generate">
                  <Button size="lg" className="w-full sm:w-auto">
                    Generate Your First Report
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    Contact Us
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

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
