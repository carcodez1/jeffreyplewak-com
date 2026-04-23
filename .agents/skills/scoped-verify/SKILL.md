---
name: scoped-verify
description: Determine the smallest safe verification set for a local diff or file list using the repo's deterministic scope mapper.
author: Jeffrey R. Plewak
created: 2026-04-23
license: Internal repo guidance
---
# Scoped Verify

When to use:
- before choosing verification commands for a non-trivial patch
- when the diff touches multiple surfaces and `verify:patch` alone may be incomplete

Workflow:
1. Run `node scripts/codex/verify-changed-scope.mjs` with changed file paths, or no args to inspect current worktree changes.
2. Use the exact commands it returns as the starting verification set.
3. If a protected surface is involved, still apply repo `AGENTS.md` HITL rules.

Verify:
- `node scripts/codex/verify-changed-scope.mjs`

