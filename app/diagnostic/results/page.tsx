import Link from "next/link"
import { Button } from "@/components/ui/button"
import { DiagnosticResults } from "@/components/diagnostic-results"
import { ArrowLeft } from "lucide-react"

export default function DiagnosticResultsPage() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <section className="w-full max-w-md px-4 py-6">
        <div className="flex items-center mb-6">
          <Button variant="ghost" size="sm" className="text-[#2D3648]" asChild>
            <Link href="/diagnostic">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>

        <div className="text-center mb-6">
          <h2 className="text-xl font-medium text-[#2D3648]">Your Life Balance Assessment</h2>
          <p className="text-sm text-[#4A5568] mt-1">Based on your responses, here's where you stand today</p>
        </div>

        <DiagnosticResults />

        <div className="mt-8 space-y-4">
          <Button className="w-full bg-[#2D3648] hover:bg-[#4A5568]" asChild>
            <Link href="/">Begin Your Journey</Link>
          </Button>
          <Button variant="outline" className="w-full border-[#E1E5EA] text-[#2D3648] hover:bg-[#F0F2F5]" asChild>
            <Link href="/learning">Explore Learning Resources</Link>
          </Button>
        </div>
      </section>
    </main>
  )
}
