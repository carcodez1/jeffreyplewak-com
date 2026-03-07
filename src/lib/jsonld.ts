// src/lib/jsonld.ts
import { LINKS, SITE } from "@/config/site";

export const SITE_URL = SITE.url;
export const LINKEDIN_URL = LINKS.linkedin;
export const GITHUB_URL = LINKS.github;
export const PERSON_ID = `${SITE_URL.replace(/\/+$/, "")}/#jeffrey-r-plewak`;
export const WEBSITE_ID = `${SITE_URL.replace(/\/+$/, "")}/#website`;

/**
 * Normalize base URL for stable @id values (no trailing slash).
 */
function baseUrl(): string {
  return SITE_URL.replace(/\/+$/, "");
}

export function siteGraphJsonLd() {
  const base = baseUrl();

  const personId = PERSON_ID;
  const websiteId = WEBSITE_ID;
  const orgId = `${base}/#org`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": personId,
        name: SITE.name,
        url: base,
        jobTitle: SITE.title,
        sameAs: [GITHUB_URL, LINKEDIN_URL],
      },
      {
        "@type": "Organization",
        "@id": orgId,
        name: SITE.name,
        url: base,
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: base,
        name: SITE.name,
        inLanguage: "en-US",
        publisher: { "@id": orgId },
      },
      {
        "@type": "WebPage",
        "@id": `${base}/#home`,
        url: base,
        name: `${SITE.name} — ${SITE.title}`,
        isPartOf: { "@id": websiteId },
        inLanguage: "en-US",
        mainEntity: { "@id": personId },
      },
      {
        "@type": "WebPage",
        "@id": `${base}/resume#page`,
        url: `${base}/resume`,
        name: `Resume — ${SITE.name}`,
        isPartOf: { "@id": websiteId },
        inLanguage: "en-US",
      },
      {
        "@type": "WebPage",
        "@id": `${base}/r#page`,
        url: `${base}/r`,
        name: `Recruiter Decision Page — ${SITE.name}`,
        isPartOf: { "@id": websiteId },
        inLanguage: "en-US",
      },
      {
        "@type": "WebPage",
        "@id": `${base}/projects#page`,
        url: `${base}/projects`,
        name: `Projects — ${SITE.name}`,
        isPartOf: { "@id": websiteId },
        inLanguage: "en-US",
      },
      {
        "@type": "WebPage",
        "@id": `${base}/projects/kprovengine#page`,
        url: `${base}/projects/kprovengine`,
        name: "KProvEngine — Proof Case Study for Human-Reviewed AI Workflows",
        isPartOf: { "@id": websiteId },
        inLanguage: "en-US",
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
    author: { "@id": PERSON_ID },
    // NOTE: keep or remove; you should only assert dates you can defend.
    datePublished: "2025-01-15",
    license: "https://github.com/carcodez1/KProvEngine/blob/main/LICENSE",
  };
}
