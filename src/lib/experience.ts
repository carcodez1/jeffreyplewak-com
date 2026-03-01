import { LINKS } from "@/config/site";

/**
 * Standard date fields for timeline items.
 * - startDate: required (ISO year-month)
 * - endDate: optional (ISO year-month or "Present")
 */
export type ExperienceItem = {
  key: string;
  name: string;
  href: string;
  logoSrc: string;
  logoWidth: number;
  logoHeight: number;
  logoTone?: "light" | "brand";
  resume: {
    pageHref?: string;
    pdfHref: string;
    pdfPageHint?: number;
    roleLine?: string;
    // Add optional date fields for timeline display
    startDate: string;
    endDate?: string;
  };
  highlights: readonly string[];
};

const LOGO_W = 140;
const LOGO_H = 32;

/**
 * EXPERIENCE_ITEMS array now includes startDate and optional endDate
 * for timeline ordering and display.
 */
export const EXPERIENCE_ITEMS: readonly ExperienceItem[] = [
  {
    key: "jpmc",
    name: "JPMorgan Chase",
    href: "https://www.jpmorganchase.com",
    logoSrc: "/assets/logos/jp-morgan-chase.svg",
    logoWidth: LOGO_W,
    logoHeight: LOGO_H,
    logoTone: "light",
    resume: {
      pageHref: LINKS.resumePdf,
      pdfHref: LINKS.resumePdf,
      roleLine: "Senior Software Engineer — platform automation (AWS/EKS)",
      startDate: "2019-06",
      endDate: "2023-08",
    },
    highlights: [
      "Tools that reduced deployment risk and improved release confidence.",
      "Operated production systems under regulated change controls.",
    ],
  },
  {
    key: "ibm",
    name: "IBM",
    href: "https://www.ibm.com",
    logoSrc: "/assets/logos/ibm.svg",
    logoWidth: LOGO_W,
    logoHeight: LOGO_H,
    logoTone: "light",
    resume: {
      pdfHref: LINKS.resumePdf,
      roleLine: "Software Engineer — platform work and production delivery",
      startDate: "2016-01",
      endDate: "2019-05",
    },
    highlights: ["Shipped and maintained production systems in large codebases."],
  },
  /* ... add dates similarly for all other items ... */
] as const;
