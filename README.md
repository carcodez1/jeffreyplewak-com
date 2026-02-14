# jeffreyplewak-com

Personal site and engineering portfolio for **Jeffrey R. Plewak**.

This repository contains the production source for https://jeffreyplewak.com and is maintained with explicit attention to performance, determinism, operational clarity, and long-term maintainability.

---

## Purpose

This site is intentionally:

- Static-first  
- Minimal in runtime dependencies  
- Explicit in structure  
- Fast, stable, and recruiter-readable  
- Operationally low-risk  

It reflects real engineering judgment rather than design noise, framework churn, or unnecessary abstraction.

The objective is clarity, credibility, and performance — not novelty.

---

## Architecture Principles

1. Static where possible  
2. Deterministic builds  
3. No unnecessary client-side JavaScript  
4. Explicit metadata and SEO configuration  
5. Strict commit discipline and branch isolation  
6. CI automation for generated artifacts  
7. Production-safe defaults  

The site favors long-term maintainability over short-term trends.

---

## Tech Stack

- Framework: Next.js (App Router)  
- Language: TypeScript  
- Styling: Hand-authored CSS (no runtime CSS framework)  
- Images: `next/image` with controlled layout behavior  
- Node: 20.x  
- Package Manager: npm 10.x  
- Deployment: Vercel  
- CI: GitHub Actions  
- Diagram Rendering: Mermaid CLI (SVG artifacts committed via workflow)  

---

## Repository Structure

src/
app/
layout.tsx
page.tsx
globals.css
robots.ts
sitemap.ts
projects/
layout.tsx
projects.css
kprovengine/

public/
assets/
projects/
downloads/

scripts/
watermark_resume.py
render-diagrams.js

.github/
workflows/

The repository separates:

- Application source  
- Static public assets  
- Automation scripts  
- CI workflows  

Generated artifacts are committed only via controlled automation.

---

## Performance & Operational Notes

- Static generation prioritized  
- No unnecessary client hydration  
- Explicit Open Graph and metadata configuration  
- Sitemap and robots configured via Next.js App Router  
- Production headers enforced via middleware  

The site is suitable for long-term stable hosting with minimal operational overhead.

---

## Local Development

Requirements:

- Node.js ≥ 20  
- npm ≥ 10  

Install dependencies:

npm ci

Run locally:

npm run dev

Production build:

npm run build
npm start

---

## Deployment

Designed for deployment on Vercel.

Recommended configuration:

- Framework preset: Next.js  
- Build command: `next build`  
- Node version: 20.x  

After deployment:

- Verify canonical metadata base URL  
- Confirm `/robots.txt` and `/sitemap.xml`  
- Validate security headers  

---

## License

This repository uses a dual-license structure.

### Source Code
Licensed under the MIT License (see `LICENSE`).

### Portfolio Content & Identity
All branding, written content, diagrams, resume materials, images,
and personal identifiers are protected under a separate professional
portfolio license (see `LICENSE-PORTFOLIO`).

This repository is not licensed as a portfolio template.

### Identity Protection Notice

The name "Jeffrey R. Plewak", associated branding, likeness, and professional
identity elements may not be used to imply endorsement, affiliation,
or authorship of derivative works.