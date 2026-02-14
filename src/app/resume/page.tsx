import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resume — Jeffrey R. Plewak",
  description:
    "Resume for Jeffrey R. Plewak (Senior Software Engineer / Platform Engineer).",
  alternates: { canonical: "/resume" },
  robots: { index: true, follow: true },
};

export default function ResumePage() {
  return (
    <main className="container" style={{ padding: "48px 0" }}>
      <h1>Resume</h1>
      <p>
        Jeffrey R. Plewak — Senior Software Engineer / Platform Engineer. Download
        the PDF resume from{" "}
        <a href="/downloads/jeffrey-plewak-resume.pdf">/downloads</a>.
      </p>
    </main>
  );
}