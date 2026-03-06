import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const repoRoot = path.resolve(__dirname, "..");
const aiTxtPath = path.join(repoRoot, "public", ".well-known", "ai.txt");
const securityTxtPath = path.join(repoRoot, "public", ".well-known", "security.txt");

describe("well-known discovery files", () => {
  it("keeps ai.txt with sitemap and primary discovery routes", () => {
    const text = fs.readFileSync(aiTxtPath, "utf8");
    expect(text).toContain("Sitemap: https://www.jeffreyplewak.com/sitemap.xml");
    expect(text).toContain("Canonical-Resume: https://www.jeffreyplewak.com/resume");
    expect(text).toContain("Recruiter-Route: https://www.jeffreyplewak.com/r");
    expect(text).toContain("Proof-Route: https://www.jeffreyplewak.com/projects/kprovengine");
    expect(text).toContain("Contact: mailto:plewak.jeff@gmail.com");
  });

  it("keeps security.txt with canonical and contact", () => {
    const text = fs.readFileSync(securityTxtPath, "utf8");
    expect(text).toContain("Canonical: https://www.jeffreyplewak.com/.well-known/security.txt");
    expect(text).toContain("Contact: mailto:plewak.jeff@gmail.com");
  });
});
