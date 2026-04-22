// src/app/sitemap.ts
import type { MetadataRoute } from "next";
import { SITE } from "@/config/site";

/**
 * sitemap.ts -> /sitemap.xml
 *
 * Policy:
 * - Canonical host MUST match SITE.url.
 * - Include all public routes.
 * - lastModified uses build time (acceptable; deterministic per build).
 */
const BUILD_TIME = new Date().toISOString();

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.url.replace(/\/+$/, "");

  const urls = [
    "/",
    "/r",
    "/projects",
    "/projects/codex",
    "/projects/kprovengine",
    "/resume",
    "/privacy",
    "/terms",
  ] as const;

  return urls.map((path) => ({
    url: `${base}${path}`,
    lastModified: BUILD_TIME,
  }));
}
