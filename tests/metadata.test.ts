// tests/metadata.test.ts
import { describe, expect, it } from "vitest";

import { metadata as rootMetadata } from "../src/app/layout";
import { metadata as kprovMetadata } from "../src/app/projects/kprovengine/page";

type MaybeArray<T> = T | T[] | undefined;

function asArray<T>(v: MaybeArray<T>): T[] {
  if (!v) return [];
  return Array.isArray(v) ? v : [v];
}

describe("metadata", () => {
  it("root has OpenGraph image", () => {
    const imgs = asArray(rootMetadata.openGraph?.images as MaybeArray<unknown>);
    expect(imgs.length).toBeGreaterThan(0);
  });

  it("kprovengine has OpenGraph image", () => {
    const imgs = asArray(kprovMetadata.openGraph?.images as MaybeArray<unknown>);
    expect(imgs.length).toBeGreaterThan(0);
  });
});