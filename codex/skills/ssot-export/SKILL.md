---
name: ssot-export
description: Deterministic SSOT export workflow with claim enforcement.
author: Jeffrey R. Plewak
---

# SSOT Export Skill

Author: Jeffrey R. Plewak
Created: 2026-03-05

Objective: Implement deterministic exporters from `src/content/ssot/profile.ssot.jsonld`.

Hard rules:
- Do not add dependencies.
- Emit only `SUPPORTED` claims into outputs.
- Outputs: `public/downloads/resume.json`, `contact.vcf`, `manifest.json`.
- Provide unified diff only.
- Verify with: `npm run -s check`

Deliverables:
- PLAN
- DIFF
- VERIFY
