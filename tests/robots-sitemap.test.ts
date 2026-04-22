import { describe, expect, it } from "vitest";
import robots from "@/app/robots";
import sitemap from "@/app/sitemap";
import { SITE } from "@/config/site";

function setEnv(key: "NODE_ENV" | "VERCEL_ENV", value: string | undefined) {
  (process.env as Record<string, string | undefined>)[key] = value;
}

describe("robots and sitemap contract", () => {
  it("blocks indexing outside production", () => {
    const prevNodeEnv = process.env.NODE_ENV;
    const prevVercelEnv = process.env.VERCEL_ENV;
    setEnv("NODE_ENV", "development");
    setEnv("VERCEL_ENV", "development");

    const rb = robots();

    setEnv("NODE_ENV", prevNodeEnv);
    setEnv("VERCEL_ENV", prevVercelEnv);

    expect(rb).toEqual({
      rules: {
        userAgent: "*",
        disallow: "/",
      },
    });
  });

  it("allows indexing in production and links sitemap", () => {
    const prevNodeEnv = process.env.NODE_ENV;
    const prevVercelEnv = process.env.VERCEL_ENV;
    setEnv("NODE_ENV", "production");
    setEnv("VERCEL_ENV", "production");

    const rb = robots();

    setEnv("NODE_ENV", prevNodeEnv);
    setEnv("VERCEL_ENV", prevVercelEnv);

    expect(rb.sitemap).toBe(`${SITE.url}/sitemap.xml`);
    expect(rb.rules).toMatchObject({
      userAgent: "*",
      allow: "/",
    });
  });

  it("keeps sitemap URLs on canonical host", () => {
    const entries = sitemap();
    expect(entries.length).toBeGreaterThan(0);
    expect(entries.some((entry) => entry.url === `${SITE.url}/projects/codex`)).toBe(true);

    for (const entry of entries) {
      expect(entry.url.startsWith(`${SITE.url}/`)).toBe(true);
      const lastModified = entry.lastModified;
      expect(lastModified == null).toBe(false);
      if (lastModified == null) {
        throw new Error("sitemap entry missing lastModified");
      }
      const normalized = typeof lastModified === "string" ? lastModified : lastModified.toISOString();
      expect(normalized.length).toBeGreaterThan(0);
    }
  });
});
