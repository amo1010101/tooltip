import Link from "next/link"
import { AlertCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ResponsiveHeader } from "@/components/responsive-header"

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col">
      <ResponsiveHeader />

      <main className="flex-1 flex items-center justify-center">
        <div className="container px-4 py-16 flex flex-col items-center text-center">
          <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-red-100">
            <AlertCircle className="h-10 w-10 text-red-600" />
          </div>

          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl mb-2">No keyword provided</h1>

          <p className="text-xl text-gray-600 mb-8">There was an error generating your report.</p>

          <Link href="/generate">
            <Button className="bg-blue-600 hover:bg-blue-700">Try Again</Button>
          </Link>
        </div>
      </main>
    </div>
  )
}
