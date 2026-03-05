Objective: Create a deterministic SEO audit script for Next.js App Router.

Hard rules:
- No new deps.
- Report must include: canonical, metadata, robots, sitemap existence, and static generation assumptions.
- Output: public/downloads/seo-report.json + public/downloads/seo-report.md
- Unified diff only.
- Verify with: npm run -s check
