"use client";

import { useEffect } from "react";

type Props = {
  selector?: string;
  visibleClass?: string;
  rootMargin?: string;
  threshold?: number;
  repeat?: boolean;
};

export function FocusReveal({
  selector = ".focusCard",
  visibleClass = "focusCard--visible",
  rootMargin = "0px 0px -10% 0px",
  threshold = 0.2,
  repeat = true,
}: Props) {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!("IntersectionObserver" in window)) return;

    const elements = Array.from(document.querySelectorAll<HTMLElement>(selector));
    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const el = entry.target as HTMLElement;
          if (entry.isIntersecting) {
            el.classList.add(visibleClass);
          } else if (repeat) {
            el.classList.remove(visibleClass);
          }
        }
      },
      { root: null, rootMargin, threshold }
    );

    for (const el of elements) observer.observe(el);

    return () => observer.disconnect();
  }, [selector, visibleClass, rootMargin, threshold, repeat]);

  return null;
}
