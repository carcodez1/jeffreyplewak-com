# Diagrams

Source-of-truth Mermaid files live here:

- `*.mmd` files are the authoritative inputs.
- Rendered SVGs are written to `public/diagrams/*.svg`.

Automation:

- Local: `make diagrams`
- CI: `.github/workflows/diagrams.yml` renders and commits SVG changes.

Conventions:

- Keep each diagram self-contained.
- Start Mermaid files with a diagram type (`flowchart`, `sequenceDiagram`, `stateDiagram-v2`, etc.).
- Prefer stable labels (avoid timestamps or volatile text that causes noisy diffs).
