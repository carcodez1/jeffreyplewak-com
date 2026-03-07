// src/app/page.tsx
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SITE } from "@/config/site";
import { RESUME } from "@/content/resume";
import { buildResumeStats } from "@/lib/resume";
import { ExperienceTicker } from "@/app/components/ExperienceTicker";
import { DEFAULT_OG_IMAGES, DEFAULT_TWITTER_IMAGES } from "@/lib/metadata/images";

export const metadata: Metadata = {
  title: `${SITE.name} — ${SITE.title}`,
  description:
    "Recruiter-ready, evidence-backed professional identity platform for a senior software engineer focused on platform systems, compliance-aware delivery, and production-grade engineering.",
  keywords: [
    "senior software engineer portfolio",
    "backend platform engineer",
    "production systems engineer",
    "compliance-aware engineering",
    "AI workflow systems",
    "resume",
    "recruiter page",
    "project case studies",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    title: `${SITE.name} — ${SITE.title}`,
    description:
      "Identity and navigation hub for canonical resume content, recruiter review, and proof-linked projects.",
    url: "/",
    images: DEFAULT_OG_IMAGES,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — ${SITE.title}`,
    description:
      "Identity and navigation hub for canonical resume content, recruiter review, and proof-linked projects.",
    images: DEFAULT_TWITTER_IMAGES,
  },
};

const PORTRAIT_SRC = "/assets/images/jeffrey-plewak-portrait.webp";
export default function HomePage() {
  const roles = [...RESUME.roles].sort((a, b) => b.start.localeCompare(a.start));
  const stats = buildResumeStats(roles);

  return (
    <div className="wrap homePage">
      <header className="section heroHome" aria-label="Introduction">
        <div className="homeHeroGrid">
          <div className="homeHeroLeft homeHeroShell">
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
              I build <span className="homeInlineEm">reliable platform and backend systems</span> for regulated environments.
            </p>
            <nav className="ctaRow homePrimaryActions" aria-label="Primary actions">
              <Link className="btn btnPrimary" href="/resume">
                Resume
              </Link>
              <Link className="btn btnTertiary" href="/r">
                For Recruiters
              </Link>
            </nav>
          </div>

          <div className="homeHeroRight" aria-label="Portrait">
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
          </div>
        </div>
      </header>

      <section className="section homeBrandStrip" aria-label="Career snapshot and brand logos">
        <div className="homeStatsStrip" role="list">
          <p className="homeStatItem" role="listitem"><strong>{stats.years}+ years</strong> experience</p>
          <p className="homeStatItem" role="listitem"><strong>{stats.rolesCount} roles</strong> delivered</p>
          <p className="homeStatItem" role="listitem"><strong>{stats.uniqueEmployersCount} employers</strong> across finance, defense, and cloud</p>
        </div>
        <ExperienceTicker interactive={false} className="homeBrandTicker" />
      </section>
    </div>
  );
}
