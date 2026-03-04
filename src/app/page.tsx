import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ExperienceTicker } from "@/app/components/ExperienceTicker";
import { LINKS, SITE } from "@/config/site";

export const metadata: Metadata = {
  title: `${SITE.name} — ${SITE.title}`,
  description:
    "Jeffrey R. Plewak. Senior software engineer focused on backend systems, platform architecture, and production reliability.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    title: `${SITE.name} — ${SITE.title}`,
    description: "Senior software engineer working on backend systems and platform architecture.",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — ${SITE.title}`,
    description: "Senior software engineer working on backend systems and platform architecture.",
  },
};

const PORTRAIT_SRC = "/assets/images/jeffrey-plewak-portrait.webp";

export default function HomePage() {
  return (
    <div className="wrap">
      <section className="homeTickerBand" aria-label="Experience strip">
        <header className="homeTickerHead">
          <h2 className="homeTickerTitle">Experience across</h2>
          <p className="homeTickerHint">Logos only. Hover to pause. Click to jump into the resume.</p>
        </header>
        <ExperienceTicker />
      </section>

      <header className="section heroHome" aria-label="Home intro">
        <div className="homeHeroGrid">
          <div className="homeHeroLeft">
            <div className="homeIdRow">
              <div className="homeAvatar" aria-hidden="true">
                <Image src={PORTRAIT_SRC} alt="" width={84} height={84} className="homeAvatarImg" priority />
              </div>

              <div className="homeIdText">
                <h1 className="h1">{SITE.name}</h1>
                <p className="lede homeRole">{SITE.title}</p>
              </div>
            </div>

            <p className="lede homeLede">
              I build backend services and internal platforms. I care about predictable behavior in production and code
              that is easy for other engineers to pick up.
            </p>

            <div className="ctaRow" aria-label="Primary actions">
              <Link className="btn btnPrimary" href="/resume">
                Resume
              </Link>
              <Link className="btn" href="/projects">
                Projects
              </Link>
              <a className="btn btnTertiary" href={LINKS.emailProject}>
                Email
              </a>
            </div>
          </div>

          <aside className="homeHeroRight" aria-label="Portrait">
            <div className="homePortraitFrame">
              <Image
                src={PORTRAIT_SRC}
                alt="Jeffrey R. Plewak"
                fill
                sizes="(max-width: 980px) 100vw, 420px"
                className="homePortraitImg"
                priority
              />
            </div>
          </aside>
        </div>
      </header>

      <section id="work" className="section" aria-label="Work">
        <h2 className="h2">Work</h2>

        <div className="grid2">
          <article className="card">
            <h3 className="cardTitle">Backend systems</h3>
            <p className="cardDesc">
              APIs, services, and data pipelines. Clear boundaries. Predictable behavior in production. Clean interfaces
              for other teams.
            </p>
          </article>

          <article className="card">
            <h3 className="cardTitle">Platform and infrastructure</h3>
            <p className="cardDesc">
              Build pipelines, runtime configuration, and deployment workflows. I focus on reducing operational friction
              and keeping systems straightforward to reason about.
            </p>
          </article>
        </div>
      </section>

      <section id="contact" className="section" aria-label="Contact">
        <h2 className="h2">Contact</h2>
        <p className="lede">Email is best. If you prefer to talk first, you can book a short call.</p>

        <div className="ctaRow" aria-label="Contact actions">
          <a className="btn btnPrimary" href={LINKS.emailProject}>
            Email
          </a>
          <a className="btn" href={LINKS.calendly} target="_blank" rel="noopener noreferrer">
            Book a call
          </a>
          <a className="btn btnTertiary" href={LINKS.linkedin} target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
        </div>
      </section>
    </div>
  );
}
