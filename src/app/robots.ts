// src/app/robots.ts
import type { MetadataRoute } from "next";
import { SITE } from "@/config/site";

/**
 * robots.ts -> /robots.txt
 *
 * Test alignment:
 * - In non-production, return ONLY { rules: { userAgent:'*', disallow:'/' } }
 * - In production, return object rules with allow/disallow and sitemap.
 *
 * Universal deployment:
 * - Works on Vercel (optional VERCEL_ENV) and other hosts.
 */
export default function robots(): MetadataRoute.Robots {
  const base = SITE.url.replace(/\/+$/, "");

  const nodeEnv = process.env.NODE_ENV;
  const vercelEnv = process.env.VERCEL_ENV; // optional
  const isProd = nodeEnv === "production" && vercelEnv !== "preview" && vercelEnv !== "development";

  if (!isProd) {
    // Block indexing on dev/preview/staging by default
    return {
      rules: {
        userAgent: "*",
        disallow: "/",
      },
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
