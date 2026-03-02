// src/components/SocialIcon.tsx
import type { ImgHTMLAttributes } from "react";

type Props = {
  src: string; // e.g. "/assets/icons/github.svg"
  title: string;
  className?: string;
  size?: number; // px
};

/**
 * Brand-color icons (universal).
 * - Uses <img> so original SVG colors render (mask-based icons cannot).
 * - Keep link aria-label on the <a>; this <img> can be decorative.
 */
export function SocialIcon({ src, title, className, size = 18 }: Props) {
  const imgProps: ImgHTMLAttributes<HTMLImageElement> = {
    src,
    alt: "",
    width: size,
    height: size,
    loading: "lazy",
    decoding: "async",
    draggable: false,
  };

  return <img {...imgProps} className={className ? `iconImg ${className}` : "iconImg"} title={title} />;
}
