#!/usr/bin/env bash
set -euo pipefail

printf 'Deprecated: use scripts/codex/run-task.sh instead.\n' >&2
exec bash scripts/codex/run-task.sh "$@"
