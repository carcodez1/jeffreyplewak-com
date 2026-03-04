// src/app/components/ResumeClient.tsx
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { ResumeRole, WorkType } from "@/content/resume";

type FilterTab = "All" | WorkType;
const TABS: FilterTab[] = ["All", "FTE", "Consulting", "Owner"];

type Props = {
  roles: ResumeRole[];
  pdfHref: string;
};

function roleRange(r: ResumeRole): string {
  return r.end ? `${r.start} — ${r.end}` : `${r.start} — Present`;
}

function safeExternalHref(href: string): string | null {
  const trimmed = href.trim();
  if (!trimmed || trimmed.startsWith("TODO_")) return null;
  return trimmed;
}

export function ResumeClient({ roles, pdfHref }: Props) {
  const [activeFilter, setActiveFilter] = useState<FilterTab>("All");

  const filtered = useMemo(() => {
    return activeFilter === "All" ? roles : roles.filter((r) => r.workType === activeFilter);
  }, [roles, activeFilter]);

  // Count only the tabs we actually show (avoids guessing WorkType variants)
  const counts = useMemo(() => {
    const out: Record<string, number> = {};
    for (const t of TABS) out[t] = 0;
    out.All = roles.length;

    for (const r of roles) {
      const k = r.workType;
      if (k && k in out) out[k] += 1;
    }
    return out;
  }, [roles]);

  return (
    <div>
      {/* Filter buttons (a11y-correct toggles) */}
      <div className="resumeFilters" aria-label="Filter by employment type">
        {TABS.map((tab) => (
          <button
            key={tab}
            type="button"
            aria-pressed={activeFilter === tab}
            className={`resumeFilterTab ${activeFilter === tab ? "resumeFilterTab--active" : ""}`}
            onClick={() => setActiveFilter(tab)}
          >
            {tab}
            <span className="resumeFilterCount" aria-hidden="true">
              {counts[tab] ?? 0}
            </span>
          </button>
        ))}
      </div>

      {/* Role cards */}
      <div className="resumeRoles" role="list">
        {filtered.map((r, i) => {
          const employerHref = safeExternalHref(r.employerUrl);
          const isMostRecent = i === 0 && activeFilter === "All";

          return (
            <article
              key={r.id}
              id={r.id}
              className={`resumeRole panel ${isMostRecent ? "resumeRole--featured" : ""}`}
              role="listitem"
              aria-label={`${r.employerName} — ${r.title}`}
            >
              <header className="resumeRoleHead">
                <div className="resumeRoleTop">
                  <div className="resumeEmployerRow">
                    {r.logo?.src && !r.logo.src.startsWith("TODO_") ? (
                      <Image
                        src={r.logo.src}
                        alt={`${r.employerName} logo`}
                        className="resumeEmployerLogo"
                        width={r.logo.width}
                        height={r.logo.height}
                        loading="lazy"
                        sizes="120px"
                      />
                    ) : null}

                    <h3 className="resumeRoleEmployer">{r.employerName}</h3>
                  </div>

                  <div className="resumeRoleMeta">
                    <time className="resumeRoleDates" dateTime={r.start}>
                      {roleRange(r)}
                    </time>
                    {r.workType ? (
                      <span className={`resumeRoleType resumeRoleType--${r.workType.toLowerCase()}`}>
                        {r.workType}
                      </span>
                    ) : null}
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
                  <Link className="btn btnSm btnTertiary" href={`/resume#${r.id}`}>
                    #Link
                  </Link>
                  <a className="btn btnSm btnTertiary" href={pdfHref} target="_blank" rel="noopener noreferrer">
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

                {r.technologies?.length ? (
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
          );
        })}
      </div>

      {filtered.length === 0 ? (
        <p className="muted" style={{ marginTop: 20 }}>
          No roles match this filter.
        </p>
      ) : null}
    </div>
  );
}
