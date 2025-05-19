import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const searchTerm = searchParams.get("utm_term");

  if (!searchTerm) {
    return NextResponse.json({ error: "Search term is required" }, { status: 400 });
  }

  const generatePrompt = `Given the search term "${searchTerm}", generate:
1. A compelling market report title in English (without quotes)
2. Three key market metrics with significant numbers (use B for billions, M for millions, format numbers with spaces for thousands):
   - Market size in dollars or relevant unit
   - Growth rate or key percentage
   - Another relevant market metric (market share, number of users, etc.)
3. Simple market growth data (4 years, with realistic percentage values)

Format the response exactly as follows:
TITLE: [your title]
METRICS:
- [significant number with unit]: [short description in English]
- [significant number with unit]: [short description in English]
- [significant number with unit]: [short description in English]
GROWTH:
2020: [value]%
2021: [value]%
2022: [value]%
2023: [value]%`;

  try {
    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: generatePrompt }],
      model: "gpt-3.5-turbo",
      temperature: 0.7,
    });

    const response = completion.choices[0].message.content;
    console.log('OpenAI Response:', response); // Debug log

    // Parse the response
    const titleMatch = response.match(/TITLE: (.*)/);
    const metricsMatch = response.match(/METRICS:\n((?:- .*\n?)*)/);
    const growthMatch = response.match(/GROWTH:\n((?:20\d{2}: .*%\n?)*)/);

    const title = titleMatch ? titleMatch[1].trim() : "";
    
    const metrics = metricsMatch 
      ? metricsMatch[1]
        .split('\n')
        .filter((line: string) => line.trim())
        .map((line: string) => {
          const [number, ...desc] = line.replace('- ', '').split(':');
          return {
            number: number.trim(),
            description: desc.join(':').trim()
          };
        })
      : [];

    const growth = growthMatch
      ? growthMatch[1]
        .split('\n')
        .filter((line: string) => line.trim())
        .map((line: string) => {
          const [year, value] = line.split(':');
          return {
            year: parseInt(year),
            value: parseFloat(value.replace('%', ''))
          };
        })
      : [];

    const result = { 
      title,
      metrics,
      growth
    };
    
    console.log('Parsed Result:', result); // Debug log
    
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error generating title:', error);
    return NextResponse.json({ error: "Failed to generate title" }, { status: 500 });
  }
} 