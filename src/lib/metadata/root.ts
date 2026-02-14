// src/lib/metadata/root.ts
import type { Metadata } from "next";
import { SITE_URL } from "@/lib/jsonld";

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
        url: "/og-image.png",
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
    images: ["/og-image.png"],
  },
  robots: { index: true, follow: true },
};
