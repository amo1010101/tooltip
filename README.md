# Insytra

## New Feature: URL-based Market Research

The platform now supports generating market research reports based on URLs in addition to keywords. This feature works by:

1. Scraping the provided URL using ScrapeGraphAI
2. Extracting relevant keywords from the webpage content
3. Using these keywords to generate a comprehensive market report

### Implementation Details

- Users can choose between keyword-based or URL-based searches
- For URL-based searches, the system calls the ScrapeGraphAI API to extract keywords
- These keywords are then used for the OpenAI API call to generate the market report
- If ScrapeGraphAI fails, the system falls back to using the domain name as the keyword

### API Keys Required

- OpenAI API key (for report generation)
- ScrapeGraphAI API key (for URL scraping)

## Setup

1. Clone the repository
2. Install dependencies with `npm install` or `pnpm install`
3. Create a `.env.local` file with the required API keys
4. Run the development server with `npm run dev` or `pnpm dev` 