"use client";

import { useEffect, useMemo, useState } from "react";

type Theme = "dark" | "light";

type Props = {
  /**
   * If true, follow OS preference when no explicit localStorage override exists.
   * Default true. (Your product requirement is "default dark", but OS-follow is still
   * acceptable when user has not chosen a theme.)
   */
  followSystem?: boolean;

  /**
   * If true, render a compact icon-only button (for tight headers).
   */
  iconOnly?: boolean;

  className?: string;
};

const STORAGE_KEY = "theme";

/**
 * Apply theme to <html> to drive CSS variables:
 *  - :root default is dark
 *  - :root[data-theme="light"] enables light overrides
 */
function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.dataset.theme = theme;
}

/**
 * Read user override if present.
 */
function readStoredTheme(): Theme | null {
  try {
    const v = window.localStorage.getItem(STORAGE_KEY);
    return v === "light" || v === "dark" ? v : null;
  } catch {
    return null;
  }
}

/**
 * Persist user choice.
 */
function storeTheme(theme: Theme) {
  try {
    window.localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    // ignore
  }
}

function systemTheme(): Theme {
  return window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches
    ? "light"
    : "dark";
}

export function ThemeToggle({ followSystem = true, iconOnly = true, className }: Props) {
  const [theme, setTheme] = useState<Theme>("dark");

  // Stable label text (prevents re-render churn)
  const label = useMemo(() => (theme === "dark" ? "Switch to light theme" : "Switch to dark theme"), [theme]);

  useEffect(() => {
    // On first mount: decide theme deterministically.
    const stored = readStoredTheme();
    const initial: Theme = stored ?? (followSystem ? systemTheme() : "dark");

    setTheme(initial);
    applyTheme(initial);

    if (followSystem && !stored && window.matchMedia) {
      // If no stored preference, keep in sync with OS changes.
      const mql = window.matchMedia("(prefers-color-scheme: light)");
      const onChange = () => {
        const next = systemTheme();
        setTheme(next);
        applyTheme(next);
      };

      // Safari compatibility
      if (typeof mql.addEventListener === "function") mql.addEventListener("change", onChange);
      else mql.addListener(onChange);

      return () => {
        if (typeof mql.removeEventListener === "function") mql.removeEventListener("change", onChange);
        else mql.removeListener(onChange);
      };
    }

    return;
  }, [followSystem]);

  function toggle() {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    applyTheme(next);
    storeTheme(next);
  }

  // Minimal DOM + no SVG external fetch. Uses text + CSS masking if desired by caller.
  return (
    <button
      type="button"
      onClick={toggle}
      className={className ?? "iconBtn"}
      aria-label={label}
      title={label}
    >
      {iconOnly ? (
        <span aria-hidden="true" style={{ fontSize: 14, lineHeight: 1 }}>
          {theme === "dark" ? "☾" : "☀"}
        </span>
      ) : (
        <span>{theme === "dark" ? "Dark" : "Light"}</span>
      )}
    </button>
  );
}
