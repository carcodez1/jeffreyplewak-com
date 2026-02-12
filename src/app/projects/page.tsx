import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import "./projects.css";

export const metadata: Metadata = {
  title: "Projects",
  description: "Selected engineering projects demonstrating platform design, determinism, and audit-ready systems.",
  alternates: { canonical: "/projects" }
};

export default function ProjectsPage() {
  return (
    <main className="pWrap" id="main">
      <header className="pHero">
        <div className="pCrumb">
          <Link href="/" className="pBack">
            ← Home
          </Link>
        </div>

        <h1 className="pH1">Projects</h1>
        <p className="pLede">
          Representative systems that reflect how I design, scope, and ship production software.
        </p>
      </header>

      <section className="pSection" aria-label="Project list">
        <div className="pGrid2">
          <article className="pCard" aria-labelledby="proj-kprovengine">
            <div className="pCardHead">
              <div id="proj-kprovengine" className="pCardTitle">
                KProvEngine
              </div>
              <div className="pCardHint">Deterministic · Governance-first · Human review</div>
            </div>

            <p className="pMuted">
              Local-only provenance engine for AI-assisted workflows with deterministic execution, explicit human review,
              and audit-grade artifacts.
            </p>

            <div className="pMedia pMedia169" aria-label="KProvEngine architecture diagram">
              <Image
                src="/projects/kprovengine/architecture.png"
                alt="KProvEngine pipeline architecture"
                fill
                priority
                className="pMediaImg"
                sizes="(max-width: 980px) 100vw, 420px"
              />
            </div>

            <div className="pCtas" style={{ marginTop: 14 }} aria-label="KProvEngine actions">
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

          <article className="pCard pCardTight" aria-label="More projects">
            <div className="pCardTitle">More coming</div>
            <p className="pMuted">
              Additional case studies will appear here as systems reach a publishable, defensible state.
            </p>
          </article>
        </div>
      </section>
    </main>
  );
}