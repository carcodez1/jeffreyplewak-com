// src/components/SocialIcon.tsx
import Image from "next/image";

export function SocialIcon(props: { src: string; title: string; className?: string }) {
  const { src, title, className } = props;
  return (
    <Image
      src={src}
      alt={title}
      width={18}
      height={18}
      className={className}
      // Don’t set priority; these are tiny and below LCP most of the time.
    />
  );
}
