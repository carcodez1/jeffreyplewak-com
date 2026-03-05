#!/usr/bin/env node
"use strict";

import fs from "node:fs";
import path from "node:path";

const repoRoot = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..", "..");
const ssotPath = path.join(repoRoot, "src/content/ssot/profile.ssot.jsonld");
const sourceResumePdf = path.join(repoRoot, "public/downloads/jeffrey-plewak-resume.pdf");
const outDir = path.join(repoRoot, "public/downloads/recruiter-pack");
const resumeOut = path.join(outDir, "resume.json");
const contactOut = path.join(outDir, "contact.vcf");
const resumePdfOut = path.join(outDir, "resume.pdf");

function readJson(file) {
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

function writeFile(file, content) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content, "utf8");
}

function stableStringify(value) {
  return `${JSON.stringify(value, null, 2)}\n`;
}

function isSupported(status) {
  return status === "SUPPORTED";
}

function collectReferences(ssot) {
  const refs = Array.isArray(ssot.references) ? ssot.references : [];
  return refs.map((r) => ({
    id: String(r.id ?? ""),
    title: String(r.title ?? ""),
    url: String(r.url ?? ""),
    source: String(r.source ?? ""),
  }));
}

function buildResume(ssot) {
  const supportedSkills = (ssot.skillsMap ?? [])
    .filter((s) => isSupported(s.claimStatus))
    .map((s) => ({
      skill: String(s["ssot:skill"] ?? ""),
      claimStatus: "SUPPORTED",
      evidence: Array.isArray(s.evidence) ? s.evidence : [],
    }))
    .filter((s) => s.skill.length > 0);

  const supportedProjects = (ssot.hasPart ?? [])
    .filter((p) => Array.isArray(p.evidence) && p.evidence.some((e) => isSupported(e.claimStatus)))
    .map((p) => ({
      id: String(p["@id"] ?? ""),
      type: String(p["@type"] ?? ""),
      name: String(p.name ?? ""),
      description: String(p.description ?? ""),
      keywords: Array.isArray(p.keywords) ? p.keywords.map(String) : [],
      claimStatus: "SUPPORTED",
    }))
    .filter((p) => p.name.length > 0);

  return {
    generatedBy: "scripts/ssot/export.mjs",
    source: "src/content/ssot/profile.ssot.jsonld",
    person: {
      id: String(ssot["@id"] ?? ""),
      name: String(ssot.name ?? ""),
      jobTitle: String(ssot.jobTitle ?? ""),
      email: String(ssot.email ?? ""),
      telephone: String(ssot.telephone ?? ""),
      url: String(ssot.url ?? ""),
      locality: String(ssot.address?.addressLocality ?? ""),
      region: String(ssot.address?.addressRegion ?? ""),
      country: String(ssot.address?.addressCountry ?? ""),
    },
    claims: {
      skills: supportedSkills,
      projects: supportedProjects,
    },
    references: collectReferences(ssot),
  };
}

function buildVcf(ssot) {
  const fullName = String(ssot.name ?? "");
  const [given = "", ...rest] = fullName.split(" ");
  const family = rest.join(" ");
  const email = String(ssot.email ?? "").replace(/^mailto:/i, "");
  const tel = String(ssot.telephone ?? "");
  const title = String(ssot.jobTitle ?? "");
  const url = String(ssot.url ?? "");
  const locality = String(ssot.address?.addressLocality ?? "");
  const region = String(ssot.address?.addressRegion ?? "");
  const country = String(ssot.address?.addressCountry ?? "");

  return [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `FN:${fullName}`,
    `N:${family};${given};;;`,
    "ORG:Independent",
    `TITLE:${title}`,
    email ? `EMAIL;TYPE=INTERNET:${email}` : "",
    tel ? `TEL;TYPE=CELL:${tel}` : "",
    url ? `URL:${url}` : "",
    `ADR;TYPE=WORK:;;${locality};${region};;;${country}`,
    "END:VCARD",
    "",
  ]
    .filter(Boolean)
    .join("\n");
}

function main() {
  if (!fs.existsSync(sourceResumePdf)) {
    throw new Error(`Missing source resume PDF: ${sourceResumePdf}`);
  }

  const ssot = readJson(ssotPath);
  const resume = buildResume(ssot);
  const resumeJson = stableStringify(resume);
  const vcf = buildVcf(ssot);

  fs.mkdirSync(outDir, { recursive: true });
  fs.copyFileSync(sourceResumePdf, resumePdfOut);
  writeFile(resumeOut, resumeJson);
  writeFile(contactOut, vcf);

  process.stdout.write("SSOT export complete: recruiter-pack resume.json, contact.vcf, resume.pdf\n");
}

main();
