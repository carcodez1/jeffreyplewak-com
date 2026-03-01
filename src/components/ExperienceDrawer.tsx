// src/components/ExperienceDrawer.tsx
"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

import type { ExperienceItem } from "@/lib/experience";

/**
 * ExperienceDrawer
 *
 * Polished drawer/modal:
 * - Traps focus while open
 * - Returns focus to opener when closed
 * - Handles Escape key
 * - Accessible labeling via aria-labelledby
 * - Safely guards optional hrefs
 */
export function ExperienceDrawer({
  open,
  item,
  onClose,
}: {
  open: boolean;
  item?: ExperienceItem;
  onClose?: () => void;
}) {
  const panelRef = useRef<HTMLDivElement | null>(null);
  const firstFocusableRef = useRef<HTMLButtonElement | null>(null);
  const lastFocusedElement = useRef<HTMLElement | null>(null);

  // Focus management: move focus into drawer on open
  useEffect(() => {
    if (!open) return;

    // remember last focus for return
    lastFocusedElement.current = document.activeElement as HTMLElement;

    // after DOM updated
    setTimeout(() => {
      firstFocusableRef.current?.focus();
    }, 0);

    // trap focus logic
    const handleFocus = (e: FocusEvent) => {
      if (
        panelRef.current &&
        !panelRef.current.contains(e.target as Node)
      ) {
        e.stopPropagation();
        firstFocusableRef.current?.focus();
      }
    };
    document.addEventListener("focusin", handleFocus);
    return () => document.removeEventListener("focusin", handleFocus);
  }, [open]);

  // Escape key to close
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose?.();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // Return focus when closed
  useEffect(() => {
    if (!open && lastFocusedElement.current) {
      lastFocusedElement.current.focus();
    }
  }, [open]);

  if (!open || !item) return null;

  return (
    <div className="expDrawerRoot" role="dialog" aria-modal="true" aria-labelledby="exp-drawer-title">
      {/* backdrop closes drawer */}
      <button
        className="expDrawerBackdrop"
        type="button"
        aria-label="Close details"
        onClick={onClose}
      />

      <div className="expDrawerPanel" ref={panelRef}>
        {/* HEADER */}
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
              {/* Connect this title with aria-labelledby */}
              <h2 id="exp-drawer-title" className="expDrawerTitle">
                {item.name}
              </h2>

              {item.resume.roleLine && (
                <p className="expRoleLine">{item.resume.roleLine}</p>
              )}
            </div>

            {/* Close button gets initial focus */}
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

          {/* ACTION LINKS */}
          <div className="expDrawerActions">
            {item.resume.pageHref && (
              <a
                className="btn btnPrimary"
                href={item.resume.pageHref}
                onClick={onClose}
              >
                View details
              </a>
            )}
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

        {/* BODY CONTENT */}
        <div className="expDrawerBody">
          <h3 className="expDrawerSectionTitle">What I did</h3>
          <ul className="expDrawerList">
            {item.highlights.map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>
        </div>

        {/* FOOTER */}
        <div className="expDrawerFoot">
          <span className="expDrawerHint">
            Esc closes • Click outside closes
          </span>
        </div>
      </div>
    </div>
  );
}
