#!/usr/bin/env bash

# Idempotent writer for Codex agent playbooks under: codex/agents/
# - No set -euo pipefail
# - No mktemp (uses repo-local temp file)
# - Continues on errors; returns non-zero if any failures
#
# Usage:
#   bash scripts/write_agents_idempotent.sh
#   bash scripts/write_agents_idempotent.sh --backup

ROOT="${ROOT:-$(pwd)}"
AGENT_DIR="${AGENT_DIR:-$ROOT/codex/agents}"
TMP_DIR="${TMP_DIR:-$ROOT/.tmp-agent-writes}"
BACKUP=0
FAILS=0

if [ "${1:-}" = "--backup" ]; then
  BACKUP=1
fi

ts() { date +%Y%m%d-%H%M%S; }

log_skip(){ printf "UNCHANGED %s\n" "$*"; }
log_upd(){  printf "UPDATED   %s\n" "$*"; }
log_err(){  printf "ERROR     %s\n" "$*" >&2; FAILS=$((FAILS+1)); }

mkdir -p "$AGENT_DIR" 2>/dev/null || log_err "mkdir -p $AGENT_DIR failed"
mkdir -p "$TMP_DIR" 2>/dev/null || log_err "mkdir -p $TMP_DIR failed"

write_if_changed() {
  path="$1"
  tmp="$TMP_DIR/$(echo "$path" | tr '/ ' '__').tmp"

  # write stdin to tmp
  cat > "$tmp" 2>/dev/null || { log_err "write temp failed for $path"; return 1; }

  if [ -f "$path" ] && cmp -s "$tmp" "$path" 2>/dev/null; then
    rm -f "$tmp" 2>/dev/null || true
    log_skip "$path"
    return 0
  fi

  if [ "$BACKUP" -eq 1 ] && [ -f "$path" ]; then
    cp "$path" "$path.bak.$(ts)" 2>/dev/null || log_err "backup failed for $path"
  fi

  mkdir -p "$(dirname "$path")" 2>/dev/null || { log_err "mkdir failed for $(dirname "$path")"; return 1; }
  mv "$tmp" "$path" 2>/dev/null || { log_err "mv failed for $path"; return 1; }

  log_upd "$path"
  return 0
}

# --- Agents ---

write_if_changed "$AGENT_DIR/ssot-export.md" <<'MD'
Objective: Implement deterministic exporters from src/content/ssot/profile.ssot.jsonld.

Hard rules:
- Do not add dependencies.
- Emit only SUPPORTED claims into outputs.
- Outputs: public/downloads/resume.json, contact.vcf, manifest.json.
- Provide unified diff only. Do not apply changes.
- Verify with: npm run -s check

Deliverables:
- PLAN
- DIFF
- VERIFY
MD

write_if_changed "$AGENT_DIR/cleanup-audit.md" <<'MD'
Objective: Implement a deterministic Cleanup Audit Agent for this Next.js App Router portfolio repo.

Hard rules:
- No new dependencies.
- Diff-first only.
- Outputs must be deterministic and written to:
  - public/downloads/cleanup-audit.json
  - public/downloads/cleanup-audit.md
  - public/downloads/lighthouse-plan.md
- Checks must cover:
  1) duplicate content (text + CSS)
  2) SEO metadata consistency (canonical/OG/twitter/robots/sitemap)
  3) a11y risk patterns (nested landmarks, duplicate id="main", reduced-motion)
  4) LCP/Lighthouse risk heuristics (largest images/fonts/layout shift)
  5) “upgrade compatibility” notes (Next/App Router/React patterns)

Implementation requirements:
- Add scripts/quality/cleanup-audit.mjs
- Add npm script: "audit:cleanup": "node scripts/quality/cleanup-audit.mjs"
- Update npm "check" or "prepush" ONLY if it stays fast (<2s); otherwise add it as a separate optional gate.

Deliverables:
- PLAN
- DIFF
- VERIFY (npm run -s audit:cleanup, npm run -s check)
MD

write_if_changed "$AGENT_DIR/tests-85.md" <<'MD'
Objective: Raise unit test coverage to >=85% (v8 coverage) and keep the suite fast.

Hard rules:
- No new dependencies.
- Diff-first only.
- Prefer testing pure modules/scripts first (deterministic, high ROI).
- Add/adjust npm scripts:
  - test:coverage (vitest --coverage)
  - check:coverage
- Enforce >=85% globally (line + branch if reasonable; if branch is too noisy, justify line/func/statement gates and document it).
- Add a small set of a11y tests using vitest-axe for key pages/components.

Deliverables:
- PLAN (which files will be tested first and why)
- DIFF
- VERIFY (npm scripts to run)
- COVERAGE REPORT (before/after summary)
MD

write_if_changed "$AGENT_DIR/seo-audit.md" <<'MD'
Objective: Create a deterministic SEO audit script for Next.js App Router.

Hard rules:
- No new deps.
- Report must include: canonical, metadata, robots, sitemap existence, and static generation assumptions.
- Output: public/downloads/seo-report.json + public/downloads/seo-report.md
- Unified diff only.
- Verify with: npm run -s check
MD

write_if_changed "$AGENT_DIR/a11y-audit.md" <<'MD'
Objective: Create a deterministic a11y audit script/checklist.

Hard rules:
- No new deps.
- Must check: nested landmarks, duplicate id="main", focus-visible states, prefers-reduced-motion CSS.
- Output: public/downloads/a11y-report.json + public/downloads/a11y-report.md
- Unified diff only.
- Verify with: npm run -s check
MD

write_if_changed "$AGENT_DIR/gitignore.md" <<'MD'
Objective: Maintain a clean, safe .gitignore for this Next.js + TypeScript + Vercel repo.

Hard rules:
- Diff-first only; produce a unified diff against .gitignore.
- Do not ignore source code, config, or committed assets under src/ and public/.
- Ignore only generated artifacts, caches, build outputs, local env files, and OS/editor noise.
- Keep it minimal and explain each ignore group in comments.
- If an ignore entry is risky (could hide real work), mark it RISKY and do not add it.

Checks:
- Ensure node_modules and Next build outputs are ignored.
- Ensure coverage outputs are ignored.
- Ensure local env files are ignored.
- Ensure Vercel local folder is ignored (.vercel).

Deliverables:
- PLAN
- DIFF
- VERIFY (git status -sb, git clean -ndX)
MD

echo
echo "Agents directory: $AGENT_DIR"
echo "Temp directory:   $TMP_DIR"
if [ "$FAILS" -ne 0 ]; then
  echo "Completed with $FAILS error(s)." >&2
  exit 1
fi
echo "Completed successfully."
