// src/app/projects/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { LINKS } from "@/config/site";

export const metadata: Metadata = {
  title: "Projects — Jeffrey R. Plewak",
  description: "Selected projects and engineering work.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  const previews = [
    {
      href: "/projects/kprovengine",
      src: "/projects/kprovengine/architecture.png",
      alt: "KProvEngine architecture preview",
      title: "KProvEngine architecture",
      blurb: "Deterministic run stages + audit artifacts.",
    },
    {
      href: "/projects/kprovengine",
      src: "/projects/kprovengine/og.png",
      alt: "KProvEngine project preview",
      title: "KProvEngine overview",
      blurb: "Governance-first AI workflow engineering.",
    },
  ] as const;

  return (
    <div className="wrap">
      <header className="section" aria-label="Projects intro">
        <h1 className="h1">Projects</h1>

        <p className="lede">A focused set of projects with architecture notes and source.</p>

        <div className="ctaRow">
          <Link className="btn btnPrimary" href="/projects/kprovengine">
            KProvEngine
          </Link>
          <a className="btn" href={LINKS.github} target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <Link className="btn" href="/resume">
            Resume
          </Link>
          <a className="btn btnTertiary" href={LINKS.emailProject}>
            Email
          </a>
        </div>
      </header>

      <section className="section" aria-label="Project previews">
        <h2 className="h2">Preview</h2>
        <div className="projectsPreviewGrid">
          {previews.map((item) => (
            <Link key={item.title} href={item.href} className="card depthFx focusCard projectsPreviewCard">
              <div className="projectsPreviewMedia">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 980px) 100vw, (max-width: 1200px) 50vw, 360px"
                  className="projectsPreviewImg"
                />
              </div>
              <h3 className="cardTitle">{item.title}</h3>
              <p className="cardDesc">{item.blurb}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
