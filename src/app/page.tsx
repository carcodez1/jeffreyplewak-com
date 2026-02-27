// src/app/page.tsx
import Image from "next/image";
import Link from "next/link";
import { ScrollReveal } from "@/components/ScrollReveal";

export default function Page() {
  const CALENDLY_URL = "https://calendly.com/plewak-jeff";

  return (
    <div className="wrap">
      <header className="hero" aria-label="Intro">
        <div className="heroGrid">
          <div className="heroLeft">
            <div className="idRow" style={{ marginBottom: 12 }}>
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
                <p className="muted" style={{ margin: 0, fontSize: "0.95rem" }}>
                  Jeffrey R. Plewak
                </p>

                <h1 className="h1" style={{ marginTop: 4 }}>
                  Compliance-critical engineering and{" "}
                  <span className="h1Accent">provenance-first AI workflows</span>.
                </h1>
              </div>
            </div>

            <p className="sub" style={{ marginBottom: 14 }}>
              Senior software engineer and consultant focused on platform, full-stack, and
              reliability-first delivery—where traceability and determinism matter.
            </p>

            <div className="ctaRow btnGroupTight" aria-label="Primary actions">
              <a
                className="btn btnPrimary"
                href="mailto:plewak.jeff@gmail.com?subject=Project%20inquiry"
              >
                Email
              </a>

              <Link className="btn" href="/projects">
                View projects
              </Link>

              <a
                className="btn btnTertiary"
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                Book a call
              </a>

              <a className="btn btnTertiary" href="#work">
                Featured
              </a>

              <a className="btn btnTertiary" href="#contact">
                Work with me
              </a>
            </div>

            <div className="credStrip" aria-label="Experience across">
              <div className="credLabel">
                <span>Experience across</span>
                <span className="credRule" aria-hidden="true" />
              </div>

              <div className="credLogos">
                <a
                  className="credLogoLink"
                  href="https://www.lockheedmartin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Lockheed Martin"
                >
                  <Image
                    src="/assets/logos/lockheed-martin.svg"
                    alt=""
                    width={110}
                    height={22}
                    className="credLogo"
                  />
                </a>

                <a
                  className="credLogoLink"
                  href="https://www.jpmorganchase.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="JPMorgan Chase"
                >
                  <Image
                    src="/assets/logos/jp-morgan-chase.svg"
                    alt=""
                    width={130}
                    height={22}
                    className="credLogo"
                  />
                </a>

                <a
                  className="credLogoLink"
                  href="https://www.ibm.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="IBM"
                >
                  <Image src="/assets/logos/ibm.svg" alt="" width={60} height={22} className="credLogo" />
                </a>

                <a
                  className="credLogoLink"
                  href="https://aws.amazon.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="AWS"
                >
                  <Image src="/assets/logos/aws.svg" alt="" width={54} height={22} className="credLogo" />
                </a>

                <a
                  className="credLogoLink"
                  href="https://www.expediagroup.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Expedia Group"
                >
                  <Image
                    src="/assets/logos/expedia.svg"
                    alt=""
                    width={92}
                    height={22}
                    className="credLogo"
                  />
                </a>
              </div>
            </div>

            <div className="ctaRow" style={{ marginTop: 12 }}>
              <a
                className="btn btnTertiary"
                href="/downloads/jeffrey-plewak-resume.pdf"
                download
              >
                Résumé
              </a>

              <a
                className="btn btnTertiary"
                href="https://www.linkedin.com/in/jeffreyplewak"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
            </div>
          </div>

          <div className="heroRight" aria-label="Portrait">
            <div className="portraitHalo" aria-hidden="true" />
            <div className="portraitFrame">
              <Image
                src="/assets/images/jeffrey-plewak-portrait.webp"
                alt="Portrait of Jeffrey R. Plewak"
                fill
                priority
                sizes="(max-width: 920px) 100vw, 420px"
                style={{ objectFit: "cover", objectPosition: "50% 30%" }}
              />
            </div>

            <p className="muted" style={{ marginTop: 10, fontSize: "0.95rem" }}>
              Remote-first • North Carolina • Available for consulting and senior roles
            </p>
          </div>
        </div>
      </header>

      <section className="section" id="work" aria-label="Featured work">
        <h2 className="h2">Featured</h2>
        <p className="lede">
          A representative system that shows how I design for auditability and production use.
        </p>

        <div className="grid2">
          <article className="card cardLink" aria-labelledby="kprovengine-title">
            <div className="cardHead">
              <h3 id="kprovengine-title" className="cardTitle">
                KProvEngine
              </h3>
              <p className="cardTag">Python · Deterministic Pipeline · Provenance · Human Review</p>
            </div>

            <p className="cardDesc">
              Deterministic provenance engine for AI-assisted workflows that require explicit human review and reproducible
              evidence artifacts.
            </p>

            <ul className="cardBullets">
              <li>Reproducible run directories (inputs/outputs + hashes)</li>
              <li>Human review captured as a first-class artifact</li>
              <li>Adapters are non-authoritative (no over-claiming)</li>
            </ul>

            <div className="cardMedia" aria-label="KProvEngine architecture diagram">
              <Image
                src="/projects/kprovengine/architecture.png"
                alt="KProvEngine pipeline architecture"
                fill
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
            <h3>What I do</h3>
            <p className="muted">
              I help teams ship systems that are defensible under scrutiny: clear contracts, deterministic builds, traceable
              artifacts, and reliable operations.
            </p>

            <div className="cardActions">
              <a
                className="btn btnPrimary"
                href="mailto:plewak.jeff@gmail.com?subject=Consulting%20inquiry"
              >
                Start a conversation
              </a>

              <a
                className="btn btnTertiary"
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                Book a call
              </a>

              <Link className="btn" href="/projects">
                Browse projects
              </Link>
            </div>
          </article>
        </div>
      </section>

      <section className="section" id="focus" aria-label="Focus">
        <ScrollReveal
          selector=".focusCard"
          visibleClass="focusCard--visible"
          threshold={0.2}
          rootMargin="0px 0px -10% 0px"
          toggle
        />

        <h2 className="h2">Focus</h2>
        <p className="lede">Production systems where correctness and operational clarity matter most.</p>

        <ul className="grid3" role="list">
          <li className="card focusCard">
            <h3>Platform &amp; Backend</h3>
            <p className="muted">
              Python-first services, APIs, and data pipelines with explicit contracts and observability.
            </p>
          </li>

          <li className="card focusCard">
            <h3>Full-Stack Delivery</h3>
            <p className="muted">Pragmatic front-ends paired with resilient backends. No demo abstractions.</p>
          </li>

          <li className="card focusCard">
            <h3>Compliance &amp; Reliability</h3>
            <p className="muted">Deterministic builds, traceable artifacts, and audit-ready workflows.</p>
          </li>
        </ul>
      </section>

      <section className="section" id="contact" aria-label="Work with me">
        <h2 className="h2">Work with me</h2>
        <p className="lede">Open to remote roles, consulting, and short-term contracts.</p>

        <div className="ctaRow">
          <a
            className="btn btnPrimary"
            href="mailto:plewak.jeff@gmail.com?subject=Project%20inquiry"
          >
            Project inquiry
          </a>

          <a
            className="btn btnTertiary"
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            Book a call
          </a>

          <Link className="btn" href="/projects">
            View projects
          </Link>

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
    </div>
  );
}
