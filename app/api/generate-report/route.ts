import { NextResponse } from "next/server"
import type { GeneratedReport } from "@/app/actions/generate-report"
import OpenAI from "openai"

// Sample data as fallback in case the API call fails
const sampleReport: GeneratedReport = {
  title: "Global Electric Vehicle (EV) Market Report 2023-2028",
  summary:
    "The global electric vehicle market continues to experience rapid growth, driven by increasing environmental awareness, government incentives, and technological advancements. This report provides a comprehensive analysis of current market trends, challenges, and future opportunities in the EV industry.",
  marketSize: "$500 billion (2023)",
  growthRate: "25.4% CAGR (2023-2028)",
  keyPlayers: [
    "Tesla, Inc.",
    "BYD Company Ltd.",
    "Volkswagen Group",
    "SAIC Motor Corporation",
    "BMW Group",
    "Hyundai Motor Company",
    "Ford Motor Company",
  ],
  keyPlayersData: [
    { name: "Tesla, Inc.", share: 18 },
    { name: "BYD Company Ltd.", share: 15 },
    { name: "Volkswagen Group", share: 12 },
    { name: "SAIC Motor Corporation", share: 10 },
    { name: "BMW Group", share: 8 },
    { name: "Hyundai Motor Company", share: 7 },
    { name: "Ford Motor Company", share: 6 },
  ],
  trends: [
    "Increasing battery efficiency and declining costs",
    "Growing charging infrastructure network globally",
    "Rise of electric commercial vehicles and fleet electrification",
    "Integration of autonomous driving technologies in EVs",
  ],
  challenges: [
    "Limited charging infrastructure in developing regions",
    "Battery supply chain constraints and raw material sourcing",
    "High initial purchase costs compared to conventional vehicles",
  ],
  opportunities: [
    "Expansion in emerging markets with supportive government policies",
    "Development of solid-state battery technology",
    "Integration with renewable energy and smart grid systems",
  ],
  swot: {
    strengths: [
      "Lower operational costs compared to conventional vehicles",
      "Environmental benefits including reduced emissions",
      "Technological innovation driving performance improvements",
      "Growing consumer acceptance and brand loyalty"
    ],
    weaknesses: [
      "Limited driving range for many EV models",
      "Higher initial purchase price than comparable conventional vehicles",
      "Long charging times compared to refueling",
      "Battery degradation concerns affecting resale value"
    ],
    opportunities: [
      "Supportive government policies and incentives",
      "Expansion into emerging markets",
      "Integration with renewable energy systems",
      "Development of autonomous driving technology"
    ],
    threats: [
      "Intense competition from established automakers",
      "Supply chain vulnerabilities for critical materials",
      "Potential regulatory changes or incentive reductions",
      "Alternative clean technologies like hydrogen fuel cells"
    ]
  },
  forecast:
    "The global EV market is projected to reach $1.5 trillion by 2028, with passenger vehicles maintaining the largest segment. Asia-Pacific will continue to dominate the market, while Europe and North America will see accelerated growth due to stringent emission regulations and incentive programs.",
  forecastData: [
    { year: 2023, value: 500 },
    { year: 2024, value: 650 },
    { year: 2025, value: 850 },
    { year: 2026, value: 1100 },
    { year: 2027, value: 1300 },
    { year: 2028, value: 1500 },
  ],
  segments: [
    {
      name: "Battery Electric Vehicles (BEVs)",
      description:
        "Fully electric vehicles powered solely by rechargeable batteries without any internal combustion engine.",
      share: "65%",
      value: 65,
    },
    {
      name: "Plug-in Hybrid Electric Vehicles (PHEVs)",
      description:
        "Vehicles with both electric motors and internal combustion engines that can be charged from an external source.",
      share: "25%",
      value: 25,
    },
    {
      name: "Hybrid Electric Vehicles (HEVs)",
      description:
        "Vehicles that combine a conventional internal combustion engine with an electric propulsion system.",
      share: "10%",
      value: 10,
    },
  ],
  regions: [
    {
      name: "Asia-Pacific",
      description:
        "Led by China, the region has the largest EV market due to strong government support and domestic manufacturing capabilities.",
      share: "45%",
      value: 45,
    },
    {
      name: "Europe",
      description:
        "Stringent emission regulations and substantial incentives have accelerated EV adoption across European countries.",
      share: "30%",
      value: 30,
    },
    {
      name: "North America",
      description: "Growing market with increasing consumer interest and expanding charging infrastructure.",
      share: "20%",
      value: 20,
    },
    {
      name: "Rest of World",
      description: "Emerging markets with growing potential as costs decrease and infrastructure improves.",
      share: "5%",
      value: 5,
    },
  ],
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const keyword = searchParams.get("keyword") || "electric vehicles"
  const geographicArea = searchParams.get("geographicArea") || "Worldwide"

  try {
    // Check if OpenAI API key is available
    const apiKey = process.env.OPENAI_API_KEY

    if (!apiKey) {
      console.warn("OpenAI API key not found. Using sample data instead.")
      return NextResponse.json({
        ...sampleReport,
        title: `${keyword.charAt(0).toUpperCase() + keyword.slice(1)} Market Report`,
        summary: `This is a sample report for ${keyword}. The OpenAI API key is missing.`,
      })
    }

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini",
        messages: [
          {
            role: "system",
            content:
              "You are an expert market research analyst. Provide responses as valid JSON only, without markdown formatting.",
          },
          {
            role: "user",
            content: `
              Generate a comprehensive industry report about "${keyword}" focused on the geographic area: "${geographicArea}".
              
              ${keyword.includes("Summary:") ? "The following summary is provided from the original page: " + keyword.split("Summary:")[1].trim() : ""}
              
              Research the latest information about this industry in ${geographicArea} and provide a structured report with the following sections:
              
              1. Title: A professional title for this industry report (include the geographic area ${geographicArea})
              2. Summary: A concise executive summary of the industry in ${geographicArea} (2-3 paragraphs)
              3. Market Size: The current estimated market size with year for ${geographicArea}
              4. Growth Rate: The projected CAGR (Compound Annual Growth Rate) for ${geographicArea}
              5. Key Players: List of 5-7 major companies in this industry in ${geographicArea}
              6. Trends: 4-5 current trends shaping the industry in ${geographicArea}
              7. Challenges: 3-4 major challenges facing the industry in ${geographicArea}
              8. Opportunities: 3-4 significant opportunities in the industry in ${geographicArea}
              9. Forecast: A brief market forecast for the next 5 years for ${geographicArea}
              10. Segments: 3-4 major market segments with name, brief description, approximate market share as a percentage string (e.g. "65%"), and numeric value (e.g. 65)
              11. Regions: 3-4 key geographic regions within ${geographicArea} with name, brief description, approximate market share as a percentage string (e.g. "45%"), and numeric value (e.g. 45)
              12. SWOT Analysis: Provide a detailed SWOT analysis specific to ${geographicArea} with:
                  a. Strengths: 4-5 key industry strengths
                  b. Weaknesses: 4-5 main industry weaknesses
                  c. Opportunities: 4-5 key opportunities (can overlap with the opportunities section but more detailed)
                  d. Threats: 4-5 main threats facing the industry
              13. Additional data for visualizations:
                  a. keyPlayersData: Array of objects with name and share (numeric percentage) for each key player
                  b. forecastData: Array of objects with year (2023-2028) and value (market size in billions) for each year
              
              Your response MUST be a valid JSON object with these exact keys: title, summary, marketSize, growthRate, keyPlayers (array), keyPlayersData (array of objects with name and share), trends (array), challenges (array), opportunities (array), forecast, forecastData (array of objects with year and value), segments (array of objects with name, description, share, and value), regions (array of objects with name, description, share, and value), swot (object with strengths, weaknesses, opportunities, and threats arrays).
              
              IMPORTANT: Do not wrap your response in markdown code blocks. Return ONLY the raw JSON object.
            `,
          },
        ],
        temperature: 0.7,
        max_tokens: 8000,
        response_format: { type: "json_object" }
      }),
    })

    if (!response.ok) {
      throw new Error(`OpenAI API returned ${response.status}`)
    }

    const data = await response.json()
    console.log('OpenAI API Response Stats:', {
      promptTokens: data.usage?.prompt_tokens,
      completionTokens: data.usage?.completion_tokens,
      totalTokens: data.usage?.total_tokens
    })
    const reportContent = data.choices[0]?.message?.content

    if (!reportContent) {
      throw new Error('No content in OpenAI response')
    }

    try {
      const generatedReport = JSON.parse(reportContent) as GeneratedReport
      return NextResponse.json(generatedReport)
    } catch (parseError) {
      console.error("Error parsing OpenAI response:", parseError)
      throw new Error('Invalid JSON in OpenAI response')
    }

  } catch (error) {
    console.error("Error generating report:", error)
    // Return sample data in case of error
    return NextResponse.json({
      ...sampleReport,
      title: `${keyword.charAt(0).toUpperCase() + keyword.slice(1)} Market Report for ${geographicArea}`,
      summary: `This is a sample report for ${keyword} in ${geographicArea}. An error occurred while generating the AI report.`,
    })
  }
}
