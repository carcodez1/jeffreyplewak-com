import type { Metadata } from "next";
import { SITE_URL } from "@/lib/jsonld";

export const kprovengineMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "KProvEngine",
  description:
    "Deterministic provenance pipelines for AI-assisted, human-reviewed workflows.",
  openGraph: {
    type: "article",
    url: `${SITE_URL}/projects/kprovengine`,
    title: "KProvEngine",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og-image.png"],
  },
};
