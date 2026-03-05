// src/components/SocialIcon.tsx
import Image from "next/image";

type Props = {
  src: string;
  title: string;
  className?: string;
  size?: number;
};

export function SocialIcon({
  src,
  title,
  className,
  size = 18,
}: Props) {
  return (
    <Image
      src={src}
      alt=""
      title={title}
      width={size}
      height={size}
      className={className ? `iconImg ${className}` : "iconImg"}
      sizes={`${size}px`}
      loading="eager"
      decoding="async"
    />
  );
}
