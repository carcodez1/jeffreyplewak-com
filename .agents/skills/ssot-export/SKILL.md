---
name: ssot-export
description: Run and validate the SSOT export pipeline without introducing claim drift across derived artifacts.
author: Jeffrey R. Plewak
created: 2026-03-15
license: Internal repo guidance
---
# SSOT Export

Author: Jeffrey R. Plewak
Created: 2026-03-15
License: Internal repo guidance

When to use:
- structured resume/profile data changed and derived artifacts need refresh
- recruiter-pack or SSOT-backed outputs need validation

Workflow:
1. Inspect the SSOT change and determine which derived artifacts are affected.
2. Run the smallest existing SSOT commands needed for validation or export.
3. Keep public structured data and visible content aligned exactly.
4. Do not introduce new export paths or duplicate claim sources.

Verify:
- `npm run -s ssot:validate`
- `npm run -s check:ssot`

Deliverables:
- affected artifact list
- exact verification results
