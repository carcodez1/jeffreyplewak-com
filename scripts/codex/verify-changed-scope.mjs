#!/usr/bin/env node

import { execFileSync } from "node:child_process";

const repoRoot = process.cwd();
const args = process.argv.slice(2);

function runGit(args) {
  return execFileSync("git", args, {
    cwd: repoRoot,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "ignore"],
  }).trim();
}

function unique(items) {
  return [...new Set(items)];
}

function quoteArg(value) {
  if (/^[A-Za-z0-9_./:-]+$/.test(value)) return value;
  return JSON.stringify(value);
}

function printUsage() {
  process.stdout.write(`Usage:
  node scripts/codex/verify-changed-scope.mjs
  node scripts/codex/verify-changed-scope.mjs <file> [file...]

Behavior:
  - With file args, classify those paths.
  - Without args, inspect current tracked and untracked worktree changes.

Outputs:
  - changed files considered
  - classified scope buckets
  - exact verification commands to run
`);
}

function collectChangedFiles() {
  if (args.includes("--help") || args.includes("-h")) {
    printUsage();
    process.exit(0);
  }

  const fileArgs = args.filter((arg) => !arg.startsWith("-"));
  if (fileArgs.length > 0) return unique(fileArgs);

  const diffFiles = runGit(["diff", "--name-only", "--relative"]);
  const cachedFiles = runGit(["diff", "--name-only", "--cached", "--relative"]);
  const untrackedFiles = runGit(["ls-files", "--others", "--exclude-standard"]);

  return unique(
    [diffFiles, cachedFiles, untrackedFiles]
      .flatMap((block) => block.split("\n"))
      .map((file) => file.trim())
      .filter(Boolean),
  );
}

function classifyFile(file) {
  const normalized = file.replace(/\\/g, "/");

  if (normalized === "AGENTS.md" || normalized.startsWith(".agents/skills/") || normalized.startsWith(".codex/")) {
    return "codex";
  }

  if (normalized === "next-env.d.ts") {
    return "generated";
  }

  if (normalized.startsWith("artifacts/codex/") || normalized.startsWith("artifacts/reasoning/")) {
    return "generated";
  }

  if (normalized === "public/downloads/seo-report.json" || normalized === "public/downloads/seo-report.md") {
    return "generated";
  }

  if (normalized.startsWith("public/downloads/recruiter-pack/") || normalized === "public/downloads/resume.json") {
    return "ssot";
  }

  if (normalized.startsWith("tests/")) {
    return "tests";
  }

  if (
    normalized === "src/app/robots.ts" ||
    normalized === "src/app/sitemap.ts" ||
    normalized.startsWith("scripts/seo/") ||
    normalized.startsWith("src/lib/metadata/") ||
    normalized === "src/lib/jsonld.ts" ||
    normalized.endsWith(".metadata.ts")
  ) {
    return "seo";
  }

  if (normalized.startsWith("scripts/ssot/") || normalized.startsWith("src/content/ssot/")) {
    return "ssot";
  }

  if (normalized.startsWith("scripts/context/")) {
    return "reasoning";
  }

  if (
    normalized.startsWith("src/app/") ||
    normalized.startsWith("src/lib/") ||
    normalized.startsWith("src/content/") ||
    normalized.startsWith("src/config/") ||
    normalized.endsWith(".css")
  ) {
    return "runtime";
  }

  if (normalized.startsWith("scripts/") || normalized === "package.json" || normalized === "package-lock.json") {
    return "runtime";
  }

  return "other";
}

function collectCommands(files) {
  const buckets = new Set(files.map(classifyFile));
  const commands = [];

  const changedTestFiles = files.filter((file) => classifyFile(file) === "tests");
  const changedRouteOrCss = files.some((file) => {
    const normalized = file.replace(/\\/g, "/");
    return normalized.startsWith("src/app/") || normalized.endsWith(".css");
  });

  if (buckets.has("generated")) {
    if (files.includes("public/downloads/seo-report.json") || files.includes("public/downloads/seo-report.md")) {
      commands.push("npm run -s seo:report");
    }
    if (files.includes("artifacts/codex/skills-inventory.json")) {
      commands.push("npm run -s check:codex");
    }
    if (files.some((file) => file.startsWith("artifacts/reasoning/"))) {
      commands.push("npm run -s context:reasoning:check");
    }
    if (files.includes("next-env.d.ts")) {
      commands.push("npm run -s build");
    }
  }

  if (buckets.has("codex")) {
    commands.push("npm run -s check:codex");
  }

  if (buckets.has("reasoning")) {
    commands.push("npm run -s context:reasoning:check");
  }

  if (buckets.has("ssot")) {
    commands.push("npm run -s check:ssot");
  }

  if (buckets.has("seo")) {
    commands.push("npm run -s test -- tests/robots-sitemap.test.ts tests/seo-contract.test.ts tests/seo-audit.test.ts tests/seo-report.test.ts");
  }

  if (changedTestFiles.length > 0) {
    commands.push(`npm run -s test -- ${changedTestFiles.map(quoteArg).join(" ")}`);
  }

  if (changedRouteOrCss) {
    commands.push("npm run -s test -- tests/routes.test.ts tests/routes-a11y-smoke.test.tsx");
  }

  if (buckets.has("runtime")) {
    commands.push("npm run -s verify:patch");
  }

  if (commands.length === 0 && files.length > 0) {
    commands.push("npm run -s verify:patch");
  }

  return { buckets: [...buckets].sort(), commands: unique(commands) };
}

const files = collectChangedFiles();

if (files.length === 0) {
  process.stdout.write("No changed files detected.\n");
  process.exit(0);
}

const { buckets, commands } = collectCommands(files);

process.stdout.write(`Changed files (${files.length}):\n`);
for (const file of files) {
  process.stdout.write(`- ${file}\n`);
}

process.stdout.write("\nScope buckets:\n");
for (const bucket of buckets) {
  process.stdout.write(`- ${bucket}\n`);
}

process.stdout.write("\nVerification commands:\n");
for (const command of commands) {
  process.stdout.write(`${command}\n`);
}
