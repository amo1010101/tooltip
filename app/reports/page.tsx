"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, FileText, Search, BarChart2 } from "lucide-react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ResponsiveHeader } from "@/components/responsive-header"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { isAuthenticated } from "@/lib/auth"

// Données d'exemple pour les rapports premium
const premiumReports = [
  {
    id: "1",
    title: "Global Electric Vehicle Market 2023-2028",
    category: "Automotive",
    price: "$3790",
    description:
      "Comprehensive analysis of the global electric vehicle market, including growth projections, key players, and regional insights.",
    date: "2023-05-15",
    pages: 120,
  },
  {
    id: "2",
    title: "Renewable Energy Industry Report",
    category: "Energy",
    price: "$1890",
    description:
      "In-depth analysis of the renewable energy sector, including solar, wind, and hydroelectric power markets.",
    date: "2023-06-22",
    pages: 145,
  },
  {
    id: "3",
    title: "Artificial Intelligence in Healthcare",
    category: "Healthcare",
    price: "$4290",
    description:
      "Detailed overview of AI applications in healthcare, market size, adoption trends, and future outlook.",
    date: "2023-04-10",
    pages: 180,
  },
  {
    id: "4",
    title: "Global E-commerce Market Trends",
    category: "Retail",
    price: "$2590",
    description: "Analysis of global e-commerce trends, major platforms, consumer behavior, and growth opportunities.",
    date: "2023-07-05",
    pages: 110,
  },
  {
    id: "5",
    title: "Cybersecurity Market Report",
    category: "Technology",
    price: "$1090",
    description: "Comprehensive overview of the cybersecurity landscape, threats, solutions, and market projections.",
    date: "2023-03-18",
    pages: 135,
  },
  {
    id: "6",
    title: "Sustainable Fashion Industry Analysis",
    category: "Fashion",
    price: "$3290",
    description: "Detailed report on sustainable fashion trends, consumer preferences, and market opportunities.",
    date: "2023-06-30",
    pages: 95,
  },
  {
    id: "7",
    title: "Artisanal Craft Beer Market in Portland, Oregon",
    category: "Food & Beverage",
    price: "$1090",
    description: "Detailed analysis of microbrewery trends, consumer preferences, and growth opportunities in Portland's craft beer scene.",
    date: "2023-07-12",
    pages: 85,
  },
  {
    id: "8",
    title: "Luxury Wellness Tourism in Bali, Indonesia",
    category: "Travel",
    price: "$1190",
    description: "Comprehensive study of high-end wellness retreats, consumer demographics, and investment opportunities in Bali.",
    date: "2023-08-05",
    pages: 110,
  },
  {
    id: "9",
    title: "Vertical Urban Farming in Singapore",
    category: "Agriculture",
    price: "$1290",
    description: "In-depth analysis of Singapore's vertical farming industry, technological innovations, and market growth potential.",
    date: "2023-08-22",
    pages: 120,
  },
  {
    id: "10",
    title: "Premium Pet Care Services in Paris, France",
    category: "Consumer Services",
    price: "$1390",
    description: "Detailed market research on luxury pet services, consumer spending patterns, and business opportunities in Paris.",
    date: "2023-09-03",
    pages: 95,
  },
  {
    id: "11",
    title: "Handcrafted Furniture Market in Copenhagen, Denmark",
    category: "Home & Decor",
    price: "$1490",
    description: "Comprehensive analysis of artisanal furniture production, consumer preferences, and market trends in Copenhagen.",
    date: "2023-09-15",
    pages: 105,
  },
  {
    id: "12",
    title: "Boutique Fitness Studios in Berlin, Germany",
    category: "Health & Fitness",
    price: "$1590",
    description: "Detailed study of specialized fitness centers, membership trends, and growth forecasts in Berlin's urban areas.",
    date: "2023-09-28",
    pages: 115,
  },
  {
    id: "13",
    title: "Specialty Coffee Shops in Melbourne, Australia",
    category: "Food & Beverage",
    price: "$1690",
    description: "In-depth analysis of Melbourne's premium coffee market, consumer behavior, and competitive landscape.",
    date: "2023-10-10",
    pages: 90,
  },
  {
    id: "14",
    title: "Sustainable Architecture in Vancouver, Canada",
    category: "Architecture",
    price: "$1790",
    description: "Comprehensive study of eco-friendly building trends, regulatory environment, and market opportunities in Vancouver.",
    date: "2023-10-25",
    pages: 130,
  },
  {
    id: "15",
    title: "Organic Cosmetics Market in Seoul, South Korea",
    category: "Beauty",
    price: "$1890",
    description: "Detailed analysis of natural beauty product trends, consumer demographics, and growth potential in Seoul.",
    date: "2023-11-08",
    pages: 105,
  },
  {
    id: "16",
    title: "Tech Startup Ecosystem in Lisbon, Portugal",
    category: "Technology",
    price: "$1990",
    description: "In-depth research on Lisbon's emerging tech scene, investment flows, and entrepreneurial opportunities.",
    date: "2023-11-20",
    pages: 125,
  },
  {
    id: "17",
    title: "Luxury Yacht Charter Services in Monaco",
    category: "Luxury",
    price: "$2090",
    description: "Comprehensive analysis of high-end yacht rentals, client profiles, and business models in the Monaco region.",
    date: "2023-12-05",
    pages: 110,
  },
  {
    id: "18",
    title: "Boutique Winery Operations in Mendoza, Argentina",
    category: "Wine & Spirits",
    price: "$2190",
    description: "Detailed market research on small-scale wine production, tourism integration, and export opportunities in Mendoza.",
    date: "2023-12-18",
    pages: 115,
  },
  {
    id: "19",
    title: "Sustainable Fishing Practices in Hokkaido, Japan",
    category: "Fisheries",
    price: "$2290",
    description: "In-depth study of eco-friendly fishing methods, regulatory framework, and market potential in Hokkaido.",
    date: "2024-01-05",
    pages: 130,
  },
  {
    id: "20",
    title: "Vintage Clothing Retail in Brooklyn, New York",
    category: "Fashion",
    price: "$2390",
    description: "Comprehensive analysis of second-hand clothing market, consumer demographics, and business models in Brooklyn.",
    date: "2024-01-22",
    pages: 95,
  },
  {
    id: "21",
    title: "Independent Bookstores in Edinburgh, Scotland",
    category: "Retail",
    price: "$2490",
    description: "Detailed research on specialized bookshops, customer loyalty programs, and growth strategies in Edinburgh.",
    date: "2024-02-08",
    pages: 100,
  },
  {
    id: "22",
    title: "Artisanal Cheese Production in Vermont, USA",
    category: "Food & Beverage",
    price: "$2590",
    description: "In-depth analysis of small-scale cheese making, distribution channels, and market trends in Vermont.",
    date: "2024-02-20",
    pages: 110,
  },
  {
    id: "23",
    title: "Boutique Hotels in Marrakech, Morocco",
    category: "Hospitality",
    price: "$2690",
    description: "Comprehensive study of luxury accommodations, guest preferences, and investment opportunities in Marrakech.",
    date: "2024-03-05",
    pages: 120,
  },
  {
    id: "24",
    title: "Urban Cycling Infrastructure in Amsterdam, Netherlands",
    category: "Transportation",
    price: "$2790",
    description: "Detailed analysis of bicycle-friendly urban planning, usage patterns, and economic benefits in Amsterdam.",
    date: "2024-03-18",
    pages: 115,
  },
  {
    id: "25",
    title: "Medical Cannabis Dispensaries in Colorado, USA",
    category: "Healthcare",
    price: "$2890",
    description: "In-depth research on legal cannabis retail, patient demographics, and regulatory compliance in Colorado.",
    date: "2024-04-02",
    pages: 135,
  },
  {
    id: "26",
    title: "Eco-Friendly Packaging Solutions in Stockholm, Sweden",
    category: "Packaging",
    price: "$2990",
    description: "Comprehensive analysis of sustainable packaging innovation, market adoption, and policy environment in Stockholm.",
    date: "2024-04-15",
    pages: 125,
  },
  {
    id: "27",
    title: "Bespoke Jewelry Design in Antwerp, Belgium",
    category: "Luxury",
    price: "$3090",
    description: "Detailed study of custom jewelry creation, client acquisition strategies, and market positioning in Antwerp.",
    date: "2024-04-30",
    pages: 95,
  },
  {
    id: "28",
    title: "Community-Supported Agriculture in Tuscany, Italy",
    category: "Agriculture",
    price: "$3190",
    description: "In-depth analysis of farm-to-consumer models, subscription services, and growth potential in Tuscany.",
    date: "2024-05-12",
    pages: 110,
  },
  {
    id: "29",
    title: "Independent Film Production in Austin, Texas",
    category: "Entertainment",
    price: "$3290",
    description: "Comprehensive research on indie filmmaking, funding sources, and distribution channels in the Austin area.",
    date: "2024-05-25",
    pages: 120,
  },
  {
    id: "30",
    title: "Specialized Language Schools in Barcelona, Spain",
    category: "Education",
    price: "$3390",
    description: "Detailed analysis of language learning centers, student demographics, and business models in Barcelona.",
    date: "2024-06-08",
    pages: 105,
  },
  {
    id: "31",
    title: "Bamboo Construction Materials in Bali, Indonesia",
    category: "Construction",
    price: "$3490",
    description: "In-depth study of sustainable building materials, architectural applications, and market trends in Bali.",
    date: "2024-06-22",
    pages: 130,
  },
  {
    id: "32",
    title: "Therapeutic Hot Springs in Reykjavik, Iceland",
    category: "Wellness",
    price: "$3590",
    description: "Comprehensive analysis of geothermal spa facilities, tourism integration, and business opportunities in Reykjavik.",
    date: "2024-07-05",
    pages: 115,
  },
  {
    id: "33",
    title: "Farm-to-Table Restaurants in Provence, France",
    category: "Food & Beverage",
    price: "$3690",
    description: "Detailed research on local-sourced dining establishments, consumer preferences, and operational models in Provence.",
    date: "2024-07-18",
    pages: 125,
  },
  {
    id: "34",
    title: "Ethically-Sourced Diamond Trade in Botswana",
    category: "Mining",
    price: "$3790",
    description: "In-depth analysis of sustainable diamond sourcing, market valuations, and industry certifications in Botswana.",
    date: "2024-08-02",
    pages: 140,
  },
  {
    id: "35",
    title: "Privacy-Focused Tech Startups in Zurich, Switzerland",
    category: "Technology",
    price: "$3890",
    description: "Comprehensive study of data protection innovations, regulatory compliance, and investment landscape in Zurich.",
    date: "2024-08-15",
    pages: 130,
  },
  {
    id: "36",
    title: "Handcrafted Musical Instruments in Nashville, Tennessee",
    category: "Music",
    price: "$3990",
    description: "Detailed analysis of artisanal instrument making, buyer demographics, and market opportunities in Nashville.",
    date: "2024-08-28",
    pages: 110,
  },
  {
    id: "37",
    title: "Zero-Waste Grocery Stores in Helsinki, Finland",
    category: "Retail",
    price: "$4090",
    description: "In-depth research on package-free shopping, consumer behavior, and business viability in Helsinki.",
    date: "2024-09-10",
    pages: 120,
  },
  {
    id: "38",
    title: "Urban Beekeeping Operations in Paris, France",
    category: "Agriculture",
    price: "$4290",
    description: "Comprehensive analysis of city honey production, distribution channels, and growth potential in Paris.",
    date: "2024-09-25",
    pages: 95,
  },
  {
    id: "39",
    title: "Digital Nomad Co-Living Spaces in Chiang Mai, Thailand",
    category: "Real Estate",
    price: "$4490",
    description: "Detailed study of remote work accommodations, amenities preferences, and investment opportunities in Chiang Mai.",
    date: "2024-10-08",
    pages: 115,
  },
  {
    id: "40",
    title: "Regenerative Ocean Farming in New Zealand",
    category: "Aquaculture",
    price: "$4990",
    description: "In-depth analysis of sustainable seafood production, environmental impact, and market development in New Zealand waters.",
    date: "2024-10-20",
    pages: 150,
  },
]

export default function ReportsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [reports, setReports] = useState(premiumReports)
  const router = useRouter()

  // Filtrer les rapports en fonction de la recherche et de la catégorie
  useEffect(() => {
    let filtered = premiumReports

    // Filtrer par terme de recherche
    if (searchTerm) {
      filtered = filtered.filter(
        (report) =>
          report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          report.description.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Filtrer par catégorie
    if (categoryFilter !== "all") {
      filtered = filtered.filter((report) => report.category === categoryFilter)
    }

    setReports(filtered)
  }, [searchTerm, categoryFilter])

  // Obtenir les catégories uniques
  const categories = ["all", ...new Set(premiumReports.map((report) => report.category))]

  // Fonction pour rediriger vers la page contact avec vérification d'authentification
  const handleReportAction = async () => {
    try {
      const authenticated = await isAuthenticated()
      
      if (!authenticated) {
        // L'utilisateur n'est pas connecté, on le redirige vers la page de connexion
        // avec un paramètre pour rediriger vers la page contact après connexion
        router.push('/login?redirect=/contact')
        return
      }
      
      // L'utilisateur est connecté, on le redirige directement vers la page contact
      router.push('/contact')
    } catch (error) {
      console.error("Error checking authentication:", error)
      // En cas d'erreur, on redirige par défaut vers la page de connexion
      router.push('/login?redirect=/contact')
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <ResponsiveHeader />

      <main className="flex-1 bg-gradient-to-b from-white to-blue-50">
        <div className="container px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <Button variant="ghost" size="sm" asChild className="mb-2">
                <Link href="/">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  <span className="text-sm">Back to Home</span>
                </Link>
              </Button>
              <h1 className="text-3xl font-bold tracking-tight">Premium Market Reports</h1>
              <p className="text-muted-foreground">Explore our collection of in-depth market research reports</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <div className="relative flex-1 sm:flex-none">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search reports..."
                  className="pl-10 w-full sm:w-[250px] border-blue-200 focus:border-blue-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex-1 sm:flex-none">
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-full sm:w-[180px] border-blue-200 focus:border-blue-500">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category === "all" ? "All Categories" : category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {reports.length === 0 ? (
            <div className="text-center py-16">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 mb-4">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
              <h2 className="text-xl font-semibold mb-2">No reports found</h2>
              <p className="text-muted-foreground mb-6">
                No reports match your search criteria. Try adjusting your filters.
              </p>
              <Button
                className="bg-blue-600 hover:bg-blue-700"
                onClick={() => {
                  setSearchTerm("")
                  setCategoryFilter("all")
                }}
              >
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {reports.map((report) => (
                <Card key={report.id} className="border-blue-100 hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="line-clamp-2">{report.title}</CardTitle>
                        <CardDescription>
                          {report.category} • {report.pages} pages • {report.date}
                        </CardDescription>
                      </div>
                      <div className="text-lg font-bold text-blue-600">{report.price}</div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground line-clamp-3">{report.description}</p>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button 
                      variant="outline" 
                      className="border-blue-200 text-blue-600 hover:bg-blue-50"
                      onClick={handleReportAction}
                    >
                      Preview
                    </Button>
                    <Button 
                      className="bg-blue-600 hover:bg-blue-700"
                      onClick={handleReportAction}
                    >
                      Purchase
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}

          <div className="mt-16 bg-blue-50 border border-blue-100 rounded-lg p-6 md:p-8">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                <BarChart2 className="h-8 w-8 text-blue-600" />
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-xl font-semibold mb-2">Need a Custom Market Report?</h3>
                <p className="text-gray-600 mb-4">
                  Our AI can generate custom market reports tailored to your specific needs in seconds.
                </p>
                <Link href="/generate">
                  <Button className="bg-blue-600 hover:bg-blue-700">Generate Custom Report</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
