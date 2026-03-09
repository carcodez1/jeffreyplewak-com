import fs from "node:fs";
import path from "node:path";

const repoRoot = process.cwd();
const outDir = path.join(repoRoot, "public", "downloads");
const outJson = path.join(outDir, "seo-report.json");
const outMd = path.join(outDir, "seo-report.md");
const publicDir = path.join(repoRoot, "public");

function readUtf8(relPath) {
  return fs.readFileSync(path.join(repoRoot, relPath), "utf8");
}

function exists(relPath) {
  return fs.existsSync(path.join(repoRoot, relPath));
}

function statSize(relPath) {
  return fs.statSync(path.join(repoRoot, relPath)).size;
}

function listPublicImageFiles(dirAbs) {
  const out = [];
  const stack = [dirAbs];
  const exts = new Set([".png", ".jpg", ".jpeg", ".webp", ".avif", ".svg"]);

  while (stack.length) {
    const current = stack.pop();
    const entries = fs.readdirSync(current, { withFileTypes: true });
    for (const entry of entries) {
      const abs = path.join(current, entry.name);
      if (entry.isDirectory()) {
        stack.push(abs);
        continue;
      }
      const ext = path.extname(entry.name).toLowerCase();
      if (!exts.has(ext)) continue;
      out.push(abs);
    }
  }
  return out;
}

const checks = [];
const advisories = [];

function check(id, description, pass, details = "") {
  checks.push({ id, description, pass, details });
}

function advisory(id, description, pass, details = "") {
  advisories.push({ id, description, pass, details });
}

const criticalAssets = [
  "public/og-image.jpg",
  "public/icon-192.png",
  "public/icon-512.png",
  "public/assets/favicon/site.webmanifest",
  "public/assets/favicon/apple-touch-icon.png",
  "public/assets/favicon/favicon-16x16.png",
  "public/assets/favicon/favicon-32x32.png",
  "public/projects/kprovengine/og.jpg",
  "public/projects/kprovengine/architecture.svg",
];

for (const relPath of criticalAssets) {
  const pass = exists(relPath) && statSize(relPath) > 0;
  check(`asset:${relPath}`, `Critical asset exists: ${relPath}`, pass, pass ? "ok" : "missing or empty");
}

const imageBudgetChecks = [
  { relPath: "public/og-image.jpg", maxBytes: 180_000 },
  { relPath: "public/projects/kprovengine/og.jpg", maxBytes: 220_000 },
  { relPath: "public/projects/kprovengine/architecture.svg", maxBytes: 350_000 },
];

for (const budget of imageBudgetChecks) {
  if (!exists(budget.relPath)) {
    advisory(
      `perf:${budget.relPath}`,
      `Image budget check skipped (missing): ${budget.relPath}`,
      false,
      "missing",
    );
    continue;
  }
  const bytes = statSize(budget.relPath);
  const pass = bytes <= budget.maxBytes;
  advisory(
    `perf:${budget.relPath}`,
    `Image budget <= ${budget.maxBytes} bytes for ${budget.relPath}`,
    pass,
    `${bytes} bytes`,
  );
}

const heavyImageThresholdBytes = 800_000;
const heavyImageFindings = listPublicImageFiles(publicDir)
  .map((abs) => {
    const relFromRepo = path.relative(repoRoot, abs);
    return { relPath: relFromRepo, bytes: fs.statSync(abs).size };
  })
  .filter((item) => item.bytes > heavyImageThresholdBytes)
  .sort((a, b) => b.bytes - a.bytes);

advisory(
  "perf:heavy-public-images",
  `No public image exceeds ${heavyImageThresholdBytes} bytes`,
  heavyImageFindings.length === 0,
  heavyImageFindings.length === 0
    ? "ok"
    : heavyImageFindings
        .slice(0, 5)
        .map((item) => `${item.relPath} (${item.bytes} bytes)`)
        .join("; "),
);

const recruiterPackAssets = [
  "public/downloads/recruiter-pack/index.html",
  "public/downloads/recruiter-pack/copy-paste-resume.txt",
  "public/downloads/recruiter-pack/skills-matrix.csv",
  "public/downloads/recruiter-pack/search-report.md",
  "public/downloads/recruiter-pack/resume.pdf",
  "public/downloads/recruiter-pack/resume.json",
  "public/downloads/recruiter-pack/manifest.json",
];

for (const relPath of recruiterPackAssets) {
  const pass = exists(relPath) && statSize(relPath) > 0;
  check(`recruiter-pack:${relPath}`, `Recruiter pack artifact exists: ${relPath}`, pass, pass ? "ok" : "missing or empty");
}

const sitemapText = readUtf8("src/app/sitemap.ts");
for (const route of ["/", "/resume", "/r", "/projects", "/projects/kprovengine"]) {
  const pass = sitemapText.includes(`"${route}"`) || sitemapText.includes(`'${route}'`);
  check(`sitemap:${route}`, `Sitemap includes ${route}`, pass, pass ? "ok" : "not found");
}

const aiTxt = readUtf8("public/.well-known/ai.txt");
for (const line of [
  "Sitemap: https://www.jeffreyplewak.com/sitemap.xml",
  "Canonical-Resume: https://www.jeffreyplewak.com/resume",
  "Recruiter-Route: https://www.jeffreyplewak.com/r",
  "Proof-Route: https://www.jeffreyplewak.com/projects/kprovengine",
]) {
  check(`ai-txt:${line}`, `ai.txt contains "${line}"`, aiTxt.includes(line), "source scan");
}

const routeMetadataFiles = [
  { id: "home", relPath: "src/app/page.tsx" },
  { id: "resume", relPath: "src/app/resume/page.tsx" },
  { id: "recruiter", relPath: "src/app/r/page.tsx" },
  { id: "projects", relPath: "src/app/projects/page.tsx" },
  { id: "kprovengine", relPath: "src/app/projects/kprovengine/page.tsx" },
];

for (const route of routeMetadataFiles) {
  const text = readUtf8(route.relPath);
  const hasCanonical = /alternates\s*:\s*\{[\s\S]*?canonical\s*:/.test(text);
  check(`metadata:${route.id}:canonical`, `${route.id} has canonical metadata`, hasCanonical, "source scan");
  check(`metadata:${route.id}:openGraph`, `${route.id} has openGraph metadata`, text.includes("openGraph:"), "source scan");
  check(`metadata:${route.id}:twitter`, `${route.id} has twitter metadata`, text.includes("twitter:"), "source scan");
}

const jsonLdText = readUtf8("src/lib/jsonld.ts");
for (const pageId of ["/#home", "/resume#page", "/r#page", "/projects#page", "/projects/kprovengine#page"]) {
  const pass = jsonLdText.includes(pageId);
  check(`jsonld:${pageId}`, `JSON-LD route node includes ${pageId}`, pass, "source scan");
}

const passed = checks.filter((c) => c.pass).length;
const total = checks.length;
const scorePct = total ? Math.round((passed / total) * 100) : 0;

const report = {
  generatedAt: new Date().toISOString(),
  score: {
    passed,
    total,
    percent: scorePct,
  },
  advisoryScore: {
    passed: advisories.filter((a) => a.pass).length,
    total: advisories.length,
    percent: advisories.length ? Math.round((advisories.filter((a) => a.pass).length / advisories.length) * 100) : 0,
  },
  status: scorePct >= 90 ? "strong" : scorePct >= 75 ? "good" : "needs-work",
  checks,
  advisories,
  heavyImageFindings,
  notes: [
    "This report validates on-repo technical SEO readiness signals only.",
    "Search ranking position is not guaranteed by code alone.",
    "External authority and search-console performance remain required.",
  ],
};

const lines = [
  "# SEO Readiness Report",
  "",
  `- Generated: ${report.generatedAt}`,
  `- Score: ${passed}/${total} (${scorePct}%)`,
  `- Advisory score: ${report.advisoryScore.passed}/${report.advisoryScore.total} (${report.advisoryScore.percent}%)`,
  `- Status: ${report.status}`,
  "",
  "## Failed Checks",
  "",
];

const failedChecks = checks.filter((c) => !c.pass);
if (!failedChecks.length) {
  lines.push("- none");
} else {
  for (const c of failedChecks) {
    lines.push(`- ${c.id}: ${c.description} (${c.details})`);
  }
}

lines.push("", "## Advisory Findings", "");
const failedAdvisories = advisories.filter((a) => !a.pass);
if (!failedAdvisories.length) {
  lines.push("- none");
} else {
  for (const a of failedAdvisories) {
    lines.push(`- ${a.id}: ${a.description} (${a.details})`);
  }
}

lines.push("", "## Heavy Images", "");
if (!heavyImageFindings.length) {
  lines.push("- none");
} else {
  for (const item of heavyImageFindings.slice(0, 10)) {
    lines.push(`- ${item.relPath}: ${item.bytes} bytes`);
  }
}

lines.push("", "## Notes", "");
for (const note of report.notes) lines.push(`- ${note}`);

fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(outJson, `${JSON.stringify(report, null, 2)}\n`, "utf8");
fs.writeFileSync(outMd, `${lines.join("\n")}\n`, "utf8");

console.log(`SEO report written: ${path.relative(repoRoot, outJson)}`);
console.log(`SEO report written: ${path.relative(repoRoot, outMd)}`);
