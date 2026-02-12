export const SITE_URL = "https://www.jeffreyplewak.com";

export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Jeffrey R. Plewak",
    url: SITE_URL,
    jobTitle: "Senior Software Engineer",
    sameAs: [
      "https://www.linkedin.com/in/jeffreyplewak",
      "https://github.com/carcodez1"
    ]
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    url: SITE_URL,
    name: "Jeffrey R. Plewak",
    description:
      "Senior software engineer focused on platform, full-stack, and compliance-critical systems."
  };
}
