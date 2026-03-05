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
