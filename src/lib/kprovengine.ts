import type { Metadata } from "next";
import { SITE_URL } from "./jsonld";
import { KPROVENGINE_OG_IMAGES, KPROVENGINE_TWITTER_IMAGES } from "./metadata/images";

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
    images: KPROVENGINE_OG_IMAGES,
  },
  twitter: {
    card: "summary_large_image",
    images: KPROVENGINE_TWITTER_IMAGES,
  },
};
