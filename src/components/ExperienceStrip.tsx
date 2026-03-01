// src/components/ExperienceStrip.tsx
"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { ExperienceDrawer } from "./ExperienceDrawer";
import { EXPERIENCE_ITEMS, type ExperienceItem } from "@/lib/experience";

type Props = { className?: string; label?: string };

export function ExperienceStrip({ className, label = "Experience across" }: Props) {
  const items = useMemo(() => EXPERIENCE_ITEMS, []);
  const duplicated = useMemo(() => [...items, ...items], [items]);

  const [openKey, setOpenKey] = useState<string | null>(null);

  const active: ExperienceItem | undefined = useMemo(() => {
    if (!openKey) return undefined;
    return items.find((i) => i.key === openKey);
  }, [openKey, items]);

  return (
    <section className={`expStrip ${className ?? ""}`} aria-label="Experience">
      <div className="expStripLabelRow">
        <span className="expStripLabel">{label}</span>
        <span className="expStripRule" aria-hidden="true" />
      </div>

      {/* Desktop/tablet: marquee (CSS animation). Mobile: manual scroll-snap. */}
      <div className="expStripViewport" aria-label="Employer logos">
        <div className="expStripTrack" role="list">
          {duplicated.map((item, idx) => (
            <button
              key={`${item.key}-${idx}`}
              className="expLogoBtn"
              type="button"
              onClick={() => setOpenKey(item.key)}
              aria-label={`Open details: ${item.name}`}
              data-brand={item.key}
              role="listitem"
            >
              <Image
                src={item.logoSrc}
                alt={item.name}
                width={item.logoWidth}
                height={item.logoHeight}
                className="expLogoImg"
              />
            </button>
          ))}
        </div>
      </div>

      <ExperienceDrawer open={openKey != null} item={active} onClose={() => setOpenKey(null)} />
    </section>
  );
}
