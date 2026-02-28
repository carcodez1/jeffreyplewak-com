// src/app/resume/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { LINKS, SITE } from "@/config/site";
import { getResumeRoles } from "@/lib/resume";

export const metadata: Metadata = {
  title: `Resume — ${SITE.name}`,
  description: "Résumé (HTML) with traceable role details, skills, locations, and outcomes.",
  alternates: { canonical: "/resume" },
  openGraph: {
    type: "website",
    title: `Resume — ${SITE.name}`,
    description: "Résumé (HTML) with traceable role details, skills, locations, and outcomes.",
    url: "/resume",
  },
};

function fmtRange(start: string, end?: string) {
  const s = start;
  const e = end ?? "Present";
  return `${s} → ${e}`;
}

export default function ResumePage() {
  const roles = getResumeRoles();

  return (
    <div className="wrap">
      <header className="section">
        <h1 className="h2" style={{ marginBottom: 8 }}>
          Resume
        </h1>
        <p className="lede" style={{ marginBottom: 14 }}>
          Indexable HTML resume (keeps recruiters on-site). PDF is available for download.
        </p>

        <div className="ctaRow">
          <a className="btn btnPrimary" href={LINKS.emailProject}>
            Email
          </a>
          <a className="btn" href={LINKS.resumePdf} target="_blank" rel="noopener noreferrer">
            Open PDF
          </a>
          <Link className="btn btnTertiary" href="/projects">
            Projects
          </Link>
        </div>
      </header>

      <section className="section" aria-label="Experience">
        <h2 className="h2">Experience</h2>
        <p className="lede">Each entry includes employer, location, role, timeframe, and skills.</p>

        <div className="stack">
          {roles.map((r) => (
            <article key={r.id} id={r.id} className="roleCard" aria-label={`${r.employerName} role`}>
              <div className="roleTop">
                <div>
                  <h3 className="roleEmployer">{r.employerName}</h3>
                  <div className="roleMeta">
                    <span>{r.title}</span>
                    <span className="roleSep" aria-hidden="true">
                      •
                    </span>
                    <span>{r.location}</span>
                    <span className="roleSep" aria-hidden="true">
                      •
                    </span>
                    <span>{fmtRange(r.start, r.end)}</span>
                  </div>
                </div>

                <div className="roleActions">
                  <a className="btn btnTertiary" href={r.employerUrl} target="_blank" rel="noopener noreferrer">
                    Company site
                  </a>
                </div>
              </div>

              <ul className="roleBullets">
                {r.highlights.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>

              <div className="roleSkills" aria-label="Skills">
                {r.skills.map((s) => (
                  <span key={s.id} className="skillPill">
                    {s.label}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
