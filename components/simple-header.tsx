import Link from "next/link"
import { LineChart } from "lucide-react"

import { Button } from "@/components/ui/button"

export function SimpleHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center justify-between px-4 sm:px-8">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex items-center bg-primary text-primary-foreground rounded-md px-2 py-1">
            <LineChart className="h-5 w-5" />
            <span className="text-xs font-medium sm:hidden">Insytra</span>
          </div>
          <div className="hidden sm:flex flex-col">
            <span className="text-xl font-bold">Insytra</span>
            <span className="text-xs font-light -mt-1">Market Research</span>
          </div>
        </Link>

        <div className="flex items-center gap-4">
          <Link href="/pricing">
            <Button variant="ghost" size="sm" className="hidden sm:inline-flex">
              Pricing
            </Button>
          </Link>
          <Link href="/reports">
            <Button variant="ghost" size="sm" className="hidden sm:inline-flex">
              Reports
            </Button>
          </Link>
        </div>
      </div>
    </header>
  )
}
