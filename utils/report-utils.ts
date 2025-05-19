"use client"

// Types - Reuse or import from a central types definition
interface Report {
  title: string;
  summary: string;
  marketSize: string;
  growthRate: string;
  keyPlayers: string[];
  keyPlayersData: Array<{
    name: string;
    share: number;
  }>;
  segments: Array<{
    name: string;
    description: string;
    share: string;
    value?: number;
  }>;
  regions: Array<{
    name: string;
    description: string;
    share: string;
    value?: number;
  }>;
  trends: string[];
  challenges: string[];
  opportunities: string[];
  forecast: string;
  forecastData: Array<{
    year: number;
    value: number;
  }>;
  swot?: {
    strengths: string[];
    weaknesses: string[];
    opportunities: string[];
    threats: string[];
  };
  consumerData?: {
    demographics: Array<{
      age: string;
      value: number;
    }>;
    preferences: Array<{
      name: string;
      value: number;
    }>;
    purchaseFactors: Array<{
      factor: string;
      value: number;
    }>;
    behaviorTrends: Array<{
      trend: string;
      impact: string;
      description: string;
    }>;
  };
  technologyData?: {
    adoptionTimeline: Array<{
      year: string;
      technologies: Record<string, number>;
    }>;
    rdInvestment: Array<{
      sector: string;
      value: number;
    }>;
    techImpact: Array<{
      technology: string;
      value: number;
    }>;
    innovationTrends: Array<{
      trend: string;
      impact: string;
      readiness: string;
      description: string;
    }>;
  };
  regulatoryData?: {
    regulations: Array<{
      name: string;
      region: string;
      impact: string;
      status: string;
      description: string;
      compliance: string;
      deadline: string;
      penalty: string;
    }>;
    considerations: string[];
  };
  competitorsData?: {
    profiles: Array<{
      name: string;
      share: number;
      strengths: string[];
      weaknesses: string[];
      strategies: string[];
    }>;
    rdInvestment: Array<{
      name: string;
      value: number;
    }>;
    strategicPosition: Array<{
      name: string;
      value: number;
    }>;
  };
}

// Génère des données sur les consommateurs à partir des tendances et défis
const generateConsumerData = (reportData: any) => {
  const behaviors = (reportData.trends || [])
    .filter((trend: string | { name: string }) => {
        const trendStr = typeof trend === 'string' ? trend : trend.name;
        return trendStr.toLowerCase().includes('consommateur') ||
               trendStr.toLowerCase().includes('client') ||
               trendStr.toLowerCase().includes('acheteur') ||
               trendStr.toLowerCase().includes('consumer') ||
               trendStr.toLowerCase().includes('customer');
      }
    )
    .slice(0, 5);

  return {
    demographics: [
      { age: "18-24", value: 15 },
      { age: "25-34", value: 30 },
      { age: "35-44", value: 25 },
      { age: "45-54", value: 20 },
      { age: "55+", value: 10 },
    ],
    preferences: [
      { name: "Online", value: 60 },
      { name: "In-Store", value: 25 },
      { name: "Mobile App", value: 15 },
    ],
    purchaseFactors: [
      { factor: "Price", value: 85 },
      { factor: "Quality", value: 78 },
      { factor: "Brand Reputation", value: 65 },
      { factor: "Sustainability", value: 45 },
      { factor: "Convenience", value: 72 },
    ],
    behaviorTrends: behaviors.map((trend: string | { name: string }, index: number) => {
      const trendName = typeof trend === 'string' ? trend : trend.name;
      return {
        trend: trendName,
        impact: ["High", "Medium", "Very High", "Medium", "High"][index % 5],
        description: [
          "Growing trend with significant influence on purchasing decisions.",
          "Rapidly evolving consumer preference with long-term market implications.",
          "Emerging pattern affecting specific market segments.",
          "Established behavior pattern driving product development.",
          "Recent shift in consumer attitudes with measurable market impact."
        ][index % 5]
      };
    })
  };
}

// Génère des données sur la technologie à partir des tendances et opportunités
const generateTechnologyData = (reportData: any) => {
  const techTrends = [...(reportData.trends || []), ...(reportData.opportunities || [])]
    .filter((item: string | { name: string }) => {
        const itemStr = typeof item === 'string' ? item : item.name;
        return itemStr.toLowerCase().includes('technolog') ||
               itemStr.toLowerCase().includes('innovat') ||
               itemStr.toLowerCase().includes('digital') ||
               itemStr.toLowerCase().includes('ia') ||
               itemStr.toLowerCase().includes('ai') ||
               itemStr.toLowerCase().includes('cloud') ||
               itemStr.toLowerCase().includes('data');
      }
    )
    .slice(0, 6);

  return {
    adoptionTimeline: [
      { year: "2020", technologies: { AI: 20, IoT: 15, Blockchain: 10, Cloud: 40, "5G": 5 } },
      { year: "2021", technologies: { AI: 35, IoT: 25, Blockchain: 20, Cloud: 55, "5G": 15 } },
      { year: "2022", technologies: { AI: 50, IoT: 40, Blockchain: 30, Cloud: 70, "5G": 30 } },
      { year: "2023", technologies: { AI: 65, IoT: 55, Blockchain: 40, Cloud: 80, "5G": 50 } },
      { year: "2024", technologies: { AI: 80, IoT: 70, Blockchain: 50, Cloud: 90, "5G": 70 } },
    ],
    rdInvestment: [
      { sector: "Software", value: 45 },
      { sector: "Hardware", value: 30 },
      { sector: "Services", value: 25 },
      { sector: "Research", value: 20 },
      { sector: "Patents", value: 15 },
    ],
    techImpact: [
      { technology: "Artificial Intelligence", value: 85 },
      { technology: "Internet of Things", value: 75 },
      { technology: "Cloud Computing", value: 90 },
      { technology: "Blockchain", value: 45 },
      { technology: "5G", value: 70 },
      { technology: "Quantum Computing", value: 25 },
    ],
    innovationTrends: techTrends.map((trend: string | { name: string }, index: number) => {
      const trendName = typeof trend === 'string' ? trend : trend.name;
      return {
        trend: trendName,
        impact: ["Very High", "High", "Medium", "High", "Medium", "Very High"][index % 6],
        readiness: ["High", "Medium", "Low", "Medium", "High", "Medium"][index % 6],
        description: [
          "Revolutionizing core processes with significant market disruption potential.",
          "Creating new solution categories with strong growth metrics.",
          "Enhancing efficiency and scalability across the value chain.",
          "Early-stage development with long-term strategic implications.",
          "Driving competitive advantage through operational excellence.",
          "Creating new customer engagement paradigms with broad applications."
        ][index % 6]
      };
    })
  };
}

// Génère des données réglementaires à partir des défis et tendances
const generateRegulatoryData = (reportData: any) => {
  const regItems = [...(reportData.challenges || []), ...(reportData.trends || [])]
    .filter((item: string | { name: string }) => {
        const itemStr = typeof item === 'string' ? item : item.name;
        return itemStr.toLowerCase().includes('regul') ||
               itemStr.toLowerCase().includes('légis') ||
               itemStr.toLowerCase().includes('législ') ||
               itemStr.toLowerCase().includes('règlement') ||
               itemStr.toLowerCase().includes('loi') ||
               itemStr.toLowerCase().includes('compliance') ||
               itemStr.toLowerCase().includes('politique');
      }
    )
    .slice(0, 6);

  const regulations = regItems.map((item: string | { name: string }, index: number) => {
    const itemName = typeof item === 'string' ? item : item.name;
    const statuses = ["Enforced", "Phase-in", "Proposed", "Enforced", "Phase-in", "Proposed"];
    const regions = ["European Union", "United States", "Global", "France", "European Union", "United States"];
    const impacts = ["High", "Medium", "High", "Medium", "High", "Medium"];
    const deadlines = ["Implemented", "2024", "2025", "Implemented", "2024", "Unknown"];

    return {
      name: itemName,
      region: regions[index % 6],
      impact: impacts[index % 6],
      status: statuses[index % 6],
      description: `Regulatory framework impacting ${itemName.toLowerCase()}.`,
      compliance: index % 2 === 0 ? "Mandatory" : "Variable based on criteria",
      deadline: deadlines[index % 6],
      penalty: "Varies by jurisdiction"
    };
  });

  return {
    regulations: regulations.length > 0 ? regulations : [
      {
        name: "GDPR Compliance",
        region: "European Union",
        impact: "High",
        status: "Enforced",
        description: "General Data Protection Regulation impacting data collection, storage, and processing practices.",
        compliance: "Mandatory",
        deadline: "Implemented",
        penalty: "Up to €20 million or 4% of global revenue"
      },
      {
        name: "Digital Services Act (DSA)",
        region: "European Union",
        impact: "High",
        status: "Phase-in",
        description: "New framework to regulate digital services and ensure user protection online.",
        compliance: "Mandatory for online platforms",
        deadline: "February 2024",
        penalty: "Up to 6% of global turnover"
      }
    ],
    considerations: [
      "Companies must maintain continuous monitoring of evolving regulatory landscapes.",
      "Cross-border operations require adherence to multiple regulatory frameworks simultaneously.",
      "Privacy-by-design and security-by-design principles are increasingly mandated by regulations.",
      "Data localization requirements vary significantly by region.",
      "Demonstrable compliance through documentation and processes is essential.",
      "Appointment of dedicated compliance officers for key regulations is becoming standard practice."
    ]
  };
}

// Génère des données sur les concurrents à partir des acteurs clés
const generateCompetitorData = (reportData: any) => {
  if (!reportData.keyPlayersData) return undefined;
  return {
    profiles: reportData.keyPlayersData.map((player: any, index: number) => ({
      name: player.name,
      share: player.share,
      strengths: [
        ["Strong R&D", "Customer focus", "Price leader", "Innovation leader"][index % 4],
        ["Global presence", "Regional focus", "Diversified", "Specialized"][index % 4],
        ["Expanding", "Stable", "Growing", "Emerging"][index % 4]
      ],
      weaknesses: [
        ["Limited innovation", "High prices", "Regional focus only", "Narrow product range"][index % 4],
        ["Limited market presence", "Quality issues", "Customer service", "Supply chain challenges"][index % 4]
      ],
      strategies: [
        ["Expansion", "Diversification", "Cost leadership", "Premium positioning"][index % 4],
        ["Market penetration", "Innovation focus", "Consolidation", "Strategic partnerships"][index % 4]
      ]
    })),
    rdInvestment: reportData.keyPlayersData.map((player: any) => ({
      name: player.name,
      value: 20 + Math.floor(player.share)
    })),
    strategicPosition: [
      { name: "Quality", value: 85 },
      { name: "Price", value: 65 },
      { name: "Innovation", value: 78 },
      { name: "Market Share", value: 55 },
      { name: "Customer Loyalty", value: 72 },
    ]
  };
}


// Fonction pour améliorer les données du rapport avec des données supplémentaires si nécessaire
export const enhanceReportData = (reportData: any): Report => {
  if (!reportData) return reportData;

  // Ensure basic structure
  const enhancedReport = { ...reportData };

  // Traitement des données des acteurs clés
  if (enhancedReport.keyPlayersData) {
    enhancedReport.keyPlayersData = enhancedReport.keyPlayersData.map((player: any) => ({
      ...player,
      share: Number(player.share) || 0, // Ensure share is a number
    }))
  } else if (enhancedReport.keyPlayers && Array.isArray(enhancedReport.keyPlayers)) {
    enhancedReport.keyPlayersData = enhancedReport.keyPlayers.map((name: string, index: number) => ({
      name,
      share: 30 - index * 5, // Example share generation
    }))
  } else {
     enhancedReport.keyPlayersData = []; // Ensure it's an array
  }

  // Traitement des segments
  if (enhancedReport.segments && Array.isArray(enhancedReport.segments)) {
    enhancedReport.segments = enhancedReport.segments.map((segment: any) => {
      if (segment && typeof segment === 'object' && !segment.value && segment.share) {
        const value = parseInt(segment.share)
        return { ...segment, value: isNaN(value) ? 10 : value }
      }
      return segment || { name: 'Unknown', description: '', share: '0', value: 0 }; // Handle null/undefined segments
    }).filter(Boolean); // Remove any potential nulls from map
  } else {
    enhancedReport.segments = []; // Ensure it's an array
  }

  // Traitement des régions
  if (enhancedReport.regions && Array.isArray(enhancedReport.regions)) {
    enhancedReport.regions = enhancedReport.regions.map((region: any) => {
       if (region && typeof region === 'object' && !region.value && region.share) {
        const value = parseInt(region.share)
        return { ...region, value: isNaN(value) ? 10 : value }
      }
      return region || { name: 'Unknown', description: '', share: '0', value: 0 }; // Handle null/undefined regions
    }).filter(Boolean);
  } else {
     enhancedReport.regions = []; // Ensure it's an array
  }

  // Convert trends, challenges, opportunities if they are not already strings (handle potential object issue)
  const ensureStringArray = (arr: any[] | undefined): string[] => {
    if (!arr || !Array.isArray(arr)) return [];
    return arr.map((item: any) => typeof item === 'string' ? item : (item?.name || JSON.stringify(item))).filter(Boolean);
  };

  enhancedReport.trends = ensureStringArray(enhancedReport.trends);
  enhancedReport.challenges = ensureStringArray(enhancedReport.challenges);
  enhancedReport.opportunities = ensureStringArray(enhancedReport.opportunities);

  // Forecast Data check
  if (enhancedReport.forecastData && Array.isArray(enhancedReport.forecastData)) {
     enhancedReport.forecastData = enhancedReport.forecastData.map((item: any) => ({
        year: Number(item?.year) || new Date().getFullYear(),
        value: Number(item?.value) || 0,
     })).filter(item => item.year && item.value !== undefined);
  } else {
    enhancedReport.forecastData = [];
  }


  // Essayer d'extraire plus de données des tendances et défis s'ils existent
  if (!enhancedReport.consumerData && enhancedReport.trends) {
    enhancedReport.consumerData = generateConsumerData(enhancedReport);
  }

  if (!enhancedReport.technologyData && (enhancedReport.trends || enhancedReport.opportunities)) {
    enhancedReport.technologyData = generateTechnologyData(enhancedReport);
  }

  if (!enhancedReport.regulatoryData && (enhancedReport.challenges || enhancedReport.trends)) {
    enhancedReport.regulatoryData = generateRegulatoryData(enhancedReport);
  }

  if (!enhancedReport.competitorsData && enhancedReport.keyPlayersData) {
    enhancedReport.competitorsData = generateCompetitorData(enhancedReport);
  }

  // Ensure SWOT structure
  if (enhancedReport.swot && typeof enhancedReport.swot === 'object') {
    enhancedReport.swot.strengths = ensureStringArray(enhancedReport.swot.strengths);
    enhancedReport.swot.weaknesses = ensureStringArray(enhancedReport.swot.weaknesses);
    enhancedReport.swot.opportunities = ensureStringArray(enhancedReport.swot.opportunities);
    enhancedReport.swot.threats = ensureStringArray(enhancedReport.swot.threats);
  } else {
     enhancedReport.swot = { strengths: [], weaknesses: [], opportunities: [], threats: [] };
  }


  return enhancedReport as Report;
} 