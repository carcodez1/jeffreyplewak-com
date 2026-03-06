#!/usr/bin/env node
"use strict";

import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

const repoRoot = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..", "..");
const ssotPath = path.join(repoRoot, "src/content/ssot/profile.ssot.jsonld");
const outDir = path.join(repoRoot, "public/downloads/recruiter-pack");
const manifestOut = path.join(outDir, "manifest.json");

const files = [
  "index.html",
  "copy-paste-resume.txt",
  "skills-matrix.csv",
  "search-report.md",
  "resume.pdf",
  "resume.json",
  "contact.vcf",
];

function sha256File(file) {
  const data = fs.readFileSync(file);
  return crypto.createHash("sha256").update(data).digest("hex");
}

function stableStringify(value) {
  return `${JSON.stringify(value, null, 2)}\n`;
}

function readJson(file) {
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

function main() {
  if (!fs.existsSync(outDir)) {
    throw new Error(`Missing recruiter-pack directory: ${outDir}`);
  }

  const outputs = {};
  for (const file of files) {
    const abs = path.join(outDir, file);
    if (!fs.existsSync(abs)) {
      throw new Error(`Missing output file: ${abs}`);
    }
    outputs[`public/downloads/recruiter-pack/${file}`] = {
      sha256: sha256File(abs),
    };
  }

  const ssot = readJson(ssotPath);
  const unknownSkills = (ssot.skillsMap ?? [])
    .filter((s) => s.claimStatus === "UNKNOWN")
    .map((s) => String(s["ssot:skill"] ?? ""))
    .filter(Boolean);

  const manifest = {
    generatedBy: "scripts/ssot/manifest.mjs",
    source: "src/content/ssot/profile.ssot.jsonld",
    generatedAt: new Date(fs.statSync(ssotPath).mtimeMs).toISOString(),
    toolVersions: {
      node: process.version,
    },
    outputs,
    claimLedger: {
      unknownSkills,
      enforcement: "Only claimStatus=SUPPORTED are emitted to exported resume.json.",
    },
    references: Array.isArray(ssot.references) ? ssot.references : [],
  };

  fs.writeFileSync(manifestOut, stableStringify(manifest), "utf8");
  process.stdout.write("SSOT manifest complete: recruiter-pack/manifest.json\n");
}

main();
