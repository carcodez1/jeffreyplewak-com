import publicRoles from "@/content/employment.public.json";

/**
 * src/content/resume.ts
 *
 * Public resume adapter for route-facing summary, downloads, and role data.
 */

// ─── Types ────────────────────────────────────────────────────────────────────

export type WorkType = "FTE" | "Contract" | "Consulting" | "Owner";

export type ResumeRole = {
  /** URL anchor + UI dedup key */
  id: string;
  /** One card per employerKey in ExperienceStrip */
  employerKey: string;
  employerName: string;
  employerUrl: string;
  title: string;
  workType: WorkType;
  /** "YYYY-MM" — ISO month, lexicographically sortable */
  start: string;
  /** "YYYY-MM" — omit for present role */
  end?: string;
  location: string;
  logo: {
    src: string;
    width: number;
    height: number;
  };
  highlights: readonly string[];
  technologies?: readonly string[];
};

export type ResumeData = {
  pdfHref: string;
  summary: string;
  roles: readonly ResumeRole[];
};

const roles = publicRoles as readonly ResumeRole[];

// ─── SSOT ─────────────────────────────────────────────────────────────────────

export const RESUME: ResumeData = {
  pdfHref: "/downloads/jeffrey-plewak-resume.pdf",

  summary:
    "Senior software engineer with 10+ years designing and operating platform systems in compliance-critical, high-reliability environments. Specialized in Python-based distributed systems, cloud automation, and audit-ready delivery across financial, defense, and cloud platforms (J.P. Morgan Chase, Lockheed Martin, IBM). Focus on production correctness, observability, and trusted compliant AI workflows where traceability, security, and reliability are first-class requirements.",
  roles,
} as const;
