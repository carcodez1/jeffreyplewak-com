"use client";

import { useEffect, useId, useRef, useState } from "react";

type DownloadMenuProps = {
  label?: string;
  compact?: boolean;
  iconOnly?: boolean;
  className?: string;
};

export function DownloadMenu({ label = "Downloads", compact = false, iconOnly = false, className }: DownloadMenuProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;
    const onDocPointer = (event: MouseEvent) => {
      if (!rootRef.current) return;
      if (!rootRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    const onEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDocPointer);
    window.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onDocPointer);
      window.removeEventListener("keydown", onEsc);
    };
  }, [open]);

  function closeMenu() {
    setOpen(false);
  }

  return (
    <div ref={rootRef} className={`downloadMenu ${open ? "downloadMenu--open" : ""} ${compact ? "downloadMenu--compact" : ""} ${className ?? ""}`.trim()}>
      <button
        type="button"
        className={`downloadMenuTrigger ${compact ? "downloadMenuTrigger--compact" : ""} ${iconOnly ? "downloadMenuTrigger--icon" : ""}`}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={label}
        title={label}
        onClick={() => setOpen((v) => !v)}
      >
        {iconOnly ? (
          <svg
            className="downloadMenuIcon"
            viewBox="0 0 24 24"
            width="16"
            height="16"
            aria-hidden="true"
            focusable="false"
          >
            <path
              d="M12 3v10m0 0 4-4m-4 4-4-4M5 17h14"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ) : label}
      </button>
      <div id={panelId} className="downloadMenuPanel" role="menu" aria-label="Download options" hidden={!open}>
        <a className="downloadMenuItem" href="/downloads/jeffrey-plewak-resume.pdf" target="_blank" rel="noopener noreferrer" onClick={closeMenu}>
          PDF
        </a>
        <a className="downloadMenuItem" href="/downloads/resume.json" target="_blank" rel="noopener noreferrer" onClick={closeMenu}>
          JSON
        </a>
      </div>
    </div>
  );
}
