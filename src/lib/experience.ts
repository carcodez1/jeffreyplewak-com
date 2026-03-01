// src/lib/experience.ts
import { LINKS } from "@/config/site";

export type ExperienceKey =
  | "lockheed"
  | "jpmc"
  | "ibm"
  | "aws"
  | "expedia"
  | "nintendo"
  | "raytheon"
  | "rtx-raytheon"
  | "fidelity";

export type LogoTone = "light" | "brand";

/**
 * logoTone:
 * - "light": logo asset is already light-on-dark (preferred for this site)
 * - "brand": keep original brand colors / do not apply forced inversion
 */
export type ExperienceItem = {
  key: ExperienceKey;
  name: string;
  href: string;
  logoSrc: string;
  logoWidth: number;
  logoHeight: number;
  logoTone?: LogoTone;
  resume: {
    pageHref?: string;
    pdfHref: string;
    pdfPageHint?: number;
    roleLine?: string;
  };
  highlights: readonly string[];
};

const LOGO_W = 140;
const LOGO_H = 32;

export const EXPERIENCE_ITEMS: readonly ExperienceItem[] = [
  {
    key: "jpmc",
    name: "JPMorgan Chase",
    href: "https://www.jpmorganchase.com",
    logoSrc: "/assets/logos/jp-morgan-chase.svg",
    logoWidth: LOGO_W,
    logoHeight: LOGO_H,
    logoTone: "light",
    resume: { pdfHref: LINKS.resumePdf, roleLine: "Senior Software Engineer — platform automation (AWS/EKS)" },
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
    resume: { pdfHref: LINKS.resumePdf, roleLine: "Software Engineer — platform work and production delivery" },
    highlights: ["Shipped and maintained production systems in large codebases."],
  },
  {
    key: "aws",
    name: "AWS",
    href: "https://aws.amazon.com",
    logoSrc: "/assets/logos/aws.svg",
    logoWidth: LOGO_W,
    logoHeight: LOGO_H,
    logoTone: "light",
    resume: { pdfHref: LINKS.resumePdf, roleLine: "Consulting / project work — cloud delivery and automation" },
    highlights: ["Built and hardened cloud-facing systems with an emphasis on reliability."],
  },
  {
    key: "expedia",
    name: "Expedia Group",
    href: "https://www.expediagroup.com",
    logoSrc: "/assets/logos/expedia.svg",
    logoWidth: LOGO_W,
    logoHeight: LOGO_H,
    logoTone: "light",
    resume: { pdfHref: LINKS.resumePdf, roleLine: "Engineering — production systems at scale" },
    highlights: ["High-traffic environments where performance and correctness both matter."],
  },
  {
    key: "fidelity",
    name: "Fidelity Investments",
    href: "https://www.fidelity.com",
    logoSrc: "/assets/logos/fidelity.svg",
    logoWidth: LOGO_W,
    logoHeight: LOGO_H,
    logoTone: "light",
    resume: { pdfHref: LINKS.resumePdf, roleLine: "Engineering — brokerage / finance platforms" },
    highlights: ["Built and maintained production systems with reliability constraints."],
  },
  {
    key: "raytheon",
    name: "Raytheon",
    href: "https://www.rtx.com",
    logoSrc: "/assets/logos/raytheon.svg",
    logoWidth: LOGO_W,
    logoHeight: LOGO_H,
    logoTone: "light",
    resume: { pdfHref: LINKS.resumePdf, roleLine: "Engineering — systems / platform work" },
    highlights: ["Delivered in review-heavy environments where correctness mattered."],
  },
  {
    key: "rtx-raytheon",
    name: "Raytheon (RTX)",
    href: "https://www.rtx.com",
    logoSrc: "/assets/logos/rtx-raytheon.svg",
    logoWidth: LOGO_W,
    logoHeight: LOGO_H,
    logoTone: "light",
    resume: { pdfHref: LINKS.resumePdf, roleLine: "Engineering — defense programs" },
    highlights: ["Worked across teams with strict change controls and documentation requirements."],
  },
  {
    key: "lockheed",
    name: "Lockheed Martin",
    href: "https://www.lockheedmartin.com",
    logoSrc: "/assets/logos/lockheed-martin.svg",
    logoWidth: LOGO_W,
    logoHeight: LOGO_H,
    logoTone: "light",
    resume: { pdfHref: LINKS.resumePdf, roleLine: "Consulting — software safety / certification support" },
    highlights: ["Automation and delivery hardening in review-heavy environments.", "Work where evidence and traceability mattered."],
  },
  {
    key: "nintendo",
    name: "Nintendo",
    href: "https://www.nintendo.com",
    logoSrc: "/assets/logos/nintendo.svg",
    logoWidth: LOGO_W,
    logoHeight: LOGO_H,
    // We'll decide after inspecting the file; default to light for dark site.
    logoTone: "light",
    resume: { pdfHref: LINKS.resumePdf, roleLine: "Engineering — product / platform work" },
    highlights: ["Shipped production features with strong UX and performance constraints."],
  },
] as const;
