// src/app/projects/kprovengine/page.tsx
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import "../projects.css";
import { kprovengineSourceCodeJsonLd } from "@/lib/jsonld";

const LINKS = {
  home: "/",
  repo: "https://github.com/carcodez1/KProvEngine",
  readme: "https://github.com/carcodez1/KProvEngine#readme",
  archDoc: "https://github.com/carcodez1/KProvEngine/blob/main/docs/architecture.md"
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
    description: "Governance-first pipeline with explicit human review, deterministic runs, and reviewable artifacts.",
    url: "/projects/kprovengine",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "KProvEngine" }]
  },
  twitter: {
    card: "summary_large_image",
    title: "KProvEngine — Deterministic provenance for human-reviewed AI workflows",
    description: "Governance-first pipeline with explicit human review, deterministic runs, and reviewable artifacts.",
    images: [OG_IMAGE]
  }
};

export default function Page() {
  return (
    <main className="pWrap" id="main">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(kprovengineSourceCodeJsonLd()) }}
      />

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

            <p className="pSub">Deterministic provenance for AI-assisted workflows that require explicit human review.</p>

            <p className="pLede">
              Local-first by design: reproducible runs, captured review decisions, and evidence artifacts you can audit, diff, and defend.
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
              <ul className="pPillRow" role="list">
                <li className="pPill">Python</li>
                <li className="pPill">Determinism</li>
                <li className="pPill">Provenance</li>
                <li className="pPill">Human-in-the-loop</li>
                <li className="pPill">Audit-ready outputs</li>
              </ul>
            </div>

            <div className="pCard pCardTight pInlineNote">
              <div className="pCalloutTitle">What you get (V1)</div>
              <ul className="pList">
                <li>
                  <strong>Reproducible run directory</strong> with deterministic stages: normalize → parse → extract → render
                </li>
                <li>
                  <strong>Evidence artifacts</strong> (manifest + hashes + provenance + toolchain disclosure)
                </li>
                <li>
                  <strong>Explicit review record</strong> captured as an artifact (human accountability)
                </li>
              </ul>
            </div>
          </div>

          <aside aria-label="Architecture preview">
            <div className="pCard pCardTight">
              <div className="pCardHead">
                <div className="pCardTitle">Architecture snapshot</div>
                <div className="pCardHint">V1 pipeline + evidence outputs</div>
              </div>

              <div className="pMedia pMedia169" aria-label="KProvEngine architecture diagram">
                <Image
                  src={DIAGRAM}
                  alt="KProvEngine V1 pipeline and evidence flow"
                  fill
                  className="pMediaImg"
                  priority
                  sizes="(max-width: 980px) 100vw, 420px"
                  style={{ objectFit: "contain" }}
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
        <h2 className="pH2">Why this exists</h2>
        <div className="pGrid2">
          <div className="pCard">
            <p className="pP0">
              Many AI-assisted workflows produce useful output but weak evidence. When provenance is missing, you can’t reliably reproduce results,
              explain what happened, or separate human judgment from automation.
            </p>
          </div>
          <div className="pCard">
            <ul className="pList">
              <li>“What produced this output?” must be answerable with artifacts, not narrative.</li>
              <li>Runs should be reproducible end-to-end (no hidden state, no surprise network calls).</li>
              <li>Human responsibility must be captured explicitly, not implied.</li>
              <li>Audit defense should be evidence-backed and reviewable.</li>
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
              <li>Clear separation between core logic and optional adapters</li>
            </ul>
          </div>

          <div className="pCard">
            <div className="pCalloutTitle">Adapters + evidence layer</div>
            <ul className="pList">
              <li>
                <strong>Adapters (optional):</strong> OCR and LLM integrations
              </li>
              <li>
                <strong>Non-authoritative by design:</strong> can assist extraction; never treated as source of truth
              </li>
              <li>
                <strong>Evidence artifacts:</strong> manifest, hashes, provenance, toolchain disclosure, review artifacts
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
        <h2 className="pH2">Evidence outputs (what’s actually captured)</h2>
        <div className="pCard">
          <ul className="pList">
            <li>
              <strong>manifest.json</strong> — file inventory + expected outputs
            </li>
            <li>
              <strong>hashes</strong> — content hashes for inputs/outputs
            </li>
            <li>
              <strong>provenance</strong> — execution metadata (what ran, when, with what versions)
            </li>
            <li>
              <strong>toolchain disclosure</strong> — dependency/tool versions that impact reproducibility
            </li>
            <li>
              <strong>human review artifact</strong> — explicit reviewer decision record
            </li>
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

      <footer className="pFooter" aria-label="Project footer">
        <div className="pFooterRow">
          <a className="pLink" href={LINKS.repo} target="_blank" rel="noopener noreferrer">
            GitHub repository →
          </a>
          <span className="pDot">•</span>
          <a className="pLink" href={LINKS.archDoc} target="_blank" rel="noopener noreferrer">
            Architecture doc →
          </a>
        </div>
        <div className="pFootnote">V1 is intentionally stable. Rich walkthrough media (GIF/video) belongs in V2 after the interface settles.</div>
      </footer>
    </main>
  );
}