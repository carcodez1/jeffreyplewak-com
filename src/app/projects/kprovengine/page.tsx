// src/app/projects/kprovengine/page.tsx
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import "../projects.css";

const LINKS = {
  home: "/",
  repo: "https://github.com/carcodez1/KProvEngine",
  readme: "https://github.com/carcodez1/KProvEngine#readme",
  archDoc: "https://github.com/carcodez1/KProvEngine/blob/main/docs/architecture.md",
} as const;

const OG_IMAGE = "/projects/kprovengine/og.png";
const DIAGRAM = "/projects/kprovengine/architecture.png";

export const metadata: Metadata = {
  title: "KProvEngine — Deterministic provenance for human-reviewed AI workflows",
  description:
    "Deterministic provenance pipelines for AI-assisted, human-reviewed workflows. Local-first execution, explicit review, and audit-grade run artifacts.",
  alternates: { canonical: "/projects/kprovengine" },
  openGraph: {
    type: "article",
    title: "KProvEngine — Deterministic provenance for human-reviewed AI workflows",
    description:
      "Governance-first pipeline with explicit human review, deterministic runs, and reviewable artifacts.",
    url: "/projects/kprovengine",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "KProvEngine" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "KProvEngine — Deterministic provenance for human-reviewed AI workflows",
    description:
      "Governance-first pipeline with explicit human review, deterministic runs, and reviewable artifacts.",
    images: [OG_IMAGE],
  },
};

export default function Page() {
  return (
    <main className="pWrap">
      <header className="pHero">
        <div className="pCrumb">
          <Link href={LINKS.home} className="pBack">
            ← Home
          </Link>
        </div>

        <div className="pHeroGrid">
          <div>
            <div className="pTitleRow">
              <h1 className="pH1">KProvEngine</h1>
              <span className="pBadge" aria-label="Version 1 scope-locked">
                V1 (scope-locked)
              </span>
            </div>

            <p className="pSub">Deterministic provenance pipelines for AI-assisted, human-reviewed workflows.</p>

            <p className="pLede">
              Governance-first and local-only by design: reproducible runs, explicit human review, and reviewable artifacts
              suitable for audit and traceability—without over-claiming autonomy.
            </p>

            <nav className="pCtas" aria-label="Project links">
              <a className="pBtn pBtnPrimary" href={LINKS.repo} target="_blank" rel="noopener noreferrer">
                GitHub repo
              </a>
              <a className="pBtn" href={LINKS.readme} target="_blank" rel="noopener noreferrer">
                README
              </a>
              <a className="pBtn" href={LINKS.archDoc} target="_blank" rel="noopener noreferrer">
                Architecture doc
              </a>
            </nav>

            <div className="pMetaRow" aria-label="Quick tags">
              <span className="pPill">Python</span>
              <span className="pPill">Determinism</span>
              <span className="pPill">Provenance</span>
              <span className="pPill">HITL review</span>
              <span className="pPill">SBOM/SLSA posture</span>
            </div>
          </div>

          <aside aria-label="Architecture preview">
            <div className="pCard pCardTight">
              <div className="pCardHead">
                <div className="pCardTitle">Architecture snapshot</div>
                <div className="pCardHint">V1 pipeline + evidence outputs</div>
              </div>

              {/* IMPORTANT: fill image must be inside a positioned box */}
              <div className="pMedia pMedia169">
                <Image
                  src={DIAGRAM}
                  alt="KProvEngine V1 pipeline and evidence flow"
                  fill
                  className="pMediaImg"
                  priority
                  sizes="(max-width: 980px) 100vw, 420px"
                />
              </div>

              <div className="pMiniLinks">
                <a className="pLink" href={LINKS.archDoc} target="_blank" rel="noopener noreferrer">
                  View diagram + notes →
                </a>
              </div>
            </div>
          </aside>
        </div>
      </header>

      <section className="pSection">
        <h2 className="pH2">Problem</h2>
        <div className="pGrid2">
          <div className="pCard">
            <p className="pP0">
              Modern AI-assisted workflows often lose provenance, deterministic behavior, and explicit human accountability.
              Outputs may be useful, but they’re difficult to audit, reproduce, or defend in regulated or high-risk contexts.
            </p>
          </div>
          <div className="pCard">
            <ul className="pList">
              <li>“What produced this output?” isn’t answerable with artifacts.</li>
              <li>Runs aren’t reproducible end-to-end (hidden state, network calls, drift).</li>
              <li>Human responsibility is implied instead of captured.</li>
              <li>Audit defense becomes narrative, not evidence.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="pSection">
        <h2 className="pH2">Design constraints (V1)</h2>
        <div className="pCard">
          <ul className="pList pListMuted">
            <li>Local-first execution (no required external services)</li>
            <li>Deterministic, reproducible pipelines</li>
            <li>Explicit human-in-the-loop review</li>
            <li>No implied certification or automated validation</li>
            <li>Minimal and defensible dependency surface</li>
          </ul>
        </div>
      </section>

      <section className="pSection">
        <h2 className="pH2">Architecture</h2>
        <div className="pGrid2">
          <div className="pCard">
            <div className="pCalloutTitle">Pipeline</div>
            <ul className="pList">
              <li>
                <strong>Core stages:</strong> normalize → parse → extract → render
              </li>
              <li>Deterministic + side-effect constrained</li>
              <li>Clear separation between core logic and adapters</li>
            </ul>
          </div>

          <div className="pCard">
            <div className="pCalloutTitle">Adapters + evidence layer</div>
            <ul className="pList">
              <li>
                <strong>Adapters (optional):</strong> OCR and LLM integrations
              </li>
              <li>
                <strong>Non-authoritative by design:</strong> assists extraction; never treated as source of truth
              </li>
              <li>
                <strong>Evidence artifacts:</strong> manifests, hashes, provenance, toolchain disclosure, review artifacts
              </li>
            </ul>
          </div>
        </div>

        <div className="pCard pCardTight pInlineNote">
          Full architecture diagrams and governance rules live in the repository.{" "}
          <a className="pLink" href={LINKS.archDoc} target="_blank" rel="noopener noreferrer">
            View architecture and notes →
          </a>
        </div>
      </section>

      <section className="pSection">
        <h2 className="pH2">Key design decisions</h2>
        <div className="pCard">
          <ul className="pList pListMuted">
            <li>AI tooling is isolated behind adapters and never treated as a source of truth.</li>
            <li>All outputs are derived from explicit inputs and recorded execution metadata.</li>
            <li>Human review is modeled as a first-class artifact, not an afterthought.</li>
            <li>CI enforces scope and governance to prevent over-claiming functionality.</li>
          </ul>
        </div>
      </section>

      <section className="pSection">
        <h2 className="pH2">Intentionally out of scope (V1)</h2>
        <div className="pCard">
          <ul className="pList pListMuted">
            <li>Hosted or SaaS deployment</li>
            <li>Autonomous or agent-driven behavior</li>
            <li>Claims of compliance certification</li>
            <li>Workflow orchestration beyond a single deterministic run</li>
          </ul>
        </div>
      </section>

      <section className="pSection">
        <h2 className="pH2">What this demonstrates</h2>
        <div className="pCard">
          <ul className="pList">
            <li>Platform-oriented system design</li>
            <li>Governance-aware engineering judgment</li>
            <li>Clear separation of authority vs automation</li>
            <li>Audit-friendly artifact generation</li>
          </ul>
        </div>
      </section>

      <section className="pSection">
        <h2 className="pH2">Demo</h2>
        <div className="pCard">
          <p className="pP0 pMuted">Run the public demo script from the repository root:</p>
          <pre className="pCode">{`# From the KProvEngine repo:
./demo.sh

# Or (editable install):
python -m venv .venv
source .venv/bin/activate
python -m pip install -U pip
python -m pip install -e ".[dev]"
echo "Hello provenance" > input.txt
python -m kprovengine.cli input.txt --out runs`}</pre>
        </div>
      </section>

      <footer className="pFooter">
        <div className="pFooterRow">
          <a className="pLink" href={LINKS.repo} target="_blank" rel="noopener noreferrer">
            GitHub repository →
          </a>
          <span className="pDot">•</span>
          <a className="pLink" href={LINKS.archDoc} target="_blank" rel="noopener noreferrer">
            Architecture doc →
          </a>
        </div>
        <div className="pFootnote">
          V1 is intentionally stable. Rich walkthrough media (GIF/video) belongs in V2 after the interface settles.
        </div>
      </footer>
    </main>
  );
}