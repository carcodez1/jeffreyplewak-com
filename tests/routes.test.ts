// tests/routes.test.ts
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import RecruiterPage, { metadata as recruiterMetadata } from "@/app/r/page";
import { SITE } from "@/config/site";
import { buildResumeWorkTypeStats, getMostRecentResumeRole, getRecruiterPackLinks, getResumeEvidenceLinks } from "@/lib/resume";
import { RESUME } from "@/content/resume";

function parse(html: string) {
  return new DOMParser().parseFromString(html, "text/html");
}

describe("routes", () => {
  it("basic DOM parse works in jsdom", () => {
    const html = `<!doctype html><html><body><h1>ok</h1></body></html>`;
    const doc = parse(html);
    expect(doc.querySelector("h1")?.textContent).toBe("ok");
  });

  it("/r renders the recruiter answer rail and CTA priorities", () => {
    const html = renderToStaticMarkup(createElement(RecruiterPage));
    const doc = parse(html);

    expect(doc.querySelector("h1")?.textContent).toBe("Start here for a quick review.");
    expect(doc.body.textContent).toContain("Start here for a quick review.");
    expect(doc.body.textContent).toContain("Fast recruiter facts");
    expect(doc.body.textContent).toContain("Open Resume first");
    expect(doc.body.textContent).toMatch(/\d+\+ years in production engineering/);
    expect(doc.body.textContent).toContain("Recruiter Pack is available for utility files and copy-paste handoff.");
    expect(doc.body.textContent).toContain("Open Recruiter Pack");
    expect(doc.body.textContent).toContain("KProvEngine");

    const links = Array.from(doc.querySelectorAll("a"));
    expect(links.some((a) => a.getAttribute("href") === "/resume" && a.textContent?.includes("Open Resume"))).toBe(true);
    expect(links.some((a) => a.textContent?.includes("Open Recruiter Pack"))).toBe(true);
    expect(links.some((a) => a.getAttribute("href") === "/projects/kprovengine")).toBe(true);

    const recruiterActions = Array.from(doc.querySelectorAll('nav[aria-label="Recruiter actions"] a')).map((a) => ({
      href: a.getAttribute("href"),
      text: a.textContent,
    }));
    expect(recruiterActions[0]?.href).toBe("/resume");
    expect(recruiterActions[0]?.text).toContain("Open Resume");
    expect(recruiterActions[1]?.text).toContain("Open Recruiter Pack");
    expect(recruiterActions[1]?.href).toBe("/downloads/recruiter-pack/index.html");
    expect(recruiterActions).toHaveLength(2);

    const routeRailLinks = Array.from(doc.querySelectorAll('nav[aria-label="Recruiter next actions"] a')).map((a) => ({
      href: a.getAttribute("href"),
      text: a.textContent,
    }));
    expect(routeRailLinks.at(-1)?.href).toBe("/projects/kprovengine");
    expect(routeRailLinks.at(-1)?.text).toContain("Open KProvEngine");
  });

  it("/r metadata keeps the route indexable and self-canonical", () => {
    expect(recruiterMetadata.alternates?.canonical).toBe("/r");
    expect(recruiterMetadata.openGraph && "url" in recruiterMetadata.openGraph ? recruiterMetadata.openGraph.url : undefined).toBe("/r");
    expect(recruiterMetadata.title).toBe(`Recruiter Decision Page — ${SITE.name}`);
  });

  it("filters recruiter and resume download links by available public files", () => {
    const available = new Set([
      "/downloads/recruiter-pack/resume.pdf",
      "/downloads/recruiter-pack/manifest.json",
      "/downloads/contact.vcf",
    ]);
    const hasFile = (href: string) => available.has(href);

    expect(getRecruiterPackLinks(hasFile)).toEqual([
      { href: "/downloads/recruiter-pack/resume.pdf", label: "Copy-Paste Resume (PDF)" },
      { href: "/downloads/recruiter-pack/manifest.json", label: "Evidence Pack Manifest" },
    ]);
    expect(getResumeEvidenceLinks(hasFile)).toEqual([
      { href: "/downloads/recruiter-pack/manifest.json", label: "Evidence Manifest" },
      { href: "/downloads/contact.vcf", label: "Contact VCF" },
    ]);
  });

  it("returns no recruiter pack links when no public files are available", () => {
    expect(getRecruiterPackLinks(() => false)).toEqual([]);
  });

  it("returns recruiter-pack links in recruiter-first order", () => {
    const available = new Set([
      "/downloads/recruiter-pack/index.html",
      "/downloads/recruiter-pack/copy-paste-resume.txt",
      "/downloads/recruiter-pack/skills-matrix.csv",
      "/downloads/recruiter-pack/search-report.md",
      "/downloads/recruiter-pack/resume.pdf",
      "/downloads/recruiter-pack/resume.json",
      "/downloads/recruiter-pack/manifest.json",
      "/downloads/recruiter-pack/contact.vcf",
    ]);
    const links = getRecruiterPackLinks((href) => available.has(href));

    expect(links.map((item) => item.href)).toEqual([
      "/downloads/recruiter-pack/index.html",
      "/downloads/recruiter-pack/copy-paste-resume.txt",
      "/downloads/recruiter-pack/skills-matrix.csv",
      "/downloads/recruiter-pack/search-report.md",
      "/downloads/recruiter-pack/resume.pdf",
      "/downloads/recruiter-pack/resume.json",
      "/downloads/recruiter-pack/manifest.json",
      "/downloads/recruiter-pack/contact.vcf",
    ]);
  });

  it("derives work-type counts and most recent role from resume data", () => {
    const roles = [...RESUME.roles];
    const workTypeStats = buildResumeWorkTypeStats(roles);
    const mostRecentRole = getMostRecentResumeRole(roles);

    expect(workTypeStats).toEqual({
      FTE: 8,
      Contract: 0,
      Consulting: 2,
      Owner: 1,
    });
    expect(mostRecentRole?.id).toBe("mstro-think-systems");
  });
});
