#!/usr/bin/env node
"use strict";

const { execFileSync } = require("child_process");
const fs = require("fs");
const path = require("path");

function env(name, fallback) {
  const v = process.env[name];
  return v && v.trim().length ? v.trim() : fallback;
}

const repoRoot = path.resolve(__dirname, "..");
const inputDir = path.resolve(
  repoRoot,
  env("DIAGRAMS_IN", "src/content/diagrams"),
);
const outputDir = path.resolve(
  repoRoot,
  env("DIAGRAMS_OUT", "public/diagrams"),
);
const extension = env("DIAGRAMS_EXT", ".mmd");

if (!fs.existsSync(inputDir)) {
  console.error(`[diagrams] input dir not found: ${inputDir}`);
  process.exit(2);
}

fs.mkdirSync(outputDir, { recursive: true });

const files = fs.readdirSync(inputDir).filter((f) => f.endsWith(extension));

if (files.length === 0) {
  console.log(`[diagrams] no ${extension} files found in ${inputDir}`);
  process.exit(0);
}

for (const file of files) {
  const input = path.join(inputDir, file);
  const base = file.slice(0, -extension.length);
  const output = path.join(outputDir, `${base}.svg`);

  execFileSync(
    "npx",
    ["-y", "-js/mermaid-cli", "mmdc", "-i", input, "-o", output],
    { stdio: "inherit" },
  );
}

console.log(`[diagrams] generated ${files.length} diagram(s)`);
