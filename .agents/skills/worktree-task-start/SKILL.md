---
name: worktree-task-start
description: Start a clean one-task-per-worktree branch without mutating the current checkout.
author: Jeffrey R. Plewak
created: 2026-04-23
license: Internal repo guidance
---
# Worktree Task Start

When to use:
- before starting a new task when the current checkout is dirty
- when a task should be isolated to its own branch and audit trail

Workflow:
1. Run `bash scripts/git/new-worktree.sh <branch-name>` from the repo root.
2. Use one task per worktree and keep unrelated changes out of that branch.
3. Continue work from the new worktree path that the script prints.

Verify:
- `bash scripts/git/new-worktree.sh --dry-run <branch-name>`

