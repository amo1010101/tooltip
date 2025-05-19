import { NextResponse } from "next/server"

/**
 * API endpoint for scraping a URL with ScrapeGraphAI
 * This endpoint extracts keywords from a webpage to use for market research
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const url = searchParams.get("url")

  if (!url) {
    return NextResponse.json(
      { error: "URL parameter is required" },
      { status: 400 }
    )
  }

  try {
    // ScrapeGraphAI API key
    const apiKey = process.env.SCRAPEGRAPH_API_KEY

    if (!apiKey) {
      console.warn("ScrapeGraphAI API key not found.")
      return NextResponse.json(
        {
          error: "API key not configured",
          keywords: ["electric vehicles", "sustainable transport", "battery technology"],
          summary: "Electric vehicles market with sustainable transport options and advanced battery technology."
        },
        { status: 500 }
      )
    }

    console.log("-------------------------------------");
    console.log("Attempting to call ScrapeGraphAI with URL:", url);
    console.log("API Key exists and starts with:", apiKey.substring(0, 10) + "...");

    // Selon la documentation de ScrapeGraphAI
    const requestBody = {
      website_url: url,
      user_prompt: "Analyze this webpage and provide a concise summary of its content in 30-40 words. Focus on the main topic, product features, or market information that would be relevant for market research."
    };

    console.log("Request body:", JSON.stringify(requestBody, null, 2));

    // Call ScrapeGraphAI with the correct endpoint and headers
    const response = await fetch("https://api.scrapegraphai.com/v1/smartscraper", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "SGAI-APIKEY": apiKey
      },
      body: JSON.stringify(requestBody)
    });

    console.log("ScrapeGraphAI response status:", response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error("ScrapeGraphAI error response:", errorText);
      
      // Récupérer le domaine comme mot-clé de repli
      const domain = extractDomainFromUrl(url);
      console.log("Falling back to domain name as keyword:", domain);
      
      return NextResponse.json({ 
        error: `ScrapeGraphAI API returned ${response.status}`,
        keywords: [domain, "product", "market", "technology"],
        summary: `Product information from ${domain} marketplace.`
      }, { status: 200 }); // Returning 200 to continue the flow with fallback
    }

    const data = await response.json()
    console.log("ScrapeGraphAI response data type:", typeof data);
    console.log("ScrapeGraphAI response keys:", Object.keys(data));
    console.log("ScrapeGraphAI response preview:", JSON.stringify(data).substring(0, 300) + "...");
    
    // Récupérer le résumé de la réponse
    let summary = "";
    if (typeof data.result === "string") {
      summary = data.result;
    } else if (data.result) {
      summary = JSON.stringify(data.result);
    }
    
    // Analyser la réponse pour identifier les mots-clés
    const extractedKeywords = extractKeywordsFromResponse(data, url);
    console.log("Final extracted keywords:", extractedKeywords);
    console.log("Content summary:", summary);
    
    return NextResponse.json({ 
      keywords: extractedKeywords,
      summary: summary
    })
  } catch (error) {
    console.error("Error scraping URL:", error)
    
    // Récupérer le domaine comme mot-clé de repli en cas d'erreur
    const domain = extractDomainFromUrl(url);
    console.log("Exception fallback - using domain name as keyword:", domain);
    
    return NextResponse.json(
      { 
        error: "Failed to scrape URL",
        keywords: [domain, "product", "market", "industry"],
        summary: `Product information from ${domain} marketplace.`
      },
      { status: 200 } // Returning 200 to continue the flow with fallback
    )
  }
}

// Fonction pour extraire des mots-clés de la réponse de l'API
function extractKeywordsFromResponse(data: any, url: string): string[] {
  let keywords: string[] = [];
  let contentToAnalyze = "";
  
  // Essayer différentes structures de réponse possibles
  if (typeof data === "string") {
    contentToAnalyze = data;
  } else if (data.result) {
    // Le résultat est maintenant un résumé textuel, pas une liste de mots-clés
    contentToAnalyze = typeof data.result === "string" ? data.result : JSON.stringify(data.result);
  } else if (data.content) {
    contentToAnalyze = typeof data.content === "string" ? data.content : JSON.stringify(data.content);
  } else if (data.text) {
    contentToAnalyze = typeof data.text === "string" ? data.text : JSON.stringify(data.text);
  } else if (data.title) {
    // Si nous avons un titre, c'est un bon mot-clé
    keywords.push(data.title);
    
    // Si nous avons une description, essayons d'en extraire des mots-clés
    if (data.description) {
      contentToAnalyze = data.description;
    }
  }
  
  // Si nous avons du contenu à analyser (le résumé)
  if (contentToAnalyze) {
    // Extraire des mots-clés du contenu résumé
    const wordFrequency = analyzeContent(contentToAnalyze);
    
    // Ajouter les mots les plus fréquents comme mots-clés
    Object.entries(wordFrequency)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)  // On prend plus de mots puisqu'on a un résumé plus complet
      .forEach(([word]) => {
        if (!keywords.includes(word)) {
          keywords.push(word);
        }
      });
  }
  
  // Si nous n'avons toujours pas assez de mots-clés, utiliser le domaine
  if (keywords.length < 3) {
    const domain = extractDomainFromUrl(url);
    if (!keywords.includes(domain)) {
      keywords.push(domain);
    }
    
    // Ajouter des mots-clés génériques si nécessaire
    const genericKeywords = ["product", "market", "technology", "industry"];
    for (const keyword of genericKeywords) {
      if (keywords.length < 5 && !keywords.includes(keyword)) {
        keywords.push(keyword);
      }
    }
  }
  
  // Limiter à 5 mots-clés maximum
  return keywords.slice(0, 5);
}

// Fonction pour analyser le contenu et trouver les mots les plus fréquents
function analyzeContent(content: string): Record<string, number> {
  const words = content
    .toLowerCase()
    .replace(/[^\w\s]/g, " ")
    .split(/\s+/)
    .filter(word => 
      word.length > 3 && 
      !["and", "the", "this", "that", "with", "from", "have", "for"].includes(word)
    );
  
  const wordFrequency: Record<string, number> = {};
  
  for (const word of words) {
    wordFrequency[word] = (wordFrequency[word] || 0) + 1;
  }
  
  return wordFrequency;
}

// Fonction pour extraire le domaine d'une URL
function extractDomainFromUrl(url: string): string {
  try {
    const hostname = new URL(url).hostname;
    // Récupérer le nom de domaine principal (sans www. et les sous-domaines)
    const parts = hostname.split(".");
    // Si c'est un format comme www.example.com ou subdomain.example.com
    if (parts.length > 2) {
      // Récupérer le domaine principal (example)
      return parts[parts.length - 2];
    }
    // Si c'est un format comme example.com
    return parts[0];
  } catch (error) {
    // Extraire manuellement le domaine en cas d'erreur
    const match = url.match(/\/\/(?:www\.)?([^\/]+)\./);
    return match ? match[1] : "product";
  }
} 