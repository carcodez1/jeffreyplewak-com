# jeffreyplewak-com

Personal site and engineering portfolio for **Jeffrey R. Plewak**.

This repository contains the production source for https://jeffreyplewak.com and is maintained with explicit attention to performance, determinism, and operational clarity.

---

## Purpose

This site is intentionally:

- Static-first
- Minimal in runtime dependencies
- Explicit in structure
- Fast, stable, and recruiter-readable
- Operationally low-risk

It reflects real engineering judgment rather than design noise or framework churn.

---

## Architecture Principles

1. Static where possible
2. Deterministic builds
3. No unnecessary client-side JavaScript
4. Explicit metadata and SEO configuration
5. Strict commit discipline and branch isolation
6. CI automation for generated artifacts

The site favors long-term maintainability over novelty.

---

## Tech Stack

- Framework: Next.js (App Router)
- Language: TypeScript
- Styling: Hand-authored CSS (no runtime CSS framework)
- Images: next/image with controlled layout behavior
- Node: 20.x
- Package Manager: npm 10.x
- Deployment: Vercel
- CI: GitHub Actions
- Diagram rendering: Mermaid CLI (SVG output committed via workflow)

---

## Repository Structure



## License

This repository uses a dual-license structure.

### Source Code
Licensed under the MIT License (see `LICENSE`).

### Portfolio Content & Identity
All branding, written content, diagrams, resume materials, images,
and personal identifiers are protected under a separate professional
portfolio license (see `LICENSE-PORTFOLIO`).

This repository is not licensed as a portfolio template.
