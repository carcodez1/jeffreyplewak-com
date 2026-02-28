"use client";

import { useEffect } from "react";

type Props = {
  /**
   * CSS selector for elements to observe, e.g. ".focusCard"
   */
  selector: string;

  /**
   * Class added when element is in view, e.g. "focusCard--visible"
   */
  visibleClass: string;

  /**
   * Intersection threshold (0..1). Default 0.2 feels natural for cards.
   */
  threshold?: number;

  /**
   * Root margin for earlier/later reveal, e.g. "0px 0px -10% 0px"
   */
  rootMargin?: string;

  /**
   * If true, remove visibleClass when leaving viewport (re-animates on scroll back).
   * If false, reveal once and keep.
   */
  toggle?: boolean;
};

export function ScrollReveal({
  selector,
  visibleClass,
  threshold = 0.2,
  rootMargin = "0px 0px -10% 0px",
  toggle = false,
}: Props) {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!("IntersectionObserver" in window)) return;

    const els = Array.from(document.querySelectorAll<HTMLElement>(selector));
    if (els.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const el = entry.target as HTMLElement;
          if (entry.isIntersecting) {
            el.classList.add(visibleClass);
          } else if (toggle) {
            el.classList.remove(visibleClass);
          }
        }
      },
      { root: null, rootMargin, threshold }
    );

    for (const el of els) observer.observe(el);
    return () => observer.disconnect();
  }, [selector, visibleClass, threshold, rootMargin, toggle]);

  return null;
}
