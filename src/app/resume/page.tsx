import type { Metadata } from "next";
import Image from "next/image";
import { SITE } from "@/config/site";
import { RESUME, type ResumeRole } from "@/content/resume";
import { DownloadMenu } from "@/app/components/DownloadMenu";
import { DEFAULT_OG_IMAGES, DEFAULT_TWITTER_IMAGES } from "@/lib/metadata/images";

export const metadata: Metadata = {
  title: `Resume — ${SITE.name}`,
  description: `Résumé and experience for ${SITE.name}. HTML-first for indexing; PDF available for download.`,
  keywords: [
    "software engineer resume",
    "senior engineer experience",
    "backend engineering resume",
    "platform architecture resume",
    "AI systems engineer resume",
  ],
  alternates: { canonical: "/resume" },
  openGraph: {
    type: "website",
    title: `Resume — ${SITE.name}`,
    description: `Résumé and experience for ${SITE.name}.`,
    url: "/resume",
    images: DEFAULT_OG_IMAGES,
  },
  twitter: {
    card: "summary_large_image",
    title: `Resume — ${SITE.name}`,
    description: `Résumé and experience for ${SITE.name}.`,
    images: DEFAULT_TWITTER_IMAGES,
  },
};

function roleRange(r: ResumeRole): string {
  const start = formatYearMonth(r.start);
  const end = r.end ? formatYearMonth(r.end) : "Present";
  return `${start} — ${end}`;
}

function formatYearMonth(value: string): string {
  const [yearRaw, monthRaw] = value.split("-");
  const year = Number(yearRaw);
  const month = Number(monthRaw);
  if (!Number.isFinite(year) || !Number.isFinite(month) || month < 1 || month > 12) return value;
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"] as const;
  return `${months[month - 1]} ${year}`;
}

function safeExternalHref(href: string): string | null {
  const trimmed = href.trim();
  if (!trimmed || trimmed.startsWith("TODO_")) return null;
  return trimmed;
}

function safeLogoSrc(role: ResumeRole): string | null {
  const src = role.logo?.src?.trim() ?? "";
  if (!src || src.startsWith("TODO_") || src.includes("placeholder")) return null;
  return src;
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

export default function ResumePage() {
  const roles = [...RESUME.roles].sort((a, b) => b.start.localeCompare(a.start));
  const yearGroups = groupRolesByStartYear(roles);

  return (
    <div className="wrap">
      <header className="section resumePageHead" aria-label="Resume intro">
        <h1 className="resumeH1">Resume</h1>
        <p className="lede resumeSummary">Chronological timeline with expandable role details.</p>
        <p className="cardDesc resumeProfileSummary">{RESUME.summary}</p>
        <div className="resumeHeaderActions">
          <DownloadMenu iconOnly className="resumeDownloadMenu" label="Downloads" />
        </div>
      </header>

      <section className="section" aria-label="Experience">
        <h2 className="resumeSectionHead">Timeline</h2>
        <p className="cardDesc resumeExperienceNote">Most recent first. Expand any role for highlights and technologies.</p>
        <p className="resumeFlowHint">Tip: select any row to expand details.</p>
        <div className="resumeTimeline" aria-label="Full experience timeline (server-rendered)">
          {yearGroups.map((group) => (
            <section key={group.year} className="resumeYearGroup" aria-labelledby={`year-${group.year}`}>
              <h3 id={`year-${group.year}`} className="resumeYearHead">
                {group.year}
              </h3>
              <div className="resumeRoles" role="list">
                {group.roles.map((r, idx) => {
                  const employerHref = safeExternalHref(r.employerUrl);
                  const logoSrc = safeLogoSrc(r);
                  const isMostRecent = group.year === yearGroups[0]?.year && idx === 0;
                  return (
                    <details
                      key={r.id}
                      id={r.id}
                      className={`resumeRole panel resumeRoleDetails ${isMostRecent ? "resumeRole--featured" : ""}`}
                      role="listitem"
                      open={isMostRecent}
                    >
                      <summary className="resumeRoleSummary" aria-label={`${r.employerName} — ${r.title}`}>
                        <div className="resumeRoleHead">
                          <div className="resumeRoleTop">
                            <div className="resumeEmployerRow">
                              <h4 className="resumeRoleEmployer">{r.employerName}</h4>
                              {logoSrc ? (
                                <span className="resumeEmployerLogoChip">
                                  <Image
                                    src={logoSrc}
                                    alt={`${r.employerName} logo`}
                                    width={r.logo.width}
                                    height={r.logo.height}
                                    className="resumeEmployerLogo"
                                    loading="lazy"
                                  />
                                </span>
                              ) : null}
                            </div>
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
                            <span className="resumeRoleExpandHint" aria-hidden="true" />
                          </div>
                        </div>
                      </summary>

                      <div className="resumeRoleBody">
                        {employerHref ? (
                          <div className="resumeRoleLinks" aria-label="Role links">
                            <a className="btn btnSm btnPrimary" href={employerHref} target="_blank" rel="noopener noreferrer">
                              Employer
                            </a>
                          </div>
                        ) : null}
                        <h5 className="resumeRoleSection">Key outcomes</h5>
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
                    </details>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      </section>
    </div>
  );
}
