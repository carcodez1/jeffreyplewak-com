import js from "@eslint/js";
import tseslint from "typescript-eslint";
import nextPlugin from "@next/eslint-plugin-next";

export default [
  {
    ignores: [
      "**/node_modules/**",
      "**/.next/**",
      "**/out/**",
      "**/dist/**",
      "**/build/**",
      "**/coverage/**",
    ],
  },

  js.configs.recommended,

  // TS (non-typechecked). If you want type-aware linting, I’ll give you that variant.
  ...tseslint.configs.recommended,

  // Next.js rules (equivalent to next/core-web-vitals + next/typescript intent)
  {
    files: ["**/*.{js,cjs,mjs,jsx,ts,tsx}"],
    plugins: { "@next/next": nextPlugin },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs["core-web-vitals"].rules,
    },
  },

  // Repo ergonomics: ignore underscore args (middleware _req, etc.)
  {
    files: ["**/*.{ts,tsx,js,jsx}"],
    rules: {
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
    },
  },
];