// src/app/resume/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { LINKS, SITE } from "@/config/site";
import { RESUME, type ResumeRole } from "@/content/resume";

export const metadata: Metadata = {
  title: `Resume — ${SITE.name}`,
  description: `Résumé and experience for ${SITE.name}.`,
  alternates: { canonical: "/resume" },
};

function roleRange(r: ResumeRole): string {
  return r.end ? `${r.start} — ${r.end}` : `${r.start} — Present`;
}

function rolePermalink(r: ResumeRole): string {
  return `/resume#${r.id}`;
}

export default function ResumePage() {
  // Deterministic order: newest first (YYYY-MM lexicographic works)
  const roles = [...RESUME.roles].sort((a, b) => b.start.localeCompare(a.start));

  return (
    <div className="wrap">
      <header className="section" aria-label="Resume intro">
        <h1>Resume</h1>
        <p>
          {SITE.name}. {SITE.title}.{" "}
          <span className="muted">
            HTML is primary for search/linking; PDF is provided for download.
          </span>
        </p>

        <div className="ctaRow" aria-label="Resume actions">
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
        </div>
      </header>

      <section className="section" aria-label="Professional summary">
        <h2>Summary</h2>
        <p className="lede">{RESUME.summary}</p>
      </section>

      <section className="section" aria-label="Experience">
        <h2>Experience</h2>

        <div className="resumeRoles" role="list">
          {roles.map((r) => (
            <article
              key={r.id}
              id={r.id}
              className="resumeRole panel"
              role="listitem"
              aria-label={`${r.employerName} — ${r.title}`}
            >
              <header className="resumeRoleHead">
                <div className="resumeRoleTop">
                  <h3 className="resumeRoleEmployer">{r.employerName}</h3>
                  <div className="resumeRoleMeta">
                    <span className="resumeRoleDates">{roleRange(r)}</span>
                    {r.workType ? <span className="resumeRoleType">{r.workType}</span> : null}
                  </div>
                </div>

                <div className="resumeRoleTitle">{r.title}</div>
                <div className="resumeRoleLocation">{r.location}</div>

                <div className="resumeRoleLinks" aria-label="Role links">
                  {r.employerUrl ? (
                    <a className="btn btnPrimary btnSm" href={r.employerUrl} target="_blank" rel="noopener noreferrer">
                      Employer
                    </a>
                  ) : null}

                  <Link className="btn btnSm" href={rolePermalink(r)}>
                    Link
                  </Link>

                  <a className="btn btnSm" href={RESUME.pdfHref} target="_blank" rel="noopener noreferrer">
                    PDF
                  </a>
                </div>
              </header>

              <div className="resumeRoleBody">
                <h4 className="resumeRoleSection">Highlights</h4>
                <ul className="resumeRoleList">
                  {r.highlights.map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>

                {r.technologies && r.technologies.length > 0 ? (
                  <>
                    <h4 className="resumeRoleSection">Technologies</h4>
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
          ))}
        </div>
      </section>

      <section className="section" aria-label="PDF preview">
        <h2>PDF Preview</h2>
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
