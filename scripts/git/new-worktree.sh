#!/usr/bin/env bash
set -euo pipefail

usage() {
  cat <<'EOF'
Usage:
  bash scripts/git/new-worktree.sh <branch-name> [target-path] [base-ref]
  bash scripts/git/new-worktree.sh --dry-run <branch-name> [target-path] [base-ref]

Defaults:
  target-path = ../<repo-name>-<branch-name>
  base-ref    = main (falls back to origin/main if local main is missing)

Behavior:
  - creates a new worktree without mutating the current checkout
  - fails if the branch already exists
  - fails if the target path already exists
EOF
}

dry_run=0
if [[ "${1:-}" == "--help" || "${1:-}" == "-h" ]]; then
  usage
  exit 0
fi
if [[ "${1:-}" == "--dry-run" ]]; then
  dry_run=1
  shift
fi

branch="${1:-}"
if [[ -z "$branch" ]]; then
  usage
  exit 1
fi

repo_root="$(git rev-parse --show-toplevel)"
repo_name="$(basename "$repo_root")"
branch_slug="${branch//\//-}"
default_target="$(dirname "$repo_root")/${repo_name}-${branch_slug}"
target_path="${2:-$default_target}"
requested_base="${3:-main}"

cd "$repo_root"

if git show-ref --verify --quiet "refs/heads/$branch" || git show-ref --verify --quiet "refs/remotes/origin/$branch"; then
  printf 'Branch already exists: %s\n' "$branch" >&2
  exit 1
fi

if [[ -e "$target_path" ]]; then
  printf 'Target path already exists: %s\n' "$target_path" >&2
  exit 1
fi

if git show-ref --verify --quiet "refs/heads/$requested_base"; then
  base_ref="$requested_base"
elif git show-ref --verify --quiet "refs/remotes/origin/$requested_base"; then
  base_ref="origin/$requested_base"
else
  printf 'Base ref not found locally or on origin: %s\n' "$requested_base" >&2
  exit 1
fi

printf 'Repo root: %s\n' "$repo_root"
printf 'Base ref: %s\n' "$base_ref"
printf 'Branch: %s\n' "$branch"
printf 'Target path: %s\n' "$target_path"

if [[ "$dry_run" -eq 1 ]]; then
  printf '\nDry run only. No worktree created.\n'
  printf 'Would run:\n'
  printf 'git worktree add %s -b %s %s\n' "$target_path" "$branch" "$base_ref"
  exit 0
fi

git worktree add "$target_path" -b "$branch" "$base_ref"

printf '\nNext commands:\n'
printf 'cd %s\n' "$target_path"
printf 'git status -sb\n'
printf 'npm run -s verify:patch\n'
