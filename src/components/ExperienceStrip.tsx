// src/components/ExperienceStrip.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import { ExperienceDrawer } from "./ExperienceDrawer";
import { EXPERIENCE_ITEMS, type ExperienceItem } from "@/lib/experience";

/**
 * Horizontal timeline component showing both dates and role.
 */
type Props = { className?: string; label?: string };

export function ExperienceStrip({
  className,
  label = "Experience across",
}: Props) {
  const [openKey, setOpenKey] = useState<string | null>(null);
  const active: ExperienceItem | undefined =
    EXPERIENCE_ITEMS.find((i) => i.key === openKey);

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
        {EXPERIENCE_ITEMS.map((item) => (
          <li key={item.key} className="expTimelineNode">
            <button
              type="button"
              className="expTimelineCard"
              aria-label={`Show details for ${item.name}`}
              onClick={() => setOpenKey(item.key)}
            >
              <div className="expTimelineLogo">
                <Image
                  src={item.logoSrc}
                  alt={item.name}
                  width={item.logoWidth}
                  height={item.logoHeight}
                />
              </div>

              <div className="expTimelineText">
                {/* Render timeline date range */}
                <span className="expTimelineDate">
                  {item.resume.startDate}
                  {item.resume.endDate ? ` — ${item.resume.endDate}` : ""}
                </span>

                {/* Company name + role */}
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
