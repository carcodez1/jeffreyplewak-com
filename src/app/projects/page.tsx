// src/app/projects/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { SITE } from "@/config/site";
import { DEFAULT_OG_IMAGES, DEFAULT_TWITTER_IMAGES } from "@/lib/metadata/images";

export const metadata: Metadata = {
  title: `Projects — ${SITE.name}`,
  description: "Selected projects and proof-linked engineering work.",
  keywords: [
    "software engineering projects",
    "proof-linked case studies",
    "KProvEngine",
    "deterministic AI workflows",
    "engineering architecture decisions",
  ],
  alternates: { canonical: "/projects" },
  openGraph: {
    type: "website",
    title: `Projects — ${SITE.name}`,
    description: "Selected projects and proof-linked engineering work.",
    url: "/projects",
    images: DEFAULT_OG_IMAGES,
  },
  twitter: {
    card: "summary_large_image",
    title: `Projects — ${SITE.name}`,
    description: "Selected projects and proof-linked engineering work.",
    images: DEFAULT_TWITTER_IMAGES,
  },
};

export default function ProjectsPage() {
  const systemsFocus = [
    "Backend + platform delivery",
    "AI workflow proof with deterministic execution",
    "Evidence you can review quickly",
  ] as const;

  const previews = [
    {
      href: "/projects/kprovengine",
      src: "/projects/kprovengine/architecture.webp",
      alt: "KProvEngine architecture preview",
      title: "KProvEngine",
      blurb: "Deterministic run stages, explicit human review, and audit-grade artifacts.",
    },
  ] as const;

  return (
    <div className="wrap">
      <header className="section" aria-label="Projects intro">
        <h1 className="h1">Projects</h1>

        <p className="lede">Proof-first project pages for fast technical review.</p>
        <p className="cardDesc">Open KProvEngine for architecture, decisions, and source links.</p>

        <ul className="projectsSignals" aria-label="Project focus areas">
          {systemsFocus.map((signal) => (
            <li key={signal} className="projectsSignal">
              {signal}
            </li>
          ))}
        </ul>

        <nav className="routeRailList" aria-label="Projects route choices">
          <Link className="routeRailLink routeRailLinkPrimary" href="/projects/kprovengine">
            <span className="routeRailIndex" aria-hidden="true">01</span>
            <span className="routeRailText">Open KProvEngine</span>
            <span className="routeRailHint">Flagship proof case study</span>
          </Link>
          <Link className="routeRailLink" href="/resume">
            <span className="routeRailIndex" aria-hidden="true">02</span>
            <span className="routeRailText">Open Resume</span>
            <span className="routeRailHint">Role history and delivery context</span>
          </Link>
        </nav>
      </header>

      <section className="section" aria-label="Project previews">
        <h2 className="h2">Flagship proof</h2>
        <div className="projectsPreviewGrid">
          {previews.map((item) => (
            <Link key={item.title} href={item.href} className="card depthFx projectsPreviewCard">
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
