---
name: tests-85
description: Raise test confidence with small, deterministic additions that improve coverage without slowing the suite unnecessarily.
author: Jeffrey R. Plewak
created: 2026-03-15
license: Internal repo guidance
---
# Tests 85

Author: Jeffrey R. Plewak
Created: 2026-03-15
License: Internal repo guidance

When to use:
- test gaps are blocking a safe patch
- pure modules, metadata helpers, or deterministic scripts need stronger regression coverage

Workflow:
1. Prefer fast unit coverage for deterministic modules and scripts before UI-heavy tests.
2. Keep new tests local to the changed behavior and avoid snapshot sprawl.
3. Reuse existing test tooling; do not add dependencies for small coverage gains.
4. If coverage goals need script changes, keep them scoped and reviewable.

Verify:
- `npm run -s typecheck:tests`
- `npm run -s test:ci`

Deliverables:
- focused tests
- exact verification results
