"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo } from "react";
import { getExperienceStripItems } from "@/lib/resume";

export function ExperienceTicker() {
  const items = useMemo(() => getExperienceStripItems(), []);
  const loopItems = useMemo(() => [...items, ...items], [items]);

  if (!items.length) return null;

  return (
    <div className="expTicker" aria-label="Experience across organizations">
      <div className="expTickerEdge expTickerEdgeL" aria-hidden="true" />
      <div className="expTickerEdge expTickerEdgeR" aria-hidden="true" />

      <div className="expTrack" aria-label="Scrolling logo track">
        {loopItems.map((item, index) => (
          <Link
            key={`${item.key}-${index}`}
            href={item.resume.pageHref}
            className="expStripe"
            aria-label={`${item.name} — open resume details`}
            prefetch={false}
          >
            {item.logoSrc ? (
              <Image
                src={item.logoSrc}
                alt={item.name}
                className="expLogo"
                width={item.logoWidth ?? 96}
                height={item.logoHeight ?? 28}
                loading={index < items.length ? "eager" : "lazy"}
                priority={index < Math.min(items.length, 6)}
              />
            ) : (
              <span className="expFallback">{item.name}</span>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}
