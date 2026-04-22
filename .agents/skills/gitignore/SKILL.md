---
name: gitignore
description: Make minimal, safe `.gitignore` updates without hiding real source or durable artifacts.
author: Jeffrey R. Plewak
created: 2026-03-15
license: Internal repo guidance
---
# Gitignore

Author: Jeffrey R. Plewak
Created: 2026-03-15
License: Internal repo guidance

When to use:
- generated files, caches, or local-only artifacts need ignore coverage
- ignore drift is creating noisy status output or risky commits

Workflow:
1. Inspect current `.gitignore`, the affected generated files, and whether they are durable repo assets.
2. Ignore only build outputs, caches, editor noise, local env files, and reproducible generated artifacts.
3. Do not ignore source, config, public assets, or anything that could hide real work.
4. Keep entries grouped and minimal.

Verify:
- `git status --short`

Deliverables:
- unified diff
- any risky ignore decisions called out explicitly
