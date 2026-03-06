# Reasoning Context Agent

Use this local tool to generate a deterministic context bundle for advanced reasoning sessions.

## What It Collects

- Safe Vercel/Next environment context (allowlist only, no secrets)
- Next/React/Node/npm runtime metadata
- macOS hardware and OS snapshot
- Dependency SBOM summary from `package-lock.json` (direct + transitive)
- Hashes for key recruiter-pack artifacts when present

## Command

```bash
npm run -s context:reasoning
```

Artifacts written:

- `artifacts/reasoning/context-bundle.json`
- `artifacts/reasoning/context-bundle.md`

## Safety Model

- Only allowlisted env keys are included (`VERCEL_*` safe operational keys and `NEXT_PUBLIC_*`).
- Secrets (tokens, private keys, unknown env vars) are excluded by default.
- No network calls.
- No new dependencies.

## Recommended Workflow

1. Run `npm run -s context:reasoning` before a reasoning-heavy session.
2. Attach `artifacts/reasoning/context-bundle.md` for quick human-readable context.
3. Attach `artifacts/reasoning/context-bundle.json` when exact machine-parsable detail is required.
