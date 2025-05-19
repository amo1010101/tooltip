import { ResponsiveHeader } from "@/components/responsive-header"
import { ReportLoader } from "@/components/report-loader"

export default function Loading() {
  return (
    <div className="flex min-h-screen flex-col">
      <ResponsiveHeader />
      <main className="flex-1">
        <div className="container px-4 py-8">
          {/* Utiliser le composant ReportLoader existant avec un mot-clé générique */}
          <ReportLoader keyword="your search" mode="loading" />
        </div>
      </main>
    </div>
  )
}
