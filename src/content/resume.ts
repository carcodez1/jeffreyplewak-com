import publicRoles from "@/content/employment.public.json";

/**
 * src/content/resume.ts
 *
 * CANONICAL NARRATIVE SSOT — Jeffrey R. Plewak
 * Public identity routes (/resume and /r) render from this file directly.
 * Machine-readable recruiter exports are generated from src/content/ssot/profile.ssot.jsonld.
 * Last updated: 2026-03-02
 *
 * DATE CONFIDENCE KEY:
 *   // [CONFIRMED] — stated directly by Jeffrey or present on original PDF
 *   // [BEST-GUESS] — approximated from confirmed anchors; correct if you have records
 *
 * BEST-GUESS ASSUMPTIONS (keep for your own records):
 *   Fidelity 1 end    2016-10  → ~1.5 yr stint before leaving for Raytheon
 *   Raytheon start    2016-11  → month after Fidelity 1 ended
 *   Raytheon end      2017-09  → ~10-month FTE stint
 *   Fidelity 2 start  2017-10  → returned month after Raytheon ended
 *   Fidelity 2 end    2018-04  → ~6 months; ended before joining LM Fort Worth
 *   LM FW start       2018-05  → month after Fidelity 2 ended; LM FW end 2018-12 confirmed
 *
 * TODO before first deploy:
 *   - Replace all logo src "TODO_..." with real paths under /public/assets/logos/
 *   - Confirm or correct all [BEST-GUESS] dates using W2s or LinkedIn
 *   - Confirm pdfHref path once PDF is in /public
 *   - Add Raytheon highlights (currently sparse — ATS flags thin role entries)
 *   - Fill in MyGeo LLC employerUrl
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
  pdfHref: "/downloads/jeffrey-plewak-resume.pdf", // TODO: confirm path in /public

  summary:
    "Senior software engineer with 10+ years designing and operating platform systems in compliance-critical, high-reliability environments. Specialized in Python-based distributed systems, cloud automation, and audit-ready delivery across financial, defense, and cloud platforms (J.P. Morgan Chase, Lockheed Martin, IBM). Focus on production correctness, observability, and trusted compliant AI workflows where traceability, security, and reliability are first-class requirements.",
  roles,
} as const;
