export type ExperienceLogo = {
  key: string;
  label: string;
  logoSrc: string;   // under /public/assets/logos
  href: string;      // where click goes (resume anchor or external)
  width?: number;
  height?: number;
};

export const EXPERIENCE_LOGOS: readonly ExperienceLogo[] = [
  { key: "lockheed", label: "Lockheed Martin", logoSrc: "/assets/logos/lockheed-martin.svg", href: "/resume#lockheed-martin-fort-worth", width: 140, height: 32 },
  { key: "jpmc", label: "J.P. Morgan Chase", logoSrc: "/assets/logos/jp-morgan-chase.svg", href: "/resume#jpmorgan-chase", width: 120, height: 32 },
  { key: "ibm", label: "IBM", logoSrc: "/assets/logos/ibm.svg", href: "/resume#ibm-cloud", width: 64, height: 32 },
  { key: "raytheon", label: "Raytheon", logoSrc: "/assets/logos/raytheon.svg", href: "/resume#raytheon-mckinney", width: 120, height: 32 },
  { key: "bae", label: "BAE Systems", logoSrc: "/assets/logos/bae-systems.svg", href: "/resume#bae-systems", width: 96, height: 32 },
  { key: "fidelity", label: "Fidelity", logoSrc: "/assets/logos/fidelity.svg", href: "/resume#fidelity-investments-1", width: 120, height: 32 },

  /* Consulting / clients you explicitly want visible */
  { key: "aws", label: "AWS", logoSrc: "/assets/logos/aws.svg", href: "/resume#consulting-multi-client", width: 96, height: 28 },
  { key: "nintendo", label: "Nintendo", logoSrc: "/assets/logos/nintendo.svg", href: "/resume#consulting-multi-client", width: 96, height: 28 },
  { key: "expedia", label: "Expedia", logoSrc: "/assets/logos/expedia.svg", href: "/resume#consulting-multi-client", width: 96, height: 28 },
];
