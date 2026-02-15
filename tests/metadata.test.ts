// tests/root.metadata.test.ts
import { describe, expect, it } from "vitest";
import type { Metadata } from "next";

import { rootMetadata } from "@/lib/metadata/root";
import { SITE_URL } from "@/lib/jsonld";

type MaybeArray<T> = T | T[] | undefined;

function asArray<T>(v: MaybeArray<T>): T[] {
  if (!v) return [];
  return Array.isArray(v) ? v : [v];
}

describe("rootMetadata", () => {
  it("uses SITE_URL for metadataBase and canonical", () => {
    const md: Metadata = rootMetadata;
    expect(md.metadataBase?.toString()).toBe(new URL(SITE_URL).toString());
    expect(md.alternates?.canonical).toBe(SITE_URL);
  });

  it("has OpenGraph images", () => {
    const md: Metadata = rootMetadata;
    const imgs = asArray(md.openGraph?.images as MaybeArray<unknown>);
    expect(imgs.length).toBeGreaterThan(0);
  });

  it("robots is index/follow", () => {
    const md: Metadata = rootMetadata;
    expect(md.robots).toEqual({ index: true, follow: true });
  });
});
