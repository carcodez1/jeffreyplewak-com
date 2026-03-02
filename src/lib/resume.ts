// src/lib/resume.ts
import { RESUME, type ResumeRole } from "@/content/resume";

export type ExperienceStripItem = {
  key: string; // employerKey (string SSOT)
  name: string; // employerName
  href?: string; // employerUrl (optional)
  logoSrc?: string;
  logoWidth?: number;
  logoHeight?: number;
  logoTone?: "light" | "brand";

  resume: {
    id: string; // role id for anchor
    pageHref: string;
    pdfHref: string;
    title: string;
    location: string;
    workType: ResumeRole["workType"];
    start: string; // YYYY-MM
    end?: string; // YYYY-MM
  };

  highlights: readonly string[];
  technologies?: readonly string[];
};

function sortNewestFirst(a: ResumeRole, b: ResumeRole): number {
  // "YYYY-MM" lexicographic sorting is deterministic
  return b.start.localeCompare(a.start);
}

function uniqueNewestRolePerEmployer(roles: readonly ResumeRole[]): ResumeRole[] {
  const sorted = [...roles].sort(sortNewestFirst);
  const seen = new Set<string>();
  const out: ResumeRole[] = [];

  for (const r of sorted) {
    const k = r.employerKey;
    if (seen.has(k)) continue;
    seen.add(k);
    out.push(r);
  }
  return out;
}

function isTodoPath(p: string | undefined): boolean {
  return !!p && (p.startsWith("TODO_") || p.includes("TODO_") || p.includes("TODO/") || p.includes("TODO_"));
}

export function getExperienceStripItems(): readonly ExperienceStripItem[] {
  const roles = uniqueNewestRolePerEmployer(RESUME.roles);

  return roles.map((r) => ({
    key: r.employerKey,
    name: r.employerName,
    href: r.employerUrl || undefined,

    // Do not render TODO logo paths (avoid runtime/image errors).
    logoSrc: isTodoPath(r.logo?.src) ? undefined : r.logo?.src,
    logoWidth: r.logo?.width,
    logoHeight: r.logo?.height,

    resume: {
      id: r.id,
      pageHref: `/resume#${r.id}`,
      pdfHref: RESUME.pdfHref,
      title: r.title,
      location: r.location,
      workType: r.workType,
      start: r.start,
      end: r.end,
    },

    highlights: r.highlights,
    technologies: r.technologies,
  }));
}
