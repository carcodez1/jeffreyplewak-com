// vitest.config.ts
import { defineConfig } from "vitest/config";
import path from "node:path";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  test: {
    environment: "jsdom",
    setupFiles: ["tests/setup.ts"],
    include: ["tests/**/*.test.ts", "tests/**/*.test.tsx"],
    exclude: ["**/node_modules/**", "**/.next/**", "**/out/**", "**/build/**", "**/dist/**"],

    reporters: ["default"],
    passWithNoTests: false,

    testTimeout: 10_000,
    hookTimeout: 10_000,

    coverage: {
      enabled: !!process.env.CI,
      provider: "v8",
      reporter: ["text", "json-summary", "html"],
      reportsDirectory: "coverage",
      clean: true,

      // This is what makes the report readable
      reportOnFailure: true,
      include: ["src/**/*.{ts,tsx}"],
      exclude: [
        "src/**/*.d.ts",
        "src/app/**/loading.tsx",
        "src/app/**/error.tsx",
        "src/app/**/not-found.tsx",
        "src/app/**/opengraph-image.tsx",
        "src/app/**/opengraph-image.png",
      ],

      // Optional: avoid “0% funcs” noise for config-only files
      skipFull: false,
    },
  },
});