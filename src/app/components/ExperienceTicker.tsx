// src/app/components/ExperienceTicker.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo } from "react";
import { getCareerSurfaceLogos, type CareerSurfaceLogo } from "@/lib/career";

// Two identical copies → -50% transform is always correct
function twoPass<T>(items: readonly T[]): readonly T[] {
  if (items.length <= 1) return items;
  return [...items, ...items];
}

type ExperienceTickerProps = {
  interactive?: boolean;
  className?: string;
};

export function ExperienceTicker({ interactive = true, className }: ExperienceTickerProps) {
  const items = useMemo(() => getCareerSurfaceLogos("homepageTicker"), []);
  const loopItems = useMemo(() => twoPass(items), [items]);

  if (!items.length) return null;

  return (
    <div className={`expTicker ${interactive ? "" : "expTicker--static"} ${className ?? ""}`.trim()} aria-label="Experience across organizations">
      <div className="expTrack" aria-label="Scrolling logo track">
        {loopItems.map((item: CareerSurfaceLogo, index: number) => (
          interactive ? (
            <Link
              key={`${item.key}-${index}`}
              href={item.href}
              className="expStripe"
              aria-label={`${item.label} — view on resume`}
              prefetch={false}
            >
              <Image
                src={item.logoSrc}
                alt={item.label}
                className={`expLogo${item.logoSrc.endsWith(".svg") ? " expLogo--svg" : ""}`}
                width={item.width ?? 96}
                height={item.height ?? 28}
                loading="lazy"
                decoding="async"
              />
            </Link>
          ) : (
            <div key={`${item.key}-${index}`} className="expStripe" aria-label={item.label}>
              <Image
                src={item.logoSrc}
                alt={item.label}
                className={`expLogo${item.logoSrc.endsWith(".svg") ? " expLogo--svg" : ""}`}
                width={item.width ?? 96}
                height={item.height ?? 28}
                loading="lazy"
                decoding="async"
              />
            </div>
          )
        ))}
      </div>
    </div>
  );
}
