"use client"

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { PaywallOverlay } from "./PaywallOverlay"
import { Badge } from "./ui/badge"

// Helper function to safely render potentially complex values
// (Copied from MarketOverview for now, consider moving to a shared utils file)
const renderValue = (value: any): React.ReactNode => {
  if (typeof value === 'object' && value !== null && value.hasOwnProperty('value')) {
    // Handle objects like { value: 100, unit: 'Year', year: 2025 } or simple dates
    let display = String(value.value);
    if (value.unit) {
      display += ` ${value.unit}`;
    }
    if (value.year && value.unit?.toLowerCase() !== 'year') { // Avoid double year if unit is already year
      display += ` (${value.year})`;
    }
    return display;
  } else if (value instanceof Date) {
    // Handle Date objects
    return value.toLocaleDateString(); // Or other formatting as needed
  } else if (typeof value === 'object' && value !== null) {
    // Fallback for unexpected objects
    return JSON.stringify(value);
  }
  // Handle primitives (string, number, etc.) or null/undefined
  return value != null ? String(value) : "N/A";
};

interface RegulatoryAnalysisProps {
  report: any
  isAuthenticated: boolean | null
  subscriptionStatus: string | null
  COLORS: string[]
}

interface RegulatoryItem {
  name: string;
  region: string;
  impact: string;
  status: string;
  description: string;
  compliance: string;
  deadline: string;
  penalty: string;
}

export function RegulatoryAnalysis({ report, isAuthenticated, subscriptionStatus, COLORS }: RegulatoryAnalysisProps) {
  // Utiliser les données réglementaires de l'API si disponibles
  const regulatoryData = report?.regulatoryData || { 
    regulations: [],
    considerations: []
  };

  // Fonction pour définir la couleur en fonction de l'impact
  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "High":
        return "text-red-500"
      case "Medium":
        return "text-orange-500"
      case "Low":
        return "text-green-500"
      default:
        return "text-blue-500"
    }
  }

  // Fonction pour définir la couleur en fonction du statut
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Enforced":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">{status}</Badge>
      case "Phase-in":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">{status}</Badge>
      case "Proposed":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">{status}</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  // Si aucune donnée réglementaire n'est disponible et qu'il n'y a pas de défis liés à la réglementation
  const hasRegulatoryData = 
    (regulatoryData.regulations && regulatoryData.regulations.length > 0) ||
    (report?.challenges && report.challenges.some((c: string) => 
      c.toLowerCase().includes('regul') || 
      c.toLowerCase().includes('légis') || 
      c.toLowerCase().includes('politique') ||
      c.toLowerCase().includes('compliance')
    ));

  return (
    <Card className="relative">
      <CardHeader>
        <CardTitle>Regulatory Analysis</CardTitle>
        <CardDescription>Comprehensive overview of key regulations affecting the market</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {hasRegulatoryData ? (
          <>
            {regulatoryData.regulations.length > 0 && (
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Key Regulatory Frameworks</h3>
                <div className="rounded-md border">
                  <div className="overflow-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-muted/50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Regulation</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Region</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Impact</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200 dark:bg-transparent">
                        {regulatoryData.regulations.map((item: RegulatoryItem, index: number) => (
                          <tr key={index} className="hover:bg-muted/30">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{item.name}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">{item.region}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                              <span className={`font-medium ${getImpactColor(item.impact)}`}>{item.impact}</span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                              {getStatusBadge(item.status)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {regulatoryData.regulations.length > 0 && (
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Regulatory Details</h3>
                <div className="grid grid-cols-1 gap-4">
                  {regulatoryData.regulations.map((item: RegulatoryItem, index: number) => (
                    <Card key={index} className="border shadow-sm">
                      <CardHeader className="p-4">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-base">{item.name}</CardTitle>
                          {getStatusBadge(item.status)}
                        </div>
                        <CardDescription>{item.region}</CardDescription>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <p className="text-sm mb-3">{item.description}</p>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                          <div>
                            <div className="text-muted-foreground">Compliance</div>
                            <div>{item.compliance}</div>
                          </div>
                          <div>
                            <div className="text-muted-foreground">Deadline</div>
                            <div>{renderValue(item.deadline)}</div>
                          </div>
                          <div>
                            <div className="text-muted-foreground">Potential Penalty</div>
                            <div>{item.penalty}</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Key Regulatory Considerations</h3>
              <Card className="border shadow-sm p-4">
                <ul className="space-y-2 text-sm list-disc pl-5">
                  {regulatoryData.considerations.length > 0 ? (
                    regulatoryData.considerations.map((item: string, index: number) => (
                      <li key={index}>{item}</li>
                    ))
                  ) : (
                    <>
                      <li>Companies must maintain continuous monitoring of evolving regulatory landscapes.</li>
                      <li>Cross-border operations require adherence to multiple regulatory frameworks simultaneously.</li>
                      <li>Privacy-by-design and security-by-design principles are increasingly mandated by regulations.</li>
                    </>
                  )}
                </ul>
              </Card>
            </div>

            {/* Afficher les défis réglementaires tirés des défis généraux du rapport */}
            {report?.challenges && (
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Regulatory Challenges</h3>
                <Card className="border shadow-sm p-4">
                  <ul className="space-y-2 text-sm list-disc pl-5">
                    {report.challenges
                      .filter((challenge: string) => 
                        challenge.toLowerCase().includes('regul') || 
                        challenge.toLowerCase().includes('légis') || 
                        challenge.toLowerCase().includes('politique') ||
                        challenge.toLowerCase().includes('compliance') ||
                        challenge.toLowerCase().includes('loi') ||
                        challenge.toLowerCase().includes('gouvernement')
                      )
                      .map((challenge: string, index: number) => (
                        <li key={index}>{challenge}</li>
                      ))
                    }
                  </ul>
                </Card>
              </div>
            )}
          </>
        ) : (
          <div className="text-center p-6 text-muted-foreground">
            <p>No specific regulatory information is available for this market.</p>
            <p className="mt-2">Please refer to general industry regulations that may apply.</p>
          </div>
        )}
      </CardContent>
      {(!isAuthenticated || (subscriptionStatus !== 'active' && subscriptionStatus !== 'trialing')) && <PaywallOverlay isAuthenticated={isAuthenticated} />}
    </Card>
  )
} 