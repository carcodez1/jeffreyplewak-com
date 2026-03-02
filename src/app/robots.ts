// src/app/robots.ts
import type { MetadataRoute } from "next";
import { SITE } from "@/config/site";

/**
 * robots.ts -> /robots.txt (App Router)
 *
 * Policy:
 * - Use ONE canonical host everywhere (SITE.url).
 * - Allow crawling of public portfolio content.
 * - Block any future private area prefix.
 *
 * NOTE:
 * - robots directives control crawling. They do NOT grant/deny training rights as a legal license.
 *   If you want an explicit license statement, publish it on a page (e.g., /terms) and link it.
 */
export default function robots(): MetadataRoute.Robots {
  const base = SITE.url.replace(/\/+$/, "");

  return {
    rules: [
      // AI crawlers (explicit allow; block /private/)
      { userAgent: "GPTBot", allow: "/", disallow: "/private/" },
      { userAgent: "Google-Extended", allow: "/", disallow: "/private/" },
      { userAgent: "Applebot-Extended", allow: "/", disallow: "/private/" },
      { userAgent: "ClaudeBot", allow: "/", disallow: "/private/" },

      // Default
      { userAgent: "*", allow: "/", disallow: "/private/" },
    ],
    sitemap: `${base}/sitemap.xml`,
  };
}
