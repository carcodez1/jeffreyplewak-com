# Jeffrey R. Plewak Portfolio

Public, recruiter-ready portfolio and proof site built with Next.js App Router, TypeScript, and a structured source-of-truth model for resume, recruiter, and project surfaces.

## TL;DR

- Purpose: a calm, evidence-backed professional identity site for senior/staff software engineering roles.
- Stack: Next.js 16, React 19, TypeScript, hand-authored CSS, Vercel-native deployment.
- Core routes: `/`, `/resume`, `/r`, `/projects`, `/projects/kprovengine`, `/projects/codex`, `/privacy`, `/terms`.
- System surfaces: App Router metadata, JSON-LD, `robots.txt`, `sitemap.xml`, recruiter/download artifacts, and repo-local Codex skills.
- Observability: Vercel Web Analytics and Vercel Speed Insights, enabled only for public production traffic with filtering for internal and non-public paths.

## Who This Is For

- Recruiters and hiring managers who need a fast, credible overview plus downloadable recruiting artifacts.
- Engineers reviewing technical judgment, metadata hygiene, testing, and proof-oriented project pages.
- Maintainers working on a portfolio repo with explicit Codex workflow surfaces and deterministic verification.

## Why This Exists

This repository is the public implementation of a professional identity platform for Jeffrey R. Plewak. It is designed to keep visible claims grounded, routes legible, and recruiter-facing artifacts easy to verify and maintain.

It is not a generic template and it is not the canonical source repository for every project mentioned here. For example, `/projects/kprovengine` is a proof page in this repo, while the actual KProvEngine source lives in its own GitHub repository.

## Features

- HTML-first public routes for identity, resume, recruiter funnel, project proof, and legal pages.
- Structured metadata using the Next.js Metadata API plus route-aware Open Graph and Twitter cards.
- Site-level JSON-LD graph for identity and primary public routes.
- Environment-aware `robots.txt` and generated `sitemap.xml`.
- Resume and recruiter download surfaces, including PDF, JSON, VCF, and recruiter-pack artifacts.
- Focused proof pages for KProvEngine and the Codex workflow tutorial.
- Privacy-conscious observability via Vercel Web Analytics and Vercel Speed Insights.
- Vitest, Testing Library, route smoke checks, accessibility smoke checks, and coverage enforcement.
- Repo-local Codex workflow surfaces through `AGENTS.md`, `.codex/config.toml`, and `.agents/skills/`.

## Quick Start

Requirements:

- Node.js `>=20.19.0 <21`
- npm `>=10`

Install and run locally:

```bash
npm ci
npm run dev
```

Open the app at `http://localhost:3000`.

## Verification

Core patch verification:

```bash
npm run -s verify:patch
npm run -s test:ci
npm run -s test:coverage
```

Useful repo checks:

```bash
npm run -s check:types
npm run -s check:build
npm run -s check:ssot
npm run -s seo:report
npm run -s codex:skills
npm run -s check:codex
```

## Route Surface

| Route | Purpose |
| --- | --- |
| `/` | Identity and landing surface |
| `/resume` | Canonical HTML resume |
| `/r` | Recruiter-first decision page |
| `/projects` | Public proof index |
| `/projects/kprovengine` | Flagship technical proof page |
| `/projects/codex` | Guided Codex workflow tutorial |
| `/privacy` | Privacy policy |
| `/terms` | Terms of service |
| `/robots.txt` | Crawl policy |
| `/sitemap.xml` | Public route inventory |

## Architecture And Repo Surfaces

### App stack

- Next.js 16 App Router
- React 19
- TypeScript
- Hand-authored CSS with route-local styling where appropriate
- `next/image` for controlled image delivery

### Metadata and discovery

- Root metadata in `src/lib/metadata/root.ts`
- Site JSON-LD in `src/lib/jsonld.ts`
- Crawl and route discovery in `src/app/robots.ts` and `src/app/sitemap.ts`

### Resume and recruiter artifacts

- Public downloads live under `public/downloads/`
- Recruiter-pack artifacts live under `public/downloads/recruiter-pack/`
- The structured export and recruiter-pack checks are validated by the SSOT and recruiter-pack test suites

### Testing and coverage

- Vitest + jsdom
- React Testing Library for interactive component coverage
- `vitest-axe` for route-level accessibility smoke coverage
- Coverage enforcement is configured in `vitest.config.ts`

### Codex and local automation

Official repo-local Codex surfaces:

- `AGENTS.md`
- `.codex/config.toml`
- `.agents/skills/`

The repo also includes scripts for:

- Codex skill inventory generation
- SSOT export and claim verification
- reasoning-context bundle generation
- SEO reporting
- recruiter/download artifact checks

## Analytics And Privacy Note

This site uses:

- Vercel Web Analytics for privacy-conscious traffic and referrer insight
- Vercel Speed Insights for real-user performance monitoring

The integration is centralized in the root layout and only enabled for public production traffic. Internal and non-public paths such as `/api`, admin/private paths, framework internals, and recruiter-pack download surfaces are filtered out before events are sent.

The site does not add ad-tech trackers or a cookie banner. It does use browser local storage for theme preference. Public contact and recruiter artifacts are intentionally exposed because the site is built for professional evaluation and hiring workflows.

## Deployment

The intended deployment target is Vercel.

Production behavior:

- Public production deploys are indexable.
- Preview and development deploys are blocked from indexing by `robots.txt`.
- Vercel Analytics and Speed Insights are mounted only in public production environments.

Typical deployment flow:

```bash
npm run -s verify:patch
npm run -s test:ci
npm run -s check:build
```

Then deploy to Vercel and verify:

- canonical host configuration
- `robots.txt`
- `sitemap.xml`
- Open Graph images and metadata
- public download artifact availability

## Contact / Hiring

- Email: `plewak.jeff@gmail.com`
- LinkedIn: `https://www.linkedin.com/in/jeffreyplewak/`
- GitHub: `https://github.com/carcodez1`
- Calendly: `https://calendly.com/plewak-jeff`

If you are reviewing this repository for hiring, start with:

1. `/r`
2. `/resume`
3. `/projects/kprovengine`

## License Status

There is currently no standalone `LICENSE` file committed in this repository.

Unless a file or artifact says otherwise, treat this repository as not open-licensed and all rights reserved.
