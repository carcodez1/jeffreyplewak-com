import type { Metadata } from "next";
import { existsSync } from "node:fs";
import { join } from "node:path";
import Link from "next/link";
import { SITE } from "@/config/site";
import { RESUME } from "@/content/resume";
import { buildResumeStats, buildResumeWorkTypeStats, getRecruiterPackLinks } from "@/lib/resume";
import { DEFAULT_OG_IMAGES, DEFAULT_TWITTER_IMAGES } from "@/lib/metadata/images";

const KPROVENGINE_LINKS = {
  proof: "/projects/kprovengine",
} as const;

function hasPublicFile(href: string) {
  return existsSync(join(process.cwd(), "public", href.replace(/^\//, "")));
}

export const metadata: Metadata = {
  title: `Recruiter Decision Page — ${SITE.name}`,
  description:
    "Recruiter page with resume, recruiter-pack downloads, and a focused KProvEngine case study.",
  keywords: [
    "recruiter decision page",
    "candidate summary",
    "ATS copy paste resume",
    "recruiter pack",
    "software engineer fit",
    "technical proof",
  ],
  alternates: { canonical: "/r" },
  openGraph: {
    type: "website",
    title: `Recruiter Decision Page — ${SITE.name}`,
    description:
      "Start here for resume, recruiter-pack downloads, and the KProvEngine case study.",
    url: "/r",
    images: DEFAULT_OG_IMAGES,
  },
  twitter: {
    card: "summary_large_image",
    title: `Recruiter Decision Page — ${SITE.name}`,
    description:
      "Start here for resume, recruiter-pack downloads, and the KProvEngine case study.",
    images: DEFAULT_TWITTER_IMAGES,
  },
};

export default function RecruiterPage() {
  const roles = [...RESUME.roles].sort((a, b) => b.start.localeCompare(a.start));
  const stats = buildResumeStats(roles);
  const workTypeStats = buildResumeWorkTypeStats(roles);
  const recruiterPackLinks = getRecruiterPackLinks(hasPublicFile);
  const recruiterPackPrimaryLink =
    recruiterPackLinks.find((item) => item.href.endsWith("/index.html")) ??
    recruiterPackLinks.find((item) => item.href.endsWith("/resume.pdf")) ??
    recruiterPackLinks[0] ??
    null;
  const recruiterSummary =
    "Senior software engineer with 10+ years delivering backend and platform software in regulated, high-reliability environments.";

  return (
    <div className="wrap recruiterPage">
      <header className="section recruiterHero" aria-label="Recruiter overview">
        <div className="recruiterHeroPanel card">
          <p className="recruiterEyebrow">For recruiters</p>
          <h1 className="h1 recruiterHeroTitle">Start here for a quick, honest review.</h1>
          <p className="lede recruiterHeroLede">
            Open Resume first. If you need utility files, open Recruiter Pack. For technical depth, open KProvEngine.
          </p>
          <p className="cardDesc recruiterHeroSummary">{recruiterSummary}</p>

          <nav className="ctaRow recruiterHeroActions" aria-label="Recruiter actions">
            <Link className="btn btnPrimary recruiterHeroPrimary" href="/resume">
              Open Resume
            </Link>
            {recruiterPackPrimaryLink ? (
              <a
                className="btn btnSecondaryStrong"
                href={recruiterPackPrimaryLink.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                Open Recruiter Pack
              </a>
            ) : null}
            <Link className="btn btnTertiary" href={KPROVENGINE_LINKS.proof}>
              Open KProvEngine
            </Link>
          </nav>
          <p className="recruiterFlowHint">
            Flow: Resume first, Recruiter pack for copy-paste/downloads, KProvEngine for proof depth.
          </p>
        </div>
      </header>

      <section className="section recruiterStatStripSection" aria-label="Fast recruiter facts">
        <h2 className="resumeSectionHead">Quick profile</h2>
        <p className="cardDesc recruiterQuickProfile">{recruiterSummary}</p>
        <h2 className="resumeSectionHead">Fast recruiter facts</h2>
        <div className="recruiterStatStrip" role="list">
          <p className="recruiterStatItem" role="listitem"><strong>{stats.years}+ years</strong> in production engineering</p>
          <p className="recruiterStatItem" role="listitem"><strong>{stats.rolesCount} roles</strong> at <strong>{stats.uniqueEmployersCount}</strong> employers</p>
          <p className="recruiterStatItem" role="listitem"><strong>{workTypeStats.FTE} FTE</strong> · <strong>{workTypeStats.Consulting} consulting</strong> · <strong>{workTypeStats.Owner} independent</strong></p>
        </div>
      </section>

      <section className="section" aria-label="Choose your next step">
        <h2 className="resumeSectionHead">Next actions</h2>
        <nav className="routeRailList recruiterRouteList" aria-label="Recruiter next actions">
          <Link className="routeRailLink routeRailLinkPrimary" href="/resume">
            <span className="routeRailIndex" aria-hidden="true">01</span>
            <span className="routeRailText">Open Resume</span>
            <span className="routeRailHint">Full timeline and role details</span>
          </Link>
          {recruiterPackPrimaryLink ? (
            <a
              className="routeRailLink"
              href={recruiterPackPrimaryLink.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="routeRailIndex" aria-hidden="true">02</span>
              <span className="routeRailText">Open Recruiter Pack</span>
              <span className="routeRailHint">Copy-paste resume and download files</span>
            </a>
          ) : null}
          <Link className="routeRailLink" href={KPROVENGINE_LINKS.proof}>
            <span className="routeRailIndex" aria-hidden="true">{recruiterPackPrimaryLink ? "03" : "02"}</span>
            <span className="routeRailText">Open KProvEngine</span>
            <span className="routeRailHint">One focused technical case study</span>
          </Link>
        </nav>
      </section>

    </div>
  );
}
