export function BackgroundFx() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: -1,
        background: `
          radial-gradient(circle at 18% 22%, hsla(var(--accent) / 0.10), transparent 44%),
          radial-gradient(circle at 82% 70%, hsla(var(--accent2) / 0.08), transparent 48%),
          var(--bg)
        `,
      }}
    />
  );
}
