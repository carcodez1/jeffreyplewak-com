#!/usr/bin/env bash
set -euo pipefail

usage() {
  cat <<'EOF'
Usage:
  bash scripts/codex/run-task.sh <profile> [prompt-file] [signature-file]
  bash scripts/codex/run-task.sh --help

Behavior:
  - captures repo state and reasoning context in logs/checkpoints/<timestamp>-<profile>/
  - combines optional signature and prompt files into one prompt payload
  - runs Codex non-interactively with `codex exec`
  - writes machine-readable events and the final message to the checkpoint directory
EOF
}

if [[ "${1:-}" == "--help" || "${1:-}" == "-h" ]]; then
  usage
  exit 0
fi

PROFILE="${1:-inspect}"
PROMPT_FILE="${2:-}"
SIG_FILE="${3:-}"
STAMP="$(date +%Y%m%d-%H%M%S)"
LOGDIR="logs/checkpoints/$STAMP-$PROFILE"
mkdir -p "$LOGDIR"

echo "==> repo state" | tee "$LOGDIR/state.txt"
git status -sb | tee -a "$LOGDIR/state.txt"
git diff --stat | tee -a "$LOGDIR/state.txt" || true

echo "==> reasoning context"
npm run -s context:reasoning > "$LOGDIR/context.txt"

TMP_PROMPT="$(mktemp)"
cleanup() {
  rm -f "$TMP_PROMPT"
}
trap cleanup EXIT

{
  [[ -n "$SIG_FILE" && -f "$SIG_FILE" ]] && cat "$SIG_FILE"
  [[ -n "$SIG_FILE" && -f "$SIG_FILE" && -n "$PROMPT_FILE" && -f "$PROMPT_FILE" ]] && printf "\n\n"
  [[ -n "$PROMPT_FILE" && -f "$PROMPT_FILE" ]] && cat "$PROMPT_FILE"
} > "$TMP_PROMPT"

if [[ ! -s "$TMP_PROMPT" ]]; then
  printf 'Prompt payload is empty. Provide a prompt file and/or signature file.\n' >&2
  exit 1
fi

echo "==> launching codex exec profile: $PROFILE"
codex exec --profile "$PROFILE" --json -o "$LOGDIR/final-message.txt" < "$TMP_PROMPT" | tee "$LOGDIR/codex-events.jsonl"

printf '\nCheckpoint directory: %s\n' "$LOGDIR"
printf 'Final message: %s/final-message.txt\n' "$LOGDIR"
printf 'Event log: %s/codex-events.jsonl\n' "$LOGDIR"
