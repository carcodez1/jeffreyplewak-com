// src/components/ExperienceDrawer.tsx
"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import type { ExperienceStripItem } from "@/lib/resume";

/**
 * ExperienceDrawer
 * - Traps focus while open
 * - Returns focus to opener when closed
 * - Handles Escape key
 * - Accessible labeling via aria-labelledby
 */
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

  useEffect(() => {
    if (!open) return;

    lastFocusedElement.current = document.activeElement as HTMLElement;

    // focus the close button ASAP after mount
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

  return (
    <div
      className="expDrawerRoot"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      <button
        className="expDrawerBackdrop"
        type="button"
        aria-label="Close details"
        onClick={onClose}
      />

      <div className="expDrawerPanel" ref={panelRef}>
        <div className="expDrawerHead">
          <div className="expDrawerTitleRow">
            <div className="expDrawerLogo" aria-hidden="true">
              <Image
                src={item.logoSrc}
                alt=""
                width={item.logoWidth}
                height={item.logoHeight}
                className="expDrawerLogoImg"
              />
            </div>

            <div>
              <h2 id={titleId} className="expDrawerTitle">
                {item.name}
              </h2>
              {item.resume.roleLine && (
                <p className="expRoleLine">{item.resume.roleLine}</p>
              )}
              {(item.resume.start || item.resume.end) && (
                <p className="expRoleLine">
                  {item.resume.start ?? "UNKNOWN"}
                  {item.resume.end ? ` — ${item.resume.end}` : ""}
                </p>
              )}
            </div>

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
              View details
            </a>
            <a
              className="btn"
              href={item.resume.pdfHref}
              target="_blank"
              rel="noopener noreferrer"
            >
              Open PDF
            </a>
            <a
              className="btn btnTertiary"
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              Company site
            </a>
          </div>
        </div>

        <div className="expDrawerBody">
          <h3 className="expDrawerSectionTitle">Highlights</h3>
          <ul className="expDrawerList">
            {item.highlights.map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>
        </div>

        <div className="expDrawerFoot">
          <span className="expDrawerHint">Esc closes • Click outside closes</span>
        </div>
      </div>
    </div>
  );
}
