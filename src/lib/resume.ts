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
 * - Prevents repeated employers in the strip if RESUME.roles has multiple roles per employer.
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

export function getExperienceStripItems(): readonly ExperienceStripItem[] {
  const roles = uniqueByEmployerKey(RESUME.roles);

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
    },
    highlights: r.highlights,
  }));
}