// src/app/projects/page.tsx
import type { Metadata } from "next";
import Link from "next/link";

import { ExperienceStrip } from "@/components/ExperienceStrip";
import { LINKS } from "@/config/site";

export const metadata: Metadata = {
  title: "Projects",
  description: "Selected projects and proof of work.",
  alternates: { canonical: "/projects" },
  openGraph: {
    type: "website",
    title: "Projects — Jeffrey R. Plewak",
    description: "Selected projects and proof of work.",
    url: "/projects",
  },
};

export default function ProjectsPage() {
  return (
    <main id="main" className="wrap">
      <header className="section" aria-label="Projects intro">
        <h1 className="h1">Projects</h1>
        <p className="lede">A few things I’ve built and maintained.</p>

        <div className="ctaRow btnGroupTight" aria-label="Projects actions">
          <a className="btn btnPrimary" href={LINKS.resumePdf} target="_blank" rel="noopener noreferrer">
            View résumé
          </a>
          <a className="btn" href={LINKS.emailProject}>
            Contact
          </a>
          <a className="btn btnTertiary" href={LINKS.calendly} target="_blank" rel="noopener noreferrer">
            Book a call
          </a>
          <Link className="btn btnTertiary" href="/">
            Home
          </Link>
        </div>

        {/* Replaces duplicated credStrip markup */}
        <ExperienceStrip />
      </header>

      <section className="section" aria-label="Project list">
        <div className="grid2">
          <article className="card cardLink" aria-label="KProvEngine">
            <div className="cardHead">
              <h2 className="cardTitle">KProvEngine</h2>
              <p className="cardTag">Python · repeatable runs · reviewable outputs</p>
            </div>

            <p className="cardDesc">
              Local-first tooling to record what happened in a run: inputs, outputs, hashes, and a human review step.
            </p>

            <ul className="cardBullets">
              <li>Run folders you can diff</li>
              <li>Explicit review captured as an artifact</li>
              <li>Optional adapters; never treated as truth</li>
            </ul>

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

          <article className="card" aria-label="What you get working with me">
            <h2 className="cardTitle">What you get</h2>
            <p className="muted">
              Clear scope, clean interfaces, and changes that are easy to ship and easy to roll back.
            </p>

            <ul className="cardBullets">
              <li>Readable boundaries (services, modules, contracts)</li>
              <li>Repeatable builds and predictable deploys</li>
              <li>Operational basics: logging, metrics, failure modes</li>
            </ul>

            <div className="cardActions">
              <a className="btn btnPrimary" href={LINKS.emailProject}>
                Email me
              </a>
              <a className="btn btnTertiary" href={LINKS.calendly} target="_blank" rel="noopener noreferrer">
                Book a call
              </a>
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}
