// src/components/ExperienceStrip.tsx
"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { ExperienceDrawer } from "./ExperienceDrawer";
import { getExperienceStripItems, type ExperienceStripItem } from "@/lib/resume";

type Props = { className?: string; label?: string };

export function ExperienceStrip({ className, label = "Experience across" }: Props) {
  const items = useMemo(() => getExperienceStripItems(), []);
  const [openKey, setOpenKey] = useState<string | null>(null);

  const active: ExperienceStripItem | undefined =
    items.find((i) => String(i.key) === String(openKey));

  return (
    <section
      className={`expHorizontalTimeline ${className ?? ""}`}
      aria-labelledby="experience-timeline-title"
    >
      <header className="expTimelineHeader">
        <h2 id="experience-timeline-title" className="expTimelineTitle">
          {label}
        </h2>
      </header>

      <ol className="expTimelineTrack">
        {items.map((item) => (
          <li key={String(item.key)} className="expTimelineNode">
            <button
              type="button"
              className="expTimelineCard"
              aria-label={`Show details for ${item.name}`}
              onClick={() => setOpenKey(String(item.key))}
            >
              <div className="expTimelineLogo" aria-hidden="true">
                <Image
                  src={item.logoSrc}
                  alt=""
                  width={item.logoWidth}
                  height={item.logoHeight}
                />
              </div>

              <div className="expTimelineText">
                <span className="expTimelineDate">
                  {item.resume.start}
                  {item.resume.end ? ` — ${item.resume.end}` : " — Present"}
                </span>

                <span className="expTimelineName">{item.name}</span>

                {item.resume.roleLine && (
                  <span className="expTimelineRole">{item.resume.roleLine}</span>
                )}
              </div>
            </button>
          </li>
        ))}
      </ol>

      <ExperienceDrawer
        open={openKey != null}
        item={active}
        onClose={() => setOpenKey(null)}
      />
    </section>
  );
}
