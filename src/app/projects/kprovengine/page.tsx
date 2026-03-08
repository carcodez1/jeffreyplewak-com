import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import "../projects.css";
import { kprovengineSourceCodeJsonLd } from "@/lib/jsonld";
import { getNonce } from "@/lib/nonce";
import { KPROVENGINE_OG_IMAGES, KPROVENGINE_TWITTER_IMAGES } from "@/lib/metadata/images";

const KPROV_LINKS = {
  home: "/projects",
  repo: "https://github.com/carcodez1/KProvEngine",
  readme: "https://github.com/carcodez1/KProvEngine#readme",
  actions: "https://github.com/carcodez1/KProvEngine/actions",
  architecture: "/projects/kprovengine/architecture.svg",
} as const;

import { SITE_URL } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "KProvEngine — Proof Case Study for Human-Reviewed AI Workflows",
  description:
    "Proof-linked case study for deterministic provenance in AI-assisted, human-reviewed workflows with preview guidance for SBOM, provenance, and SLSA-oriented build trust signals.",
  keywords: [
    "KProvEngine",
    "deterministic AI workflows",
    "provenance",
    "artifact provenance",
    "legal ops audit",
    "SBOM",
    "SLSA",
    "software supply chain",
    "human reviewed AI",
    "audit-grade artifacts",
  ],
  alternates: {
    canonical: `${SITE_URL}/projects/kprovengine`,
  },
  openGraph: {
    type: "article",
    title: "KProvEngine — Proof Case Study for Human-Reviewed AI Workflows",
    description: "Proof-linked case study with explicit human review, deterministic runs, and reviewable artifacts.",
    url: `${SITE_URL}/projects/kprovengine`,
    images: KPROVENGINE_OG_IMAGES,
  },
  twitter: {
    card: "summary_large_image",
    title: "KProvEngine — Proof Case Study for Human-Reviewed AI Workflows",
    description: "Proof-linked case study with explicit human review, deterministic runs, and reviewable artifacts.",
    images: KPROVENGINE_TWITTER_IMAGES,
  },
};

export default async function Page() {
  const nonce = await getNonce();
  const jsonLd = kprovengineSourceCodeJsonLd();

  // IMPORTANT:
  // - Do NOT render a <main> landmark here.
  // - The app-level <main id="main" className="appMain"> already exists in src/app/layout.tsx.
  // - This wrapper is intentionally a <div> to avoid nested landmarks and duplicate IDs.
  return (
    <div className="pWrap">
      <script
        type="application/ld+json"
        nonce={nonce || undefined}
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <header className="pHero">
        <div className="pCrumb">
          <Link href={KPROV_LINKS.home} className="pBack">
            ← Projects
          </Link>
        </div>

        <div className="pHeroGrid pHeroGridSingle">
          <div>
            <div className="pTitleRow">
              <h1 className="pH1">KProvEngine</h1>
              <span className="pBadge" aria-label="Version 1 scope-locked">
                V1 (scope-locked)
              </span>
            </div>

            <p className="pSub">
              KProvEngine turns each run into structured, reviewable evidence so teams can trust the process, not just the final output.
            </p>

            <p className="pLede">
              I built it as a capstone around provenance, release trust, reproducibility, and reviewer-friendly evidence.
            </p>

            <nav className="pCtas" aria-label="Project links">
              <a className="pBtn pBtnPrimary" href={KPROV_LINKS.repo} target="_blank" rel="noopener noreferrer">
                Open repo
              </a>
              <a className="pBtn" href={KPROV_LINKS.readme} target="_blank" rel="noopener noreferrer">
                Readme
              </a>
              <a className="pBtn" href={KPROV_LINKS.actions} target="_blank" rel="noopener noreferrer">
                Build runs
              </a>
            </nav>

            <div className="pMetaRow" aria-label="Proof summary">
              <ul className="pPillRow" role="list">
                <li className="pPill">Deterministic runs</li>
                <li className="pPill">Explicit human review</li>
                <li className="pPill">Audit-grade artifacts</li>
                <li className="pPill">SBOM / provenance / SLSA-aligned signals</li>
              </ul>
            </div>

            <div className="pCard pCardTight depthFx" style={{ marginTop: "18px" }}>
              <h2 className="pH2">Quick value</h2>
              <ul className="pList pListMuted">
                <li>Explains what happened in a run without digging through logs.</li>
                <li>Produces evidence files a reviewer can inspect quickly.</li>
                <li>Makes provenance and release trust visible in plain artifacts.</li>
                <li>Keeps local execution and CI behavior aligned.</li>
                <li>Shows practical supply-chain-aware engineering discipline.</li>
              </ul>
            </div>
          </div>
        </div>
      </header>

      <section className="pSection" aria-label="What it solves">
        <div className="pCard pCardTight depthFx">
          <h2 className="pH2">What it solves</h2>
          <p className="pP0">
            In real engineering environments, the risk often is not the final output. It is everything around it: inconsistent execution, weak traceability, and poor visibility into how an artifact was produced.
          </p>
          <ul className="pList pListMuted">
            <li>Runtime behavior varies across environments</li>
            <li>Artifact lineage is hard to reconstruct</li>
            <li>Release trust signals are weak</li>
            <li>Human- and AI-assisted workflows are hard to review after the fact</li>
          </ul>
        </div>
      </section>

      <section className="pSection" aria-label="What it does">
        <div className="pCard pCardTight depthFx">
          <h2 className="pH2">What it does</h2>
          <p className="pP0">
            KProvEngine provides a deterministic pipeline with stable output contracts, explicit stages, and evidence files that make each run inspectable from start to finish.
          </p>
          <ul className="pList pListMuted">
            <li>Deterministic CLI behavior with stable output contracts</li>
            <li>A clear pipeline: normalize -&gt; parse -&gt; extract -&gt; render</li>
            <li>Per-run evidence artifacts such as <code>run_summary.json</code>, <code>manifest.json</code>, <code>provenance.json</code>, and <code>human_review.json</code></li>
            <li>Guardrails for identity, artifact hygiene, and Python version policy</li>
            <li>CI parity and release discipline workflows</li>
          </ul>
        </div>
      </section>

      <section className="pSection" aria-label="Architecture">
        <div className="pCard pCardTight depthFx">
          <h2 className="pH2">Architecture</h2>
          <p className="pP0">
            High-level view of the pipeline, reviewer checkpoints, and the evidence each run leaves behind.
          </p>

          <div className="pMedia" style={{ marginTop: "14px" }}>
            <Image
              src={KPROV_LINKS.architecture}
              alt="KProvEngine architecture diagram showing workflow stages, review checkpoints, and evidence outputs."
              width={1800}
              height={1132}
              className="pMediaImg"
            />
          </div>

          <p className="pMuted pInlineNote">
            The diagram keeps the workflow in the middle and the evidence surfaces around it, which is how the project is meant to be reviewed.
          </p>
        </div>
      </section>

      <section className="pSection" aria-label="Project proof details">
        <div className="pGrid2">
          <div className="pCard pCardTight depthFx">
            <h2 className="pH2">What it produces</h2>
            <ul className="pList pListMuted">
              <li><code>run_summary.json</code> for execution summary</li>
              <li><code>manifest.json</code> for produced artifacts</li>
              <li><code>provenance.json</code> for workflow lineage</li>
              <li><code>human_review.json</code> for reviewer checkpoints</li>
            </ul>
          </div>

          <div className="pCard pCardTight depthFx">
            <h2 className="pH2">Tech stack</h2>
            <ul className="pList pListMuted">
              <li>Python and CLI packaging for local-first execution</li>
              <li>JSON output contracts for machine-readable review surfaces</li>
              <li>GitHub Actions for CI and release checks</li>
              <li><code>tox</code> and <code>make preflight</code> for local gate parity</li>
              <li>MIT license for the open-source core</li>
            </ul>
          </div>

          <div className="pCard pCardTight depthFx">
            <h2 className="pH2">Technical highlights</h2>
            <ul className="pList pListMuted">
              <li>Deterministic exit codes and stable output contracts</li>
              <li>Run-scoped evidence layout and review surfaces</li>
              <li>Multi-version CI with coverage gates</li>
              <li>Release discipline around stable public interfaces</li>
            </ul>
          </div>

          <div className="pCard pCardTight depthFx">
            <h2 className="pH2">Why this matters</h2>
            <p className="pP0">
              This project shows how I think about engineering quality: reproducible behavior, clear contracts, reviewable evidence, and release trust that holds up outside a demo.
            </p>
            <ul className="pList pListMuted pInlineNote">
              <li>Reproducibility is treated as a product feature.</li>
              <li>Traceability is visible in the artifacts, not implied in docs.</li>
              <li>Reviewer-friendly evidence is built into the workflow itself.</li>
              <li>Supply-chain-aware release discipline is part of the engineering model.</li>
            </ul>
          </div>

          <div className="pCard pCardTight depthFx">
            <h2 className="pH2">Open source model</h2>
            <p className="pP0">
              KProvEngine is published as an MIT-licensed open-source core with maintainer-led governance.
            </p>
            <p className="pMuted pInlineNote">
              Changes flow through issues, pull requests, and local gates so public contract surfaces stay stable as the project evolves.
            </p>
          </div>
        </div>
      </section>

      <section className="pSection" aria-label="Outcome">
        <div className="pCard pCardTight depthFx">
          <h2 className="pH2">Outcome</h2>
          <p className="pP0">
            This capstone demonstrates production-minded software engineering: systems that can show what they did, under defined constraints, with reviewer-ready evidence.
          </p>
          <p className="pMuted pInlineNote">
            For full professional context, use <Link href="/resume">Resume</Link> or <Link href="/r">Recruiter Page</Link>.
          </p>
        </div>
      </section>
    </div>
  );
}
