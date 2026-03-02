"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";

type NavItem = { href: string; label: string };

interface MobileNavProps {
  nav: readonly NavItem[];
  onClose?: () => void;
}

export function MobileNav({ nav, onClose }: MobileNavProps) {
  const dialogId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const prev = document.body.style.overflow;
    if (open) {
      document.body.style.overflow = "hidden";
      requestAnimationFrame(() => {
        const panel = panelRef.current;
        if (!panel) return;
        const first = panel.querySelector<HTMLElement>("a, button");
        first?.focus();
      });
    }
    return () => {
      document.body.style.overflow = prev;
      toggleRef.current?.focus();
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        onClose?.();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  return (
    <>
      <button
        ref={toggleRef}
        type="button"
        className="btn btnHeader navToggle"
        aria-expanded={open}
        aria-controls={dialogId}
        aria-label={open ? "Close navigation menu" : "Open navigation menu"}
        onClick={() => setOpen((v) => !v)}
      >
        <span aria-hidden="true">{open ? "✕" : "☰"}</span>
      </button>

      <div
        id={dialogId}
        className={`mobileNav ${open ? "mobileNav--open" : ""}`}
        aria-hidden={!open}
        role="dialog"
        aria-modal="true"
      >
        <button
          type="button"
          className="mobileNavBackdrop"
          aria-label="Close menu"
          onClick={() => {
            setOpen(false);
            onClose?.();
          }}
        />

        <div ref={panelRef} className="mobileNavPanel">
          <nav className="mobileNavLinks" aria-label="Mobile navigation">
            {nav.map((item) => (
              <Link
                key={item.href}
                className="mobileNavLink"
                href={item.href}
                onClick={() => {
                  setOpen(false);
                  onClose?.();
                }}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
}
