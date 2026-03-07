import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import RootLayout from "@/app/layout";
import KProvEnginePage from "@/app/projects/kprovengine/page";
import { PERSON_ID, SITE_URL, WEBSITE_ID, siteGraphJsonLd } from "@/lib/jsonld";

function parse(html: string) {
  return new DOMParser().parseFromString(html, "text/html");
}

describe("JSON-LD rendering", () => {
  it("keeps the root site JSON-LD graph nodes stable", async () => {
    const html = renderToStaticMarkup(
      await RootLayout({ children: createElement("div", null, "content") }),
    );
    expect(html).toContain("Skip to content");

    const payload = siteGraphJsonLd() as {
      "@context"?: string;
      "@graph"?: Array<Record<string, unknown>>;
    };
    expect(payload["@context"]).toBe("https://schema.org");
    const graph = Array.isArray(payload["@graph"]) ? payload["@graph"] : [];
    const base = SITE_URL.replace(/\/+$/, "");
    expect(graph.some((node) => node["@id"] === PERSON_ID && node["@type"] === "Person")).toBe(true);
    expect(graph.some((node) => node["@id"] === WEBSITE_ID && node["@type"] === "WebSite")).toBe(true);
    expect(
      graph.some(
        (node) =>
          node["@id"] === `${base}/resume#page` &&
          node["@type"] === "WebPage" &&
          node.url === `${base}/resume`,
      ),
    ).toBe(true);
  });

  it("renders KProvEngine JSON-LD with SoftwareSourceCode and normalized author id", async () => {
    const html = renderToStaticMarkup(await KProvEnginePage());
    const doc = parse(html);
    const script = doc.querySelector('script[type="application/ld+json"]');

    expect(script).toBeTruthy();

    const payload = JSON.parse(script?.textContent ?? "{}") as Record<string, unknown>;
    expect(payload["@type"]).toBe("SoftwareSourceCode");
    expect(payload.name).toBe("KProvEngine");
    expect((payload.author as { "@id"?: string } | undefined)?.["@id"]).toBe(PERSON_ID);
  });
});
