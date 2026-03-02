// src/components/ExperienceDrawer.tsx
"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import type { ExperienceStripItem } from "@/lib/resume";

export function ExperienceDrawer({
  open,
  item,
  onClose,
  dialogId,
}: {
  open: boolean;
  item?: ExperienceStripItem;
  onClose?: () => void;
  dialogId: string;
}) {
  const panelRef = useRef<HTMLDivElement | null>(null);
  const firstFocusableRef = useRef<HTMLButtonElement | null>(null);
  const lastFocusedElement = useRef<HTMLElement | null>(null);

  const titleId = `${dialogId}-title`;
  const descId = `${dialogId}-desc`;

  useEffect(() => {
    if (!open) return;

    lastFocusedElement.current = document.activeElement as HTMLElement;

    queueMicrotask(() => {
      firstFocusableRef.current?.focus();
    });

    const handleFocus = (e: FocusEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        e.stopPropagation();
        firstFocusableRef.current?.focus();
      }
    };

    document.addEventListener("focusin", handleFocus);
    return () => document.removeEventListener("focusin", handleFocus);
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose?.();
    };

    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  useEffect(() => {
    if (!open && lastFocusedElement.current) {
      lastFocusedElement.current.focus();
    }
  }, [open]);

  if (!open || !item) return null;

  const range = item.resume.end ? `${item.resume.start} — ${item.resume.end}` : `${item.resume.start} — Present`;

  return (
    <div
      id={dialogId}
      className="expDrawerRoot"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      aria-describedby={descId}
    >
      <button className="expDrawerBackdrop" type="button" aria-label="Close details" onClick={onClose} />

      <div className="expDrawerPanel" ref={panelRef}>
        <div className="expDrawerHead">
          <div className="expDrawerTitleRow">
            {/* Primary: Company + title */}
            <div className="expDrawerTitleBlock">
              <h2 id={titleId} className="expDrawerTitle">
                {item.name}
              </h2>
              <p className="expDrawerRole">{item.resume.title}</p>

              <p id={descId} className="expDrawerMeta">
                <span className="expDrawerMetaItem">{range}</span>
                <span className="expDrawerMetaDot">•</span>
                <span className="expDrawerMetaItem">{item.resume.workType}</span>
                <span className="expDrawerMetaDot">•</span>
                <span className="expDrawerMetaItem">{item.resume.location}</span>
              </p>
            </div>

            {/* Secondary: Logo (only if present) */}
            {item.logoSrc ? (
              <div className="expDrawerLogo" aria-hidden="true">
                <Image
                  src={item.logoSrc}
                  alt=""
                  width={item.logoWidth ?? 96}
                  height={item.logoHeight ?? 28}
                  className="expDrawerLogoImg"
                />
              </div>
            ) : null}

            <button
              ref={firstFocusableRef}
              className="expDrawerCloseBtn"
              type="button"
              onClick={onClose}
              aria-label={`Close details for ${item.name}`}
            >
              Close
            </button>
          </div>

          <div className="expDrawerActions">
            <a className="btn btnPrimary" href={item.resume.pageHref} onClick={onClose}>
              View on resume
            </a>

            <a className="btn" href={item.resume.pdfHref} target="_blank" rel="noopener noreferrer">
              Open PDF
            </a>

            {item.href ? (
              <a className="btn btnTertiary" href={item.href} target="_blank" rel="noopener noreferrer">
                Company site
              </a>
            ) : null}
          </div>
        </div>

        <div className="expDrawerBody">
          <h3 className="expDrawerSectionTitle">Highlights</h3>
          <ul className="expDrawerList">
            {item.highlights.map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>

          {item.technologies && item.technologies.length > 0 ? (
            <>
              <h3 className="expDrawerSectionTitle">Technologies</h3>
              <ul className="expDrawerTags" role="list">
                {item.technologies.map((t) => (
                  <li key={t} className="expDrawerTag">
                    {t}
                  </li>
                ))}
              </ul>
            </>
          ) : null}
        </div>

        <div className="expDrawerFoot">
          <span className="expDrawerHint">Esc closes • Click outside closes</span>
        </div>
      </div>
    </div>
  );
}
