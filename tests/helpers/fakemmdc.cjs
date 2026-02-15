#!/usr/bin/env node
"use strict";

const fs = require("node:fs");
const path = require("node:path");

function argValue(flag) {
  const i = process.argv.indexOf(flag);
  return i >= 0 ? process.argv[i + 1] : null;
}

const input = argValue("-i");
const output = argValue("-o");

if (!input || !output) {
  console.error("[fake-mmdc] usage: -i <input> -o <output>");
  process.exit(2);
}

const text = fs.readFileSync(input, "utf8").replace(/\s+/g, " ").slice(0, 160);

const svg = [
  `<!-- fake-mmdc -->`,
  `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="140" viewBox="0 0 800 140">`,
  `<rect x="0" y="0" width="800" height="140" fill="white" stroke="black"/>`,
  `<text x="18" y="36" font-family="monospace" font-size="14">FAKE_RENDER</text>`,
  `<text x="18" y="64" font-family="monospace" font-size="12">${path.basename(input)}</text>`,
  `<text x="18" y="96" font-family="monospace" font-size="10">${text}</text>`,
  `</svg>`,
  ``,
].join("\n");

fs.mkdirSync(path.dirname(output), { recursive: true });
fs.writeFileSync(output, svg, "utf8");
