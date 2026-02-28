// src/config/site.ts
export const SITE = {
  url: "https://www.jeffreyplewak.com",
  name: "Jeffrey R. Plewak",
  shortName: "Jeff",
  title: "Senior Software Engineer",
  locationLine: "Remote-first • North Carolina",
  locale: "en_US",
  footerBlurb:
    "Senior Software Engineer — platform, full-stack, compliance-critical systems.",
} as const;

export const LINKS = {
  calendly: "https://calendly.com/plewak-jeff",
  resumePdf: "/downloads/jeffrey-plewak-resume.pdf",
  emailProject: "mailto:plewak.jeff@gmail.com?subject=Project%20inquiry",
  emailConsulting: "mailto:plewak.jeff@gmail.com?subject=Consulting%20inquiry",
  github: "https://github.com/carcodez1",
  linkedin: "https://www.linkedin.com/in/jeffreyplewak",
  vcf: "/downloads/jeffrey-plewak.vcf",
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
