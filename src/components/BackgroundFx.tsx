// src/components/BackgroundFx.tsx
export function BackgroundFx({ className }: { className?: string }) {
  return (
    <div className={["bgFx", className].filter(Boolean).join(" ")} aria-hidden="true">
      <div className="bgFxA" />
      <div className="bgFxB" />
      <div className="bgFxNoise" />
    </div>
  );
}
