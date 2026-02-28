// src/components/SocialIcon.tsx
import type React from "react";
import { cx } from "./icons";

type Props = {
  src: string;          // URL/path to the SVG used as a mask
  label: string;        // for title/tooltip semantics
  size?: number;        // px
  className?: string;
  color?: string;       // optional override; default currentColor
};

/**
 * Mask-based icon renderer.
 * - Uses CSS variable --icon-url for the mask image.
 * - Safe for SSR; purely presentational.
 */
export function SocialIcon({
  src,
  label,
  size = 18,
  className,
  color,
}: Props) {
  // Strong typing for CSS custom property.
  const style: React.CSSProperties & { ["--icon-url"]?: string } = {
    width: size,
    height: size,
    color: color ?? "currentColor",
    ["--icon-url"]: `url("${src}")`,
  };

  return (
    <span
      aria-hidden="true"
      className={cx("iconMask", className)}
      title={label}
      style={style}
    />
  );
}
