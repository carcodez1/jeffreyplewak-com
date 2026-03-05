#!/usr/bin/env node
"use strict";

import fs from "node:fs";
import path from "node:path";

const repoRoot = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..", "..");
const ssotPath = path.join(repoRoot, "src/content/ssot/profile.ssot.jsonld");
const resumePath = path.join(repoRoot, "public/downloads/resume.json");
const manifestPath = path.join(repoRoot, "public/downloads/manifest.json");

function readJson(file) {
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

function fail(message) {
  process.stderr.write(`${message}\n`);
  process.exit(1);
}

function main() {
  if (!fs.existsSync(resumePath) || !fs.existsSync(manifestPath)) {
    fail("Missing exported artifacts. Run: npm run -s ssot:export");
  }

  const ssot = readJson(ssotPath);
  const resume = readJson(resumePath);
  const manifest = readJson(manifestPath);

  const unknownSkills = (ssot.skillsMap ?? [])
    .filter((s) => s.claimStatus === "UNKNOWN")
    .map((s) => String(s["ssot:skill"] ?? ""))
    .filter(Boolean);

  const emittedSkills = (resume.claims?.skills ?? []).map((s) => String(s.skill ?? ""));
  const leakedUnknown = emittedSkills.filter((s) => unknownSkills.includes(s));

  if (leakedUnknown.length > 0) {
    fail(
      `Claim-ledger violation: UNKNOWN claims included in outputs: ${leakedUnknown.join(", ")}`,
    );
  }

  const nonSupported = (resume.claims?.skills ?? []).filter((s) => s.claimStatus !== "SUPPORTED");
  if (nonSupported.length > 0) {
    fail("Claim-ledger violation: non-SUPPORTED claimStatus found in resume output.");
  }

  if (!Array.isArray(resume.references) || resume.references.length === 0) {
    fail("Missing references section in public/downloads/resume.json");
  }

  if (!Array.isArray(manifest.references) || manifest.references.length === 0) {
    fail("Missing references section in public/downloads/manifest.json");
  }

  process.stdout.write("SSOT claim-ledger verification passed.\n");
}

main();
