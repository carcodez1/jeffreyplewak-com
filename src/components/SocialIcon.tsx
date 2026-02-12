import { cx } from "./icons";

type Props = {
  src: string;
  label: string;
  size?: number;
  className?: string;
  color?: string;
};

export function SocialIcon({ src, label, size = 18, className, color }: Props) {
  return (
    <span
      aria-hidden="true"
      className={cx("iconMask", className)}
      title={label}
      style={
        {
          width: size,
          height: size,
          color: color ?? "currentColor",
          ["--icon-url"]: `url("${src}")`,
        } as React.CSSProperties
      }
    />
  );
}