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

export type ExperienceItem = {
  key: ExperienceKey;
  name: string;
  href: string;
  logoSrc: string;
  logoWidth: number;
  logoHeight: number;
  resume: {
    pdfHref: string;
    pdfPageHint?: number;
    roleLine?: string;
  };
  highlights: readonly string[];
};

export const EXPERIENCE_ITEMS: readonly ExperienceItem[] = [
  {
    key: "lockheed",
    name: "Lockheed Martin",
    href: "https://www.lockheedmartin.com",
    logoSrc: "/assets/logos/lockheed-martin.svg",
    logoWidth: 110,
    logoHeight: 22,
    resume: { pdfHref: LINKS.resumePdf, roleLine: "Consulting — software safety / certification support" },
    highlights: [
      "Automation and delivery hardening in review-heavy environments.",
      "Work where evidence and traceability mattered.",
    ],
  },
  {
    key: "jpmc",
    name: "JPMorgan Chase",
    href: "https://www.jpmorganchase.com",
    logoSrc: "/assets/logos/jp-morgan-chase.svg",
    logoWidth: 130,
    logoHeight: 22,
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
    logoWidth: 60,
    logoHeight: 22,
    resume: { pdfHref: LINKS.resumePdf, roleLine: "Software Engineer — platform work and production delivery" },
    highlights: ["Shipped and maintained production systems in large codebases."],
  },
  {
    key: "aws",
    name: "AWS",
    href: "https://aws.amazon.com",
    logoSrc: "/assets/logos/aws.svg",
    logoWidth: 54,
    logoHeight: 22,
    resume: { pdfHref: LINKS.resumePdf, roleLine: "Consulting / project work — cloud delivery and automation" },
    highlights: ["Built and hardened cloud-facing systems with an emphasis on reliability."],
  },
  {
    key: "expedia",
    name: "Expedia Group",
    href: "https://www.expediagroup.com",
    logoSrc: "/assets/logos/expedia.svg",
    logoWidth: 92,
    logoHeight: 22,
    resume: { pdfHref: LINKS.resumePdf, roleLine: "Engineering — production systems at scale" },
    highlights: ["High-traffic environments where performance and correctness both matter."],
  },
] as const;
