# jeffreyplewak-com

This is my personal portfolio and project showcase for **Jeffrey R. Plewak**, Senior Software Engineer.

This repository is for me  and others to share. V1.

## Overview

This site is intentionally minimal, static-first, and explicit in structure.

Primary objectives:

- Clear, recruiter-friendly presentation
- Emphasis on system design, engineering judgment, and real projects
- Strong SEO and social sharing defaults
- Excellent performance and accessibility
- Low operational complexity

The site is suitable for direct production deployment and long-term maintenance.

## Tech Stack

- Framework: Next.js (App Router)
- Language: TypeScript
- Styling: Hand-authored CSS (no runtime framework)
- Images: next/image with explicit aspect-ratio control
- Deployment: Vercel
- Node: 20.x
- npm: 10.x

## Project Structure

```
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
        page.tsx
        opengraph-image.png

public/
  og-image.png
  favicon.png
  icon-192.png
  icon-512.png
  assets/
    images/
      avatar.jpeg
  projects/
    kprovengine/
      og.png
      architecture.png
  downloads/
    jeffrey-plewak-resume.pdf
```

## Routes

| Route | Description |
|------|-------------|
| / | Home / landing page |
| /projects/kprovengine | KProvEngine project deep dive |
| /robots.txt | Search engine directives |
| /sitemap.xml | Sitemap |

All routes are statically generated.

## Styling Model

- globals.css  
  Typography, layout containers, cards, grids, buttons, home page components.

- projects/projects.css  
  Scoped to /projects/* with strict selector prefixes and explicit next/image rules.

## SEO & Metadata

Configured using the Next.js App Router metadata APIs.

- Canonical URLs
- Open Graph metadata
- Twitter cards
- Static OG images
- Sitemap and robots.txt

## Local Development

Requirements:

- Node.js ≥ 20
- npm ≥ 10

Install and run:

```
npm ci
npm run dev
```

Production build:

```
npm run build
npm run start
```

## Deployment

Designed for deployment on Vercel.

Recommended settings:

- Framework preset: Next.js
- Build command: next build
- Node version: 20.x

After deployment:

- Assign production domain
- Verify metadata base URL
- Confirm sitemap and robots endpoints

## Versioning

This repository represents a stable v1 baseline suitable for production.

## License

© Jeffrey R. Plewak. All rights reserved.
