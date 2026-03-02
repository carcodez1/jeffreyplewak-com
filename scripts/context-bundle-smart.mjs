#!/usr/bin/env node

/**
 * context-bundle-smart.mjs
 *
 * Generates scoped context bundles (ui, seo, full)
 * for efficient iteration with an LLM.
 *
 * usage:
 *   node scripts/context-bundle-smart.mjs --scope=<ui|seo|full>
 */

import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import os from "node:os";

const repoRoot = process.cwd();
const outDir = path.join(repoRoot, "debug-smart");
fs.mkdirSync(outDir, { recursive: true });

const scope = (() => {
  const arg = process.argv.find((a) => a.startsWith("--scope="));
  return arg ? arg.split("=")[1] : "full";
})();

const now = new Date().toISOString().replace(/[:.]/g, "-");
const gitShort = (() => {
  try {
    return execSync("git rev-parse --short HEAD", { encoding: "utf8" }).trim();
  } catch {
    return "nogit";
  }
})();

const mdFile = path.join(outDir, `ctx_${scope}_${now}_${gitShort}.md`);
const rawFile = path.join(outDir, `ctx_${scope}_${now}_${gitShort}.raw.txt`);

function safe(cmd, args = []) {
  try {
    return execSync(cmd + " " + args.join(" "), { encoding: "utf8" }).trim();
  } catch {
    return "";
  }
}

function section(title, body) {
  return `\n## ${title}\n\n\`\`\`\n${body?.trim()}\n\`\`\`\n`;
}

// SYSTEM
const system = `
timestamp: ${new Date().toISOString()}
platform: ${os.platform()}
arch: ${os.arch()}
node: ${process.version}
npm: ${safe("npm", ["-v"])}
next: ${safe("npx", ["next", "--version"])}
typescript: ${safe("npx", ["tsc", "-v"])}
eslint: ${safe("npx", ["eslint", "-v"])}
vitest: ${safe("npx", ["vitest", "--version"])}
`;

// GIT
const git = `
branch: ${safe("git", ["branch", "--show-current"])}
head: ${safe("git", ["rev-parse", "HEAD"])}
last_commit: ${safe("git", ["log", "-1", "--oneline"])}
status:
${safe("git", ["status", "--porcelain"])}
`;

// SCOPE FILES
const scopeFiles = {
  ui: [
    "src/app/page.tsx",
    "src/components/ExperienceTicker.tsx",
    "src/app/styles/experience.css",
    "src/app/styles/layout.css",
    "src/components/SiteHeader.tsx",
    "src/components/SiteFooter.tsx",
  ],
  seo: [
    "src/lib/metadata/root.ts",
    "next.config.ts",
    "package.json",
    "public/assets/favicon",
  ],
  full: null,
};

function listScopedFiles() {
  if (scopeFiles[scope] === null) {
    return listAllProjectFiles().filter((f) => !/\.(png|jpg|jpeg|webp|avif|ico)$/.test(f));
  }
  return scopeFiles[scope].reduce((acc, pattern) => {
    const p = path.join(repoRoot, pattern);
    if (fs.existsSync(p)) acc.push(p);
    return acc;
  }, []);
}

function listAllProjectFiles() {
  const results = [];
  function walk(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      if ([".git", ".next", "node_modules"].includes(entry.name)) continue;
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) walk(full);
      else results.push(full);
    }
  }
  walk(repoRoot);
  return results.sort();
}

function readFileIfExists(p) {
  if (!fs.existsSync(p)) return "";
  return fs.readFileSync(p, "utf8");
}

// BUILD MARKDOWN
let md = `# Context Bundle (${scope})\nGenerated: ${new Date().toISOString()}\n`;
md += section("System", system);
md += section("Git", git);

const filesToInclude = listScopedFiles();
for (const f of filesToInclude) {
  const rel = path.relative(repoRoot, f);
  md += `\n### ${rel}\n\`\`\`\n${readFileIfExists(f)}\n\`\`\`\n`;
}

let raw = "=== RAW CONTEXT ===\n";
raw += "=== SYSTEM ===\n" + system + "\n";
raw += "=== GIT ===\n" + git + "\n";
raw += "=== FILES ===\n" + filesToInclude.map((f) => path.relative(repoRoot, f)).join("\n") + "\n\n";

for (const f of filesToInclude) {
  raw += `\n----- FILE: ${path.relative(repoRoot, f)} -----\n`;
  raw += readFileIfExists(f) + "\n";
}

fs.writeFileSync(mdFile, md, "utf8");
fs.writeFileSync(rawFile, raw, "utf8");

console.log(`Wrote:\n- ${mdFile}\n- ${rawFile}`);
