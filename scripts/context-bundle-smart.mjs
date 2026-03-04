#!/usr/bin/env node

/**
 * context-bundle-smart.mjs
 *
 * Generates scoped context bundles (ui | seo | full) for LLM iteration.
 * Outputs one .md and one .raw.txt to ./debug-smart/
 *
 * Usage:
 *   node scripts/context-bundle-smart.mjs [--scope=ui|seo|full] [--out=<dir>]
 *
 * Scopes:
 *   ui   – component + style files only
 *   seo  – metadata, config, package.json, favicon assets
 *   full – entire repo (excluding binaries, build artefacts, node_modules)
 */

import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import os from "node:os";

// ─── CLI ARGS ─────────────────────────────────────────────────────────────────

const argv = Object.fromEntries(
  process.argv
    .slice(2)
    .filter((a) => a.startsWith("--"))
    .map((a) => {
      const [k, v] = a.slice(2).split("=");
      return [k, v ?? true];
    })
);

const SCOPE = ["ui", "seo", "full"].includes(argv.scope) ? argv.scope : "full";
const REPO_ROOT = process.cwd();
const OUT_DIR = path.resolve(argv.out ?? path.join(REPO_ROOT, "debug-smart"));

fs.mkdirSync(OUT_DIR, { recursive: true });

// ─── HELPERS ──────────────────────────────────────────────────────────────────

/** Run a shell command silently; return stdout or fallback on error. */
function run(cmd, fallback = "") {
  try {
    return execSync(cmd, { encoding: "utf8", stdio: ["pipe", "pipe", "pipe"] }).trim();
  } catch {
    return fallback;
  }
}

/** Read a file to string; return empty string if missing. */
function readFile(p) {
  try {
    return fs.readFileSync(p, "utf8");
  } catch {
    return "";
  }
}

/** Markdown fenced section. */
function section(title, body, lang = "") {
  return `\n## ${title}\n\n\`\`\`${lang}\n${(body ?? "").trim()}\n\`\`\`\n`;
}

/** Guess language hint from file extension for syntax highlighting. */
function langHint(filePath) {
  const ext = path.extname(filePath).slice(1).toLowerCase();
  const map = {
    ts: "ts", tsx: "tsx", js: "js", mjs: "js", jsx: "jsx",
    json: "json", css: "css", scss: "scss",
    md: "md", mdx: "mdx", html: "html",
    sh: "bash", env: "bash",
    toml: "toml", yaml: "yaml", yml: "yaml",
  };
  return map[ext] ?? "";
}

// ─── BINARY / LARGE FILE FILTER ───────────────────────────────────────────────

const BINARY_RE = /\.(png|jpe?g|webp|avif|gif|ico|svg|woff2?|ttf|eot|otf|pdf|zip|map)$/i;
const MAX_BYTES = 200_000; // skip files larger than ~200 KB

function shouldSkip(filePath) {
  if (BINARY_RE.test(filePath)) return true;
  try {
    return fs.statSync(filePath).size > MAX_BYTES;
  } catch {
    return true;
  }
}

// ─── SCOPE DEFINITIONS ────────────────────────────────────────────────────────

const SCOPE_PATTERNS = {
  ui: [
    "src/app/page.tsx",
    "src/app/layout.tsx",
    "src/app/globals.css",
    "src/app/styles/experience.css",
    "src/app/styles/layout.css",
    "src/components/ExperienceTicker.tsx",
    "src/components/SiteHeader.tsx",
    "src/components/SiteFooter.tsx",
    "src/components/HeroSection.tsx",
    "src/components/ProjectCard.tsx",
  ],
  seo: [
    "src/lib/metadata/root.ts",
    "src/app/sitemap.ts",
    "src/app/robots.ts",
    "next.config.ts",
    "next.config.js",
    "package.json",
    "tsconfig.json",
    "vercel.json",
    "public/assets/favicon",
  ],
};

// ─── FILE DISCOVERY ───────────────────────────────────────────────────────────

const SKIP_DIRS = new Set([".git", ".next", "node_modules", "dist", "out", ".vercel", "coverage"]);

function walkRepo() {
  const results = [];
  function walk(dir) {
    let entries;
    try { entries = fs.readdirSync(dir, { withFileTypes: true }); } catch { return; }
    for (const entry of entries) {
      if (SKIP_DIRS.has(entry.name)) continue;
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (!shouldSkip(full)) results.push(full);
    }
  }
  walk(REPO_ROOT);
  return results.sort();
}

function resolvePattern(pattern) {
  const abs = path.join(REPO_ROOT, pattern);
  if (!fs.existsSync(abs)) return [];
  const stat = fs.statSync(abs);
  if (stat.isDirectory()) {
    // include all text files inside (e.g. public/assets/favicon/)
    const results = [];
    function walk(d) {
      for (const e of fs.readdirSync(d, { withFileTypes: true })) {
        const full = path.join(d, e.name);
        if (e.isDirectory()) walk(full);
        else if (!shouldSkip(full)) results.push(full);
      }
    }
    walk(abs);
    return results;
  }
  return [abs];
}

function collectFiles() {
  if (SCOPE === "full") return walkRepo();
  const patterns = SCOPE_PATTERNS[SCOPE] ?? [];
  return [...new Set(patterns.flatMap(resolvePattern))];
}

// ─── METADATA ─────────────────────────────────────────────────────────────────

const NOW = new Date();
const TIMESTAMP = NOW.toISOString();
const SLUG = NOW.toISOString().replace(/[:.]/g, "-");
const GIT_SHORT = run("git rev-parse --short HEAD", "nogit");

const SYSTEM_INFO = `\
timestamp : ${TIMESTAMP}
scope     : ${SCOPE}
platform  : ${os.platform()} ${os.arch()}
node      : ${process.version}
npm       : ${run("npm -v", "n/a")}
next      : ${run("npx next --version", "n/a")}
typescript: ${run("npx tsc -v", "n/a")}
eslint    : ${run("npx eslint -v", "n/a")}
vitest    : ${run("npx vitest --version", "n/a")}
playwright: ${run("npx playwright --version", "n/a")}`;

const GIT_INFO = `\
branch      : ${run("git branch --show-current", "n/a")}
head        : ${run("git rev-parse HEAD", "n/a")}
last_commit : ${run("git log -1 --oneline", "n/a")}

--- status ---
${run("git status --porcelain", "(clean)")}

--- recent log ---
${run("git log --oneline -10", "")}`;

// ─── BUILD OUTPUT ─────────────────────────────────────────────────────────────

const files = collectFiles();

let md = `# Context Bundle — \`${SCOPE}\`\n\nGenerated: ${TIMESTAMP}  |  git: \`${GIT_SHORT}\`\n`;
md += section("System", SYSTEM_INFO, "yaml");
md += section("Git", GIT_INFO, "bash");

md += `\n## Files (${files.length})\n\n`;
md += files.map((f) => `- \`${path.relative(REPO_ROOT, f)}\``).join("\n");
md += "\n";

for (const f of files) {
  const rel = path.relative(REPO_ROOT, f);
  const lang = langHint(f);
  const content = readFile(f);
  md += `\n---\n\n### \`${rel}\`\n\n\`\`\`${lang}\n${content.trimEnd()}\n\`\`\`\n`;
}

// ─── RAW TXT (LLM paste-friendly, no markdown overhead) ───────────────────────

let raw = `=== CONTEXT BUNDLE: ${SCOPE.toUpperCase()} @ ${TIMESTAMP} ===\n\n`;
raw += `=== SYSTEM ===\n${SYSTEM_INFO}\n\n`;
raw += `=== GIT ===\n${GIT_INFO}\n\n`;
raw += `=== FILE LIST ===\n${files.map((f) => path.relative(REPO_ROOT, f)).join("\n")}\n\n`;

for (const f of files) {
  const rel = path.relative(REPO_ROOT, f);
  raw += `\n${"─".repeat(72)}\n`;
  raw += `FILE: ${rel}\n`;
  raw += `${"─".repeat(72)}\n`;
  raw += readFile(f).trimEnd() + "\n";
}

// ─── WRITE ────────────────────────────────────────────────────────────────────

const base = `ctx_${SCOPE}_${SLUG}_${GIT_SHORT}`;
const mdPath = path.join(OUT_DIR, `${base}.md`);
const rawPath = path.join(OUT_DIR, `${base}.raw.txt`);

fs.writeFileSync(mdPath, md, "utf8");
fs.writeFileSync(rawPath, raw, "utf8");

const mdKb = (fs.statSync(mdPath).size / 1024).toFixed(1);
const rawKb = (fs.statSync(rawPath).size / 1024).toFixed(1);

console.log(`\n✓ Bundle: ${SCOPE}  |  files: ${files.length}  |  git: ${GIT_SHORT}`);
console.log(`  .md      → ${mdPath}  (${mdKb} KB)`);
console.log(`  .raw.txt → ${rawPath}  (${rawKb} KB)\n`);
