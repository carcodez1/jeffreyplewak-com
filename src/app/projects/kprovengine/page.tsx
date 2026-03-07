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

            <p className="pSub">Proof case study for human-reviewed AI workflow delivery.</p>

            <p className="pLede">
              Minimal access page: open the repository and README directly.
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
          </div>
        </div>
      </header>

      <section className="pSection">
        <div className="pCard pCardTight depthFx">
          <p className="pP0">
            For full professional context, use <Link href="/resume">Resume</Link> or <Link href="/r">Recruiter Page</Link>.
          </p>
        </div>
      </section>

      <section className="pSection" aria-label="Supply-chain preview">
        <div className="pCard pCardTight depthFx">
          <h2 className="pH2">Build and trust preview</h2>
          <p className="pP0">
            GitHub links above provide a quick entry to repository activity. This page is a recruiter-facing proof surface, while SBOM,
            provenance, and SLSA-aligned signals are reviewed in the source repository workflow context.
          </p>
        </div>
      </section>

      <section className="pSection" aria-label="LegalOps audit preview">
        <div className="pCard pCardTight depthFx">
          <h2 className="pH2">LegalOps and provenance audit preview</h2>
          <p className="pP0">
            Audit focus areas for handoff review: artifact provenance lineage, SBOM inventory, SLSA-aligned build provenance, and
            explicit human-review checkpoints for legal and operations workflows.
          </p>
        </div>
      </section>
    </div>
  );
}
