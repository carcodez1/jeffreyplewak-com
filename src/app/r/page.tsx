import type { Metadata } from "next";
import { existsSync } from "node:fs";
import { join } from "node:path";
import Link from "next/link";
import { SITE } from "@/config/site";
import { RESUME } from "@/content/resume";
import { buildResumeStats, buildResumeWorkTypeStats, getRecruiterPackLinks } from "@/lib/resume";
import { RECRUITER_OG_IMAGES, RECRUITER_TWITTER_IMAGES } from "@/lib/metadata/images";

const KPROVENGINE_LINKS = {
  proof: "/projects/kprovengine",
} as const;

function hasPublicFile(href: string) {
  return existsSync(join(process.cwd(), "public", href.replace(/^\//, "")));
}

export const metadata: Metadata = {
  title: `Recruiter Decision Page — ${SITE.name}`,
  description:
    "Recruiter page for a senior software engineer focused on platform systems, compliance-aware delivery, production correctness, and a focused KProvEngine case study.",
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
      "Start here for a recruiter-focused view of platform systems, compliance-aware delivery, and the KProvEngine case study.",
    url: "/r",
    images: RECRUITER_OG_IMAGES,
  },
  twitter: {
    card: "summary_large_image",
    title: `Recruiter Decision Page — ${SITE.name}`,
    description:
      "Start here for a recruiter-focused view of platform systems, compliance-aware delivery, and the KProvEngine case study.",
    images: RECRUITER_TWITTER_IMAGES,
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
    "Senior/Staff software engineer with 10+ years delivering cloud-native platform and distributed systems in regulated banking, defense, and cloud environments, with focus on deployment safety, observability, resilience, and policy-controlled AI execution.";

  return (
    <div className="wrap recruiterPage">
      <header className="section recruiterHero" aria-label="Recruiter overview">
        <div className="recruiterHeroPanel card">
          <p className="recruiterEyebrow">For recruiters</p>
          <h1 className="h1 recruiterHeroTitle">Senior/Staff Software Engineer for Distributed Platform Systems</h1>
          <p className="lede recruiterHeroLede">Start with the canonical resume, then open the recruiter pack, then review KProvEngine for focused technical proof.</p>
          <p className="cardDesc recruiterHeroSummary">{recruiterSummary}</p>

          <nav className="ctaRow recruiterHeroActions" aria-label="Recruiter actions">
            <Link className="btn btnPrimary recruiterHeroPrimary" href="/resume">
              Resume
            </Link>
            {recruiterPackPrimaryLink ? (
              <a
                className="btn btnTertiary"
                href={recruiterPackPrimaryLink.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                Open Recruiter Pack
              </a>
            ) : null}
          </nav>
        </div>
      </header>

      <section className="section recruiterStatStripSection" aria-label="Fast recruiter facts">
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
            <span className="routeRailText">View KProvEngine Proof</span>
            <span className="routeRailHint">Focused proof of production platform and compliance-aware AI execution decisions</span>
          </Link>
        </nav>
      </section>

    </div>
  );
}
