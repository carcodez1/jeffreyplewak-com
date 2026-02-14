import js from "@eslint/js";
import tseslint from "typescript-eslint";
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

  // ---------- Node scripts (ESM tooling) ----------
  {
    files: ["scripts/**/*.mjs"],
    languageOptions: {
      parserOptions: { project: null },
      globals: {
        console: "readonly",
        process: "readonly",
      },
    },
    rules: {
      // node globals explicitly declared above
      "no-undef": "off",
    },
  },
  // ---------- Tests: Node helpers / fixtures ----------
  {
    files: ["tests/**/*.{js,cjs,mjs}"],
    languageOptions: {
      parserOptions: { project: null },
      globals: {
        console: "readonly",
        process: "readonly",
        __dirname: "readonly",
        module: "readonly",
        require: "readonly",
      },
    },
    rules: {
      "@typescript-eslint/no-require-imports": "off",
      "no-undef": "off",
    },
  },
  // ---------- Node scripts (CommonJS tooling / test doubles) ----------
  {
    files: ["scripts/**/*.{cjs,js}"],
    languageOptions: {
      parserOptions: { project: null },
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
    files: ["**/*.{ts,tsx,js,jsx,mjs,cjs}"],
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
      parserOptions: { project: null },
    },
  },
];
