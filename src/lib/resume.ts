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
    start: string; // ISO-ish "YYYY-MM"
    end?: string;  // ISO-ish "YYYY-MM" or omitted for present
  };
  highlights: string[];
};

export function getResumeRoles(): readonly ResumeRole[] {
  return RESUME.roles;
}

export function getResumeRoleById(id: string): ResumeRole | undefined {
  return RESUME.roles.find((r) => r.id === id);
}

/**
 * Normalize employer list:
 * - Keep first occurrence per employerKey (stable order).
 * - Prevent repeated employers in the strip if RESUME.roles has multiple roles per employer.
 */
function uniqueByEmployerKey(roles: readonly ResumeRole[]): ResumeRole[] {
  const seen = new Set<string>();
  const out: ResumeRole[] = [];
  for (const r of roles) {
    const k = String(r.employerKey);
    if (seen.has(k)) continue;
    seen.add(k);
    out.push(r);
  }
  return out;
}

/**
 * Compare ISO-ish YYYY-MM descending (stable).
 * Assumes strings are valid "YYYY-MM".
 */
function compareYmDesc(a: string, b: string): number {
  if (a === b) return 0;
  return a > b ? -1 : 1;
}

export function getExperienceStripItems(): readonly ExperienceStripItem[] {
  const roles = uniqueByEmployerKey(RESUME.roles);

  // Deterministic ordering: newest start first.
  const sorted = [...roles].sort((a, b) => compareYmDesc(a.start, b.start));

  return sorted.map((r) => ({
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
