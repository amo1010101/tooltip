"use client"

import Link from "next/link"
import { useState } from "react"
import { Download, Lock, ArrowRight, UserCog, Calendar, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { SaveReportButton } from "@/components/save-report-button"

interface SidebarActionsProps {
  report: any
  isAuthenticated: boolean | null
  subscriptionStatus: string | null
  sourceType?: "keyword" | "url"
  sourceValue: string
  isGeneratingPDF: boolean
  handleDownloadPDF: () => Promise<void>
  geographicArea?: string
}

export function SidebarActions({
  report,
  isAuthenticated,
  subscriptionStatus,
  sourceType,
  sourceValue,
  isGeneratingPDF,
  handleDownloadPDF,
  geographicArea
}: SidebarActionsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Report Information */}
      <Card className="overflow-hidden border shadow-sm">
        <CardHeader className="p-3 sm:p-4 bg-muted/50">
          <CardTitle className="text-sm sm:text-base">Report Information</CardTitle>
        </CardHeader>
        <CardContent className="p-3 sm:p-4 space-y-3">
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">Generated:</span>
            <span className="font-medium">{new Date().toLocaleDateString()}</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">Keyword:</span>
            <span className="font-medium">{sourceType === "url" ? "Input URL" : sourceValue}</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">Source:</span>
            <span className="font-medium">{sourceType === "keyword" ? "Keyword" : "Website"}</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">Region:</span>
            <span className="font-medium">{geographicArea || "Worldwide"}</span>
          </div>
          <Separator className="my-2" />
          <div className="flex flex-col gap-2">
            {isAuthenticated ? (
              <>
                <Button
                  onClick={handleDownloadPDF}
                  disabled={isGeneratingPDF}
                  className="w-full flex items-center justify-center"
                >
                  {isGeneratingPDF ? (
                    <>Generating PDF...</>
                  ) : (
                    <>
                      <Download className="mr-2 h-4 w-4" />
                      Download PDF
                    </>
                  )}
                </Button>

                <SaveReportButton
                  report={report}
                  keyword={sourceValue}
                  geographicArea={geographicArea}
                />
              </>
            ) : (
              <>
                <Button
                  className="w-full flex items-center justify-center bg-primary hover:bg-primary/90"
                  asChild
                >
                  <Link href="/login">
                    <Lock className="mr-2 h-4 w-4" />
                    Upgrade for full report + PDF
                  </Link>
                </Button>
                
                <Button variant="outline" asChild className="w-full">
                  <Link href="/login">
                    <Lock className="mr-2 h-4 w-4" />
                    Sign in to save
                  </Link>
                </Button>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Expert Analysis section - only visible for logged in users */}
      {isAuthenticated ? (
        <Card className="overflow-hidden border shadow-sm max-w-md mx-auto border-blue-100">
          <CardHeader className="p-3 sm:p-4 bg-blue-50">
            <CardTitle className="text-sm sm:text-base flex items-center">
              <UserCog className="h-4 w-4 mr-2 text-blue-600" />
              Expert Analysis
            </CardTitle>
          </CardHeader>
          <CardContent className="p-3 sm:p-4">
            <p className="text-sm text-muted-foreground mb-4">
              Need a deeper analysis? Request a detailed review from one of our industry experts 
              and receive personalized insights within 48 hours.
            </p>
            <div className="flex items-center justify-between mb-4 text-xs text-muted-foreground">
              <div className="flex items-center">
                <Clock className="h-3 w-3 mr-1 text-blue-500" />
                <span>Response within 48h</span>
              </div>
              <div className="flex items-center">
                <Calendar className="h-3 w-3 mr-1 text-blue-500" />
                <span>Personalized report</span>
              </div>
            </div>
            <Button asChild variant="default" className="w-full bg-blue-600 hover:bg-blue-700">
              <Link href="/contact?type=expert-analysis&source=report">
                <ArrowRight className="mr-2 h-4 w-4" />
                Request Expert Analysis
              </Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Card className="overflow-hidden border shadow-sm max-w-md mx-auto">
          <CardHeader className="p-3 sm:p-4 bg-muted/50">
            <CardTitle className="text-sm sm:text-base">Need More Details?</CardTitle>
          </CardHeader>
          <CardContent className="p-3 sm:p-4">
            <p className="text-sm text-muted-foreground mb-4">
              This report provides a quick overview. Subscribe to our premium plan 
              for in-depth analysis and comprehensive market insights.
            </p>
            <Button asChild variant="outline" className="w-full">
              <Link href="/pricing">
                <ArrowRight className="mr-2 h-4 w-4" />
                Upgrade for Full Access
              </Link>
            </Button>
          </CardContent>
        </Card>
      )}
      
      {/* Disclaimer section */}
      <Card className="overflow-hidden border shadow-sm md:col-span-2 lg:col-span-1">
        <CardHeader className="p-3 sm:p-4 bg-muted/50">
          <CardTitle className="text-sm sm:text-base">Disclaimer</CardTitle>
        </CardHeader>
        <CardContent className="p-3 sm:p-4">
          <p className="text-xs text-muted-foreground">
            This report is intended for informational purposes only.
            The data and insights provided are based on available information and may not be completely accurate.
            We recommend additional research for critical business decisions.
          </p>
        </CardContent>
      </Card>
    </div>
  )
} 