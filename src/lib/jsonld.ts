export const SITE_URL = "https://jeffreyplewak.com";

export function siteGraphJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${SITE_URL}/#person`,
        name: "Jeffrey R. Plewak",
        url: SITE_URL,
        jobTitle: "Senior Software Engineer",
        description:
          "Platform engineering, AI provenance systems, and reliability-focused backend architecture.",
        sameAs: [
          "https://github.com/carcodez1",
          "https://www.linkedin.com/in/jeffrey-plewak/",
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: "Jeffrey R. Plewak",
        description: "Platform engineering and deterministic AI systems.",
        author: { "@id": `${SITE_URL}/#person` },
      },
    ],
  };
}

export function kprovengineSourceCodeJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    name: "KProvEngine",
    description:
      "Deterministic provenance pipelines for AI-assisted, human-reviewed workflows with local-first execution and audit-grade artifacts.",
    codeRepository: "https://github.com/carcodez1/KProvEngine",
    programmingLanguage: "Python",
    author: {
      "@type": "Person",
      name: "Jeffrey Plewak",
      url: SITE_URL,
    },
    datePublished: "2025-01-15",
    license: "https://github.com/carcodez1/KProvEngine/blob/main/LICENSE",
  };
}