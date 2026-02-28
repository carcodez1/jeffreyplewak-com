"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";

function getStoredTheme(): Theme | null {
  try {
    const v = window.localStorage.getItem("theme");
    return v === "light" || v === "dark" ? v : null;
  } catch {
    return null;
  }
}

function setTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  try {
    window.localStorage.setItem("theme", theme);
  } catch {
    // ignore
  }
}

export function ThemeToggle() {
  const [theme, setThemeState] = useState<Theme | null>(null);

  useEffect(() => {
    const stored = getStoredTheme();
    if (stored) {
      setThemeState(stored);
      return;
    }
    const prefersDark =
      window.matchMedia?.("(prefers-color-scheme: dark)")?.matches ?? false;
    setThemeState(prefersDark ? "dark" : "light");
  }, []);

  const effective = theme ?? "light";
  const next: Theme = effective === "dark" ? "light" : "dark";

  return (
    <button
      type="button"
      className="iconBtn"
      aria-label={effective === "dark" ? "Switch to light theme" : "Switch to dark theme"}
      title={effective === "dark" ? "Light theme" : "Dark theme"}
      onClick={() => {
        setTheme(next);
        setThemeState(next);
      }}
    >
      <span aria-hidden="true" className="themeGlyph">
        {effective === "dark" ? "☀" : "☾"}
      </span>
    </button>
  );
}
