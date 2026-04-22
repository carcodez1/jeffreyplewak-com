---
name: route-metadata-polish
description: Align route metadata and structured discovery signals with visible page content while treating metadata edits as high-scrutiny work.
author: Jeffrey R. Plewak
created: 2026-03-15
license: Internal repo guidance
---
# Route Metadata Polish

Author: Jeffrey R. Plewak
Created: 2026-03-15
License: Internal repo guidance

When to use:
- canonical, OG, Twitter, robots, sitemap, or JSON-LD alignment needs work
- visible route copy changed and metadata may now be stale

Workflow:
1. Inspect the visible route content, shared metadata helpers, and current discovery signals first.
2. Treat metadata edits as approval-gated high-scrutiny changes.
3. Match metadata and structured data to visible content exactly; do not mark up unsupported or hidden claims.
4. Prefer shared metadata utilities over per-route duplication.

Verify:
- `npm run -s seo:report`
- `npm run -s verify:patch`
- `npm run -s check:ssot` when structured data or SSOT-backed copy changes

Deliverables:
- metadata diff with visible-content rationale
- exact verification results
