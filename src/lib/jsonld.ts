// src/lib/jsonld.ts

export const SITE_URL = "https://www.jeffreyplewak.com" as const;

/**
 * Normalize base URL for stable @id values.
 * Ensures no trailing slash.
 */
function baseUrl(): string {
  return SITE_URL.replace(/\/+$/, "");
}

export function siteGraphJsonLd() {
  const base = baseUrl();
  const personId = `${base}/#person`;
  const websiteId = `${base}/#website`;
  const orgId = `${base}/#org`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": personId,
        name: "Jeffrey R. Plewak",
        url: base,
        jobTitle: "Senior Software Engineer",
        description:
          "Platform engineering, AI provenance systems, and reliability-focused backend architecture.",
        sameAs: [
          "https://github.com/carcodez1",
          "https://www.linkedin.com/in/jeffrey-plewak/",
        ],
      },
      {
        // Optional but helps connect “publisher” cleanly.
        "@type": "Organization",
        "@id": orgId,
        name: "Jeffrey R. Plewak",
        url: base,
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: base,
        name: "Jeffrey R. Plewak",
        description: "Platform engineering and deterministic AI systems.",
        publisher: { "@id": orgId },
      },
    ],
  };
}

export function kprovengineSourceCodeJsonLd() {
  const base = baseUrl();
  const personId = `${base}/#person`;

  return {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    name: "KProvEngine",
    description:
      "Deterministic provenance pipelines for AI-assisted, human-reviewed workflows with local-first execution and audit-grade artifacts.",
    codeRepository: "https://github.com/carcodez1/KProvEngine",
    programmingLanguage: "Python",
    author: { "@id": personId },
    datePublished: "2025-01-15",
    license: "https://github.com/carcodez1/KProvEngine/blob/main/LICENSE",
  };
}
