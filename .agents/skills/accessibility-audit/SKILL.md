---
name: accessibility-audit
description: Audit one bounded route or component for landmark, keyboard, focus, and motion regressions in this portfolio.
author: Jeffrey R. Plewak
created: 2026-03-15
license: Internal repo guidance
---
# Accessibility Audit

Author: Jeffrey R. Plewak
Created: 2026-03-15
License: Internal repo guidance

When to use:
- accessibility findings or fixes are requested for one route, section, or component
- recent changes may affect landmarks, headings, focus states, keyboard use, or reduced motion

Workflow:
1. Inspect the target route, nearby shared components, and any nested `AGENTS.md`.
2. Check landmarks, heading order, keyboard path, focus-visible states, duplicate `id="main"`, and reduced-motion handling.
3. Prefer HTML-first fixes and minimal markup changes over client-side workarounds.
4. Keep visible content and any structured data aligned if copy changes.

Verify:
- `npm run -s verify:patch`

Deliverables:
- findings or a small patch
- exact verification results
