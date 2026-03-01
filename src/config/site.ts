// src/config/site.ts
export const SITE = {
  name: "Jeffrey R. Plewak",
  shortName: "Jeff",
  title: "Senior Software Engineer",
  url: "https://www.jeffreyplewak.com",
} as const;

export const LINKS = {
  resumePdf: "/downloads/jeffrey-plewak-resume.pdf",
  emailProject: "mailto:plewak.jeff@gmail.com",
  github: "https://github.com/carcodez1",
  linkedin: "https://www.linkedin.com/in/jeffrey-plewak",
  calendly: "https://calendly.com/plewak-jeff",
} as const;

export function extLinkProps(external: boolean) {
  return external ? { target: "_blank", rel: "noopener noreferrer" } : {};
}
