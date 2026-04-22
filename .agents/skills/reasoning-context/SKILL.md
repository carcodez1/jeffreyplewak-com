---
name: reasoning-context
description: Build and verify the deterministic reasoning-context bundle from local runtime, env, hardware, and dependency state.
author: Jeffrey R. Plewak
created: 2026-03-15
license: Internal repo guidance
---
# Reasoning Context

Author: Jeffrey R. Plewak
Created: 2026-03-15
License: Internal repo guidance

When to use:
- local runtime context is needed for Codex or ChatGPT reasoning
- the reasoning-context artifacts or scripts need inspection or verification

Workflow:
1. Run `npm run -s context:reasoning`.
2. Confirm `artifacts/reasoning/context-bundle.json` and `artifacts/reasoning/context-bundle.md` both exist and are non-empty.
3. Summarize runtime, safe env keys, hardware snapshot, SBOM coverage, and tracked artifact hashes.
4. Keep the allowlist behavior intact and do not expose secrets or unknown env vars.

Verify:
- `npm run -s context:reasoning`
- `npm run -s context:reasoning:check`

Deliverables:
- artifact paths
- short summary of captured sections
- exact verification results
