Objective: Create a deterministic a11y audit script/checklist.

Hard rules:
- No new deps.
- Must check: nested landmarks, duplicate id="main", focus-visible states, prefers-reduced-motion CSS.
- Output: public/downloads/a11y-report.json + public/downloads/a11y-report.md
- Unified diff only.
- Verify with: npm run -s check
