// src/components/ExperienceStrip.tsx
"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { ExperienceDrawer, type ExperienceItem } from "./ExperienceDrawer";
import { getExperienceStripItems } from "@/lib/resume";

type Props = {
  className?: string;
  label?: string;
};

export function ExperienceStrip({ className, label = "Experience across" }: Props) {
  const items = useMemo(() => getExperienceStripItems(), []);
  const duplicated = useMemo(() => [...items, ...items], [items]);

  const [openKey, setOpenKey] = useState<string | null>(null);

  const active: ExperienceItem | undefined = useMemo(() => {
    if (!openKey) return undefined;
    const hit = items.find((i) => i.key === openKey);
    if (!hit) return undefined;
    return {
      key: hit.key,
      name: hit.name,
      href: hit.href,
      logoSrc: hit.logoSrc,
      logoWidth: hit.logoWidth,
      logoHeight: hit.logoHeight,
      resume: {
        pageHref: hit.resume.pageHref,
        pdfHref: hit.resume.pdfHref,
        roleLine: hit.resume.roleLine,
      },
      highlights: hit.highlights,
    };
  }, [openKey, items]);

  return (
    <section className={`expStrip ${className ?? ""}`} aria-label="Experience">
      <div className="expStripLabelRow">
        <span className="expStripLabel">{label}</span>
        <span className="expStripRule" aria-hidden="true" />
      </div>

      <div className="expStripMarquee" aria-label="Employer logos">
        <div className="expStripTrack" aria-hidden="false">
          {duplicated.map((item, idx) => (
            <button
              key={`${item.key}-${idx}`}
              className="expLogoBtn"
              type="button"
              onClick={() => setOpenKey(item.key)}
              aria-label={`Open details: ${item.name}`}
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
