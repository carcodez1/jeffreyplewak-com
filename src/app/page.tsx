// src/app/projects/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { ExperienceStrip } from "@/components/ExperienceStrip";
import { LINKS } from "@/config/site";
import { SITE } from "@/config/site";

export const metadata: Metadata = {
  title: "Projects — Jeffrey R. Plewak",
  description: "Selected work and project write-ups.",
  alternates: { canonical: "/projects" },
  openGraph: {
    type: "website",
    title: "Projects — Jeffrey R. Plewak",
    description: "Selected work and project write-ups.",
    url: "/projects",
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects — Jeffrey R. Plewak",
    description: "Selected work and project write-ups.",
  },
};

export default function ProjectsPage() {
  return (
    <main id="main" className="wrap">
      <header className="section" aria-label="Projects intro">
        <h1 className="h1">Projects</h1>
        <p className="lede">
          A short list. Each project has a page with details, links, and artifacts.
        </p>

        <div className="ctaRow" aria-label="Projects actions">
          <Link className="btn btnPrimary" href="/projects/kprovengine">
            KProvEngine
          </Link>
          <a className="btn" href={LINKS.resumePdf} target="_blank" rel="noopener noreferrer">
            Résumé (PDF)
          </a>
          <a className="btn btnTertiary" href={LINKS.emailProject}>
            Email
          </a>
        </div>

        {/* Reusable experience strip (replaces duplicated credStrip markup) */}
        <ExperienceStrip />
      </header>

      <section className="section" aria-label="Project list">
        <div className="grid2">
          <article className="card cardLink" aria-label="KProvEngine project">
            <h2 className="cardTitle">KProvEngine</h2>
            <p className="cardDesc">
              Deterministic provenance pipelines for human-reviewed workflows with local-first execution.
            </p>
            <div className="cardActions">
              <Link className="btn btnPrimary" href="/projects/kprovengine">
                Project page
              </Link>
              <a className="btn" href="https://github.com/carcodez1/KProvEngine" target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
              <a
                className="btn"
                href="https://github.com/carcodez1/KProvEngine/blob/main/docs/architecture.md"
                target="_blank"
                rel="noopener noreferrer"
              >
                Architecture
              </a>
            </div>
          </article>

          <article className="card" aria-label="More projects">
            <h2 className="cardTitle">More</h2>
            <p className="cardDesc">
              I’m iterating on this page. If you want a specific repo or case study added, email me.
            </p>
            <div className="cardActions">
              <a className="btn btnPrimary" href={LINKS.emailProject}>
                Email
              </a>
              <a className="btn btnTertiary" href={LINKS.linkedin} target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
              <a className="btn btnTertiary" href={LINKS.github} target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}
