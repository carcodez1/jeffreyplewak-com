// src/components/SocialIcon.tsx
import type { CSSProperties } from "react";

type Props = {
  src: string; // e.g. "/assets/icons/github.svg"
  title: string;
  className?: string;
  size?: number; // px
};

type IconStyle = CSSProperties & { ["--icon-url"]?: string };

export function SocialIcon({ src, title, className, size = 18 }: Props) {
  const style: IconStyle = {
    ["--icon-url"]: `url(${src})`,
    width: size,
    height: size,
  };

  // Mask-image makes the icon inherit currentColor reliably.
  return (
    <span
      className={className ? `icon ${className}` : "icon"}
      aria-label={title}
      role="img"
      style={style}
    />
  );
}
