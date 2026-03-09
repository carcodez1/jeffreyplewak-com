export type CareerSurface = "homepageTicker" | "resume" | "recruiter" | "drawer";
export type CareerLogoTone = "light" | "brand";

export type CareerLogoEntry = {
  key: string;
  label: string;
  roleId: string;
  employerKey?: string;
  logoSrc: string;
  width: number;
  height: number;
  order: number;
  logoTone?: CareerLogoTone;
  surfaces: Partial<Record<CareerSurface, boolean>>;
};

export const CAREER_LOGOS: readonly CareerLogoEntry[] = [
  {
    key: "lockheed",
    label: "Lockheed Martin",
    roleId: "lockheed-martin-fort-worth",
    employerKey: "lockheed-martin-fort-worth",
    logoSrc: "/assets/logos/lockheed-martin.svg",
    width: 140,
    height: 32,
    order: 10,
    logoTone: "light",
    surfaces: { homepageTicker: true, resume: true, drawer: true },
  },
  {
    key: "jpmc",
    label: "J.P. Morgan Chase",
    roleId: "jpmorgan-chase",
    employerKey: "jpmorgan-chase",
    logoSrc: "/assets/logos/jp-morgan-chase.svg",
    width: 120,
    height: 32,
    order: 20,
    logoTone: "light",
    surfaces: { homepageTicker: true, resume: true, drawer: true },
  },
  {
    key: "ibm",
    label: "IBM",
    roleId: "ibm-cloud",
    employerKey: "ibm-cloud",
    logoSrc: "/assets/logos/ibm.svg",
    width: 64,
    height: 32,
    order: 30,
    logoTone: "light",
    surfaces: { homepageTicker: true, resume: true, drawer: true },
  },
  {
    key: "raytheon",
    label: "Raytheon",
    roleId: "raytheon-mckinney",
    employerKey: "raytheon-mckinney",
    logoSrc: "/assets/logos/raytheon.svg",
    width: 120,
    height: 32,
    order: 40,
    logoTone: "light",
    surfaces: { homepageTicker: true, resume: true, drawer: true },
  },
  {
    key: "bae",
    label: "BAE Systems",
    roleId: "bae-systems",
    employerKey: "bae-systems",
    logoSrc: "/assets/logos/bae-systems.svg",
    width: 96,
    height: 32,
    order: 50,
    logoTone: "light",
    surfaces: { homepageTicker: true, resume: true, drawer: true },
  },
  {
    key: "fidelity",
    label: "Fidelity",
    roleId: "fidelity-investments-1",
    employerKey: "fidelity-investments-1",
    logoSrc: "/assets/logos/fidelity.svg",
    width: 120,
    height: 32,
    order: 60,
    logoTone: "light",
    surfaces: { homepageTicker: true, resume: true, drawer: true },
  },
  {
    key: "mstro",
    label: "MSTRO / Think Systems",
    roleId: "mstro-think-systems",
    employerKey: "mstro-think-systems",
    logoSrc: "/assets/logos/mstro.png",
    width: 120,
    height: 32,
    order: 70,
    logoTone: "brand",
    surfaces: { resume: true, drawer: true },
  },
  {
    key: "aws",
    label: "AWS",
    roleId: "consulting-multi-client",
    logoSrc: "/assets/logos/aws.svg",
    width: 96,
    height: 28,
    order: 80,
    logoTone: "light",
    surfaces: { homepageTicker: true },
  },
  {
    key: "nintendo",
    label: "Nintendo",
    roleId: "consulting-multi-client",
    logoSrc: "/assets/logos/nintendo.svg",
    width: 96,
    height: 28,
    order: 90,
    logoTone: "light",
    surfaces: { homepageTicker: true },
  },
  {
    key: "expedia",
    label: "Expedia",
    roleId: "consulting-multi-client",
    logoSrc: "/assets/logos/expedia.svg",
    width: 96,
    height: 28,
    order: 100,
    logoTone: "light",
    surfaces: { homepageTicker: true },
  },
] as const;
