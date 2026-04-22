# Jeffrey R. Plewak Portfolio

Public, recruiter-ready portfolio for Jeffrey R. Plewak. The site is a Next.js App Router application with HTML-first resume, recruiter, proof, and legal routes backed by local verification scripts.

## What This Repo Is

- A professional identity and proof site for senior/staff software engineering review.
- A canonical HTML resume route plus downloadable resume and recruiter-pack artifacts.
- A set of proof routes for project and workflow review.
- A Codex-aware repo with explicit agent, skill, and verification surfaces.

This is not a generic template. It is also not the canonical source repository for every project described here. For example, `/projects/kprovengine` is a proof page in this site; the KProvEngine source lives in its own repository.

## Main Routes

| Route | Purpose |
| --- | --- |
| `/` | Landing page with current role positioning, resume/contact CTAs, proof stats, and employer context |
| `/resume` | Canonical HTML resume with role timeline and downloads |
| `/r` | Recruiter decision route; start with resume, recruiter-pack artifacts, then KProvEngine proof |
| `/projects` | Index for public proof routes |
| `/projects/kprovengine` | Technical proof page for KProvEngine decisions and evidence |
| `/projects/codex` | Proof page for how this repo uses Codex, AGENTS.md, skills, verification, and human review |
| `/privacy` | Privacy policy for analytics, downloads, contact, and hosting surfaces |
| `/terms` | Terms for using the site and public materials |
| `/robots.txt` | Environment-aware crawl policy |
| `/sitemap.xml` | Public route inventory |

## Tech Stack

- Next.js 16 App Router
- React 19
- TypeScript
- Hand-authored CSS
- Next Metadata API, route-level metadata, and site JSON-LD
- Vercel Web Analytics and Vercel Speed Insights
- Vitest, jsdom, React Testing Library, and `vitest-axe`
- Mermaid diagram rendering for checked diagram artifacts

## Local Setup

Requirements:

- Node.js `>=20.19.0 <21`
- npm `10.x`

Install dependencies:

```bash
npm ci
```

Run locally:

```bash
npm run dev
```

Open `http://localhost:3000`.

## Verification

Default patch gate:

```bash
npm run -s verify:patch
```

What it runs:

- `npm run -s lint`
- `npm run -s typecheck`
- `npm run -s build`

Broader local gates:

```bash
npm run -s check
npm run -s prepush
```

Focused checks used by this repo:

```bash
npm run -s check:ssot
npm run -s check:codex
npm run -s context:reasoning:check
npm run -s diagrams:check
npm run -s test:ci
npm run -s test:coverage
```

Notes:

- `check:ssot` exports and verifies recruiter/resume artifacts.
- `check:codex` builds the repo-local skills inventory.
- `prepush` runs the aggregate check plus diagram validation.
- `verify:patch` and tests can update generated local outputs such as Next type references or SEO report timestamps; keep those changes intentional.

## Resume And Recruiter Artifacts

Source-of-truth split:

- `src/content/resume.ts` is the canonical narrative source for public resume and route-facing summary content.
- `src/content/ssot/profile.ssot.jsonld` is the claims/export source for recruiter-pack machine-readable artifacts.
- PDFs and public downloads are derived artifacts and should be regenerated or verified through the SSOT scripts when changed.

Public downloads live under `public/downloads/`.

Recruiter-pack artifacts live under `public/downloads/recruiter-pack/` and include:

- recruiter-pack index
- copy-paste resume text
- skills matrix CSV
- search report
- PDF resume copy
- JSON resume export
- manifest
- contact VCF

The export and verification scripts live in `scripts/ssot/`.

## Metadata, SEO, And Discovery

The site keeps core content routes server-rendered and indexable.

Relevant surfaces:

- root metadata: `src/lib/metadata/root.ts`
- route metadata: App Router page files
- Open Graph/Twitter image lists: `src/lib/metadata/images.ts`
- JSON-LD graph: `src/lib/jsonld.ts`
- robots: `src/app/robots.ts`
- sitemap: `src/app/sitemap.ts`
- SEO report script: `scripts/seo/report.mjs`

Tests cover metadata parity, JSON-LD rendering, robots/sitemap behavior, route rendering, and accessibility smoke checks.

## Analytics And Privacy

Analytics are centralized through `src/app/components/Observability.tsx` and mounted from the root layout only when `isPublicProductionObservabilityEnv()` allows it.

Current behavior:

- enabled for public production builds
- disabled for development and Vercel preview/development environments
- filters internal paths such as `/api`, `/_next`, `/_vercel`, private/admin paths, and all `/downloads/*` paths
- uses Vercel Web Analytics and Vercel Speed Insights
- does not add advertising trackers

The site stores local theme preference in browser storage.

## Codex Workflow Surfaces

Official repo-local Codex surfaces:

- `AGENTS.md`
- `.codex/config.toml`
- `.agents/skills/`

Local Codex agent profiles are configured under `.codex/agents/`:

- `repo-triage`
- `proof-route`
- `recruiter-route`

Repo-local skills include focused workflows for accessibility, cleanup, gitignore hygiene, project pages, metadata polish, SEO, source-claim auditing, SSOT export, reasoning context, and test confidence.

Legacy prompt/signature materials also exist under `codex/`, `prompts/`, and `docs/`, but current repeatable workflows should prefer the official surfaces listed above.

## Deployment

The intended deployment target is Vercel.

Production posture:

- production routes are indexable
- preview/development robots output blocks indexing
- analytics and speed insights mount only for public production behavior
- downloads are public by design, but analytics events for `/downloads/*` are filtered before sending

Recommended local merge check before deployment:

```bash
npm run -s prepush
npm run -s check:ssot
npm run -s check:codex
```

For README-only changes, `npm run -s check:codex` and `npm run -s verify:patch` are enough unless package scripts, routes, metadata, generated artifacts, or Codex surfaces changed.

## Reviewer Starting Points

For recruiters:

1. `/r`
2. `/resume`
3. recruiter-pack downloads
4. `/projects/kprovengine`

For engineers:

1. `src/app/`
2. `src/lib/metadata/`, `src/lib/jsonld.ts`, `src/app/robots.ts`, `src/app/sitemap.ts`
3. `scripts/ssot/`, `scripts/seo/`, `scripts/codex/`
4. `tests/`
5. `AGENTS.md`, `.codex/agents/`, `.agents/skills/`

## License Status

There is no standalone `LICENSE` file committed in this repository.

Unless a file or artifact states otherwise, treat this repository as not open-licensed and all rights reserved.
