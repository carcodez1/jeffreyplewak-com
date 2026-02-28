// src/lib/social.ts

export const LINKS = {
  siteUrl: "https://www.jeffreyplewak.com",
  github: "https://github.com/carcodez1",
  linkedin: "https://www.linkedin.com/in/jeffreyplewak",
  emailProject: "mailto:plewak.jeff@gmail.com?subject=Project%20inquiry",
  emailConsulting: "mailto:plewak.jeff@gmail.com?subject=Consulting%20inquiry",
  calendly: "https://calendly.com/plewak-jeff",
  resumePdf: "/downloads/jeffrey-plewak-resume.pdf",
  vcf: "/downloads/jeffrey-plewak.vcf",
} as const;

export function extProps(external: boolean) {
  return external ? { target: "_blank", rel: "noopener noreferrer" } : {};
}
