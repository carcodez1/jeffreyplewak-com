import { describe, it, expect } from "vitest";
import { rootMetadata } from "@/lib/metadata/root";
import { SITE_URL } from "@/lib/jsonld";

type MaybeArray<T> = T | T[] | undefined;

function asArray<T>(v: MaybeArray<T>): T[] {
  if (!v) return [];
  return Array.isArray(v) ? v : [v];
}

function assertObject(value: unknown, label: string): asserts value is Record<string, unknown> {
  if (!value || typeof value !== "object") {
    throw new Error(`${label} is missing or not an object`);
  }
}

describe("rootMetadata", () => {
  it("canonical points at SITE_URL", () => {
    expect(rootMetadata.alternates?.canonical).toBe(SITE_URL);
  });

  it("OpenGraph has at least one image", () => {
    const images = asArray(rootMetadata.openGraph?.images);
    expect(images.length).toBeGreaterThan(0);
  });

  it("OpenGraph url matches SITE_URL (when present)", () => {
    const og = rootMetadata.openGraph;
    expect(og).toBeDefined();
    assertObject(og, "openGraph");

    // url is not guaranteed on every union member in Next's types, so narrow safely.
    if ("url" in og && og.url != null) {
      const u = og.url instanceof URL ? og.url.toString() : String(og.url);
      expect(u).toBe(SITE_URL);
    }
  });

  it("robots enables indexing (object or string form)", () => {
    const rb = rootMetadata.robots;
    expect(rb).toBeDefined();

    if (typeof rb === "string") {
      expect(rb.includes("index")).toBe(true);
      expect(rb.includes("follow")).toBe(true);
      return;
    }

    assertObject(rb, "robots");

    // Robots can be partial; assert what exists.
    if ("index" in rb) expect(Boolean(rb.index)).toBe(true);
    if ("follow" in rb) expect(Boolean(rb.follow)).toBe(true);
  });

  it("first OpenGraph image has usable url (and dimensions if object form)", () => {
    const images = asArray(rootMetadata.openGraph?.images);
    const first = images[0];
    expect(first).toBeDefined();

    if (typeof first === "string") {
      expect(first.length).toBeGreaterThan(0);
      return;
    }

    if (first instanceof URL) {
      expect(first.toString().length).toBeGreaterThan(0);
      return;
    }

    assertObject(first, "openGraph.images[0]");

    if (!("url" in first)) {
      throw new Error("openGraph.images[0] missing url");
    }

    const url = first.url instanceof URL ? first.url.toString() : String(first.url);
    expect(url.length).toBeGreaterThan(0);

    // width/height are not required by the type; only assert if present.
    if ("width" in first && first.width != null) expect(Number(first.width)).toBeGreaterThan(0);
    if ("height" in first && first.height != null) expect(Number(first.height)).toBeGreaterThan(0);
  });
});
