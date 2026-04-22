---
name: source-claim-audit
description: Audit visible claims against local source files and external canonical repositories before copy or proof-page changes.
author: Jeffrey R. Plewak
created: 2026-03-15
license: Internal repo guidance
---
# Source Claim Audit

Author: Jeffrey R. Plewak
Created: 2026-03-15
License: Internal repo guidance

When to use:
- visible project, resume, recruiter, or proof-page claims may have drifted
- copy changes depend on source ownership, evidence, or external repo boundaries

Workflow:
1. Inventory the visible claims, supporting source files, and any external canonical repo links.
2. Label each material point as FACT, INFERENCE, ASSUMPTION, or UNKNOWN before patching.
3. Remove, soften, or defer unsupported claims instead of embellishing them.
4. Keep the boundary clear between this portfolio repo and external source repositories.

Verify:
- `npm run -s check:ssot` when SSOT-backed content changes
- `npm run -s verify:patch` when code changes are applied

Deliverables:
- claim inventory
- unsupported or risky claims called out explicitly
- exact verification results
