# AGENTS.md (repo rules)

## Operating mode
- Diff-first: propose plan, then show a unified diff. Do not apply changes without approval.
- Surgical changes only. No rewrites, no new deps unless explicitly requested.

## Allowed commands
### Read-only / inspection
- git status -sb
- git diff
- rg
- node -v
- pnpm -v (or npm -v)

### Quality gates (run only; do not modify config)
- pnpm lint / pnpm test / pnpm build (or npm equivalents)

### Safe git workflow (no network)
- git switch -c <branch>
- git add <paths>
- git restore --staged <paths>
- git commit -m "<message>"

## Must-preserve constraints
- A11y: no nested landmarks, no duplicate id="main", preserve focus states, respect prefers-reduced-motion.
- SEO: keep HTML-first pages indexable, keep metadata stable, avoid client-only rendering for core content.
- Perf: avoid heavy animations on main thread; ensure reduced-motion path; no large layout shifts.

## Scope
- Prefer edits only in already-changed files unless explicitly approved.
