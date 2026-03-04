"use client";

import { useEffect } from "react";

type Props = {
  /**
   * CSS selector for elements that should trigger haptics.
   * Example: ".btnPrimary, .iconBtn"
   */
  selector: string;

  /**
   * Vibration duration in ms (Android). iOS Safari typically ignores vibrate().
   */
  patternMs?: number;

  /**
   * If true, only trigger on touch/pointerType=touch.
   */
  touchOnly?: boolean;
};

export function Haptics({ selector, patternMs = 12, touchOnly = true }: Props) {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const canVibrate = typeof navigator !== "undefined" && typeof navigator.vibrate === "function";
    if (!canVibrate) return;

    const onPointerDown = (e: PointerEvent) => {
      if (touchOnly && e.pointerType !== "touch") return;

      const t = e.target as Element | null;
      if (!t) return;

      const hit = t.closest(selector);
      if (!hit) return;

      // Best-effort, non-blocking.
      try {
        navigator.vibrate?.(patternMs);
      } catch {
        // ignore
      }
    };

    window.addEventListener("pointerdown", onPointerDown, { passive: true });
    return () => window.removeEventListener("pointerdown", onPointerDown);
  }, [selector, patternMs, touchOnly]);

  return null;
}
