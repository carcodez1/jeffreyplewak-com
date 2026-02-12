// eslint.config.mjs
import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

export default defineConfig([
  // IMPORTANT: ignores must be in-config (ESLint v9 ignores .eslintignore)
  globalIgnores([
    "**/node_modules/**",
    "**/.next/**",
    "**/out/**",
    "**/dist/**",
    "**/build/**",
    "**/coverage/**",
  ]),

  // Next presets
  ...nextVitals,
  ...nextTs,
]);