---
name: reasoning-context-agent
description: Build and verify deterministic reasoning context bundles for this repository. Use when asked to provide local runtime context for ChatGPT/Codex reasoning, including safe Vercel/Next environment data, macOS hardware snapshot, and SBOM-style dependency inventory.
---

# Reasoning Context Agent Skill

Objective: Produce shareable reasoning context artifacts from local state only.

Use this workflow:
1. Run `npm run -s context:reasoning`.
2. Confirm both artifacts exist and are non-empty:
   - `artifacts/reasoning/context-bundle.json`
   - `artifacts/reasoning/context-bundle.md`
3. Report artifact paths and summarize what was captured:
   - runtime (`node`, `npm`, `next`, `react`)
   - safe env allowlist (`VERCEL_*` operational keys + `NEXT_PUBLIC_*`)
   - macOS hardware snapshot
   - dependency SBOM summary from `package-lock.json`
   - tracked recruiter-pack artifact hashes when present

Guardrails:
- Do not add dependencies.
- Do not use network tools.
- Do not include secrets or unknown env vars; keep allowlist behavior intact.
- Keep output deterministic and repo-local.

Verification:
- `npm run -s context:reasoning`
- `npm run -s context:reasoning:check`

If the command fails:
1. Check `package-lock.json` exists.
2. Check `scripts/context/build-reasoning-context.mjs` exists.
3. Re-run and return exact stderr.

Deliverables:
- Generated artifact paths
- Short summary of captured sections
- Any risk notes if env keys were absent
