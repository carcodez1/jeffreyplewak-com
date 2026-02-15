import js from "@eslint/js";
import tseslint from "typescript-eslint";
import tsParser from "@typescript-eslint/parser";
import nextPlugin from "@next/eslint-plugin-next";

export default [
  // ---------- Global ignores ----------
  {
    ignores: [
      "**/node_modules/**",
      "**/.next/**",
      "**/out/**",
      "**/dist/**",
      "**/build/**",
      "**/coverage/**",
      "**/.vercel/**",
      "**/public/diagrams/**",
    ],
  },

  // ---------- Base JS ----------
  js.configs.recommended,

  // ---------- TypeScript (non type-aware, repo-wide) ----------
  ...tseslint.configs.recommended,

  // ---------- Type-aware ONLY for src ----------
  {
    files: ["src/**/*.{ts,tsx}"],
    ...tseslint.configs.recommendedTypeChecked[0],
    languageOptions: {
      parser: tsParser,
      parserOptions: { project: "./tsconfig.json" },
    },
  },

  // ---------- Next.js ----------
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    plugins: { "@next/next": nextPlugin },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs["core-web-vitals"].rules,
    },
  },

  // ---------- Tests (Vitest globals) ----------
  {
    files: ["tests/**/*.{ts,tsx,js,jsx}"],
    languageOptions: {
      globals: {
        describe: "readonly",
        it: "readonly",
        test: "readonly",
        expect: "readonly",
        beforeAll: "readonly",
        afterAll: "readonly",
        beforeEach: "readonly",
        afterEach: "readonly",
        vi: "readonly",
      },
    },
  },

  // ---------- CJS helper stubs in tests (allow require + node globals) ----------
  {
    files: ["tests/helpers/**/*.cjs"],
    languageOptions: {
      globals: {
        console: "readonly",
        process: "readonly",
        module: "readonly",
        require: "readonly",
        __dirname: "readonly",
      },
    },
    rules: {
      "@typescript-eslint/no-require-imports": "off",
      "no-undef": "off",
    },
  },

  // ---------- Node scripts (ESM tooling) ----------
  {
    files: ["scripts/**/*.mjs"],
    languageOptions: {
      globals: {
        console: "readonly",
        process: "readonly",
      },
    },
    rules: {
      "no-undef": "off",
    },
  },

  // ---------- Node scripts (CommonJS tooling) ----------
  {
    files: ["scripts/**/*.cjs"],
    languageOptions: {
      globals: {
        console: "readonly",
        process: "readonly",
        module: "readonly",
        require: "readonly",
        __dirname: "readonly",
      },
    },
    rules: {
      "@typescript-eslint/no-require-imports": "off",
      "no-undef": "off",
    },
  },

  // ---------- General overrides ----------
  {
    files: ["**/*.{ts,tsx,js,jsx}"],
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_" },
      ],
    },
  },

  // ---------- Disable type-aware lint for config/test/ops files ----------
  {
    files: [
      "eslint.config.*",
      "next.config.*",
      "postcss.config.*",
      "tailwind.config.*",
      "vitest.config.*",
      "tests/**/*",
      ".github/**/*",
    ],
    languageOptions: {
      parser: tsParser,
      parserOptions: { project: null },
    },
  },
];
