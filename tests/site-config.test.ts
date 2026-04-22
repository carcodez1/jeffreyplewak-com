import { describe, expect, it } from "vitest";
import { PROJECT_LINKS } from "@/config/site";

describe("site config invariants", () => {
  it("keeps KProvEngine links concrete and placeholder-free", () => {
    expect(PROJECT_LINKS.kprovengine).toEqual({
      home: "/projects",
      repo: "https://github.com/carcodez1/KProvEngine",
      readme: "https://github.com/carcodez1/KProvEngine#readme",
      archDoc: "/projects/kprovengine/architecture.svg",
    });

    for (const value of Object.values(PROJECT_LINKS.kprovengine)) {
      expect(value).not.toContain("REPLACE_ME");
    }
  });
});
