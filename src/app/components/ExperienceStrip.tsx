"use client";

import { useId, useMemo, useState } from "react";
import Image from "next/image";
import { ExperienceDrawer } from "./ExperienceDrawer";
import { getExperienceStripItems, type ExperienceStripItem } from "@/lib/resume";

type Props = { className?: string; label?: string };

export function ExperienceStrip({ className, label = "Experience across" }: Props) {
  const items = useMemo(() => getExperienceStripItems(), []);
  const [openKey, setOpenKey] = useState<string | null>(null);
  const dialogBaseId = useId();

  const active: ExperienceStripItem | undefined = items.find((i) => i.key === openKey);

  return (
    <section className={`expHorizontalTimeline ${className ?? ""}`} aria-labelledby={`${dialogBaseId}-title`}>
      <header className="expTimelineHeader">
        <h2 id={`${dialogBaseId}-title`} className="expTimelineTitle">
          {label}
        </h2>

        <p className="expTimelineCount" aria-label={`${items.length} companies`}>
          {items.length} companies
        </p>
      </header>

      <div className="expTimelineScroller" aria-label="Company timeline">
        <ol className="expTimelineTrack" role="list">
          {items.map((item) => {
            const isOpen = openKey === item.key;
            const range = item.resume.end ? `${item.resume.start} — ${item.resume.end}` : `${item.resume.start} — Present`;

            return (
              <li key={item.key} className="expTimelineNode">
                <button
                  type="button"
                  className="expTimelineCard"
                  aria-label={`Show details for ${item.name}, ${item.resume.title}`}
                  aria-haspopup="dialog"
                  aria-controls={`${dialogBaseId}-dialog`}
                  aria-expanded={isOpen}
                  onClick={() => setOpenKey(item.key)}
                >
                  <div className="expTimelineTop">
                    <div className="expTimelineCompany">
                      <strong className="expTimelineName">{item.name}</strong>
                      <span className="expTimelineRole">{item.resume.title}</span>
                    </div>

                    {item.logoSrc ? (
                      <div className="expTimelineLogo" aria-hidden="true">
                        <Image
                          src={item.logoSrc}
                          alt=""
                          width={item.logoWidth ?? 72}
                          height={item.logoHeight ?? 22}
                          className="expTimelineLogoImg"
                          loading="lazy"
                        />
                      </div>
                    ) : null}
                  </div>

                  <div className="expTimelineMeta">
                    <time className="expTimelineDate">{range}</time>
                    <span className="expTimelineType">{item.resume.workType}</span>
                  </div>
                </button>
              </li>
            );
          })}
        </ol>
      </div>

      <ExperienceDrawer
        open={openKey != null}
        item={active}
        onClose={() => setOpenKey(null)}
        dialogId={`${dialogBaseId}-dialog`}
      />
    </section>
  );
}
