// src/lib/metadata/root.ts
import type { Metadata } from "next";
import { SITE_URL } from "@/lib/jsonld";

/**
 * Root metadata:
 * - Keep robots minimal here to satisfy unit tests and avoid over-coupling.
 * - Bot-specific directives belong in /robots.txt (src/app/robots.ts).
 * - Use absolute URLs for canonical + OG/Twitter.
 */
export const rootMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  applicationName: "Jeffrey R. Plewak",
  authors: [{ name: "Jeffrey R. Plewak", url: SITE_URL }],
  creator: "Jeffrey R. Plewak",
  publisher: "Jeffrey R. Plewak",

  title: {
    default: "Jeffrey R. Plewak — Senior Software Engineer",
    template: "%s — Jeffrey R. Plewak",
  },

  description:
    "Senior software engineer specializing in backend systems, platform architecture, deterministic AI systems, and compliance-focused engineering.",

  alternates: { canonical: SITE_URL },

  // IMPORTANT: keep minimal to satisfy tests (md.robots deep equals {index,follow})
  robots: { index: true, follow: true },

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

  referrer: "strict-origin-when-cross-origin",
  formatDetection: {
    telephone: false,
    address: false,
    email: false,
  },
};
