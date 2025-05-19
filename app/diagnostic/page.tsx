import { Button } from "@/components/ui/button"
import { DiagnosticQuiz } from "@/components/diagnostic-quiz"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function DiagnosticPage() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <section className="w-full max-w-md px-4 py-6">
        <div className="flex items-center mb-6">
          <Button variant="ghost" size="sm" className="text-[#2D3648]" asChild>
            <Link href="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>

        <div className="text-center mb-6">
          <h2 className="text-xl font-medium text-[#2D3648]">Your 3-Minute Diagnostic</h2>
          <p className="text-sm text-[#4A5568] mt-1">
            Let's understand where you are to help you get where you want to be
          </p>
        </div>

        <DiagnosticQuiz />
      </section>
    </main>
  )
}
