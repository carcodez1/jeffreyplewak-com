import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { describe, expect, it } from "vitest";

const repoRoot = path.resolve(__dirname, "..");
const recruiterPackDir = path.join(repoRoot, "public/downloads/recruiter-pack");
const recruiterPackIndexPath = path.join(recruiterPackDir, "index.html");
const recruiterPackManifestPath = path.join(recruiterPackDir, "manifest.json");

function sha256File(file: string): string {
  const data = fs.readFileSync(file);
  return crypto.createHash("sha256").update(data).digest("hex");
}

describe("recruiter pack artifacts", () => {
  it("publishes required recruiter-pack files", () => {
    const required = [
      "index.html",
      "copy-paste-resume.txt",
      "skills-matrix.csv",
      "search-report.md",
      "resume.pdf",
      "resume.json",
      "manifest.json",
      "contact.vcf",
    ];

    for (const file of required) {
      const abs = path.join(recruiterPackDir, file);
      expect(fs.existsSync(abs)).toBe(true);
      expect(fs.statSync(abs).size).toBeGreaterThan(0);
    }
  });

  it("provides a recruiter-pack index with direct links to all core artifacts", () => {
    const html = fs.readFileSync(recruiterPackIndexPath, "utf8");

    expect(html).toContain("Recruiter Pack");
    expect(html).toContain("/downloads/recruiter-pack/copy-paste-resume.txt");
    expect(html).toContain("/downloads/recruiter-pack/skills-matrix.csv");
    expect(html).toContain("/downloads/recruiter-pack/search-report.md");
    expect(html).toContain("/downloads/recruiter-pack/resume.json");
    expect(html).toContain("/downloads/recruiter-pack/manifest.json");
    expect(html).toContain("/downloads/recruiter-pack/contact.vcf");
  });

  it("keeps manifest hashes aligned with published recruiter-pack outputs", () => {
    const manifest = JSON.parse(fs.readFileSync(recruiterPackManifestPath, "utf8")) as {
      outputs: Record<string, { sha256: string }>;
    };
    const requiredManifestEntries = [
      "public/downloads/recruiter-pack/index.html",
      "public/downloads/recruiter-pack/copy-paste-resume.txt",
      "public/downloads/recruiter-pack/skills-matrix.csv",
      "public/downloads/recruiter-pack/search-report.md",
      "public/downloads/recruiter-pack/resume.pdf",
      "public/downloads/recruiter-pack/resume.json",
      "public/downloads/recruiter-pack/contact.vcf",
    ];

    const entries = Object.entries(manifest.outputs ?? {});
    expect(entries.length).toBeGreaterThan(0);
    expect(Object.keys(manifest.outputs ?? {})).toEqual(expect.arrayContaining(requiredManifestEntries));

    for (const [relativePath, data] of entries) {
      const abs = path.join(repoRoot, relativePath);

      expect(fs.existsSync(abs)).toBe(true);
      expect(sha256File(abs)).toBe(data.sha256);
    }
  });
});
