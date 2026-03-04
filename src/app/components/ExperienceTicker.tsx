"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo } from "react";
import { EXPERIENCE_LOGOS, type ExperienceLogo } from "@/config/experience";

function seamSafeLoop<T>(items: readonly T[]): readonly T[] {
  if (items.length <= 1) return items;
  const rotated = [...items.slice(1), items[0]];
  return [...items, ...rotated];
}

export function ExperienceTicker() {
  const items = useMemo(() => EXPERIENCE_LOGOS, []);
  const loopItems = useMemo(() => seamSafeLoop(items), [items]);

  if (!items.length) return null;

  return (
    <div className="expTicker" aria-label="Experience across organizations">
      <div className="expTrack" aria-label="Scrolling logo track">
        {loopItems.map((item: ExperienceLogo, index: number) => (
          <Link
            key={`${item.key}-${index}`}
            href={item.href}
            className="expStripe"
            aria-label={`${item.label} — open details`}
            prefetch={false}
          >
            <Image
              src={item.logoSrc}
              alt={item.label}
              className="expLogo"
              width={item.width ?? 96}
              height={item.height ?? 28}
              loading="lazy"
              decoding="async"
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
