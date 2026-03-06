import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { describe, expect, it } from "vitest";

const repoRoot = path.resolve(__dirname, "..");
const reportJsonPath = path.join(repoRoot, "public", "downloads", "seo-report.json");
const reportMdPath = path.join(repoRoot, "public", "downloads", "seo-report.md");

type SeoReport = {
  generatedAt: string;
  score: {
    passed: number;
    total: number;
    percent: number;
  };
  status: "strong" | "good" | "needs-work";
  checks: Array<{
    id: string;
    description: string;
    pass: boolean;
    details: string;
  }>;
  advisoryScore: {
    passed: number;
    total: number;
    percent: number;
  };
  advisories: Array<{
    id: string;
    description: string;
    pass: boolean;
    details: string;
  }>;
  heavyImageFindings: Array<{
    relPath: string;
    bytes: number;
  }>;
  notes: string[];
};

describe("seo report generator", () => {
  it("produces stable report outputs with a non-empty check set", () => {
    execFileSync("node", ["scripts/seo/report.mjs"], { cwd: repoRoot, stdio: "pipe" });

    expect(fs.existsSync(reportJsonPath)).toBe(true);
    expect(fs.existsSync(reportMdPath)).toBe(true);

    const json = JSON.parse(fs.readFileSync(reportJsonPath, "utf8")) as SeoReport;
    const md = fs.readFileSync(reportMdPath, "utf8");

    expect(typeof json.generatedAt).toBe("string");
    expect(json.generatedAt.length).toBeGreaterThan(0);
    expect(json.score.total).toBeGreaterThan(0);
    expect(json.score.passed).toBeGreaterThanOrEqual(0);
    expect(json.score.passed).toBeLessThanOrEqual(json.score.total);
    expect(json.score.percent).toBeGreaterThanOrEqual(0);
    expect(json.score.percent).toBeLessThanOrEqual(100);
    expect(json.checks.length).toBe(json.score.total);
    expect(json.advisoryScore.total).toBeGreaterThan(0);
    expect(json.advisoryScore.passed).toBeGreaterThanOrEqual(0);
    expect(json.advisoryScore.passed).toBeLessThanOrEqual(json.advisoryScore.total);
    expect(json.advisoryScore.percent).toBeGreaterThanOrEqual(0);
    expect(json.advisoryScore.percent).toBeLessThanOrEqual(100);
    expect(json.advisories.length).toBe(json.advisoryScore.total);
    expect(Array.isArray(json.heavyImageFindings)).toBe(true);
    expect(json.notes.length).toBeGreaterThanOrEqual(1);

    expect(md).toContain("# SEO Readiness Report");
    expect(md).toContain("## Failed Checks");
    expect(md).toContain("## Advisory Findings");
    expect(md).toContain("## Heavy Images");
    expect(md).toContain("## Notes");
  });
});
