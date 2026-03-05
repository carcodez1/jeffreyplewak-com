// src/app/components/BackgroundFx.tsx
// Ambient background — all colors via CSS custom properties from theme.css
// No hard-coded color values.

export function BackgroundFx() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: -1,
        // Using inline style only for position; color is token-driven via CSS
      }}
      className="bgFx"
    />
  );
}
