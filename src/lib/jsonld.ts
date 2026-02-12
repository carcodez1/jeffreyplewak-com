export const SITE_URL = "https://www.jeffreyplewak.com";
export const WEBSITE_ID = `${SITE_URL}#website`;
export const PERSON_ID = `${SITE_URL}#person`;

const CALENDLY_URL = "https://calendly.com/plewak-jeff/intro";

export function siteGraphJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        url: SITE_URL,
        name: "Jeffrey R. Plewak",
        inLanguage: "en-US",
        description:
          "Senior software engineer focused on platform, full-stack, and compliance-critical systems.",
        publisher: { "@id": PERSON_ID }
      },
      {
        "@type": "Person",
        "@id": PERSON_ID,
        name: "Jeffrey R. Plewak",
        url: SITE_URL,
        jobTitle: "Senior Software Engineer",
        image: `${SITE_URL}/assets/images/jeffrey-plewak-portrait.jpg`,
        sameAs: [
          "https://www.linkedin.com/in/jeffreyplewak",
          "https://github.com/carcodez1"
        ],

        // ✅ Explicit booking signal
        potentialAction: {
          "@type": "ScheduleAction",
          name: "Schedule an introductory call",
          target: {
            "@type": "EntryPoint",
            urlTemplate: CALENDLY_URL
          }
        }
      }
    ]
  } as const;
}

export function kprovengineSourceCodeJsonLd() {
  const pageUrl = `${SITE_URL}/projects/kprovengine`;
  const codeId = `${pageUrl}#sourcecode`;

  return {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    "@id": codeId,
    name: "KProvEngine",
    description:
      "Deterministic provenance pipelines for AI-assisted, human-reviewed workflows. Local-first execution, explicit review, and audit-grade run artifacts.",
    url: pageUrl,
    isPartOf: { "@id": WEBSITE_ID },
    author: { "@id": PERSON_ID },
    codeRepository: "https://github.com/carcodez1/KProvEngine",
    programmingLanguage: "Python"
  } as const;
}