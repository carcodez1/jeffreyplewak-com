import { describe, expect, it } from "vitest";
import type { Metadata } from "next";
import sitemap from "@/app/sitemap";
import { metadata as homeMetadata } from "@/app/page";
import { metadata as resumeMetadata } from "@/app/resume/page";
import { metadata as recruiterMetadata } from "@/app/r/page";
import { metadata as projectsMetadata } from "@/app/projects/page";
import { metadata as codexMetadata } from "@/app/projects/codex/page";
import { metadata as kprovMetadata } from "@/app/projects/kprovengine/page";
import { SITE } from "@/config/site";
import { siteGraphJsonLd } from "@/lib/jsonld";

function toNonEmptyString(value: unknown): string {
  if (typeof value === "string") return value;
  if (value instanceof URL) return value.toString();
  if (value && typeof value === "object" && "toString" in value && typeof value.toString === "function") {
    return value.toString();
  }
  return "";
}

function assertRouteMetadata(md: Metadata) {
  const canonical = md.alternates?.canonical;
  expect(toNonEmptyString(canonical).length).toBeGreaterThan(0);

  const ogTitle = md.openGraph?.title;
  expect(toNonEmptyString(ogTitle).length).toBeGreaterThan(0);

  const ogDescription = md.openGraph?.description;
  expect(toNonEmptyString(ogDescription).length).toBeGreaterThan(0);

  const ogUrl = md.openGraph?.url;
  expect(toNonEmptyString(ogUrl).length).toBeGreaterThan(0);

  const twitterTitle = md.twitter?.title;
  expect(toNonEmptyString(twitterTitle).length).toBeGreaterThan(0);

  const twitterDescription = md.twitter?.description;
  expect(toNonEmptyString(twitterDescription).length).toBeGreaterThan(0);
}

describe("seo route contract", () => {
  it("keeps sitemap discovery path for recruiter funnel", () => {
    const entries = sitemap();
    const urls = entries.map((item) => item.url);
    expect(urls).toContain(`${SITE.url}/r`);
  });

  it("keeps identity/proof routes with canonical + OG + Twitter metadata", () => {
    const routeMetadata: Metadata[] = [
      homeMetadata,
      resumeMetadata,
      recruiterMetadata,
      projectsMetadata,
      codexMetadata,
      kprovMetadata,
    ];

    for (const md of routeMetadata) {
      assertRouteMetadata(md);
    }
  });

  it("keeps JSON-LD graph route nodes for canonical identity surfaces", () => {
    const graph = siteGraphJsonLd();
    const nodes = Array.isArray(graph["@graph"]) ? graph["@graph"] : [];

    const pageIds = nodes
      .filter((node) => node["@type"] === "WebPage")
      .map((node) => String(node["@id"] ?? ""));

    expect(pageIds).toEqual(
      expect.arrayContaining([
        `${SITE.url}/#home`,
        `${SITE.url}/resume#page`,
        `${SITE.url}/r#page`,
        `${SITE.url}/projects#page`,
        `${SITE.url}/projects/codex#page`,
        `${SITE.url}/projects/kprovengine#page`,
      ]),
    );
  });
});
