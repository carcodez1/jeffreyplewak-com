#!/usr/bin/env node
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

function sh(cmd, args, opts = {}) {
  try {
    return execFileSync(cmd, args, {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
      ...opts,
    });
  } catch (e) {
    const stdout = e?.stdout?.toString?.() ?? "";
    const stderr = e?.stderr?.toString?.() ?? "";
    return `${stdout}${stderr}`.trim();
  }
}

function section(title, body) {
  return `\n## ${title}\n\n\`\`\`\n${(body ?? "").trim()}\n\`\`\`\n`;
}

function readFileIfExists(p, maxBytes = 64_000) {
  if (!fs.existsSync(p)) return "";
  const buf = fs.readFileSync(p);
  const sliced = buf.length > maxBytes ? buf.subarray(0, maxBytes) : buf;
  const suffix =
    buf.length > maxBytes ? `\n\n[TRUNCATED to ${maxBytes} bytes]\n` : "";
  return sliced.toString("utf8") + suffix;
}

const repoRoot = process.cwd();
const outDir = path.join(repoRoot, "debug");
fs.mkdirSync(outDir, { recursive: true });
const outFile = path.join(outDir, "bundle.md");

const nodeV = sh("node", ["-v"]);
const npmV = sh("npm", ["-v"]);
const tscV = sh("npx", ["-y", "tsc", "-v"]);
const eslintV = sh("npx", ["-y", "eslint", "-v"]);
const vitestV = sh("npx", ["-y", "vitest", "--version"]);

const gitBranch = sh("git", ["rev-parse", "--abbrev-ref", "HEAD"]);
const gitStatus = sh("git", ["status", "--porcelain=v1"]);
const gitHead = sh("git", ["log", "-1", "--oneline"]);

const lintOut = sh("npm", ["run", "-s", "lint"]);
const typeOut = sh("npm", ["run", "-s", "typecheck"]);
const testOut = sh("npm", ["run", "-s", "test:ci"]);

const files = [
  "package.json",
  "tsconfig.json",
  "tsconfig.tests.json",
  "eslint.config.mjs",
  "vitest.config.ts",
  "next.config.ts",
  "next.config.js",
];

let md = `# Debug Bundle\n\nGenerated: ${new Date().toISOString()}\n`;
md += section(
  "Versions",
  `node ${nodeV}\nnpm ${npmV}\n${tscV}\n${eslintV}\n${vitestV}`,
);
md += section(
  "Git",
  `branch: ${gitBranch}\nhead: ${gitHead}\n\nstatus:\n${gitStatus || "(clean)"}`,
);
md += section("lint", lintOut || "(no output)");
md += section("typecheck", typeOut || "(no output)");
md += section("test:ci", testOut || "(no output)");

md += `\n## Key Config Files\n`;
for (const f of files) {
  const p = path.join(repoRoot, f);
  if (!fs.existsSync(p)) continue;
  md += `\n### ${f}\n\n\`\`\`\n${readFileIfExists(p)}\n\`\`\`\n`;
}

fs.writeFileSync(outFile, md, "utf8");
console.log(`[debug] wrote ${path.relative(repoRoot, outFile)}`);
