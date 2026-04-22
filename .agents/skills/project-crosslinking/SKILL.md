---
name: project-crosslinking
description: Tighten cross-links between identity, resume, recruiter, and proof routes without confusing route roles.
author: Jeffrey R. Plewak
created: 2026-03-15
license: Internal repo guidance
---
# Project Crosslinking

Author: Jeffrey R. Plewak
Created: 2026-03-15
License: Internal repo guidance

When to use:
- links or CTAs between `/`, `/resume`, `/r`, `/projects`, and `/projects/*` need cleanup
- a route should guide users to proof or recruiter actions more clearly

Workflow:
1. Inspect the source route, destination route, and current CTA hierarchy.
2. Preserve route roles: identity first on `/`, canonical narrative on `/resume`, recruiter routing on `/r`, proof on `/projects/*`.
3. Prefer one dominant primary action and a small number of clearly secondary actions.
4. Do not let supporting downloads or proof links overpower the intended path for that route.

Verify:
- `npm run -s verify:patch`

Deliverables:
- small routing or CTA diff
- exact verification results
