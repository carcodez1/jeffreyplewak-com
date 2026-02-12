// tests/routes.test.ts
import { describe, expect, it } from "vitest";

function parse(html: string) {
  return new DOMParser().parseFromString(html, "text/html");
}

describe("routes", () => {
  it("basic DOM parse works in jsdom", () => {
    const html = `<!doctype html><html><body><h1>ok</h1></body></html>`;
    const doc = parse(html);
    expect(doc.querySelector("h1")?.textContent).toBe("ok");
  });
});