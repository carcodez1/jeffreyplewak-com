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

  // ---------- TypeScript (NON type-aware) ----------
  ...tseslint.configs.recommended,

  // ---------- Type-aware ONLY for src ----------
  {
    files: ["src/**/*.{ts,tsx}"],
    ...tseslint.configs.recommendedTypeChecked[0],
    languageOptions: {
      parserOptions: {
        project: "./tsconfig.json",
      },
    },
  },

  // ---------- Next.js ----------
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    plugins: {
      "@next/next": nextPlugin,
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs["core-web-vitals"].rules,
    },
  },

  // ---------- General overrides ----------
  {
    files: ["**/*.{ts,tsx,js,jsx}"],
    rules: {
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
    },
  },

  // ---------- Disable type-aware for config/test files ----------
  {
    files: [
      "eslint.config.*",
      "next.config.*",
      "postcss.config.*",
      "tailwind.config.*",
      "vitest.config.*",
      "tests/**/*",
    ],
    languageOptions: {
      parserOptions: {
        project: null,
      },
    },
  },
];