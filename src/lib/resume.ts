// src/lib/resume.ts
import { RESUME, type ResumeRole } from "@/content/resume";

export type ExperienceStripItem = {
  key: ResumeRole["employerKey"];
  name: string;
  href: string;
  logoSrc: string;
  logoWidth: number;
  logoHeight: number;
  resume: {
    pageHref: string;
    pdfHref: string;
    roleLine?: string;
    start?: string;
    end?: string;
  };
  highlights: readonly string[];
};

function sortByStartDesc(a: ResumeRole, b: ResumeRole): number {
  // "YYYY-MM" compares lexicographically.
  return b.start.localeCompare(a.start);
}

function uniqueByEmployerKeySorted(roles: readonly ResumeRole[]): ResumeRole[] {
  const sorted = [...roles].sort(sortByStartDesc);
  const seen = new Set<ResumeRole["employerKey"]>();
  const out: ResumeRole[] = [];

  for (const r of sorted) {
    if (seen.has(r.employerKey)) continue;
    seen.add(r.employerKey);
    out.push(r);
  }
  return out;
}

export function getExperienceStripItems(): readonly ExperienceStripItem[] {
  const roles = uniqueByEmployerKeySorted(RESUME.roles);

  return roles.map((r) => ({
    key: r.employerKey,
    name: r.employerName,
    href: r.employerUrl,
    logoSrc: r.logo.src,
    logoWidth: r.logo.width,
    logoHeight: r.logo.height,
    resume: {
      pageHref: `/resume#${r.id}`,
      pdfHref: RESUME.pdfHref,
      roleLine: r.title,
      start: r.start,
      end: r.end,
    },
    highlights: r.highlights,
  }));
}
