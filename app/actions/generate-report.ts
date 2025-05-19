"use server"

export type GeneratedReport = {
  title: string
  summary: string
  marketSize: string
  growthRate: string
  keyPlayers: string[]
  keyPlayersData?: Array<{ name: string; share: number }>
  trends: string[]
  challenges: string[]
  opportunities: string[]
  forecast: string
  forecastData?: Array<{ year: number; value: number }>
  segments: Array<{
    name: string
    description: string
    share: string
    value?: number
  }>
  regions: Array<{
    name: string
    description: string
    share: string
    value?: number
  }>
  swot?: {
    strengths: string[]
    weaknesses: string[]
    opportunities: string[]
    threats: string[]
  }
}

/**
 * Get the base URL for API calls that works in all environments
 */
function getBaseUrl() {
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  
  if (process.env.NEXTAUTH_URL) {
    return process.env.NEXTAUTH_URL;
  }
  
  // Fallback to localhost in development
  return "http://localhost:3000";
}

export async function generateReport(
  keyword?: string, 
  url?: string, 
  geographicArea?: string
): Promise<GeneratedReport> {
  if (!keyword && !url) {
    throw new Error("Either keyword or URL must be provided")
  }

  try {
    console.log(`Generating report for ${keyword || url}`)
    let searchKeyword: string | undefined = keyword

    // If URL is provided but no keyword, we need to extract content from the URL
    if (url && !keyword) {
      try {
        // Get base URL for API calls
        const baseUrl = getBaseUrl();
        
        // Scrape content from the URL
        const scrapeResponse = await fetch(
          `${baseUrl}/api/scrape-url?url=${encodeURIComponent(url)}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        )

        if (!scrapeResponse.ok) {
          throw new Error(`URL scraping failed with status ${scrapeResponse.status}`)
        }

        const data = await scrapeResponse.json()
        
        // Extract keywords from the URL content
        if (data && typeof data === "object") {
          // If we have structured data from our scraper
          if (data.product_name) {
            // For product pages, use the product name and description
            searchKeyword = `${data.product_name} | Summary: ${JSON.stringify(data)}`
          } else {
            // Fallback to using the URL as the keyword
            searchKeyword = url
          }
        } else {
          // Fallback to using the URL as the keyword
          searchKeyword = url
        }
        
        console.log(`Extracted keywords from URL: ${searchKeyword}`)
      } catch (error) {
        console.error("Error during URL extraction:", error)
        // Fallback to using the raw URL
        searchKeyword = url
      }
    }

    // Get base URL for API calls
    const baseUrl = getBaseUrl();

    // Appel à l'API OpenAI via notre route API avec une URL absolue
    const params = new URLSearchParams();
    params.append("keyword", encodeURIComponent(searchKeyword || ""));
    if (geographicArea && geographicArea !== "Worldwide") {
      params.append("geographicArea", encodeURIComponent(geographicArea));
    }
    
    const response = await fetch(
      `${baseUrl}/api/generate-report?${params.toString()}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    )

    if (!response.ok) {
      throw new Error(`API returned ${response.status}`)
    }

    const data = await response.json()
    console.log("Successfully generated report")
    return data
  } catch (error) {
    console.error("Detailed error in generateReport:", error)
    throw error
  }
}
