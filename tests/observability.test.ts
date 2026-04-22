import { describe, expect, it } from "vitest";
import {
  filterObservabilityEvent,
  getObservabilityPathname,
  isPublicProductionObservabilityEnv,
} from "@/lib/observability";

describe("observability guards", () => {
  it("enables observability only for public production environments", () => {
    expect(isPublicProductionObservabilityEnv({ NODE_ENV: "production" })).toBe(true);
    expect(isPublicProductionObservabilityEnv({ NODE_ENV: "production", VERCEL_ENV: "production" })).toBe(true);
    expect(isPublicProductionObservabilityEnv({ NODE_ENV: "development" })).toBe(false);
    expect(isPublicProductionObservabilityEnv({ NODE_ENV: "production", VERCEL_ENV: "preview" })).toBe(false);
    expect(isPublicProductionObservabilityEnv({ NODE_ENV: "production", VERCEL_ENV: "development" })).toBe(false);
  });

  it("normalizes relative and absolute URLs to pathnames", () => {
    expect(getObservabilityPathname("/projects/codex?mode=evidence")).toBe("/projects/codex");
    expect(getObservabilityPathname("https://www.jeffreyplewak.com/r?source=linkedin")).toBe("/r");
  });

  it("drops analytics and speed events for non-public and internal paths", () => {
    expect(filterObservabilityEvent({ type: "pageview", url: "/api/health" })).toBeNull();
    expect(filterObservabilityEvent({ type: "pageview", url: "/admin" })).toBeNull();
    expect(filterObservabilityEvent({ type: "pageview", url: "/private/dashboard" })).toBeNull();
    expect(filterObservabilityEvent({ type: "pageview", url: "/downloads/recruiter-pack/index.html" })).toBeNull();
    expect(filterObservabilityEvent({ type: "vital", url: "/_vercel/speed-insights/script.js" })).toBeNull();
  });

  it("keeps public route events intact", () => {
    expect(filterObservabilityEvent({ type: "pageview", url: "/" })).toEqual({ type: "pageview", url: "/" });
    expect(filterObservabilityEvent({ type: "vital", url: "https://www.jeffreyplewak.com/projects/kprovengine" })).toEqual({
      type: "vital",
      url: "https://www.jeffreyplewak.com/projects/kprovengine",
    });
  });
});
