---
name: seo-audit
description: Run the repo's deterministic SEO readiness report and use it to guide small, evidence-backed fixes.
author: Jeffrey R. Plewak
created: 2026-03-15
license: Internal repo guidance
---
# SEO Audit

Author: Jeffrey R. Plewak
Created: 2026-03-15
License: Internal repo guidance

When to use:
- discovery, metadata, or asset readiness needs inspection
- a patch may have affected canonical, OG, Twitter, sitemap, robots, or indexable route coverage

Workflow:
1. Run `npm run -s seo:report`.
2. Inspect the failing checks and advisories before proposing changes.
3. Prefer fixes that align metadata, assets, and route intent without inventing ranking claims.
4. Treat metadata and structured-data edits as high-scrutiny work.

Verify:
- `npm run -s seo:report`
- `npm run -s verify:patch` when code changes are applied

Deliverables:
- report paths
- key failing checks or advisories
- exact verification results
