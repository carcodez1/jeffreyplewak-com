// src/components/SocialIcon.tsx
import type { CSSProperties } from "react";

type Props = {
  src: string;              // e.g. "/assets/icons/github.svg"
  className?: string;       // e.g. "icon--social"
  title?: string;           // tooltip only; do not rely on for a11y
};

/**
 * Mask-based icon so it inherits currentColor.
 * Requires CSS for .iconMask (size + background-color + mask rules).
 */
export function SocialIcon({ src, className, title }: Props) {
  const style = {
    WebkitMaskImage: `url(${src})`,
    maskImage: `url(${src})`,
  } satisfies CSSProperties;

  const cls = ["iconMask", className].filter(Boolean).join(" ");

  return <span className={cls} aria-hidden="true" title={title} style={style} />;
}
