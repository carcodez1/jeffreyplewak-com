// src/lib/metadata/root.ts
import type { Metadata } from "next";
import { SITE_URL } from "@/lib/jsonld";

/**
 * Root metadata must use absolute URLs for canonical + OpenGraph URL.
 * Tests enforce that canonical and OG url equal SITE_URL.
 *
 * Hardening:
 * - Use absolute OG/Twitter image URLs to avoid host ambiguity in preview bots.
 */
export const rootMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Jeffrey R. Plewak — Senior Software Engineer",
    template: "%s — Jeffrey R. Plewak",
  },
  description:
    "Platform engineering, AI provenance systems, and reliability-focused backend architecture.",
  alternates: { canonical: SITE_URL },
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: "Jeffrey R. Plewak — Senior Software Engineer",
    description:
      "Platform engineering, deterministic AI systems, and compliance-focused backend architecture.",
    siteName: "Jeffrey R. Plewak",
    locale: "en_US",
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Jeffrey R. Plewak — Senior Software Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jeffrey R. Plewak — Senior Software Engineer",
    description:
      "Platform engineering, deterministic AI systems, and compliance-focused backend architecture.",
    images: [`${SITE_URL}/og-image.png`],
  },
  robots: { index: true, follow: true },
};
