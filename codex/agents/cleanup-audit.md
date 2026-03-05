Objective: Implement a deterministic Cleanup Audit Agent for this Next.js App Router portfolio repo.

Hard rules:
- No new dependencies.
- Diff-first only.
- Outputs must be deterministic and written to:
  - public/downloads/cleanup-audit.json
  - public/downloads/cleanup-audit.md
  - public/downloads/lighthouse-plan.md
- Checks must cover:
  1) duplicate content (text + CSS)
  2) SEO metadata consistency (canonical/OG/twitter/robots/sitemap)
  3) a11y risk patterns (nested landmarks, duplicate id="main", reduced-motion)
  4) LCP/Lighthouse risk heuristics (largest images/fonts/layout shift)
  5) “upgrade compatibility” notes (Next/App Router/React patterns)

Implementation requirements:
- Add scripts/quality/cleanup-audit.mjs
- Add npm script: "audit:cleanup": "node scripts/quality/cleanup-audit.mjs"
- Update npm "check" or "prepush" ONLY if it stays fast (<2s); otherwise add it as a separate optional gate.

Deliverables:
- PLAN
- DIFF
- VERIFY (npm run -s audit:cleanup, npm run -s check)
