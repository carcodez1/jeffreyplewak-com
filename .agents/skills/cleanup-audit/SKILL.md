---
name: cleanup-audit
description: Audit one bounded surface for clutter, duplication, drift, and low-risk simplification opportunities.
author: Jeffrey R. Plewak
created: 2026-03-15
license: Internal repo guidance
---
# Cleanup Audit

Author: Jeffrey R. Plewak
Created: 2026-03-15
License: Internal repo guidance

When to use:
- a route or subsystem feels cluttered, repetitive, or inconsistent
- the goal is to simplify without changing product facts or widening scope

Workflow:
1. Inspect the target surface and rank issues by user impact, regression risk, and evidence strength.
2. Prefer deletions, consolidation, and copy tightening over new abstractions.
3. Preserve dominant CTA hierarchy, recruiter routing, accessibility, SEO, and performance.
4. If a repeated heuristic needs automation, add a deterministic helper under this skill only when necessary.

Verify:
- `npm run -s verify:patch`

Deliverables:
- ranked findings or a small patch
- exact verification results
