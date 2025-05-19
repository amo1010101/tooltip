"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, BarChart2, FileText, Home, Search, Settings, User, LineChart } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { UserMenu } from "@/components/auth/user-menu"
import { getSupabaseClient } from "@/lib/supabase/client"

export function ResponsiveHeader() {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loading, setLoading] = useState(true)

  // Vérifier l'état d'authentification au chargement
  useEffect(() => {
    async function checkAuth() {
      try {
        const supabase = getSupabaseClient()
        const {
          data: { session },
        } = await supabase.auth.getSession()
        setIsLoggedIn(!!session)
      } catch (error) {
        console.error("Error checking auth:", error)
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [])

  const closeMenu = () => {
    setIsOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 sm:px-8">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex items-center bg-primary text-primary-foreground rounded-md px-2 py-1">
              <LineChart className="h-5 w-5" />
            </div>
            <div className="sm:hidden flex flex-col">
              <span className="text-xs font-medium uppercase">INSYTRA</span>
              <span className="text-[9px] font-extralight tracking-tighter leading-none -mt-0.5">Market research</span>
            </div>
            <div className="hidden sm:flex flex-col">
              <span className="text-xl font-bold">Insytra</span>
              <span className="text-xs font-light -mt-1">Market Research</span>
            </div>
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-sm font-medium transition-colors hover:text-primary">
            Home
          </Link>
          <Link href="/features" className="text-sm font-medium transition-colors hover:text-primary">
            Features
          </Link>
          {!isLoggedIn && (
            <Link href="/pricing" className="text-sm font-medium transition-colors hover:text-primary">
              Pricing
            </Link>
          )}
          <Link href="/reports" className="text-sm font-medium transition-colors hover:text-primary">
            Reports
          </Link>
          {isLoggedIn && (
            <Link href="/my-reports" className="text-sm font-medium transition-colors hover:text-primary">
              My Reports
            </Link>
          )}
        </nav>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="hidden sm:flex">
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </Button>
          {isLoggedIn && (
            <Button variant="ghost" size="icon" asChild className="hidden sm:flex">
              <Link href="/settings">
                <Settings className="h-5 w-5" />
                <span className="sr-only">Settings</span>
              </Link>
            </Button>
          )}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[240px] sm:w-[300px]">
              <nav className="flex flex-col gap-4 mt-8">
                <Link
                  href="/"
                  onClick={closeMenu}
                  className="flex items-center gap-2 text-lg font-semibold px-2 py-1 rounded-md hover:bg-accent"
                >
                  <Home className="h-5 w-5" />
                  Home
                </Link>
                <Link
                  href="/features"
                  onClick={closeMenu}
                  className="flex items-center gap-2 text-lg font-semibold px-2 py-1 rounded-md hover:bg-accent"
                >
                  <FileText className="h-5 w-5" />
                  Features
                </Link>
                {!isLoggedIn && (
                  <Link
                    href="/pricing"
                    onClick={closeMenu}
                    className="flex items-center gap-2 text-lg font-semibold px-2 py-1 rounded-md hover:bg-accent"
                  >
                    <FileText className="h-5 w-5" />
                    Pricing
                  </Link>
                )}
                <Link
                  href="/generate"
                  onClick={closeMenu}
                  className="flex items-center gap-2 text-lg font-semibold px-2 py-1 rounded-md hover:bg-accent"
                >
                  <BarChart2 className="h-5 w-5" />
                  Generate Report
                </Link>
                <Link
                  href="/reports"
                  onClick={closeMenu}
                  className="flex items-center gap-2 text-lg font-semibold px-2 py-1 rounded-md hover:bg-accent"
                >
                  <FileText className="h-5 w-5" />
                  Browse Reports
                </Link>
                {isLoggedIn && (
                  <Link
                    href="/my-reports"
                    onClick={closeMenu}
                    className="flex items-center gap-2 text-lg font-semibold px-2 py-1 rounded-md hover:bg-accent"
                  >
                    <User className="h-5 w-5" />
                    My Reports
                  </Link>
                )}
              </nav>
            </SheetContent>
          </Sheet>
          <UserMenu />
        </div>
      </div>
    </header>
  )
}
