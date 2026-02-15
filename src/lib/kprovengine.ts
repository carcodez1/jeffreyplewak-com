import type { Metadata } from "next";
import { SITE_URL } from "./jsonld";

export const kprovengineMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "KProvEngine",
  description:
    "Deterministic provenance pipelines for AI-assisted, human-reviewed workflows.",
  openGraph: {
    type: "article",
    url: `${SITE_URL}/projects/kprovengine`,
    title: "KProvEngine",
    description:
      "Deterministic provenance pipelines for AI-assisted, human-reviewed workflows.",
    images: [{ url: "/projects/kprovengine/opengraph-image.png" }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/projects/kprovengine/opengraph-image.png"],
  },
};
