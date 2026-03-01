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
    pageHref: string; // on-site, keeps users engaged
    pdfHref: string; // secondary
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

export function getExperienceStripItems(): readonly ExperienceStripItem[] {
  return RESUME.roles.map((r) => ({
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
