import fs from "node:fs";
import path from "node:path";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import RecruiterPage from "@/app/r/page";
import ResumePage from "@/app/resume/page";
import { RESUME } from "@/content/resume";

const repoRoot = path.resolve(__dirname, "..");
const recruiterPackResumePath = path.join(repoRoot, "public/downloads/recruiter-pack/resume.json");
const narrativeSsotPath = path.join(repoRoot, "src/content/resume.ts");

describe("identity SSOT model", () => {
  it("keeps the public narrative routes anchored to src/content/resume.ts", () => {
    const resumeHtml = renderToStaticMarkup(createElement(ResumePage));
    const recruiterHtml = renderToStaticMarkup(createElement(RecruiterPage));

    expect(resumeHtml).toContain(RESUME.summary);
    expect(recruiterHtml).toContain("10+ years");
  });

  it("keeps recruiter-pack resume.json anchored to the JSON-LD export SSOT", () => {
    const recruiterPackResume = JSON.parse(fs.readFileSync(recruiterPackResumePath, "utf8"));

    expect(recruiterPackResume.generatedBy).toBe("scripts/ssot/export.mjs");
    expect(recruiterPackResume.source).toBe("src/content/ssot/profile.ssot.jsonld");
  });

  it("documents src/content/resume.ts as the public resume adapter", () => {
    const resumeSource = fs.readFileSync(narrativeSsotPath, "utf8");

    expect(resumeSource).toContain("Public resume adapter for route-facing summary, downloads, and role data.");
    expect(resumeSource).toContain('import publicRoles from "@/content/employment.public.json";');
  });
});
