#!/usr/bin/env node
"use strict";

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function die(msg, code = 2) {
  console.error(msg);
  process.exit(code);
}

function env(name, { defaultValue, required = false } = {}) {
  const raw = process.env[name];

  if (raw === undefined) {
    if (required)
      die(`[env] Missing required environment variable: ${name}`, 2);
    if (defaultValue === undefined)
      die(`[env] ${name} is undefined and no defaultValue was provided`, 2);
    return defaultValue;
  }

  const value = raw.trim();
  if (value.length === 0) {
    if (required) die(`[env] Environment variable ${name} is empty`, 2);
    if (defaultValue === undefined)
      die(`[env] ${name} is empty and no defaultValue was provided`, 2);
    return defaultValue;
  }

  return value;
}

const repoRoot = path.resolve(__dirname, "..");
const inputDir = path.resolve(
  repoRoot,
  env("DIAGRAMS_IN", { defaultValue: "src/content/diagrams" }),
);
const outputDir = path.resolve(
  repoRoot,
  env("DIAGRAMS_OUT", { defaultValue: "public/diagrams" }),
);
const extension = env("DIAGRAMS_EXT", { defaultValue: ".mmd" });

if (!fs.existsSync(inputDir)) {
  die(`[diagrams] input dir not found: ${inputDir}`, 2);
}
fs.mkdirSync(outputDir, { recursive: true });

const files = fs
  .readdirSync(inputDir, { withFileTypes: true })
  .filter((d) => d.isFile() && d.name.endsWith(extension))
  .map((d) => d.name)
  .sort((a, b) => a.localeCompare(b));

if (files.length === 0) {
  console.log(`[diagrams] no ${extension} files found in ${inputDir}`);
  process.exit(0);
}

for (const file of files) {
  const input = path.join(inputDir, file);
  const base = file.slice(0, -extension.length);
  const output = path.join(outputDir, `${base}.svg`);

  try {
    execFileSync(
      "npx",
      ["--no-install", "@mermaid-js/mermaid-cli", "-i", input, "-o", output],
      { stdio: "inherit" },
    );

    // Ensure deterministic file diffs (no "\ No newline at end of file")
    const svg = fs.readFileSync(output, "utf8");
    if (!svg.endsWith("\n")) fs.writeFileSync(output, `${svg}\n`, "utf8");
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    die(`[diagrams] failed rendering "${file}": ${msg}`, 1);
  }
}

console.log(`[diagrams] generated ${files.length} diagram(s)`);
