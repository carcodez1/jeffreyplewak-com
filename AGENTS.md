# AGENTS.md (personal portfolio repo rules)

## Operating mode (default)
- Diff-first: propose a plan, then output a unified diff. Do not apply changes unless I explicitly say “apply”.
- Surgical changes only. No rewrites, no new dependencies unless explicitly approved.
- Prefer edits only in already-changed files unless explicitly approved.
- One concern per commit: do not mix (UI/theme), (icons/metadata), (SEO), (perf), (tests), (tooling/policy).

## Stop conditions (fail closed)
Stop and ask for approval if any of the following would be required:
- Starting a dev server (npm run dev / next dev)
- Adding a new dependency
- Running network commands (curl/wget/etc.) or enabling new MCP servers
- Touching more than ~10 files outside the current change bucket
- Changing SEO/metadata globally without an explicit request

## Commands (allowed by default)
- git status -sb
- git diff
- rg
- node -v
- npm -v
- npm run -s lint
- npm run -s test
- npm run -s build
- npm run -s check
- npm run -s prepush

## Commands (require explicit approval each time)
- npm run dev / next dev (dev server / port binding)
- any command that writes outside the repo root
- any command that changes git history (reset, rebase, push --force)
- any networked commands (curl, wget) unless explicitly requested

## Codex execution policy (authoritative)
- Command allow/deny decisions are governed by Codex Rules (.rules / rules/*).
- When multiple rules match, the most restrictive decision wins (forbidden > prompt > allow).

## Must-preserve constraints
### Accessibility
- No nested landmarks.
- No duplicate id="main".
- Preserve focus-visible states.
- Respect prefers-reduced-motion (provide a reduced-motion path for animations).

### SEO
- Keep core pages HTML-first and indexable.
- Keep metadata stable unless change is requested.
- Avoid client-only rendering for core content (especially /, /resume, /projects/*).
- Preserve canonical URLs and ensure sitemap/robots remain valid.

### Performance
- Avoid heavy animations on the main thread.
- Avoid layout shift (stable image dimensions; no late-loading layout changes).
- Prefer static generation where reasonable.
- Performance acceptance targets should be described using Speed Insights/Core Web Vitals (LCP/CLS/INP).

## Testing strategy (2026)
- Unit tests: synchronous Server/Client components and pure modules.
- Async Server Components: prefer E2E tests; do not rely on Vitest for async Server Component behavior.

## Evidence & traceability
- Any claim about frameworks/standards must be backed by a file path in this repo (or marked UNKNOWN).
- For any change affecting SEO/a11y/perf, include:
  - risk notes
  - verify commands
  - rollback plan (how to revert)

## Output format
- PLAN (bullets)
- DIFF (unified)
- VERIFY (exact commands)
- RISKS (a11y/SEO/perf)
