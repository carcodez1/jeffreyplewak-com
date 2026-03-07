#!/usr/bin/env node
"use strict";

import fs from "node:fs";
import path from "node:path";

const repoRoot = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..", "..");
const ssotPath = path.join(repoRoot, "src/content/ssot/profile.ssot.jsonld");
const resumeOut = path.join(repoRoot, "public/downloads/recruiter-pack/resume.json");

function readJson(file) {
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

function fail(message) {
  process.stderr.write(`${message}\n`);
  process.exit(1);
}

function main() {
  if (!fs.existsSync(ssotPath)) {
    fail(`Missing SSOT input: ${ssotPath}`);
  }

  const ssot = readJson(ssotPath);
  if (!ssot || typeof ssot !== "object") {
    fail("SSOT must be a JSON object.");
  }

  if (typeof ssot.name !== "string" || ssot.name.length === 0) {
    fail("SSOT missing required field: name");
  }

  const statuses = new Set(
    (Array.isArray(ssot.skillsMap) ? ssot.skillsMap : []).map((s) => String(s.claimStatus ?? "")),
  );
  for (const status of statuses) {
    if (!["SUPPORTED", "UNKNOWN", "UNSUPPORTED"].includes(status)) {
      fail(`Invalid claimStatus in skillsMap: ${status}`);
    }
  }

  if (fs.existsSync(resumeOut)) {
    const resume = readJson(resumeOut);
    const badSkillClaims = (resume.claims?.skills ?? []).filter(
      (s) => s.claimStatus !== "SUPPORTED",
    );
    const badProjectClaims = (resume.claims?.projects ?? []).filter(
      (p) => p.claimStatus && p.claimStatus !== "SUPPORTED",
    );
    if (badSkillClaims.length > 0 || badProjectClaims.length > 0) {
      fail("Exported resume.json contains non-SUPPORTED claims.");
    }

    if (resume.resume) {
      if (typeof resume.resume.summary !== "string" || resume.resume.summary.length === 0) {
        fail("Exported resume.json missing resume.summary.");
      }
      if (typeof resume.resume.pdfHref !== "string" || resume.resume.pdfHref.length === 0) {
        fail("Exported resume.json missing resume.pdfHref.");
      }
      if (!Array.isArray(resume.resume.roles)) {
        fail("Exported resume.json missing resume.roles[].");
      }
    }
  }

  process.stdout.write("SSOT validate passed.\n");
}

main();
