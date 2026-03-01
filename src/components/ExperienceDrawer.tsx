// src/components/ExperienceDrawer.tsx
"use client";

import Image from "next/image";
import { useEffect } from "react";

export type ExperienceItem = {
  key: string;
  name: string;
  href: string;
  logoSrc: string;
  logoWidth: number;
  logoHeight: number;
  resume: {
    pageHref: string;
    pdfHref: string;
    roleLine?: string;
  };
  highlights: string[];
};

export function ExperienceDrawer(props: { open: boolean; item?: ExperienceItem; onClose?: () => void }) {
  const { open, item, onClose } = props;

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose?.();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open || !item) return null;

  return (
    <div className="expDrawerRoot" role="dialog" aria-modal="true" aria-label={`${item.name} details`}>
      <button className="expDrawerBackdrop" type="button" aria-label="Close" onClick={onClose} />

      <div className="expDrawerPanel">
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
              <div className="expDrawerTitle">{item.name}</div>
              {item.resume.roleLine ? <p className="expRoleLine">{item.resume.roleLine}</p> : null}
            </div>

            <button className="expDrawerCloseBtn" type="button" onClick={onClose} aria-label="Close drawer">
              Close
            </button>
          </div>

          <div className="expDrawerActions">
            <a className="btn btnPrimary" href={item.resume.pageHref} onClick={onClose}>
              View details
            </a>
            <a className="btn" href={item.resume.pdfHref} target="_blank" rel="noopener noreferrer">
              Open PDF
            </a>
            <a className="btn btnTertiary" href={item.href} target="_blank" rel="noopener noreferrer">
              Company site
            </a>
          </div>
        </div>

        <div className="expDrawerBody">
          <div className="expDrawerSectionTitle">What I did</div>
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
