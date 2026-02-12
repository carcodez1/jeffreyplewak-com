// tests/jsonld.test.ts
import { describe, expect, it } from "vitest";
import { siteGraphJsonLd, SITE_URL, PERSON_ID, WEBSITE_ID } from "@/lib/jsonld";

describe("JSON-LD", () => {
  it("emits WebSite and Person nodes with stable IDs", () => {
    const g = siteGraphJsonLd();

    expect(g["@context"]).toBe("https://schema.org");
    expect(Array.isArray(g["@graph"])).toBe(true);

    const website = g["@graph"].find((n) => n["@id"] === WEBSITE_ID);
    const person = g["@graph"].find((n) => n["@id"] === PERSON_ID);

    expect(website).toBeTruthy();
    expect(person).toBeTruthy();

    expect(website["@type"]).toBe("WebSite");
    expect(website.url).toBe(SITE_URL);

    expect(person["@type"]).toBe("Person");
    expect(person.url).toBe(SITE_URL);
  });
});