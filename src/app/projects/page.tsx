// src/app/page.tsx
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Jeffrey R. Plewak — Senior Software Engineer",
  description:
    "Senior software engineer focused on platform, full-stack, and compliance-critical systems. Provenance-aware AI workflows, determinism, and reliability-first delivery.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    title: "Jeffrey R. Plewak — Senior Software Engineer",
    description:
      "Platform engineering, provenance-aware AI workflows, and compliance-critical delivery with operational clarity.",
    url: "/",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jeffrey R. Plewak — Senior Software Engineer",
    description:
      "Platform engineering, provenance-aware AI workflows, and compliance-critical delivery with operational clarity.",
    images: ["/og-image.png"],
  },
};

const LINKS = {
  resume: "/downloads/jeffrey-plewak-resume.pdf",
  linkedin: "https://www.linkedin.com/in/jeffreyplewak",
  github: "https://github.com/carcodez1",
  email: "mailto:plewak.jeff@gmail.com?subject=Project%20inquiry",
  calendly: "https://calendly.com/plewak-jeff",
} as const;

export default function Page() {
  return (
    <main id="main" className="wrap">
      <header className="hero" aria-label="Intro">
        <div className="heroGrid">
          <div className="heroLeft">
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
                <p className="muted" style={{ margin: 0, fontSize: "0.95rem" }}>
                  Jeffrey R. Plewak
                </p>
                <h1 className="h1" style={{ marginTop: 6 }}>
                  Compliance-critical engineering and{" "}
                  <span className="h1Accent">provenance-first AI workflows</span>.
                </h1>
              </div>
            </div>

            <p className="sub">
              Senior software engineer focused on platform and full-stack delivery where traceability,
              determinism, and operational clarity matter.
            </p>

            {/* CTA hierarchy: engineers/hiring managers first */}
            <div className="ctaRow btnGroupTight" aria-label="Primary actions">
              <a
                className="btn btnPrimary"
                href={LINKS.resume}
                target="_blank"
                rel="noopener noreferrer"
              >
                View résumé
              </a>

              <Link className="btn" href="/projects">
                View projects
              </Link>

              <a className="btn btnTertiary" href={LINKS.email}>
                Contact
              </a>

              {/* Consulting CTA stays present but not dominant */}
              <a
                className="btn btnTertiary"
                href={LINKS.calendly}
                target="_blank"
                rel="noopener noreferrer"
              >
                Book a call
              </a>
            </div>

            {/* Credibility strip (CSS marquee expects the markup below + globals.css blocks) */}
            <div className="credStrip" aria-label="Experience">
              <div className="credLabel">
                <span>Experience across</span>
                <span className="credRule" aria-hidden="true" />
              </div>

              <div className="credMarquee" aria-label="Employer logos">
                <div className="credTrack">
                  {/* set 1 */}
                  <a
                    className="credLogoLink"
                    href="https://www.lockheedmartin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Lockheed Martin"
                  >
                    <Image
                      src="/assets/logos/lockheed-martin.svg"
                      alt="Lockheed Martin"
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
                      alt="JPMorgan Chase"
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
                    <Image
                      src="/assets/logos/ibm.svg"
                      alt="IBM"
                      width={60}
                      height={22}
                      className="credLogo"
                    />
                  </a>

                  <a
                    className="credLogoLink"
                    href="https://aws.amazon.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="AWS"
                  >
                    <Image
                      src="/assets/logos/aws.svg"
                      alt="AWS"
                      width={54}
                      height={22}
                      className="credLogo"
                    />
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
                      alt="Expedia Group"
                      width={92}
                      height={22}
                      className="credLogo"
                    />
                  </a>

                  {/* set 2 (duplicate for seamless loop) */}
                  <a
                    className="credLogoLink"
                    href="https://www.lockheedmartin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Lockheed Martin (repeat)"
                  >
                    <Image
                      src="/assets/logos/lockheed-martin.svg"
                      alt="Lockheed Martin"
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
                    aria-label="JPMorgan Chase (repeat)"
                  >
                    <Image
                      src="/assets/logos/jp-morgan-chase.svg"
                      alt="JPMorgan Chase"
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
                    aria-label="IBM (repeat)"
                  >
                    <Image
                      src="/assets/logos/ibm.svg"
                      alt="IBM"
                      width={60}
                      height={22}
                      className="credLogo"
                    />
                  </a>

                  <a
                    className="credLogoLink"
                    href="https://aws.amazon.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="AWS (repeat)"
                  >
                    <Image
                      src="/assets/logos/aws.svg"
                      alt="AWS"
                      width={54}
                      height={22}
                      className="credLogo"
                    />
                  </a>

                  <a
                    className="credLogoLink"
                    href="https://www.expediagroup.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Expedia Group (repeat)"
                  >
                    <Image
                      src="/assets/logos/expedia.svg"
                      alt="Expedia Group"
                      width={92}
                      height={22}
                      className="credLogo"
                    />
                  </a>
                </div>
              </div>
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

            <p className="muted" style={{ marginTop: 12, fontSize: "0.95rem", maxWidth: 48 * 16 }}>
              Remote-first • North Carolina • Available for senior roles and consulting
            </p>

            {/* Small, non-splashy proof links (keeps engineers engaged, reduces bounce) */}
            <div className="ctaRow" style={{ marginTop: 10 }} aria-label="Profile links">
              <a className="btn btnTertiary" href={LINKS.linkedin} target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
              <a className="btn btnTertiary" href={LINKS.github} target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
            </div>
          </div>
        </div>
      </header>

      <section className="section" id="work" aria-label="Featured work">
        <h2 className="h2">Featured</h2>
        <p className="lede">
          A representative system showing how I design for auditability, production delivery, and explicit human review.
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
              Deterministic provenance engine for AI-assisted workflows requiring explicit human review and reproducible
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
                priority
                className="cardImg cardImgContain"
                sizes="(max-width: 920px) 100vw, (max-width: 1200px) 50vw, 480px"
              />
            </div>

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

          <article className="card" aria-label="What I do">
            <h3>What I do</h3>
            <p className="muted">
              I help teams ship systems that are defensible under scrutiny: clear contracts, deterministic builds,
              traceable artifacts, and reliable operations.
            </p>

            <ul className="cardBullets">
              <li>Platform and backend systems with explicit interfaces</li>
              <li>Audit-ready workflows and evidence artifacts</li>
              <li>Pragmatic full-stack delivery aligned to Core Web Vitals</li>
            </ul>

            <div className="cardActions">
              <a className="btn btnPrimary" href={LINKS.email}>
                Start a conversation
              </a>
              <a className="btn" href={LINKS.calendly} target="_blank" rel="noopener noreferrer">
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
        <h2 className="h2">Focus</h2>
        <p className="lede">Production systems where correctness and operational clarity matter most.</p>

        <ul className="grid3" role="list">
          <li className="card">
            <h3>Platform &amp; Backend</h3>
            <p className="muted">
              Python-first services, APIs, and data pipelines with explicit contracts, observability, and operational
              discipline.
            </p>
          </li>

          <li className="card">
            <h3>Full-Stack Delivery</h3>
            <p className="muted">
              Pragmatic front-ends paired with resilient backends—optimized for usability, performance, and maintainable
              systems.
            </p>
          </li>

          <li className="card">
            <h3>Compliance &amp; Reliability</h3>
            <p className="muted">
              Deterministic builds, traceable artifacts, and audit-ready workflows—designed for review, not marketing.
            </p>
          </li>
        </ul>
      </section>

      <section className="section" id="contact" aria-label="Work with me">
        <h2 className="h2">Work with me</h2>
        <p className="lede">Open to remote senior roles, consulting, and short-term contracts.</p>

        <div className="ctaRow" aria-label="Contact actions">
          <a className="btn btnPrimary" href={LINKS.email}>
            Email
          </a>

          <a className="btn" href={LINKS.calendly} target="_blank" rel="noopener noreferrer">
            Book a call
          </a>

          <a className="btn btnTertiary" href={LINKS.resume} target="_blank" rel="noopener noreferrer">
            View résumé
          </a>

          <a className="btn btnTertiary" href={LINKS.linkedin} target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
        </div>
      </section>
    </main>
  );
}
