// src/components/ScrollReveal.tsx
"use client";

import { useEffect } from "react";

type Props = {
  selector: string;
  visibleClass: string;
  threshold?: number;
  rootMargin?: string;
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
      { threshold, rootMargin }
    );

    for (const el of els) observer.observe(el);

    return () => observer.disconnect();
  }, [selector, visibleClass, threshold, rootMargin, toggle]);

  return null;
}
