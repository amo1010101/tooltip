"use client"

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { PaywallOverlay } from "./PaywallOverlay"
import { BarChartComponent, LineChartComponent } from "./charts"

interface TechnologyInnovationProps {
  report: any
  isAuthenticated: boolean | null
  subscriptionStatus: string | null
  COLORS: string[]
}

interface AdoptionTimelineItem {
  year: string;
  technologies: Record<string, number>;
}

export function TechnologyInnovation({ report, isAuthenticated, subscriptionStatus, COLORS }: TechnologyInnovationProps) {
  // Utiliser les données de l'API si disponibles
  const techData = report?.technologyData || {
    adoptionTimeline: [],
    rdInvestment: [],
    techImpact: [],
    innovationTrends: []
  };

  // Transformer les données d'adoption technologique pour le graphique linéaire
  const prepareAdoptionData = () => {
    if (!techData.adoptionTimeline || techData.adoptionTimeline.length === 0) {
      return [];
    }

    return techData.adoptionTimeline.map((item: AdoptionTimelineItem) => {
      const { year, technologies } = item;
      return { year, ...technologies };
    });
  };

  // Préparer les séries pour le graphique linéaire
  const prepareAdoptionSeries = () => {
    if (!techData.adoptionTimeline || techData.adoptionTimeline.length === 0) {
      return [];
    }
    
    // Prendre les clés du premier objet de technologies comme séries
    const firstItem = techData.adoptionTimeline[0];
    const techKeys = Object.keys(firstItem.technologies || {});
    
    return techKeys.map((key, index) => ({
      dataKey: key,
      color: COLORS[index % COLORS.length],
      name: key
    }));
  };

  const adoptionData = prepareAdoptionData();
  const adoptionSeries = prepareAdoptionSeries();

  return (
    <Card className="relative">
      <CardHeader>
        <CardTitle>Technology & Innovation</CardTitle>
        <CardDescription>Analysis of technological advancements and innovation trends in the market</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {adoptionData.length > 0 && (
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Technology Adoption Timeline</h3>
            <div className="h-[400px]">
              <LineChartComponent 
                data={adoptionData}
                series={adoptionSeries}
                xAxisKey="year"
                height={400}
              />
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">R&D Investment Distribution</h3>
            <div className="h-[300px]">
              {techData.rdInvestment.length > 0 ? (
                <BarChartComponent
                  data={techData.rdInvestment}
                  dataKey="value"
                  xAxisKey="sector"
                  colors={[COLORS[5]]}
                  legendName="Investment Allocation (%)"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  No R&D investment data available
                </div>
              )}
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Technology Impact Score</h3>
            <div className="h-[300px]">
              {techData.techImpact.length > 0 ? (
                <BarChartComponent
                  data={techData.techImpact}
                  dataKey="value"
                  xAxisKey="technology"
                  colors={[COLORS[7]]}
                  legendName="Impact Score (0-100)"
                  layout="vertical"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  No technology impact data available
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-semibold text-lg">Key Innovation Trends</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {techData.innovationTrends.map((item: any, index: number) => (
              <Card key={index} className="border shadow-sm">
                <CardHeader className="p-4 bg-muted/30">
                  <CardTitle className="text-base">{item.trend}</CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Impact:</span>
                      <span className={`text-sm font-medium ${
                        item.impact === "Very High" ? "text-red-500" :
                        item.impact === "High" ? "text-orange-500" :
                        item.impact === "Medium" ? "text-yellow-500" :
                        "text-green-500"
                      }`}>{item.impact}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Market Readiness:</span>
                      <span className={`text-sm font-medium ${
                        item.readiness === "High" ? "text-green-500" :
                        item.readiness === "Medium" ? "text-yellow-500" :
                        "text-red-500"
                      }`}>{item.readiness}</span>
                    </div>
                  </div>
                  <p className="mt-3 text-sm">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            ))}

            {techData.innovationTrends.length === 0 && (
              <div className="col-span-full text-center text-muted-foreground p-4">
                No specific technology innovation trends are available for this market report.
              </div>
            )}
          </div>
        </div>

        {/* Afficher des liens vers les tendances technologiques et les défis */}
        {report?.trends?.some((t: string) => 
          t.toLowerCase().includes('technolog') || 
          t.toLowerCase().includes('innov') ||
          t.toLowerCase().includes('digital')
        ) && (
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Related Technology Trends</h3>
            <Card className="p-4 border">
              <ul className="space-y-2">
                {report.trends.filter((t: string) => 
                  t.toLowerCase().includes('technolog') || 
                  t.toLowerCase().includes('innov') ||
                  t.toLowerCase().includes('digital') ||
                  t.toLowerCase().includes('ai') ||
                  t.toLowerCase().includes('data')
                ).map((trend: string, i: number) => (
                  <li key={i} className="text-sm">• {trend}</li>
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