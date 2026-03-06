"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";

type NavItem = { href: string; label: string; external?: boolean };

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
    const prevOverflow = document.body.style.overflow;

    if (open) {
      // Prevent body scroll when the drawer is open
      document.body.style.overflow = "hidden";

      // Focus the first interactive element in the nav panel
      requestAnimationFrame(() => {
        const first = panelRef.current?.querySelector<HTMLElement>("a, button");
        first?.focus();
      });
    }

    return () => {
      document.body.style.overflow = prevOverflow;
      toggleRef.current?.focus();
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        onClose?.();
      }
    };
    window.addEventListener("keydown", handleKeydown);

    return () => window.removeEventListener("keydown", handleKeydown);
  }, [open, onClose]);

  return (
    <>
      <button
        ref={toggleRef}
        type="button"
        className="navToggle iconBtn iconBtn--menu"
        aria-expanded={open}
        aria-controls={dialogId}
        aria-label={open ? "Close navigation menu" : "Open navigation menu"}
        onClick={() => setOpen((v) => !v)}
      >
        <span aria-hidden="true" className={`navToggleIcon ${open ? "navToggleIcon--open" : ""}`}>
          <span className="navToggleBar" />
          <span className="navToggleBar" />
          <span className="navToggleBar" />
        </span>
      </button>

      <div
        id={dialogId}
        className={`mobileNav ${open ? "mobileNav--open" : ""}`}
        aria-hidden={!open}
        role="dialog"
        aria-modal="true"
      >
        <div className="mobileNavBackdrop" onClick={() => setOpen(false)} />

        <div ref={panelRef} className="mobileNavPanel">
          <div className="mobileNavPrimary">
            <Link
              className="mobileNavResumeBtn"
              href="/resume"
              onClick={() => {
                setOpen(false);
                onClose?.();
              }}
            >
              Open Resume
            </Link>
          </div>

          <nav className="mobileNavLinks" aria-label="Mobile navigation">
            {nav.map((item) => (
              item.external ? (
                <a
                  key={item.href}
                  className="mobileNavLink"
                  href={item.href}
                  onClick={() => {
                    setOpen(false);
                    onClose?.();
                  }}
                >
                  {item.label}
                </a>
              ) : (
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
              )
            ))}
          </nav>
        </div>
      </div>
    </>
  );
}
