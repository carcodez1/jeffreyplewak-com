import { describe, it, expect } from "vitest";
import { rootMetadata } from "@/lib/metadata/root";
import { SITE_URL } from "@/lib/jsonld";

type MaybeArray<T> = T | T[] | undefined;

function asArray<T>(v: MaybeArray<T>): T[] {
  if (!v) return [];
  return Array.isArray(v) ? v : [v];
}

describe("rootMetadata", () => {
  it("has correct canonical URL", () => {
    expect(rootMetadata.alternates?.canonical).toBe(SITE_URL);
  });

  it("has OpenGraph configuration", () => {
    expect(rootMetadata.openGraph?.type).toBe("website");
    expect(rootMetadata.openGraph?.url).toBe(SITE_URL);
  });

  it("includes at least one OpenGraph image", () => {
    const images = asArray(rootMetadata.openGraph?.images);
    expect(images.length).toBeGreaterThan(0);
  });

  it("includes twitter card config", () => {
    expect(rootMetadata.twitter?.card).toBe("summary_large_image");
  });

  it("enables indexing", () => {
    expect(rootMetadata.robots?.index).toBe(true);
    expect(rootMetadata.robots?.follow).toBe(true);
  });

  it("OpenGraph image has required dimensions", () => {
    const images = asArray(rootMetadata.openGraph?.images);
    const img = images[0] as any;

    expect(img.url).toBeDefined();
    expect(img.width).toBeGreaterThan(0);
    expect(img.height).toBeGreaterThan(0);
  });
});
