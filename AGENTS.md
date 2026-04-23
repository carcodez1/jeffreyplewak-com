# Project Identity

This repository is the public, recruiter-ready Next.js App Router portfolio for Jeffrey R. Plewak.

Optimize for truthful alignment with:
- senior/staff software engineering scope
- AI systems and LLM orchestration
- backend, platform, and distributed systems
- compliance-aware delivery in regulated environments

# Truth And Boundaries

- Public claims must stay evidence-backed, specific, and reusable across routes.
- Structured resume/profile content is the source of truth; PDFs and downloads are derived artifacts.
- `/resume` is the canonical narrative route.
- `/r` is the recruiter decision route, not the canonical resume.
- `/projects/*` routes are proof surfaces, not recruiter funnels.
- `/projects/kprovengine` is a recruiter-facing proof page; do not imply this repo is the canonical KProvEngine source repository.
- Public structured data must match visible content exactly.

# Official Codex Surfaces

Only these repo-local Codex surfaces are official:
- `AGENTS.md`
- `.codex/config.toml`
- `.agents/skills/`

Nested `AGENTS.md` files are route-specific exceptions only.

# Working Rules

- High confidence only. Label facts, inferences, assumptions, and unknowns.
- Inspect first when scope, claim ownership, or source-of-truth status is unclear.
- Diff-first only. Make surgical changes. No rewrites unless explicitly requested.
- No new dependencies, dev server commands, or network commands without approval.
- Preserve accessibility, SEO, performance, deterministic outputs, and repo hygiene.
- Keep core content pages HTML-first and indexable.
- Preserve focus-visible states, reduced-motion support, landmark correctness, and unique `id="main"`.
- Do not create duplicate sources of truth for claims, metadata, navigation, analytics, or recruiter assets.
- Prefer reusable skills over reusable prompt files for repeatable workflows.
- Use planning first for non-trivial work such as audits, metadata changes, routing, or multi-file patches.
- Treat generated artifacts separately from durable source files.

# Mandatory Skill Usage

- Use `worktree-task-start` before creating a new task branch or worktree. It should call `bash scripts/git/new-worktree.sh ...`.
- Use `scoped-verify` before choosing verification for non-trivial or mixed-scope diffs. It should call `npm run -s codex:verify-scope`.

# Verification

Default patch verification:
- `npm run -s verify:patch`

Also run when relevant:
- `npm run -s check:ssot` for SSOT-backed content, recruiter-pack outputs, or structured-data-sensitive changes
- `npm run -s context:reasoning:check` when reasoning-context artifacts or related scripts change
- `npm run -s check:codex` when `AGENTS.md`, `.codex/config.toml`, or `.agents/skills/` change

# HITL Triggers

Stop for approval before patching when any of the following apply:
- creating or renaming routes
- changing metadata, canonical, sitemap, robots, or JSON-LD
- adding analytics
- adding dependencies
- touching protected proof routes
- changing more than 10 files
- visible-claim or source-of-truth uncertainty
- verification failure

# Execution Notes

- INSPECT means no edits.
- PATCH means apply the smallest correct patch and verify it.
- REVIEW means inspect diffs for regressions and residual risk without patching.
- Use concise structured output. If the user specifies an exact return format, follow that format.
