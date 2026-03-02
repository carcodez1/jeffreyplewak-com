// src/components/SocialIcon.tsx
//
// Goal: CSS-tintable icons with zero runtime JS.
// Rationale: <img>/<Image> SVGs do NOT inherit currentColor reliably.
// Solution: render a span that uses the SVG as a mask; background-color = currentColor.

type Props = {
  src: string;            // e.g. "/assets/icons/github.svg"
  title: string;          // accessible label on the wrapper link
  className?: string;
  size?: number;          // px
};

export function SocialIcon({ src, title: _title, className, size = 18 }: Props) {
  // title is handled by the parent <a aria-label="...">; no duplicate accessible name here.
  return (
    <span
      className={className ?? "icon"}
      aria-hidden="true"
      style={{
        width: size,
        height: size,
        display: "inline-block",
        backgroundColor: "currentColor",
        WebkitMaskImage: `url(${src})`,
        maskImage: `url(${src})`,
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
        maskPosition: "center",
        WebkitMaskSize: "contain",
        maskSize: "contain",
      }}
    />
  );
}
