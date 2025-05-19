"use client"

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { PaywallOverlay } from "./PaywallOverlay"
import { BarChartComponent, PieChartComponent } from "./charts"

interface CompetitorAnalysisProps {
  report: any
  isAuthenticated: boolean | null
  subscriptionStatus: string | null
  COLORS: string[]
}

interface CompetitorProfile {
  name: string;
  share: number;
  strengths: string[];
  weaknesses: string[];
  strategies: string[];
}

export function CompetitorAnalysis({ report, isAuthenticated, subscriptionStatus, COLORS }: CompetitorAnalysisProps) {
  // Utiliser les données de l'API ou les données du rapport
  const competitors = report?.competitorsData || {};
  
  // Utiliser les données des acteurs clés comme base
  const competitorData = competitors.profiles 
    ? competitors.profiles.map((profile: CompetitorProfile) => ({ name: profile.name, share: profile.share }))
    : report?.keyPlayersData || [];

  return (
    <Card className="relative">
      <CardHeader>
        <CardTitle>Competitor Analysis</CardTitle>
        <CardDescription>Detailed analysis of key competitors and their market positioning</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Top Competitors</h3>
            <div className="h-[300px]">
              <BarChartComponent 
                data={competitorData}
                dataKey="share"
                colors={COLORS}
                legendName="Market Share (%)"
              />
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Market Share Distribution</h3>
            <div className="h-[300px]">
              <PieChartComponent 
                data={competitorData}
                dataKey="share"
                colors={COLORS}
                activeShape
                showLegend
              />
            </div>
          </div>
        </div>

        {competitors.rdInvestment && competitors.rdInvestment.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">R&D Investment (relative)</h3>
              <div className="h-[300px]">
                <BarChartComponent
                  data={competitors.rdInvestment}
                  dataKey="value"
                  colors={COLORS}
                  legendName="R&D Investment Score"
                />
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Strategic Positioning</h3>
              <div className="h-[300px]">
                <BarChartComponent
                  data={competitors.strategicPosition || []}
                  dataKey="value"
                  colors={COLORS.slice(2, 7)}
                  legendName="Score (0-100)"
                />
              </div>
            </div>
          </div>
        )}

        {competitors.profiles && competitors.profiles.length > 0 && (
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Key Competitor Profiles</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {competitors.profiles.slice(0, 4).map((competitor: any, index: number) => (
                <Card key={index} className={`border-l-4`} style={{ borderLeftColor: COLORS[index % COLORS.length] }}>
                  <CardHeader className="p-4">
                    <CardTitle className="text-base">{competitor.name}</CardTitle>
                    <CardDescription>{competitor.share}% market share</CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <h4 className="text-sm font-medium mb-2">Strengths:</h4>
                    <ul className="text-sm space-y-1 mb-3">
                      {competitor.strengths.map((strength: string, i: number) => (
                        <li key={`strength-${i}`}>• {strength}</li>
                      ))}
                    </ul>
                    <h4 className="text-sm font-medium mb-2">Weaknesses:</h4>
                    <ul className="text-sm space-y-1">
                      {competitor.weaknesses.map((weakness: string, i: number) => (
                        <li key={`weakness-${i}`}>• {weakness}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Afficher la liste des acteurs clés comme fallback si pas de profils détaillés */}
        {(!competitors.profiles || competitors.profiles.length === 0) && competitorData.length > 0 && (
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Key Market Players</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {competitorData.slice(0, 4).map((player: any, index: number) => (
                <Card key={index} className="border shadow-sm">
                  <CardHeader className="p-4">
                    <CardTitle className="text-base">{player.name}</CardTitle>
                    <CardDescription>{player.share}% market share</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Intégrer des informations sur le marché à partir des autres sections du rapport */}
        {report?.trends && (
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Market Competition Insights</h3>
            <Card className="p-4 border">
              <ul className="space-y-2">
                {report.trends.filter((trend: string) => 
                  trend.toLowerCase().includes('concurrent') || 
                  trend.toLowerCase().includes('compet') || 
                  trend.toLowerCase().includes('player') ||
                  trend.toLowerCase().includes('market leader')
                ).map((trend: string, i: number) => (
                  <li key={i} className="text-sm">• {trend}</li>
                ))}
                {report.challenges && report.challenges.filter((challenge: string) => 
                  challenge.toLowerCase().includes('concurrent') || 
                  challenge.toLowerCase().includes('compet') || 
                  challenge.toLowerCase().includes('rival')
                ).map((challenge: string, i: number) => (
                  <li key={`c-${i}`} className="text-sm">• {challenge}</li>
                ))}
              </ul>
            </Card>
          </div>
        )}
      </CardContent>
      {(!isAuthenticated || (subscriptionStatus !== 'active' && subscriptionStatus !== 'trialing')) && <PaywallOverlay isAuthenticated={isAuthenticated} />}
    </Card>
  )
} 