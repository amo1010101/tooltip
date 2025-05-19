"use client"

import Link from "next/link"
import { Lock } from "lucide-react"
import { Button } from "@/components/ui/button"

interface PaywallOverlayProps {
  isAuthenticated?: boolean | null
}

export function PaywallOverlay({ isAuthenticated = false }: PaywallOverlayProps) {
  return (
    <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-card p-6 rounded-lg shadow-lg max-w-md w-full mx-4">
        <div className="flex items-center gap-2 mb-4">
          <Lock className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold">Premium Content</h3>
        </div>
        <p className="text-muted-foreground mb-4">
          {isAuthenticated 
            ? "This content is only available to premium users. Please upgrade your subscription to access the full report."
            : "This content is only available to registered users. Please sign in to access the full report."}
        </p>
        <div className="flex flex-col gap-2">
          {isAuthenticated ? (
            <Button asChild className="w-full">
              <Link href="/pricing">Upgrade Subscription</Link>
            </Button>
          ) : (
            <>
              <Button asChild className="w-full">
                <Link href="/login">Sign In</Link>
              </Button>
              <Button variant="outline" asChild className="w-full">
                <Link href="/register">Create Account</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  )
} 