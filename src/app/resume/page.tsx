// src/app/resume/page.tsx
// Key upgrades:
//   1. Stat callouts above the summary fold (years, employers, domains)
//   2. Client-side filter tabs (All / FTE / Consulting / Owner)
//   3. Stronger visual hierarchy on role cards (employer >> title >> meta)
//   4. Accent left-border on most recent role
//   5. PDF section moved to bottom — doesn't compete above the fold

import type { Metadata } from "next";
import { LINKS, SITE } from "@/config/site";
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
  const sorted = [...roles].sort((a, b) => a.start.localeCompare(b.start));
  const startYear = parseInt(sorted[0]?.start ?? "2011", 10);
  const years = new Date().getFullYear() - startYear;
  const employers = new Set(roles.map((r) => r.employerKey)).size;
  return { years, employers };
}

export default function ResumePage() {
  const roles = [...RESUME.roles].sort((a, b) => b.start.localeCompare(a.start));
  const stats = buildStats(RESUME.roles);

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
            <span className="resumeStatNum">{stats.employers}</span>
            <span className="resumeStatLabel">employers</span>
          </div>
          <div className="resumeStatDivider" aria-hidden="true" />
          <div className="resumeStat">
            <span className="resumeStatNum">3</span>
            <span className="resumeStatLabel">domains</span>
          </div>
          <div className="resumeStatDivider" aria-hidden="true" />
          <div className="resumeStat">
            <span className="resumeStatNum">Senior</span>
            <span className="resumeStatLabel">level throughout</span>
          </div>
        </div>

        <div className="ctaRow resumeCtaRow" aria-label="Resume actions">
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
        <h2 className="resumeSectionHead">Summary</h2>
        <p className="lede resumeSummary">{RESUME.summary}</p>
      </section>

      <section className="section" aria-label="Experience">
        <h2 className="resumeSectionHead">Experience</h2>
        <ResumeClient roles={roles} pdfHref={RESUME.pdfHref} />
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
