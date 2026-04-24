---
name: generated-artifact-hygiene
description: Classify generated-file churn as durable, restorable, or investigate before deciding what belongs in a patch.
author: Jeffrey R. Plewak
created: 2026-04-23
license: Internal repo guidance
---
# Generated Artifact Hygiene

When to use:
- generated files appear in `git status`
- verification produced churn and it is unclear what should be committed versus restored

Workflow:
1. Run `node scripts/codex/check-generated-churn.mjs`.
2. Treat `durable` outputs as intentional generated artifacts that may belong in the patch.
3. Treat `restorable` outputs as verification churn unless the generator itself changed.
4. Treat `investigate` outputs as unresolved until their source of truth is confirmed.

Verify:
- `node scripts/codex/check-generated-churn.mjs`
