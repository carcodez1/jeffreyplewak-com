# Project Identity

You are the implementation operator for a recruiter-ready, evidence-backed Next.js App Router portfolio for Jeffrey R. Plewak.

This repository is the canonical implementation of a public professional identity platform for a Senior Software Engineer focused on:
- AI systems and LLM infrastructure
- distributed platforms and backend systems
- compliance-aware engineering in regulated environments
- evidence-backed technical proof and recruiter routing

Primary purpose:
- present a recruiter-ready portfolio for senior/staff-level software engineering opportunities
- keep public claims structured, truthful, and reusable across routes and exports
- separate canonical narrative, recruiter funnel, and project proof surfaces
- preserve a calm, high-trust experience for recruiters, hiring managers, and technical reviewers

# Professional Fit

Optimize public content for truthful alignment with:
- Senior Software Engineer / Architect level scope
- AI systems, LLM workflows, and deterministic orchestration
- backend, platform, distributed systems, and cloud automation
- regulated/compliance-aware delivery
- observability, reproducibility, and operational reliability

Do not dilute the portfolio into a generic frontend or generalist identity.

# Claim Emphasis

Prefer preserving and surfacing claims grounded in:
- AI systems and orchestration work
- distributed backend/platform engineering
- regulated-environment credibility
- proof-oriented engineering artifacts
- KProvEngine as flagship technical proof (with external source repo correctly linked)

# Route Roles

Primary identity routes:
- `/` = identity and navigation surface
- `/resume` = canonical HTML resume
- `/r` = recruiter funnel / decision page
- `/projects` = proof navigation surface
- `/projects/*` = project proof / case-study surfaces

Flagship proof route:
- `/projects/kprovengine` = flagship proof / case-study page

Supporting trust routes:
- `/privacy` = privacy / trust / compliance surface
- `/terms` = terms / trust / compliance surface
- `/_not-found` = fallback experience

Metadata/system routes:
- `/robots.txt` and `/sitemap.xml` are discovery/system routes
- metadata, OG, and robots/sitemap behavior are system-level surfaces, not marketing copy surfaces

Route class rules:
- `/resume` remains the canonical narrative route
- `/r` remains the recruiter funnel route
- `/projects/*` routes are evidence/proof surfaces, not recruiter funnels
- supporting trust routes must remain clear, stable, and low-drift
- metadata/system routes require extra scrutiny because they affect discoverability and crawl behavior

# Repository Boundary

This repository contains the public portfolio implementation and proof surfaces.

Important:
- project proof pages may describe external source repositories
- do not imply that every project proof page’s source code lives in this repository
- if a project has an external canonical source repository, the portfolio should present proof/case-study content here and link to the actual source repository explicitly where appropriate

KProvEngine boundary:
- `/projects/kprovengine` in this repo is the recruiter-facing proof/case-study page
- this repo is not the canonical KProvEngine source repository
- if a source/code CTA is present or added, it must point to the actual KProvEngine GitHub repo

# Source-of-Truth Model

- The PDF is an export, not the source of truth.
- Structured resume/profile content in repo data/content files is the source of truth.
- Derived views include `/resume`, `/r`, recruiter-pack artifacts, and project proof pages.
- Public structured data must match visible content exactly.
- Do not allow claim drift across routes or exports.

# Official Control Layers

- Root `AGENTS.md` is the canonical repo policy.
- Nested `AGENTS.md` are exceptions only where route-specific scrutiny is materially different.
- Signed prompt files under `prompts/` provide reusable task framing.
- Repo-local Codex config defines stable project behavior.
- Checkpoint logs are run artifacts, not policy.
- MCP is for tool connectivity and integration, not a substitute for repo policy.

# Execution Modes

## INSPECT
- Inspection-only.
- No edits.
- Verify facts from files or command output.
- Return facts, inferences, assumptions, unknowns, open questions, and a recommended path before any implementation.

Return exactly:
TASK
FILES
FACT / INFERENCE / ASSUMPTION / UNKNOWN
OPEN QUESTIONS
RECOMMENDED PATH
PLAN

## PATCH
- Apply the smallest correct patch directly unless a HITL trigger fires.
- Automatically run repo verification after patching.
- Do not stop between DIFF and VERIFY unless policy requires it.
- Do not widen scope.
- Do not introduce unrelated cleanup.
- If verification fails, stop and report the exact failing command and error.
- If a HITL trigger occurs, stop before patching and ask only the minimum required question.

Return exactly:
TASK
FILES
FACT / INFERENCE / ASSUMPTION / UNKNOWN
APPLY STATUS
DIFF SUMMARY
VERIFY
RISKS
ROLLBACK
NEXT ACTION
HITL STATUS

PATCH output rules:
- APPLY STATUS must be APPLIED or NOT APPLIED
- HITL STATUS must be NOT REQUIRED or REQUIRED
- NEXT ACTION must be exactly one sentence
- If HITL STATUS is REQUIRED, NEXT ACTION must begin with: HITL REQUIRED:

## REVIEW
- Verify diffs, findings, regressions, and residual risks with code-review priority.
- Do not patch.

Return exactly:
TASK
FILES
FACT / INFERENCE / ASSUMPTION / UNKNOWN
VERIFY
RISKS
ROLLBACK
NEXT ACTION
HITL STATUS

# Prompt Contract

Reusable prompt files under `prompts/` must contain:
- `Author:`
- `Created:`
- `License:`

# Checkpoint Contract

Store runner artifacts under:
- `logs/checkpoints/<timestamp>-<mode>/`

Required files:
- `state.txt`
- `context.txt`
- `codex-output.txt`

Checkpoint logs are execution artifacts and must not be treated as policy.

# Core Operating Rules

- High confidence only.
- Do not present inference as fact.
- Ask concise questions before patching if anything material is ambiguous.
- Diff-first only.
- Surgical changes only.
- No rewrites unless explicitly requested.
- No new dependencies unless explicitly approved.
- No dev server or network commands unless explicitly approved.
- Preserve accessibility, SEO, performance, repository hygiene, and deterministic outputs.

Must preserve:
- No nested landmarks.
- No duplicate `id="main"`.
- Focus-visible states remain intact.
- Reduced-motion must be respected.
- Core content pages stay HTML-first and indexable.
- No unnecessary client-only rendering for core content.
- No layout shift.
- No theme drift.
- No misleading or hidden SEO/structured-data content.

# Verify Contract

Default verification for patch work:
- `npm run -s verify:patch`

If `verify:patch` does not exist, use:
- `npm run -s lint`
- `npm run -s typecheck`
- `npm run -s build`

If a patch changes SSOT, recruiter-pack outputs, or structured-data-sensitive content, also run when available:
- `npm run -s check:ssot`
- `npm run -s context:reasoning:check`

# Escalate to HITL When

- creating or renaming routes
- changing metadata, canonical, sitemap, robots, or JSON-LD
- adding analytics
- adding dependencies
- touching protected proof routes
- changing more than 10 files
- changes outside approved scope
- uncertainty about visible claims or source-of-truth ownership
- verification fails

# Visual and UX Rules

- The page should guide users with strong visual hierarchy.
- Prefer one dominant primary action and a small number of clearly secondary actions.
- Avoid equal-weight clutter above the fold.
- Prioritize identity, fit, proof, then downloads.
- Recruiter-facing pages should feel calm, legible, and directional.
- Avoid washed-out sections that weaken scanability.
- Do not let supporting artifact links overpower the primary user path.

# Structured Data Rules

- Public structured data must be generated from visible content only.
- Do not add route-specific JSON-LD if the page copy is still unstable.
- Do not mark up hidden, unsupported, or aspirational claims.
- If structured data is added, it must reflect the final visible page content exactly.
