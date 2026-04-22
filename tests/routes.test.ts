// tests/routes.test.ts
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import RecruiterPage, { metadata as recruiterMetadata } from "@/app/r/page";
import ProjectsPage, { metadata as projectsMetadata } from "@/app/projects/page";
import CodexPage, { metadata as codexMetadata } from "@/app/projects/codex/page";
import PrivacyPage, { metadata as privacyMetadata } from "@/app/privacy/page";
import TermsPage, { metadata as termsMetadata } from "@/app/terms/page";
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
    expect(doc.body.textContent).toContain("Resume first");
    expect(doc.body.textContent).toMatch(/\d+\+ years in production engineering/);
    expect(doc.body.textContent).toContain("Recruiter Pack is available for copy-paste files and downloads.");
    expect(doc.body.textContent).toContain("Open Bundle");
    expect(doc.body.textContent).toContain("KProvEngine");

    const links = Array.from(doc.querySelectorAll("a"));
    expect(links.some((a) => a.getAttribute("href") === "/resume" && a.textContent?.includes("Resume"))).toBe(true);
    expect(links.some((a) => a.textContent?.includes("Open Bundle"))).toBe(true);
    expect(links.some((a) => a.getAttribute("href") === "/projects/kprovengine")).toBe(true);

    const recruiterActions = Array.from(doc.querySelectorAll('nav[aria-label="Recruiter actions"] a')).map((a) => ({
      href: a.getAttribute("href"),
      text: a.textContent,
    }));
    expect(recruiterActions[0]?.href).toBe("/resume");
    expect(recruiterActions[0]?.text).toContain("Resume");
    expect(recruiterActions[1]?.text).toContain("Open Bundle");
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

  it("/projects renders both public proof routes in route choices and preview cards", () => {
    const html = renderToStaticMarkup(createElement(ProjectsPage));
    const doc = parse(html);
    const hrefs = Array.from(doc.querySelectorAll("a")).map((a) => a.getAttribute("href"));

    expect(hrefs).toContain("/projects/kprovengine");
    expect(hrefs).toContain("/projects/codex");
    expect(hrefs).toContain("/resume");
    expect(doc.body.textContent).toContain("Codex in This Repo");
  });

  it("/projects/codex stays focused on repo proof and the official docs handoff", () => {
    const html = renderToStaticMarkup(createElement(CodexPage));
    const doc = parse(html);
    const hrefs = Array.from(doc.querySelectorAll("a")).map((a) => a.getAttribute("href"));

    expect(doc.querySelector("h1")?.textContent).toBe("Codex in this repo");
    expect(doc.body.textContent).toContain("Codex is the coding agent.");
    expect(doc.body.textContent).toContain("AGENTS.md");
    expect(doc.body.textContent).toContain(".agents/skills/");
    expect(doc.body.textContent).toContain("verify:patch");
    expect(doc.body.textContent).toContain("check:codex");
    expect(doc.body.textContent).toContain("codex:skills");
    expect(doc.body.textContent).toContain("This is not a documentation mirror.");

    expect(hrefs).toContain("https://developers.openai.com/codex/");
    expect(hrefs).toContain("https://developers.openai.com/codex/guides/agents-md/");
    expect(hrefs).toContain("https://developers.openai.com/codex/skills/");
    expect(hrefs).toContain("https://developers.openai.com/codex/concepts/customization/");
    expect(hrefs).toContain("/projects");
    expect(hrefs).toContain("/projects/kprovengine");
  });

  it("/projects and /projects/codex metadata stay self-canonical", () => {
    expect(projectsMetadata.alternates?.canonical).toBe("/projects");
    expect(projectsMetadata.openGraph && "url" in projectsMetadata.openGraph ? projectsMetadata.openGraph.url : undefined).toBe("/projects");

    expect(codexMetadata.alternates?.canonical).toBe("/projects/codex");
    expect(codexMetadata.openGraph && "url" in codexMetadata.openGraph ? codexMetadata.openGraph.url : undefined).toBe("/projects/codex");
  });

  it("/privacy and /terms render stable legal headings and effective dates", () => {
    const privacyHtml = renderToStaticMarkup(createElement(PrivacyPage));
    const privacyDoc = parse(privacyHtml);
    const termsHtml = renderToStaticMarkup(createElement(TermsPage));
    const termsDoc = parse(termsHtml);

    expect(privacyDoc.querySelector("h1")?.textContent).toBe("Privacy Policy");
    expect(privacyDoc.body.textContent).toContain("Effective date: 2026-02-28");
    expect(privacyDoc.body.textContent).toContain("What we collect");
    expect(privacyDoc.body.textContent).toContain("Vercel Web Analytics");
    expect(privacyDoc.body.textContent).toContain("Vercel Speed Insights");
    expect(privacyDoc.body.textContent).toContain("local theme preference");
    expect(privacyDoc.body.textContent).toContain("machine-readable exports");
    expect(privacyDoc.body.textContent).toContain("email, phone number, and location");
    expect(privacyDoc.body.textContent).toContain("aggregate usage and performance insight");

    expect(termsDoc.querySelector("h1")?.textContent).toBe("Terms of Service");
    expect(termsDoc.body.textContent).toContain("Effective date: 2026-02-28");
    expect(termsDoc.body.textContent).toContain("professional portfolio and informational site");
    expect(termsDoc.body.textContent).toContain("recruiter-pack artifacts");
    expect(termsDoc.body.textContent).toContain("professional evaluation, recruiting, and standard business contact use");
    expect(termsDoc.body.textContent).toContain("current, available, or error-free");
  });

  it("/privacy and /terms metadata stay self-canonical", () => {
    expect(privacyMetadata.alternates?.canonical).toBe("/privacy");
    expect(termsMetadata.alternates?.canonical).toBe("/terms");
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
