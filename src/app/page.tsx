import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Jeffrey R. Plewak — Senior Software Engineer",
  description:
    "Senior software engineer focused on platform, full-stack, and compliance-critical systems. Python backend, cloud automation, and reliability-first delivery.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    title: "Jeffrey R. Plewak — Senior Software Engineer",
    description:
      "Platform, full-stack, and compliance-critical systems. Reliability-first engineering.",
    url: "/",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jeffrey R. Plewak — Senior Software Engineer",
    description:
      "Platform, full-stack, and compliance-critical systems. Reliability-first engineering.",
    images: ["/og-image.png"],
  },
};

export default function Page() {
  return (
    <main id="main" className="wrap">
      <header className="hero">
        <div className="idRow">
          <div className="avatar">
            <Image
              src="/assets/images/avatar.jpeg"
              alt="Jeffrey R. Plewak"
              width={56}
              height={56}
              className="avatarImg"
              priority
            />
          </div>

          <div className="idText">
            <h1 className="h1">Jeffrey R. Plewak</h1>
            <p className="sub">
              Senior Software Engineer — platform, full-stack, and
              compliance-critical systems.
            </p>
            <p className="muted">
              I design provenance-aware AI workflows and production-grade web
              systems where traceability, determinism, and operational clarity
              matter.
            </p>
          </div>
        </div>

        <div className="ctaRow" aria-label="Primary actions">
          <a
            className="btn btnPrimary"
            href="/downloads/jeffrey-plewak-resume.pdf"
            download
          >
            Résumé
          </a>

          <a
            className="btn"
            href="https://www.linkedin.com/in/jeffreyplewak"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>

          <a className="btn" href="mailto:plewak.jeff@gmail.com">
            Email
          </a>

          <Link className="btn" href="/projects">
            Projects
          </Link>
        </div>
      </header>

      <section className="section" id="focus" aria-label="Focus">
        <h2 className="h2">Focus</h2>
        <p className="lede">
          Production systems where correctness and operational clarity matter
          most.
        </p>

        <ul className="grid3" role="list">
          <li className="card">
            <h3>Platform &amp; Backend</h3>
            <p className="muted">
              Python-first services, APIs, and data pipelines with explicit
              contracts and observability.
            </p>
          </li>

          <li className="card">
            <h3>Full-Stack Delivery</h3>
            <p className="muted">
              Pragmatic front-ends paired with resilient backends. No demo
              abstractions.
            </p>
          </li>

          <li className="card">
            <h3>Compliance &amp; Reliability</h3>
            <p className="muted">
              Deterministic builds, traceable artifacts, and audit-ready
              workflows.
            </p>
          </li>
        </ul>
      </section>

      <section className="section" id="work" aria-label="Selected work">
        <h2 className="h2">Selected Work</h2>
        <p className="lede">
          Systems that reflect how I design, scope, and ship production
          software.
        </p>

        <div className="grid2">
          <article
            className="card cardLink"
            aria-labelledby="kprovengine-title"
          >
            <div className="cardHead">
              <h3 id="kprovengine-title" className="cardTitle">
                KProvEngine
              </h3>
              <p className="cardTag">
                Python · Deterministic Pipeline · Provenance · Human Review
              </p>
            </div>

            <p className="cardDesc">
              Deterministic provenance engine for AI-assisted workflows that
              require explicit human review and reproducible evidence artifacts.
            </p>

            <ul className="cardBullets">
              <li>Reproducible run directories (inputs/outputs + hashes)</li>
              <li>Human review captured as a first-class artifact</li>
              <li>Adapters are non-authoritative (no over-claiming)</li>
            </ul>

            <div
              className="cardMedia"
              aria-label="KProvEngine architecture diagram"
            >
              <Image
                src="/projects/kprovengine/architecture.png"
                alt="KProvEngine pipeline architecture"
                fill
                priority
                className="cardImg cardImgContain"
                sizes="(max-width: 920px) 100vw, (max-width: 1200px) 50vw, 480px"
              />
            </div>

            <div className="cardActions">
              <Link className="btn btnPrimary" href="/projects/kprovengine">
                Project page
              </Link>

              <a
                className="btn"
                href="https://github.com/carcodez1/KProvEngine"
                target="_blank"
                rel="noopener noreferrer"
              >
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

          <article className="card">
            <h3>More work available</h3>
            <p className="muted">
              Additional case studies are shared when systems reach a
              publishable, defensible state.{" "}
              <a
                className="inlineLink"
                href="mailto:plewak.jeff@gmail.com?subject=Work%20inquiry"
              >
                Ask for details
              </a>
              .
            </p>
          </article>
        </div>
      </section>

      <section className="section" id="contact" aria-label="Work with me">
        <h2 className="h2">Work with me</h2>
        <p className="lede">
          Open to remote roles, consulting, and short-term contracts.
        </p>

        <ul className="grid3" role="list">
          <li className="card">
            <h3>AI &amp; Provenance</h3>
            <p className="muted">
              Local-first, audit-ready AI workflows with explicit human review
              and evidence artifacts.
            </p>
          </li>

          <li className="card">
            <h3>Platform &amp; Backend</h3>
            <p className="muted">
              Python/TypeScript services, APIs, and pipelines with clear
              contracts and reliability-first practices.
            </p>
          </li>

          <li className="card">
            <h3>SEO-Conscious Web Systems</h3>
            <p className="muted">
              Next.js systems built for Core Web Vitals, structured data, and
              clean information architecture.
            </p>
          </li>
        </ul>

        <div className="ctaRow">
          <a
            className="btn btnPrimary"
            href="mailto:plewak.jeff@gmail.com?subject=Project%20inquiry"
          >
            Project inquiry
          </a>

          <a
            className="btn"
            href="https://www.linkedin.com/in/jeffreyplewak"
            target="_blank"
            rel="noopener noreferrer"
          >
            Connect on LinkedIn
          </a>
        </div>
      </section>
    </main>
  );
}