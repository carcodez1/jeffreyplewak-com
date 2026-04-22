// src/config/site.ts
export const SITE = {
  url: "https://www.jeffreyplewak.com",
  name: "Jeffrey R. Plewak",
  shortName: "Jeffrey",
  title: "Senior Software Engineer — Platform, Compliance & Production Systems",
  locationLine: "Remote first • North Carolina",
  locale: "en_US",
  footerBlurb: "Senior Software Engineer. Platform, full stack, and compliance focused systems.",
} as const;

export const LINKS = {
  calendly: "https://calendly.com/plewak-jeff",
  resumePdf: "/downloads/jeffrey-plewak-resume.pdf",
  vcf: "/downloads/jeffrey-plewak.vcf",

  emailProject: "mailto:plewak.jeff@gmail.com",
  emailConsulting: "mailto:plewak.jeff@gmail.com",

  github: "https://github.com/carcodez1",
  linkedin: "https://www.linkedin.com/in/jeffreyplewak/",
} as const;

export type SocialKey = "linkedin" | "github" | "email" | "calendly";

export const SOCIALS: ReadonlyArray<{
  key: SocialKey;
  href: string;
  label: string;
  icon: string;
  external: boolean;
}> = [
  { key: "linkedin", href: LINKS.linkedin, label: "LinkedIn", icon: "/assets/icons/linkedin.svg", external: true },
  { key: "github", href: LINKS.github, label: "GitHub", icon: "/assets/icons/github.svg", external: true },
  { key: "email", href: LINKS.emailProject, label: "Email", icon: "/assets/icons/mail.svg", external: false },
  { key: "calendly", href: LINKS.calendly, label: "Calendly", icon: "/assets/icons/calendly.svg", external: true },
] as const;

export function extLinkProps(external: boolean) {
  return external ? { target: "_blank", rel: "noopener noreferrer" } : {};
}
export const PROJECT_LINKS = {
  kprovengine: {
    home: "/projects",
    repo: "https://github.com/carcodez1/KProvEngine",
    readme: "https://github.com/carcodez1/KProvEngine#readme",
    archDoc: "/projects/kprovengine/architecture.svg",
  },
} as const;
