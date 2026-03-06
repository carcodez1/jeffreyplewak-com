#!/usr/bin/env zsh
set -euo pipefail
# Thin runner only: policy lives in AGENTS.md and repo-local Codex profiles.

MODE="${1:-inspect}"
PROMPT_FILE="${2:-}"
SIG_FILE="${3:-}"
STAMP="$(date +%Y%m%d-%H%M%S)"
LOGDIR="logs/checkpoints/$STAMP-$MODE"
mkdir -p "$LOGDIR"

red=$'\033[1;31m'
green=$'\033[1;32m'
blue=$'\033[1;34m'
reset=$'\033[0m'

echo "==> repo state" | tee "$LOGDIR/state.txt"
git status -sb | tee -a "$LOGDIR/state.txt"
git diff --stat | tee -a "$LOGDIR/state.txt" || true

echo "==> reasoning context"
npm run -s context:reasoning > "$LOGDIR/context.txt"

TMP_PROMPT="$(mktemp)"
{
  [[ -n "$SIG_FILE" && -f "$SIG_FILE" ]] && cat "$SIG_FILE"
  echo
  [[ -n "$PROMPT_FILE" && -f "$PROMPT_FILE" ]] && cat "$PROMPT_FILE"
} > "$TMP_PROMPT"

echo "==> launching codex profile: $MODE"
codex --profile "$MODE" < "$TMP_PROMPT" | tee "$LOGDIR/codex-output.txt"

if grep -Eiq 'HITL STATUS.*REQUIRED|OPEN QUESTIONS|approval|required' "$LOGDIR/codex-output.txt"; then
  printf "\n${red}================ HITL REQUIRED ================${reset}\n"
  printf "${red}Review %s/codex-output.txt and answer Codex.${reset}\n\n" "$LOGDIR"
else
  printf "\n${green}================ NEXT STEP ================${reset}\n"
  printf "${blue}Run local verify, view the UI, then run review mode.${reset}\n\n"
fi
