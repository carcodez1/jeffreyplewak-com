// src/lib/metadata/root.ts
import type { Metadata } from "next";
import { SITE_URL } from "@/lib/jsonld";
import { DEFAULT_OG_IMAGES, DEFAULT_TWITTER_IMAGES } from "@/lib/metadata/images";

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
    default: "Jeffrey R. Plewak — Senior Software Engineer — Platform, Compliance & Production Systems",
    template: "%s — Jeffrey R. Plewak",
  },

  description:
    "Senior software engineer specializing in platform systems, compliance-aware delivery, deterministic AI systems, and production-grade backend engineering.",
  keywords: [
    "Jeffrey R. Plewak",
    "senior software engineer",
    "platform systems",
    "backend engineering",
    "production systems",
    "distributed systems",
    "AI systems",
    "LLM infrastructure",
    "compliance-aware delivery",
    "recruiter-ready portfolio",
  ],

  alternates: { canonical: SITE_URL },
  manifest: "/assets/favicon/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.ico", type: "image/x-icon" },
      { url: "/assets/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/assets/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      {
        url: "/assets/favicon/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
    shortcut: ["/favicon.ico"],
  },

  // IMPORTANT: keep minimal to satisfy tests (md.robots deep equals {index,follow})
  robots: { index: true, follow: true },

  openGraph: {
    type: "website",
    url: SITE_URL,
    title: "Jeffrey R. Plewak — Senior Software Engineer — Platform, Compliance & Production Systems",
    description:
      "Platform systems, compliance-aware delivery, deterministic AI systems, and production-grade backend engineering.",
    siteName: "Jeffrey R. Plewak",
    locale: "en_US",
    images: DEFAULT_OG_IMAGES,
  },

  twitter: {
    card: "summary_large_image",
    title: "Jeffrey R. Plewak — Senior Software Engineer — Platform, Compliance & Production Systems",
    description:
      "Platform systems, compliance-aware delivery, deterministic AI systems, and production-grade backend engineering.",
    images: DEFAULT_TWITTER_IMAGES,
  },

  referrer: "strict-origin-when-cross-origin",
  formatDetection: {
    telephone: false,
    address: false,
    email: false,
  },
};
