// src/app/projects/page.tsx
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import "./projects.css";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Selected engineering projects demonstrating platform design, determinism, and audit-ready systems.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  return (
    <main className="pWrap">
      <header className="pHero">
        <div className="pCrumb">
          <Link href="/" className="pBack">
            ← Home
          </Link>
        </div>

        <h1 className="pH1">Projects</h1>
        <p className="pLede">
          Representative systems that reflect how I design, scope, and ship
          production software.
        </p>
      </header>

      <section className="pSection">
        <div className="pGrid2">
          {/* KProvEngine */}
          <article className="pCard">
            <div className="pCardHead">
              <div className="pCardTitle">KProvEngine</div>
              <div className="pCardHint">
                Deterministic · Governance-first · Human review
              </div>
            </div>

            <p className="pMuted">
              Local-only provenance engine for AI-assisted workflows with
              deterministic execution, explicit human review, and audit-grade
              artifacts.
            </p>

            <div className="pMedia pMediaOg" style={{ marginTop: 12 }}>
              <Image
                src="/projects/kprovengine/og.png"
                alt="KProvEngine project preview"
                fill
                className="pMediaImg"
                sizes="(max-width: 900px) 100vw, 520px"
              />
            </div>

            <div className="pCtas" style={{ marginTop: 14 }}>
              <Link className="pBtn pBtnPrimary" href="/projects/kprovengine">
                View project
              </Link>
              <a
                className="pBtn"
                href="https://github.com/carcodez1/KProvEngine"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
            </div>
          </article>

          {/* Future slot */}
          <article className="pCard pCardTight">
            <div className="pCardTitle">More coming</div>
            <p className="pMuted">
              Additional case studies will appear here as systems reach a
              publishable, defensible state.
            </p>
          </article>
        </div>
      </section>
    </main>
  );
}