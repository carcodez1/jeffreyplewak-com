// src/content/resume.ts
import { LINKS } from "@/config/site";

export type EmployerKey =
  | "lockheed"
  | "jpmc"
  | "ibm"
  | "aws"
  | "expedia"
  | "fidelity"
  | "raytheon"
  | "nintendo";

export type ResumeSkill = {
  id: string; // stable for linking/search
  label: string;
};

export type ResumeRole = {
  id: string; // stable anchor within /resume
  employerKey: EmployerKey;
  employerName: string;
  employerUrl: string;
  location: string; // recruiter question: “where”
  title: string; // recruiter question: “what”
  start: string; // ISO-ish "YYYY-MM" for deterministic display
  end?: string; // omit for present
  workType?: "FTE" | "Contract" | "Consulting";
  highlights: string[]; // concise, outcome-oriented
  skills: ResumeSkill[];
  logo: {
    src: string;
    width: number;
    height: number;
  };
};

export const RESUME = {
  pdfHref: LINKS.resumePdf,
  roles: [
    {
      id: "lockheed",
      employerKey: "lockheed",
      employerName: "Lockheed Martin",
      employerUrl: "https://www.lockheedmartin.com",
      location: "United States (remote/onsite as required)",
      title: "Consulting — Software safety / certification support, automation, delivery hardening",
      start: "2024-01",
      end: "2024-12",
      workType: "Consulting",
      highlights: [
        "Hardened delivery workflows where changes must be defensible under review, not just fast.",
        "Automated repeatable engineering steps to reduce manual risk and variance.",
        "Prioritized traceability of outputs and operational clarity for maintainers.",
      ],
      skills: [
        { id: "swe-release", label: "Build/Release Engineering" },
        { id: "swe-trace", label: "Traceability" },
        { id: "swe-automation", label: "Automation" },
      ],
      logo: { src: "/assets/logos/lockheed-martin.svg", width: 110, height: 22 },
    },
    {
      id: "jpmc",
      employerKey: "jpmc",
      employerName: "JPMorgan Chase",
      employerUrl: "https://www.jpmorganchase.com",
      location: "United States",
      title: "Senior Software Engineer — Platform automation, operations, regulated change controls",
      start: "2021-01",
      end: "2023-12",
      workType: "FTE",
      highlights: [
        "Built internal tooling to reduce deployment risk and increase release confidence.",
        "Operated production systems under audit and change-management constraints.",
        "Designed services and automation around security and operational clarity.",
      ],
      skills: [
        { id: "aws", label: "AWS" },
        { id: "k8s", label: "Kubernetes" },
        { id: "platform", label: "Platform Engineering" },
      ],
      logo: { src: "/assets/logos/jp-morgan-chase.svg", width: 130, height: 22 },
    },
    {
      id: "ibm",
      employerKey: "ibm",
      employerName: "IBM",
      employerUrl: "https://www.ibm.com",
      location: "United States",
      title: "Software Engineer — Platform work and production delivery",
      start: "2019-01",
      end: "2021-01",
      workType: "FTE",
      highlights: [
        "Shipped and maintained production systems in large codebases.",
        "Worked across teams where interface clarity and operational reality mattered.",
      ],
      skills: [
        { id: "backend", label: "Backend Engineering" },
        { id: "systems", label: "Systems Engineering" },
      ],
      logo: { src: "/assets/logos/ibm.svg", width: 60, height: 22 },
    },
    {
      id: "aws",
      employerKey: "aws",
      employerName: "AWS",
      employerUrl: "https://aws.amazon.com",
      location: "United States",
      title: "Consulting / project work — Cloud delivery and automation",
      start: "2020-01",
      end: "2020-12",
      workType: "Consulting",
      highlights: [
        "Built and hardened cloud-facing systems with an emphasis on reliability.",
        "Focused on repeatable delivery and clear operational guardrails.",
      ],
      skills: [
        { id: "aws", label: "AWS" },
        { id: "automation", label: "Automation" },
      ],
      logo: { src: "/assets/logos/aws.svg", width: 54, height: 22 },
    },
    {
      id: "expedia",
      employerKey: "expedia",
      employerName: "Expedia Group",
      employerUrl: "https://www.expediagroup.com",
      location: "United States",
      title: "Software Engineer — Production systems at scale",
      start: "2018-01",
      end: "2019-01",
      workType: "FTE",
      highlights: [
        "Worked in high-traffic environments where performance and correctness both matter.",
        "Delivered features without trading away maintainability.",
      ],
      skills: [
        { id: "reliability", label: "Reliability" },
        { id: "perf", label: "Performance" },
      ],
      logo: { src: "/assets/logos/expedia.svg", width: 92, height: 22 },
    },
  ] as const satisfies readonly ResumeRole[],
} as const;
