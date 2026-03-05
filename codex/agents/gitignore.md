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
