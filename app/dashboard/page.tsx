"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { BarChart2, FileText, PlusCircle, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ResponsiveHeader } from "@/components/responsive-header"
import { getSupabaseClient } from "@/lib/supabase/client"
import { ReportsList } from "@/components/reports-list"

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [totalReports, setTotalReports] = useState(0)
  const [savedReports, setSavedReports] = useState(0)

  useEffect(() => {
    async function getUser() {
      try {
        const supabase = getSupabaseClient()
        const {
          data: { session },
        } = await supabase.auth.getSession()

        if (session) {
          setUser(session.user)
        }
      } catch (error) {
        console.error("Error fetching user:", error)
      } finally {
        setLoading(false)
      }
    }

    getUser()
  }, [])

  useEffect(() => {
    async function fetchCounts() {
      if (!user) return
      const supabase = getSupabaseClient()
      const { data: reports, error } = await supabase
        .from("reports")
        .select("*")
        .eq("user_id", user.id)
      if (!error && reports) {
        setTotalReports(reports.length)
        setSavedReports(reports.length) // à adapter si tu as une logique de favoris
      }
    }
    fetchCounts()
  }, [user])

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col">
        <ResponsiveHeader />
        <main className="flex-1 flex items-center justify-center">
          <div className="animate-pulse">Loading...</div>
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
            <p className="mb-6">Please log in to access your dashboard.</p>
            <Link href="/login">
              <Button className="bg-blue-600 hover:bg-blue-700">Login</Button>
            </Link>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <ResponsiveHeader />

      <main className="flex-1 bg-gradient-to-b from-white to-blue-50">
        <div className="container px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
              <p className="text-muted-foreground">Welcome back, {user.user_metadata?.full_name || user.email}</p>
            </div>
            <div className="flex gap-4">
              <Link href="/generate">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  New Report
                </Button>
              </Link>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-3 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Total Reports</CardTitle>
                <CardDescription>Your generated reports</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{totalReports}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Saved Reports</CardTitle>
                <CardDescription>Reports saved to your account</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{savedReports}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Recent Activity</CardTitle>
                <CardDescription>Last report generated</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground">Today at 2:30 PM</div>
              </CardContent>
            </Card>
          </div>

          <div className="mb-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
              <h2 className="text-2xl font-bold">My Reports</h2>
              <div className="relative w-full sm:w-auto">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search reports..."
                  className="pl-10 w-full sm:w-[250px] border-blue-200 focus:border-blue-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {user && user.id && <ReportsList userId={user.id} searchTerm={searchTerm} />}
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Quick Actions</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Link href="/generate">
                <Card className="hover:shadow-md transition-shadow cursor-pointer border-blue-100">
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                      <PlusCircle className="h-6 w-6 text-blue-600" />
                    </div>
                    <h3 className="font-semibold">Generate Report</h3>
                    <p className="text-sm text-muted-foreground mt-2">Create a new market report</p>
                  </CardContent>
                </Card>
              </Link>
              <Link href="/my-reports">
                <Card className="hover:shadow-md transition-shadow cursor-pointer border-blue-100">
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                      <FileText className="h-6 w-6 text-blue-600" />
                    </div>
                    <h3 className="font-semibold">My Reports</h3>
                    <p className="text-sm text-muted-foreground mt-2">View all your saved reports</p>
                  </CardContent>
                </Card>
              </Link>
              <Link href="/reports">
                <Card className="hover:shadow-md transition-shadow cursor-pointer border-blue-100">
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                      <BarChart2 className="h-6 w-6 text-blue-600" />
                    </div>
                    <h3 className="font-semibold">Browse Reports</h3>
                    <p className="text-sm text-muted-foreground mt-2">Explore premium market reports</p>
                  </CardContent>
                </Card>
              </Link>
              <Link href="/settings">
                <Card className="hover:shadow-md transition-shadow cursor-pointer border-blue-100">
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-6 w-6 text-blue-600"
                      >
                        <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    </div>
                    <h3 className="font-semibold">Account Settings</h3>
                    <p className="text-sm text-muted-foreground mt-2">Manage your account preferences</p>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
