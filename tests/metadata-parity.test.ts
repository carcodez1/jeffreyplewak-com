import { describe, expect, it } from "vitest";
import { metadata as homeMetadata } from "@/app/page";
import { metadata as resumeMetadata } from "@/app/resume/page";
import { metadata as recruiterMetadata } from "@/app/r/page";
import { metadata as projectsMetadata } from "@/app/projects/page";
import { metadata as codexMetadata } from "@/app/projects/codex/page";
import { metadata as kprovMetadata } from "@/app/projects/kprovengine/page";
import { rootMetadata } from "@/lib/metadata/root";

function toStringValue(value: unknown): string {
  if (typeof value === "string") return value;
  if (value instanceof URL) return value.toString();
  return "";
}

function toKeywordList(value: unknown): string[] {
  if (Array.isArray(value)) return value.map((entry) => String(entry).toLowerCase());
  if (typeof value === "string") return [value.toLowerCase()];
  return [];
}

function assertRouteMetadataParity(label: string, metadata: Record<string, unknown>) {
  const title = toStringValue(metadata.title);
  const canonical = toStringValue((metadata.alternates as { canonical?: unknown } | undefined)?.canonical);
  const openGraph = metadata.openGraph as { title?: unknown; description?: unknown; url?: unknown } | undefined;
  const twitter = metadata.twitter as { title?: unknown; description?: unknown } | undefined;

  expect(title, `${label} title`).not.toBe("");
  expect(canonical, `${label} canonical`).not.toBe("");
  expect(toStringValue(openGraph?.title), `${label} og title`).toBe(title);
  expect(toStringValue(openGraph?.description), `${label} og description`).not.toBe("");
  expect(toStringValue(openGraph?.url), `${label} og url`).toBe(canonical);
  expect(toStringValue(twitter?.title), `${label} twitter title`).toBe(title);
  expect(toStringValue(twitter?.description), `${label} twitter description`).not.toBe("");
}

describe("route metadata parity", () => {
  it("keeps canonical, OpenGraph, and Twitter metadata aligned on primary routes", () => {
    assertRouteMetadataParity("home", homeMetadata as Record<string, unknown>);
    assertRouteMetadataParity("resume", resumeMetadata as Record<string, unknown>);
    assertRouteMetadataParity("recruiter", recruiterMetadata as Record<string, unknown>);
    assertRouteMetadataParity("projects", projectsMetadata as Record<string, unknown>);
    assertRouteMetadataParity("codex", codexMetadata as Record<string, unknown>);
    assertRouteMetadataParity("kprovengine", kprovMetadata as Record<string, unknown>);
  });

  it("removes stale architect positioning from root and home metadata", () => {
    const rootDescription = toStringValue(rootMetadata.description);
    const rootKeywords = toKeywordList(rootMetadata.keywords);
    const homeDescription = toStringValue(homeMetadata.description);
    const homeKeywords = toKeywordList(homeMetadata.keywords);

    expect(rootDescription.toLowerCase()).not.toContain("architect");
    expect(homeDescription.toLowerCase()).not.toContain("architect");
    expect(rootKeywords).not.toContain("software architect");
    expect(homeKeywords).not.toContain("software architect portfolio");
  });
});
