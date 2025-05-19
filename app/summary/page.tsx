import Link from "next/link"
import { Button } from "@/components/ui/button"
import { DailySummary } from "@/components/daily-summary"
import { ArrowLeft } from "lucide-react"

export default function SummaryPage() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-gradient-to-b from-teal-50 to-white text-slate-800">
      <header className="w-full p-4 flex items-center">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Link>
        </Button>
        <h1 className="text-xl font-light text-teal-700 mx-auto pr-10">Daily Summary</h1>
      </header>

      <section className="w-full max-w-md px-4 py-6">
        <DailySummary />
      </section>
    </main>
  )
}
