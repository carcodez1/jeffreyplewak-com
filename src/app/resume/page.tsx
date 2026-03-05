// src/app/resume/page.tsx
// Key upgrades:
//   1. Stat callouts above the summary fold (years, employers, domains)
//   2. Client-side filter tabs (All / FTE / Consulting / Owner)
//   3. Stronger visual hierarchy on role cards (employer >> title >> meta)
//   4. Accent left-border on most recent role
//   5. PDF section moved to bottom — doesn't compete above the fold

import type { Metadata } from "next";
import Image from "next/image";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { LINKS, SITE } from "@/config/site";
import { EXPERIENCE_LOGOS } from "@/config/experience";
import { RESUME, type ResumeRole } from "@/content/resume";
import { ResumeClient } from "@/app/components/ResumeClient";

export const metadata: Metadata = {
  title: `Resume — ${SITE.name}`,
  description: `Résumé and experience for ${SITE.name}. HTML-first for indexing; PDF available for download.`,
  alternates: { canonical: "/resume" },
  openGraph: {
    type: "website",
    title: `Resume — ${SITE.name}`,
    description: `Résumé and experience for ${SITE.name}.`,
    url: "/resume",
  },
};

// Stats derived from resume data — no hardcoded claims
function buildStats(roles: readonly ResumeRole[]) {
  const sortedByStart = [...roles].sort((a, b) => a.start.localeCompare(b.start));
  const startYear = parseInt(sortedByStart[0]?.start ?? "2011", 10);
  const years = Math.max(0, new Date().getFullYear() - startYear);

  const roleCount = roles.length;
  const employerCounts = new Map<string, number>();
  for (const r of roles) {
    const key = r.employerName.trim().toLowerCase();
    employerCounts.set(key, (employerCounts.get(key) ?? 0) + 1);
  }

  const uniqueEmployers = employerCounts.size;
  const repeatEmployers = Array.from(employerCounts.values()).filter((count) => count > 1).length;

  return {
    years,
    rolesCount: roleCount,
    uniqueEmployersCount: uniqueEmployers,
    repeatEmployersCount: repeatEmployers,
  };
}

function roleRange(r: ResumeRole): string {
  return r.end ? `${r.start} — ${r.end}` : `${r.start} — Present`;
}

function safeExternalHref(href: string): string | null {
  const trimmed = href.trim();
  if (!trimmed || trimmed.startsWith("TODO_")) return null;
  return trimmed;
}

function groupRolesByStartYear(roles: readonly ResumeRole[]) {
  const groups = new Map<string, ResumeRole[]>();
  for (const role of roles) {
    const year = role.start.slice(0, 4);
    const arr = groups.get(year) ?? [];
    arr.push(role);
    groups.set(year, arr);
  }
  return [...groups.entries()]
    .sort(([a], [b]) => b.localeCompare(a))
    .map(([year, items]) => ({
      year,
      roles: [...items].sort((a, b) => b.start.localeCompare(a.start)),
    }));
}

const EVIDENCE_CANDIDATES = [
  { href: "/downloads/resume.json", label: "Evidence JSON" },
  { href: "/downloads/recruiter-pack/manifest.json", label: "Evidence Manifest" },
  { href: "/downloads/contact.vcf", label: "Contact VCF" },
] as const;

function getEvidenceLinks() {
  return EVIDENCE_CANDIDATES.filter((item) =>
    existsSync(join(process.cwd(), "public", item.href.replace(/^\//, ""))),
  );
}

export default function ResumePage() {
  const roles = [...RESUME.roles].sort((a, b) => b.start.localeCompare(a.start));
  const stats = buildStats(roles);
  const yearGroups = groupRolesByStartYear(roles);
  const evidenceLinks = getEvidenceLinks();

  return (
    <div className="wrap">
      <header className="section resumePageHead" aria-label="Resume intro">
        <h1 className="resumeH1">Resume</h1>

        <div className="resumeStats" aria-label="Career highlights">
          <div className="resumeStat">
            <span className="resumeStatNum">{stats.years}+</span>
            <span className="resumeStatLabel">years experience</span>
          </div>
          <div className="resumeStatDivider" aria-hidden="true" />
          <div className="resumeStat">
            <span className="resumeStatNum">{stats.rolesCount}</span>
            <span className="resumeStatLabel">roles</span>
          </div>
          <div className="resumeStatDivider" aria-hidden="true" />
          <div className="resumeStat">
            <span className="resumeStatNum">{stats.uniqueEmployersCount}</span>
            <span className="resumeStatLabel">unique employers</span>
          </div>
          <div className="resumeStatDivider" aria-hidden="true" />
          <div className="resumeStat">
            <span className="resumeStatNum">{stats.repeatEmployersCount}</span>
            <span className="resumeStatLabel">repeat employers</span>
          </div>
        </div>

        <div className="ctaRow resumeCtaRow" aria-label="Resume actions and downloads">
          <a className="btn btnPrimary" href={RESUME.pdfHref} target="_blank" rel="noopener noreferrer">
            Open PDF
          </a>
          <a className="btn" href={RESUME.pdfHref} download>
            Download PDF
          </a>
          <a className="btn btnTertiary" href={LINKS.emailProject}>
            Email
          </a>
          <a className="btn btnTertiary" href={LINKS.linkedin} target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
          <a className="btn btnTertiary" href={LINKS.github} target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          {evidenceLinks.map((item) => (
            <a key={item.href} className="btn btnSm btnTertiary" href={item.href} target="_blank" rel="noopener noreferrer">
              {item.label}
            </a>
          ))}
        </div>
      </header>

      <section className="section" aria-label="Professional summary">
        <h2 className="resumeSectionHead">Summary</h2>
        <p className="lede resumeSummary">{RESUME.summary}</p>
      </section>

      <section className="section" aria-label="Experience">
        <h2 className="resumeSectionHead">Experience</h2>
        <div className="resumeLogoStripWrap" aria-label="Employer logos">
          <p className="resumeLogoStripLabel">Where I have worked</p>
          <ul className="resumeLogoStrip" role="list">
            {EXPERIENCE_LOGOS.map((item) => (
              <li key={item.key}>
                <a className="resumeLogoChip depthFx" href={item.href} aria-label={`${item.label} on resume`}>
                  <Image
                    src={item.logoSrc}
                    alt={`${item.label} logo`}
                    width={item.width ?? 96}
                    height={item.height ?? 28}
                    className="resumeLogoChipImg"
                    loading="lazy"
                  />
                </a>
              </li>
            ))}
          </ul>
        </div>
        <ResumeClient roles={roles} />
        <div className="resumeTimeline" aria-label="Full experience timeline (server-rendered)">
          {yearGroups.map((group) => (
            <section key={group.year} className="resumeYearGroup" aria-labelledby={`year-${group.year}`}>
              <h3 id={`year-${group.year}`} className="resumeYearHead">
                {group.year}
              </h3>
              <div className="resumeRoles" role="list">
                {group.roles.map((r, idx) => {
                  const employerHref = safeExternalHref(r.employerUrl);
                  const isMostRecent = group.year === yearGroups[0]?.year && idx === 0;
                  return (
                    <article
                      key={r.id}
                      id={r.id}
                      className={`resumeRole panel ${isMostRecent ? "resumeRole--featured" : ""}`}
                      role="listitem"
                      aria-label={`${r.employerName} — ${r.title}`}
                      tabIndex={-1}
                    >
                      <header className="resumeRoleHead">
                        <div className="resumeRoleTop">
                          <h4 className="resumeRoleEmployer">{r.employerName}</h4>
                          <div className="resumeRoleMeta">
                            <time className="resumeRoleDates" dateTime={r.start}>
                              {roleRange(r)}
                            </time>
                            <span className={`resumeRoleType resumeRoleType--${r.workType.toLowerCase()}`}>
                              {r.workType}
                            </span>
                          </div>
                        </div>

                        <div className="resumeRoleTitleRow">
                          <div className="resumeRoleTitle">{r.title}</div>
                          <div className="resumeRoleLocation">{r.location}</div>
                        </div>

                        <div className="resumeRoleLinks" aria-label="Role links">
                          {employerHref ? (
                            <a className="btn btnSm btnPrimary" href={employerHref} target="_blank" rel="noopener noreferrer">
                              Employer ↗
                            </a>
                          ) : null}
                          <a className="btn btnSm btnTertiary" href={`/resume#${r.id}`}>
                            #Link
                          </a>
                          <a className="btn btnSm btnTertiary" href={RESUME.pdfHref} target="_blank" rel="noopener noreferrer">
                            PDF
                          </a>
                        </div>
                      </header>

                      <div className="resumeRoleBody">
                        <h5 className="resumeRoleSection">Impact</h5>
                        <ul className="resumeRoleList">
                          {r.highlights.map((h) => (
                            <li key={h}>{h}</li>
                          ))}
                        </ul>

                        {r.technologies?.length ? (
                          <>
                            <h5 className="resumeRoleSection">Technologies</h5>
                            <ul className="resumeRoleSkills" role="list">
                              {r.technologies.map((t) => (
                                <li key={t} className="resumeSkill">
                                  {t}
                                </li>
                              ))}
                            </ul>
                          </>
                        ) : null}
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      </section>

      <section className="section" aria-label="PDF preview">
        <h2 className="resumeSectionHead">PDF Preview</h2>
        <div className="resumePdfPanel panel">
          <object data={RESUME.pdfHref} type="application/pdf" className="resumeEmbedObj" aria-label="Résumé PDF">
            <p className="muted">
              PDF preview not available in this browser.{" "}
              <a href={RESUME.pdfHref} target="_blank" rel="noopener noreferrer">
                Open the PDF
              </a>
              .
            </p>
          </object>
        </div>
      </section>
    </div>
  );
}
