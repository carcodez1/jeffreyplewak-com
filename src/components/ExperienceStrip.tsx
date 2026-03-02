// src/components/ExperienceStrip.tsx
"use client";

import { useId, useMemo, useState } from "react";
import Image from "next/image";
import { ExperienceDrawer } from "./ExperienceDrawer";
import { getExperienceStripItems, type ExperienceStripItem } from "@/lib/resume";

type Props = { className?: string; label?: string };

export function ExperienceStrip({
  className,
  label = "Experience across",
}: Props) {
  const items = useMemo(() => getExperienceStripItems(), []);
  const [openKey, setOpenKey] = useState<ExperienceStripItem["key"] | null>(null);
  const dialogId = useId();

  const active = items.find((i) => i.key === openKey);

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

      <ol className="expTimelineTrack" role="list">
        {items.map((item) => (
          <li key={item.key} className="expTimelineNode">
            <button
              type="button"
              className="expTimelineCard"
              aria-label={`Show details for ${item.name}`}
              aria-haspopup="dialog"
              aria-controls={dialogId}
              aria-expanded={openKey === item.key}
              onClick={() => setOpenKey(item.key)}
            >
              <div className="expTimelineLogo" aria-hidden="true">
                <Image
                  src={item.logoSrc}
                  alt=""
                  width={item.logoWidth}
                  height={item.logoHeight}
                  className="expTimelineLogoImg"
                  loading="lazy"
                />
              </div>

              <div className="expTimelineText">
                {(item.resume.start || item.resume.end) && (
                  <span className="expTimelineDate">
                    {item.resume.start ?? "UNKNOWN"}
                    {item.resume.end ? ` — ${item.resume.end}` : ""}
                  </span>
                )}

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
        dialogId={dialogId}
      />
    </section>
  );
}
