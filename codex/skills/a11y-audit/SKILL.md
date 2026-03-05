---
name: a11y-audit
description: Deterministic accessibility audit workflow for this Next.js portfolio.
author: Jeffrey R. Plewak
---

# A11y Audit Skill

Author: Jeffrey R. Plewak
Created: 2026-03-05

Objective: Create a deterministic a11y audit script/checklist.

Hard rules:
- No new deps.
- Must check: nested landmarks, duplicate id="main", focus-visible states, prefers-reduced-motion CSS.
- Output: `public/downloads/a11y-report.json` + `public/downloads/a11y-report.md`
- Unified diff only.
- Verify with: `npm run -s check`
