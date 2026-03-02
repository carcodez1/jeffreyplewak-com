// src/app/robots.ts
import type { MetadataRoute } from "next";
import { SITE } from "@/config/site";

/**
 * robots.ts -> /robots.txt (App Router)
 *
 * Policy:
 * - Universal defaults: block all indexing when not production.
 * - Production: allow crawling of public portfolio content.
 * - Use a single canonical host (SITE.url).
 *
 * Notes:
 * - robots directives control crawling; not licensing/training rights.
 * - Keep this deterministic and test-friendly.
 */
export default function robots(): MetadataRoute.Robots {
  const base = SITE.url.replace(/\/+$/, "");

  const isProd =
    process.env.NODE_ENV === "production" &&
    process.env.VERCEL_ENV !== "preview" &&
    process.env.VERCEL_ENV !== "development";

  if (!isProd) {
    return {
      rules: { userAgent: "*", disallow: "/" },
      sitemap: `${base}/sitemap.xml`,
    };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/private/", "/admin/", "/api/"],
    },
    sitemap: `${base}/sitemap.xml`,
  };
}
