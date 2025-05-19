"use client"

import { useEffect } from "react"
import Link from "next/link"
import { AlertCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ResponsiveHeader } from "@/components/responsive-header"

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="flex min-h-screen flex-col">
      <ResponsiveHeader />

      <main className="flex-1 flex items-center justify-center">
        <div className="container px-4 py-16 flex flex-col items-center text-center">
          <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-red-100">
            <AlertCircle className="h-10 w-10 text-red-600" />
          </div>

          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl mb-2">Something went wrong</h1>

          <p className="text-xl text-gray-600 mb-8">There was an error generating your report.</p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button onClick={reset} className="bg-blue-600 hover:bg-blue-700">
              Try Again
            </Button>

            <Link href="/generate">
              <Button variant="outline" className="border-blue-200 text-blue-600 hover:bg-blue-50">
                Return to Generator
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
