import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const repoRoot = path.resolve(__dirname, "..");
const testsDir = path.join(repoRoot, "tests");
const includePattern = /^.*\.(test|spec)\.(ts|tsx)$/;

describe("test discovery contract", () => {
  it("keeps runnable tests discoverable by Vitest and non-empty", () => {
    const files = fs.readdirSync(testsDir)
      .filter((file) => /\.(ts|tsx)$/.test(file))
      .filter((file) => file !== "setup.ts");

    const unmatched = files.filter((file) => !includePattern.test(file));
    expect(unmatched).toEqual([]);

    for (const file of files) {
      const abs = path.join(testsDir, file);
      expect(fs.statSync(abs).size, file).toBeGreaterThan(0);
    }
  });
});
