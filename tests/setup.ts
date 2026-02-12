import "@testing-library/jest-dom/vitest";

// JSDOM lacks some browser APIs; keep shims minimal and explicit.
// Do NOT redeclare Window.scrollTo types (lib.dom already defines it).
if (typeof window !== "undefined" && typeof window.scrollTo !== "function") {
  window.scrollTo = (() => {}) as typeof window.scrollTo;
}