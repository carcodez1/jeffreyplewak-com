export function BackgroundFx() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: -1,
        background: `
          radial-gradient(circle at 20% 20%, rgba(35,60,90,0.25), transparent 40%),
          radial-gradient(circle at 80% 70%, rgba(20,30,50,0.30), transparent 45%),
          #0b0f17
        `,
      }}
    />
  );
}
