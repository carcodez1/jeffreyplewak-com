// src/app/page.tsx
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ExperienceTicker } from "@/app/components/ExperienceTicker";
import { LINKS, SITE } from "@/config/site";

export const metadata: Metadata = {
  title: `${SITE.name} — ${SITE.title}`,
  description:
    "Jeffrey R. Plewak. Senior software engineer specializing in backend systems, platform architecture, and compliance-critical production environments. 10+ years across defense, finance, and cloud.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    title: `${SITE.name} — ${SITE.title}`,
    description:
      "Senior software engineer — backend systems, platform architecture, production reliability.",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — ${SITE.title}`,
    description:
      "Senior software engineer — backend systems, platform architecture, production reliability.",
  },
};

const PORTRAIT_SRC = "/assets/images/jeffrey-plewak-portrait.webp";
const HOME_PREVIEWS = [
  {
    href: "/projects/kprovengine",
    src: "/projects/kprovengine/architecture.png",
    title: "KProvEngine architecture",
    blurb: "Deterministic pipeline and evidence flow.",
    alt: "KProvEngine pipeline and evidence architecture diagram",
  },
  {
    href: "/resume",
    src: "/og-image.png",
    title: "Resume + proof surface",
    blurb: "Resume, downloadable artifacts, and recruiter evidence links.",
    alt: "Jeffrey R. Plewak site preview image",
  },
] as const;

export default function HomePage() {
  return (
    <div className="wrap">

      {/* ── Experience ticker — above the fold, sets authority immediately ── */}
      <section className="homeTickerBand" aria-label="Experience strip">
        <header className="homeTickerHead">
          <h2 className="homeTickerTitle">Experience across</h2>
          <p className="homeTickerHint">Hover to pause · click to jump to resume</p>
        </header>
        <ExperienceTicker />
      </section>

      {/* ── Hero ── */}
      <header className="section heroHome" aria-label="Introduction">
        <div className="homeHeroGrid">

          {/* Left column — identity + copy + CTAs */}
          <div className="homeHeroLeft">
            <div className="homeIdRow">
              <div className="homeAvatar" aria-hidden="true">
                <Image
                  src={PORTRAIT_SRC}
                  alt=""
                  width={80}
                  height={80}
                  className="homeAvatarImg"
                />
              </div>

              <div className="homeIdText">
                <h1 className="h1">{SITE.name}</h1>
                <p className="lede homeRole">{SITE.title}</p>
              </div>
            </div>

            <p className="lede homeLede">
              I build backend services and internal platforms. I care about
              predictable behavior in production and code that is easy for other
              engineers to pick up.
            </p>

            <nav className="ctaRow" aria-label="Primary actions">
              <Link className="btn btnPrimary" href="/resume">
                Resume
              </Link>
              <Link className="btn" href="/projects">
                Projects
              </Link>
              <a className="btn btnTertiary" href={LINKS.emailProject}>
                Email
              </a>
            </nav>
          </div>

          {/* Right column — portrait */}
          <aside className="homeHeroRight" aria-label="Portrait">
            <div className="homePortraitFrame">
              <Image
                src={PORTRAIT_SRC}
                alt="Jeffrey R. Plewak"
                fill
                sizes="(max-width: 980px) 100vw, 400px"
                className="homePortraitImg"
                priority
              />
            </div>
          </aside>
        </div>
      </header>

      <section className="homePreviewBand" aria-label="Quick previews">
        <h2 className="homePreviewTitle">Quick previews</h2>
        <div className="homePreviewGrid">
          {HOME_PREVIEWS.map((item) => (
            <Link key={item.title} href={item.href} className="card depthFx focusCard homePreviewCard">
              <div className="homePreviewMedia">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 980px) 100vw, (max-width: 1200px) 50vw, 420px"
                  className="homePreviewImg"
                />
              </div>
              <h3 className="cardTitle">{item.title}</h3>
              <p className="cardDesc">{item.blurb}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Work ── */}
      <section id="work" className="section" aria-label="Work">
        <h2 className="h2">Work</h2>

        <div className="grid2">
          <article className="card focusCard depthFx">
            <h3 className="cardTitle">Backend systems</h3>
            <p className="cardDesc">
              APIs, services, and data pipelines with clear boundaries.
              Predictable behavior in production. Clean interfaces for other
              teams to build on.
            </p>
          </article>

          <article className="card focusCard depthFx">
            <h3 className="cardTitle">Platform and infrastructure</h3>
            <p className="cardDesc">
              Build pipelines, runtime configuration, and deployment workflows.
              Reducing operational friction and keeping systems straightforward
              to reason about.
            </p>
          </article>

          <article className="card focusCard depthFx">
            <h3 className="cardTitle">Compliance-critical environments</h3>
            <p className="cardDesc">
              10+ years in defense, finance, and cloud platforms where
              traceability, audit-readiness, and correctness are non-negotiable
              requirements.
            </p>
          </article>

          <article className="card focusCard depthFx">
            <h3 className="cardTitle">AI workflow engineering</h3>
            <p className="cardDesc">
              Deterministic, human-reviewed AI pipelines with explicit
              provenance. Production-first — not experimental tooling dressed
              up as infrastructure.
            </p>
          </article>
        </div>
      </section>

      {/* ── Contact ── */}
      <section id="contact" className="section" aria-label="Contact">
        <h2 className="h2">Contact</h2>
        <p className="lede">
          Email is best. If you prefer to talk first, you can book a short call.
        </p>

        <nav className="ctaRow" aria-label="Contact actions">
          <a className="btn btnPrimary" href={LINKS.emailProject}>
            Email
          </a>
          <a
            className="btn"
            href={LINKS.calendly}
            target="_blank"
            rel="noopener noreferrer"
          >
            Book a call
          </a>
          <a
            className="btn btnTertiary"
            href={LINKS.linkedin}
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
        </nav>
      </section>
    </div>
  );
}
