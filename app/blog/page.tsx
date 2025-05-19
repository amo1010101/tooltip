import Link from "next/link"
import { ArrowRight, BarChart2, Calendar, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ResponsiveHeader } from "@/components/responsive-header"

// Sample blog posts data
const blogPosts = [
  {
    id: 1,
    title: "The Future of AI in Market Research",
    excerpt: "How artificial intelligence is transforming the way businesses gather and analyze market data.",
    date: "March 15, 2023",
    author: "Alex Johnson",
    category: "Technology",
    readTime: "5 min read",
  },
  {
    id: 2,
    title: "5 Key Market Trends to Watch in 2023",
    excerpt: "A comprehensive look at the most important market trends that will shape business strategies this year.",
    date: "April 2, 2023",
    author: "Sarah Chen",
    category: "Market Trends",
    readTime: "7 min read",
  },
  {
    id: 3,
    title: "How to Interpret Market Research Reports Effectively",
    excerpt: "A guide to understanding and extracting actionable insights from market research reports.",
    date: "April 18, 2023",
    author: "Michael Rodriguez",
    category: "Research",
    readTime: "6 min read",
  },
  {
    id: 4,
    title: "The Rise of Sustainable Markets: Opportunities and Challenges",
    excerpt: "Exploring the growing trend of sustainability in global markets and what it means for businesses.",
    date: "May 5, 2023",
    author: "Emma Wilson",
    category: "Sustainability",
    readTime: "8 min read",
  },
  {
    id: 5,
    title: "Market Research on a Budget: Strategies for Startups",
    excerpt: "How early-stage companies can conduct effective market research without breaking the bank.",
    date: "May 20, 2023",
    author: "David Kim",
    category: "Startups",
    readTime: "5 min read",
  },
  {
    id: 6,
    title: "Global Market Insights: Expanding Your Business Internationally",
    excerpt: "Key considerations and research strategies for businesses looking to enter international markets.",
    date: "June 8, 2023",
    author: "Olivia Martinez",
    category: "Global Markets",
    readTime: "9 min read",
  },
]

// Featured post data
const featuredPost = {
  id: 0,
  title: "Revolutionizing Market Research with Generative AI",
  excerpt:
    "An in-depth look at how generative AI technologies are creating new possibilities for market research and business intelligence. Learn how these tools are helping companies gain deeper insights faster than ever before.",
  date: "June 15, 2023",
  author: "Alex Johnson",
  category: "AI & Technology",
  readTime: "10 min read",
}

export default function BlogPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <ResponsiveHeader />

      <main className="flex-1 bg-gradient-to-b from-white to-blue-50">
        <div className="container px-4 py-8 md:py-16">
          <div className="mx-auto max-w-4xl text-center mb-12">
            <h1 className="text-3xl font-bold tracking-tight text-center sm:text-4xl md:text-5xl">
              Insytra <span className="text-blue-600">Blog</span>
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Insights, trends, and expert perspectives on market research and business intelligence
            </p>
          </div>

          {/* Featured Post */}
          <div className="mb-16">
            <Card className="overflow-hidden border-blue-100 shadow-md">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-blue-100 min-h-[300px] flex items-center justify-center">
                  <div className="text-blue-500 text-9xl opacity-20">AI</div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 text-sm text-blue-600 mb-2">
                    <span className="font-medium">{featuredPost.category}</span>
                    <span>•</span>
                    <span>{featuredPost.readTime}</span>
                  </div>
                  <h2 className="text-2xl font-bold mb-3">{featuredPost.title}</h2>
                  <p className="text-muted-foreground mb-4">{featuredPost.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm">
                      <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                        <User className="h-4 w-4 text-blue-600" />
                      </div>
                      <span>{featuredPost.author}</span>
                      <span>•</span>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>{featuredPost.date}</span>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="text-blue-600">
                      Read More
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Blog Posts Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((post) => (
              <Card key={post.id} className="border-blue-100 hover:shadow-md transition-shadow">
                <CardHeader className="p-4 pb-2">
                  <div className="flex items-center gap-2 text-xs text-blue-600 mb-1">
                    <span className="font-medium">{post.category}</span>
                    <span>•</span>
                    <span>{post.readTime}</span>
                  </div>
                  <CardTitle className="text-lg">{post.title}</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-2">
                  <p className="text-sm text-muted-foreground line-clamp-3">{post.excerpt}</p>
                </CardContent>
                <CardFooter className="p-4 pt-0 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs">
                    <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center">
                      <User className="h-3 w-3 text-blue-600" />
                    </div>
                    <span>{post.author}</span>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <span>{post.date}</span>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="text-xs text-blue-600 p-0">
                    Read More
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          {/* Load More Button */}
          <div className="mt-12 text-center">
            <Button variant="outline" className="border-blue-200 text-blue-600 hover:bg-blue-50">
              Load More Articles
            </Button>
          </div>

          {/* Newsletter Signup */}
          <div className="mt-20 bg-blue-50 border border-blue-100 rounded-lg p-8 max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">Subscribe to Our Newsletter</h2>
            <p className="text-muted-foreground mb-6">
              Stay updated with the latest insights and trends in market research.
            </p>
            <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
              <Button className="bg-blue-600 hover:bg-blue-700">Subscribe</Button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-muted/30 py-12">
        <div className="container px-4">
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
