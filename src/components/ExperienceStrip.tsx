// src/components/ExperienceStrip.tsx
"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { ExperienceDrawer } from "./ExperienceDrawer";
import { EXPERIENCE_ITEMS, type ExperienceItem } from "@/lib/experience";

type Props = { className?: string; label?: string };

export function ExperienceStrip({ className, label = "Experience across" }: Props) {
  const [openKey, setOpenKey] = useState<ExperienceItem["key"] | null>(null);

  const active: ExperienceItem | undefined = useMemo(() => {
    if (!openKey) return undefined;
    return EXPERIENCE_ITEMS.find((i) => i.key === openKey);
  }, [openKey]);

  const duplicated = useMemo(() => [...EXPERIENCE_ITEMS, ...EXPERIENCE_ITEMS], []);

  return (
    <section className={["expStrip", className].filter(Boolean).join(" ")} aria-label="Experience">
      <div className="expStripLabelRow">
        <span className="expStripLabel">{label}</span>
        <span className="expStripRule" aria-hidden="true" />
      </div>

      <div className="expStripMarquee" aria-label="Employer logos">
        <div className="expStripTrack">
          {duplicated.map((item, idx) => (
            <button
              key={`${item.key}-${idx}`}
              className="expLogoBtn"
              type="button"
              onClick={() => setOpenKey(item.key)}
              aria-label={`Open details: ${item.name}`}
            >
              <Image src={item.logoSrc} alt={item.name} width={item.logoWidth} height={item.logoHeight} className="expLogoImg" />
            </button>
          ))}
        </div>
      </div>

      <ExperienceDrawer open={openKey != null} item={active} onClose={() => setOpenKey(null)} />
    </section>
  );
}
