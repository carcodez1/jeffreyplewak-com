// src/components/BackgroundMotion.tsx
"use client";

import { useEffect, useRef } from "react";

type Props = {
  className?: string;
  videoSrc?: string;
  posterSrc?: string;
  preload?: "none" | "metadata" | "auto";
};

export function BackgroundMotion({
  className,
  videoSrc = "/assets/background/bg-loop.webm",
  posterSrc = "/assets/background/bg.jpg",
  preload = "metadata",
}: Props) {
  const ref = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");

    const apply = () => {
      if (mq.matches) {
        try {
          v.pause();
        } catch {
          // no-op
        }
        v.setAttribute("data-reduced", "true");
      } else {
        v.removeAttribute("data-reduced");
        // Autoplay can fail; ignore.
        void v.play().catch(() => {});
      }
    };

    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  return (
    <div className={["bgMotion", className].filter(Boolean).join(" ")} aria-hidden="true">
      <video
        ref={ref}
        className="bgMotionVideo"
        autoPlay
        muted
        loop
        playsInline
        preload={preload}
        poster={posterSrc}
      >
        <source src={videoSrc} type="video/webm" />
      </video>

      {/* If video can't play / reduced motion, this still provides a stable background. */}
      <div className="bgMotionFallback" style={{ backgroundImage: `url(${posterSrc})` }} />

      <div className="bgMotionScrim" />
    </div>
  );
}
