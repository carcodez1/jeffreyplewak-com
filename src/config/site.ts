// src/config/site.ts

export const SITE = {
  url: "https://www.jeffreyplewak.com",
  name: "Jeffrey R. Plewak",
  shortName: "Jeff",
  title: "Senior Software Engineer",
  // Used in hero/footer as a short “where/availability” line
  locationLine: "Remote-first • North Carolina",
  // Used in footer “what I do” line
  roleLine: "Platform, full-stack, and compliance-critical systems.",
  locale: "en_US",
} as const;

export const LINKS = {
  calendly: "https://calendly.com/plewak-jeff",
  // If your actual Calendly is /intro, set it here once:
  // calendly: "https://calendly.com/plewak-jeff/intro",

  resumePdf: "/downloads/jeffrey-plewak-resume.pdf",
  vcf: "/downloads/jeffrey-plewak.vcf",

  emailProject: "mailto:plewak.jeff@gmail.com?subject=Project%20inquiry",
  emailConsulting: "mailto:plewak.jeff@gmail.com?subject=Consulting%20inquiry",

  github: "https://github.com/carcodez1",
  linkedin: "https://www.linkedin.com/in/jeffreyplewak",
} as const;

export type SocialKey = "linkedin" | "github" | "email" | "calendly";

export const SOCIALS: readonly {
  key: SocialKey;
  href: string;
  label: string;
  icon: string;
  external: boolean;
}[] = [
  { key: "linkedin", href: LINKS.linkedin, label: "LinkedIn", icon: "/assets/icons/linkedin.svg", external: true },
  { key: "github", href: LINKS.github, label: "GitHub", icon: "/assets/icons/github.svg", external: true },
  { key: "email", href: LINKS.emailProject, label: "Email", icon: "/assets/icons/mail.svg", external: false },
  { key: "calendly", href: LINKS.calendly, label: "Calendly", icon: "/assets/icons/calendly.svg", external: true },
] as const;

export function extLinkProps(external: boolean) {
  return external ? ({ target: "_blank", rel: "noopener noreferrer" } as const) : ({} as const);
}
