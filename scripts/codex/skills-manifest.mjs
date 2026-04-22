#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const repoRoot = process.cwd();
const skillsRoot = path.join(repoRoot, ".agents", "skills");
const outDir = path.join(repoRoot, "artifacts", "codex");
const outFile = path.join(outDir, "skills-inventory.json");
const allowedEntries = new Set(["SKILL.md", "scripts", "references", "assets"]);
const requiredFrontmatter = ["name", "description", "author", "created", "license"];
const requiredSections = ["When to use:", "Workflow:", "Verify:"];

function fail(message) {
  process.stderr.write(`${message}\n`);
  process.exit(1);
}

function parseFrontmatter(markdown, skillDir) {
  const match = markdown.match(/^---\n([\s\S]*?)\n---\n?/);
  if (!match) {
    fail(`Missing YAML frontmatter in ${skillDir}/SKILL.md`);
  }

  const frontmatter = {};
  for (const rawLine of match[1].split("\n")) {
    const line = rawLine.trim();
    if (!line) continue;
    const separator = line.indexOf(":");
    if (separator === -1) {
      fail(`Invalid frontmatter line in ${skillDir}/SKILL.md: ${rawLine}`);
    }
    const key = line.slice(0, separator).trim();
    const value = line.slice(separator + 1).trim();
    frontmatter[key] = value;
  }

  return {
    body: markdown.slice(match[0].length),
    frontmatter,
  };
}

function countFiles(dirPath) {
  if (!fs.existsSync(dirPath)) return 0;
  let count = 0;
  const stack = [dirPath];
  while (stack.length) {
    const current = stack.pop();
    for (const entry of fs.readdirSync(current, { withFileTypes: true })) {
      const abs = path.join(current, entry.name);
      if (entry.isDirectory()) {
        stack.push(abs);
      } else {
        count += 1;
      }
    }
  }
  return count;
}

if (!fs.existsSync(skillsRoot)) {
  fail(`Missing skills directory: ${path.relative(repoRoot, skillsRoot)}`);
}

const skillDirs = fs.readdirSync(skillsRoot, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .sort((a, b) => a.localeCompare(b));

if (skillDirs.length === 0) {
  fail(`No skill directories found in ${path.relative(repoRoot, skillsRoot)}`);
}

const inventory = [];

for (const skillName of skillDirs) {
  const skillDir = path.join(skillsRoot, skillName);
  const relativeSkillDir = path.relative(repoRoot, skillDir);
  const entries = fs.readdirSync(skillDir, { withFileTypes: true });

  for (const entry of entries) {
    if (!allowedEntries.has(entry.name)) {
      fail(`Unexpected entry in ${relativeSkillDir}: ${entry.name}`);
    }
    if (entry.name !== "SKILL.md" && !entry.isDirectory()) {
      fail(`Expected directory for ${relativeSkillDir}/${entry.name}`);
    }
  }

  const skillFile = path.join(skillDir, "SKILL.md");
  if (!fs.existsSync(skillFile)) {
    fail(`Missing SKILL.md in ${relativeSkillDir}`);
  }

  const markdown = fs.readFileSync(skillFile, "utf8");
  const { body, frontmatter } = parseFrontmatter(markdown, relativeSkillDir);

  for (const field of requiredFrontmatter) {
    if (!frontmatter[field]) {
      fail(`Missing frontmatter field "${field}" in ${relativeSkillDir}/SKILL.md`);
    }
  }

  if (frontmatter.name !== skillName) {
    fail(`Frontmatter name mismatch in ${relativeSkillDir}/SKILL.md: expected "${skillName}"`);
  }

  if (!/^\d{4}-\d{2}-\d{2}$/.test(frontmatter.created)) {
    fail(`Invalid created date in ${relativeSkillDir}/SKILL.md: ${frontmatter.created}`);
  }

  for (const section of requiredSections) {
    if (!body.includes(section)) {
      fail(`Missing section "${section}" in ${relativeSkillDir}/SKILL.md`);
    }
  }

  const assetsDir = path.join(skillDir, "assets");
  const evalStubs = fs.existsSync(assetsDir)
    ? fs.readdirSync(assetsDir).filter((name) => name.startsWith("eval-")).sort()
    : [];

  inventory.push({
    name: frontmatter.name,
    description: frontmatter.description,
    author: frontmatter.author,
    created: frontmatter.created,
    license: frontmatter.license,
    path: path.relative(repoRoot, skillDir),
    files: {
      skill: path.relative(repoRoot, skillFile),
      scripts: countFiles(path.join(skillDir, "scripts")),
      references: countFiles(path.join(skillDir, "references")),
      assets: countFiles(assetsDir),
    },
    evalStubs,
  });
}

fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(outFile, `${JSON.stringify({
  generatedAt: new Date().toISOString(),
  schemaVersion: 1,
  skillsRoot: path.relative(repoRoot, skillsRoot),
  skillCount: inventory.length,
  skills: inventory,
}, null, 2)}\n`, "utf8");

process.stdout.write(
  `Validated ${inventory.length} skills.\nInventory written: ${path.relative(repoRoot, outFile)}\n`,
);
