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

export type ResumeStats = {
  years: number;
  rolesCount: number;
  uniqueEmployersCount: number;
  repeatEmployersCount: number;
};

export type ResumeWorkTypeStats = Record<ResumeRole["workType"], number>;

export type ResumeDownloadLink = {
  href: string;
  label: string;
};

const RECRUITER_PACK_CANDIDATES: readonly ResumeDownloadLink[] = [
  { href: "/downloads/recruiter-pack/index.html", label: "Start Here: Recruiter Pack Index" },
  { href: "/downloads/recruiter-pack/copy-paste-resume.txt", label: "Copy-Paste Resume (TXT)" },
  { href: "/downloads/recruiter-pack/skills-matrix.csv", label: "Skills Matrix (CSV)" },
  { href: "/downloads/recruiter-pack/search-report.md", label: "Recruiter Search Report (MD)" },
  { href: "/downloads/recruiter-pack/resume.pdf", label: "Copy-Paste Resume (PDF)" },
  { href: "/downloads/recruiter-pack/resume.json", label: "Skills Matrix + Match Pack (JSON)" },
  { href: "/downloads/recruiter-pack/manifest.json", label: "Evidence Pack Manifest" },
  { href: "/downloads/recruiter-pack/contact.vcf", label: "Contact VCF" },
];

const RESUME_EVIDENCE_CANDIDATES: readonly ResumeDownloadLink[] = [
  { href: "/downloads/resume.json", label: "Evidence JSON" },
  { href: "/downloads/recruiter-pack/manifest.json", label: "Evidence Manifest" },
  { href: "/downloads/contact.vcf", label: "Contact VCF" },
];

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

function filterAvailableLinks(
  items: readonly ResumeDownloadLink[],
  hasFile: (href: string) => boolean,
): readonly ResumeDownloadLink[] {
  return items.filter((item) => hasFile(item.href));
}

export function buildResumeStats(roles: readonly ResumeRole[]): ResumeStats {
  const sortedByStart = [...roles].sort((a, b) => a.start.localeCompare(b.start));
  const startYear = parseInt(sortedByStart[0]?.start ?? "2011", 10);
  const years = Math.max(0, new Date().getFullYear() - startYear);

  const employerCounts = new Map<string, number>();
  for (const role of roles) {
    const key = role.employerName.trim().toLowerCase();
    employerCounts.set(key, (employerCounts.get(key) ?? 0) + 1);
  }

  return {
    years,
    rolesCount: roles.length,
    uniqueEmployersCount: employerCounts.size,
    repeatEmployersCount: Array.from(employerCounts.values()).filter((count) => count > 1).length,
  };
}

export function buildResumeWorkTypeStats(roles: readonly ResumeRole[]): ResumeWorkTypeStats {
  const counts: ResumeWorkTypeStats = {
    FTE: 0,
    Contract: 0,
    Consulting: 0,
    Owner: 0,
  };

  for (const role of roles) {
    counts[role.workType] += 1;
  }

  return counts;
}

export function getMostRecentResumeRole(roles: readonly ResumeRole[]): ResumeRole | undefined {
  return [...roles].sort(sortNewestFirst)[0];
}

export function getRecruiterPackLinks(hasFile: (href: string) => boolean): readonly ResumeDownloadLink[] {
  return filterAvailableLinks(RECRUITER_PACK_CANDIDATES, hasFile);
}

export function getResumeEvidenceLinks(hasFile: (href: string) => boolean): readonly ResumeDownloadLink[] {
  return filterAvailableLinks(RESUME_EVIDENCE_CANDIDATES, hasFile);
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
