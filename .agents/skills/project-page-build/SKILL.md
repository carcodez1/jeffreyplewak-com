---
name: project-page-build
description: Build or extend a `/projects/*` proof page without inventing claims or blurring repo ownership boundaries.
author: Jeffrey R. Plewak
created: 2026-03-15
license: Internal repo guidance
---
# Project Page Build

Author: Jeffrey R. Plewak
Created: 2026-03-15
License: Internal repo guidance

When to use:
- a project proof page needs a new section or a scoped content build
- route creation or route expansion has already been approved

Workflow:
1. Inspect the route, nearby proof pages, and any nested `AGENTS.md`.
2. Inventory visible claims, source files, and external canonical repo links before patching.
3. Keep proof pages calm, HTML-first, evidence-backed, and distinct from recruiter funnels.
4. Reuse existing content structures and shared metadata utilities instead of creating duplicate sources of truth.
5. If claim ownership or route scope is unclear, stop and ask before patching.

Verify:
- `npm run -s verify:patch`
- `npm run -s check:ssot` when SSOT-backed claims or structured data change

Deliverables:
- small proof-page diff
- claim/source notes
- exact verification results
