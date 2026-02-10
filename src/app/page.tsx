// src/app/page.tsx
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Jeffrey R. Plewak — Senior Software Engineer",
  description:
    "Senior software engineer focused on platform, full-stack, and compliance-critical systems. Python, cloud, and reliability-first delivery.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Jeffrey R. Plewak — Senior Software Engineer",
    description:
      "Platform, full-stack, and compliance-critical systems. Reliability-first engineering.",
    url: "/",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jeffrey R. Plewak — Senior Software Engineer",
    description:
      "Platform, full-stack, and compliance-critical systems. Reliability-first engineering.",
  },
};

export default function Page() {
  return (
    <main className="wrap">
      <header className="hero">
        <div className="idRow">
          <div className="avatar" aria-label="Jeffrey R. Plewak">
            <Image
              src="/assets/images/avatar.jpeg"
              alt="Jeffrey R. Plewak"
              width={56}
              height={56}
              className="avatarImg"
              priority
            />
          </div>

          <div>
            <h1 className="h1" style={{ margin: 0 }}>
              Jeffrey R. Plewak
            </h1>
            <p className="sub" style={{ margin: "6px 0 0" }}>
              Senior Software Engineer — platform, full-stack, and compliance-critical systems.
            </p>
          </div>
        </div>

        <div className="ctaRow">
          <a className="btn btnPrimary" href="/downloads/jeffrey-plewak-resume.pdf" download>
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
        </div>
      </header>

      <section className="section">
        <h2 className="h2">Focus</h2>
        <p className="lede">
          I build production systems where correctness, traceability, and operational clarity
          are non-negotiable.
        </p>

        <div className="grid3">
          <div className="card">
            <h3>Platform & Backend</h3>
            <p className="muted">
              Python-first services, APIs, and data pipelines with clear contracts and observability.
            </p>
          </div>

          <div className="card">
            <h3>Full-Stack Delivery</h3>
            <p className="muted">
              Pragmatic front-ends paired with robust backends. No demo-ware.
            </p>
          </div>

          <div className="card">
            <h3>Compliance & Reliability</h3>
            <p className="muted">
              Deterministic builds, traceable artifacts, and audit-ready workflows.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <h2 className="h2">Selected Work</h2>
        <p className="lede">
          Representative systems that reflect how I design and ship software.
        </p>

        <div className="grid2">
          <article className="card cardLink">
            <div className="cardHead">
              <h3 className="cardTitle">KProvEngine</h3>
              <p className="cardTag">Governance-first · Deterministic · Reviewable</p>
            </div>

            <p className="cardDesc">
              Local-only provenance engine for AI-assisted workflows. Deterministic
              pipeline stages, explicit human review, and reproducible run artifacts.
            </p>

            <div className="cardMedia">
              <Image
                src="/projects/kprovengine/og.png"
                alt="KProvEngine project preview"
                width={1200}
                height={630}
                className="cardImg"
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
            </div>
          </article>

          <article className="card">
            <h3>Additional work</h3>
            <p className="muted">More systems and case studies available on request.</p>
          </article>
        </div>
      </section>

      <footer className="footer">
        <p className="muted">© {new Date().getFullYear()} Jeffrey R. Plewak</p>
      </footer>
    </main>
  );
}