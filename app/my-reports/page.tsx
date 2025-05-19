"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, FileText, Search, Trash2, Eye } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ResponsiveHeader } from "@/components/responsive-header"
import { getSupabaseClient } from "@/lib/supabase/client"
import { Separator } from "@/components/ui/separator"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useToast } from "@/components/ui/use-toast"

// Helper function to format market size
const formatMarketSize = (marketSizeData: any): string => {
  let dataObject: any = null;

  if (typeof marketSizeData === 'string') {
    try {
      dataObject = JSON.parse(marketSizeData);
    } catch (e) {
      console.warn("Failed to parse marketSizeData string:", marketSizeData, e);
      dataObject = marketSizeData;
    }
  } else {
    dataObject = marketSizeData;
  }

  if (typeof dataObject === 'object' && dataObject !== null) {
    const value = dataObject.value ?? dataObject.valueBillionUSD;
    if (value !== undefined && value !== null) {
      const numericValue = Number(value);
      const formattedValue = !isNaN(numericValue) ? numericValue.toLocaleString(undefined, { maximumFractionDigits: 2 }) : value;
      const unit = dataObject.unit ?? (dataObject.valueBillionUSD ? 'billion USD' : '');
      return `${formattedValue}${unit ? ' ' + unit : ''}`;
    }
  } else if (dataObject !== undefined && dataObject !== null) {
    return String(dataObject);
  }

  return "N/A";
};

// Helper function to format growth rate
const formatGrowthRate = (growthRateData: any): string => {
  let dataObject: any = null;

  if (typeof growthRateData === 'string') {
    try {
      dataObject = JSON.parse(growthRateData);
    } catch (e) {
      console.warn("Failed to parse growthRateData string:", growthRateData, e);
      dataObject = growthRateData;
    }
  } else {
    dataObject = growthRateData;
  }

  if (typeof dataObject === 'object' && dataObject !== null) {
    const rateValue = dataObject.value ?? dataObject.cagr;
    if (rateValue !== undefined && rateValue !== null) {
      const numericValue = Number(rateValue);
      return !isNaN(numericValue) ? `${numericValue}%` : `${rateValue}%`;
    }
  } else if (dataObject !== undefined && dataObject !== null) {
    const num = Number(dataObject);
    return !isNaN(num) ? `${num}%` : String(dataObject);
  }

  return "N/A";
};

export default function MyReportsPage() {
  const router = useRouter()
  const { addToast } = useToast()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [reports, setReports] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredReports, setFilteredReports] = useState<any[]>([])
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")

  useEffect(() => {
    async function getUser() {
      try {
        const supabase = getSupabaseClient()
        const {
          data: { session },
        } = await supabase.auth.getSession()

        if (session) {
          setUser(session.user)
          fetchReports(session.user.id)
        } else {
          setLoading(false)
        }
      } catch (error) {
        console.error("Error fetching user:", error)
        setLoading(false)
      }
    }

    getUser()
  }, [])

  const fetchReports = async (userId: string) => {
    try {
      setLoading(true)
      const supabase = getSupabaseClient()

      const { data, error } = await supabase
        .from("reports")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false })

      if (error) {
        throw error
      }

      setReports(data || [])
      setFilteredReports(data || [])
    } catch (error) {
      console.error("Error fetching reports:", error)
      addToast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load your reports. Please try again.",
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    // Filter reports based on search term
    const filtered = reports.filter(
      (report) =>
        report.keyword?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.title?.toLowerCase().includes(searchTerm.toLowerCase()),
    )

    // Sort reports based on sort order
    const sorted = [...filtered].sort((a, b) => {
      const dateA = new Date(a.created_at).getTime()
      const dateB = new Date(b.created_at).getTime()
      return sortOrder === "desc" ? dateB - dateA : dateA - dateB
    })

    setFilteredReports(sorted)
  }, [searchTerm, reports, sortOrder])

  const handleDeleteReport = async (reportId: string) => {
    try {
      const supabase = getSupabaseClient()
      const { error } = await supabase.from("reports").delete().eq("id", reportId)

      if (error) {
        throw error
      }

      // Update the reports list
      setReports(reports.filter((report) => report.id !== reportId))

      addToast({
        title: "Report deleted",
        description: "The report has been successfully deleted.",
      })
    } catch (error: any) {
      console.error("Error deleting report:", error)
      addToast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete report: " + error.message,
      })
    }
  }

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "desc" ? "asc" : "desc")
  }

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col">
        <ResponsiveHeader />
        <main className="flex-1 flex items-center justify-center">
          <div className="animate-pulse flex flex-col items-center">
            <div className="h-8 w-32 bg-muted rounded mb-4"></div>
            <div className="h-4 w-48 bg-muted rounded"></div>
          </div>
        </main>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="flex min-h-screen flex-col">
        <ResponsiveHeader />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
            <p className="mb-6">Please log in to view your reports.</p>
            <Link href="/login">
              <Button>Login</Button>
            </Link>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <ResponsiveHeader />

      <main className="flex-1 bg-gradient-to-b from-background to-muted/20">
        <div className="container px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <Button variant="ghost" size="sm" asChild className="mb-2">
                <Link href="/dashboard">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  <span className="text-sm">Back to Dashboard</span>
                </Link>
              </Button>
              <h1 className="text-3xl font-bold tracking-tight">My Reports</h1>
              <p className="text-muted-foreground">View and manage your saved market reports</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <div className="relative flex-1 sm:flex-none">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search reports..."
                  className="pl-10 w-full sm:w-[250px]"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button
                variant="outline"
                size="icon"
                onClick={toggleSortOrder}
                className="flex-none"
                title={sortOrder === "desc" ? "Newest first" : "Oldest first"}
              >
                {sortOrder === "desc" ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4"
                  >
                    <path d="m3 8 4-4 4 4" />
                    <path d="M7 4v16" />
                    <path d="M11 12h4" />
                    <path d="M11 16h7" />
                    <path d="M11 20h10" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4"
                  >
                    <path d="m3 16 4 4 4-4" />
                    <path d="M7 20V4" />
                    <path d="M11 4h4" />
                    <path d="M11 8h7" />
                    <path d="M11 12h10" />
                  </svg>
                )}
              </Button>
              <Link href="/generate">
                <Button>
                  <FileText className="mr-2 h-4 w-4" />
                  New Report
                </Button>
              </Link>
            </div>
          </div>

          {filteredReports.length === 0 ? (
            <div className="text-center py-16 bg-card border rounded-lg shadow-sm">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-muted mb-4">
                <FileText className="h-6 w-6" />
              </div>
              <h2 className="text-xl font-semibold mb-2">No reports found</h2>
              {searchTerm ? (
                <p className="text-muted-foreground mb-6">
                  No reports match your search criteria. Try adjusting your search.
                </p>
              ) : (
                <p className="text-muted-foreground mb-6">
                  You haven't saved any reports yet. Generate a new report to get started.
                </p>
              )}
              <Button asChild>
                <Link href="/generate">Generate Report</Link>
              </Button>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredReports.map((report) => (
                <Card key={report.id} className="border shadow-sm">
                  <CardHeader className="p-4 pb-2">
                    <CardTitle className="text-lg line-clamp-1">
                      {report.title || `Report on ${report.keyword}`}
                    </CardTitle>
                    <CardDescription>
                      {new Date(report.created_at).toLocaleDateString()} • {report.keyword}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 pt-2">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="text-xs bg-muted rounded-md px-2 py-1">
                        Market Size: {formatMarketSize(report.market_size)}
                      </div>
                      <div className="text-xs bg-muted rounded-md px-2 py-1">
                        Growth: {formatGrowthRate(report.growth_rate)}
                      </div>
                    </div>
                    {report.content && (
                      <div className="text-sm text-muted-foreground mt-2 mb-1 line-clamp-2">
                        {report.content.summary?.substring(0, 120)}...
                      </div>
                    )}
                    <Separator className="my-3" />
                    <div className="flex justify-between items-center">
                      <div className="text-sm text-muted-foreground">ID: {report.id.substring(0, 8)}...</div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          asChild
                          className="h-8 px-2"
                        >
                          <Link href={`/reports/${report.id}`}>
                            <Eye className="h-3.5 w-3.5 mr-1" />
                            View
                          </Link>
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="destructive" size="sm" className="h-8 px-2">
                              <Trash2 className="h-3.5 w-3.5 mr-1" />
                              Delete
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete the report.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDeleteReport(report.id)}>
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
