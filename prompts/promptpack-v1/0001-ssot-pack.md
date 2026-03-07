# 0001 SSOT Recruiter Pack

Author: Jeffrey R. Plewak
Created: 2026-03-05
License: CC-BY-4.0

Objective: Generate deterministic recruiter-pack artifacts from SSOT.

Read root `AGENTS.md` first and follow the applicable mode contract exactly.

Requirements:
- Input: `src/content/ssot/profile.ssot.jsonld`
- Enforce `SUPPORTED` claims only in exported outputs
- Produce `resume.json`, `contact.vcf`, `manifest.json`
- Include standards references in artifact metadata
