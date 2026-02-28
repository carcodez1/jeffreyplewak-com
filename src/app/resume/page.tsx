import type { Metadata } from "next";
import { LINKS, SITE } from "@/config/site";

export const metadata: Metadata = {
  title: `Resume — ${SITE.name}`,
  description: "Embedded resume with download and open options.",
  alternates: { canonical: "/resume" },
};

export default function ResumePage() {
  return (
    <main className="wrap section" aria-label="Resume">
      <h1 className="h2">Resume</h1>

      <div className="ctaRow" style={{ marginBottom: 16 }}>
        <a className="btn btnPrimary" href={LINKS.resumePdf} target="_blank" rel="noopener noreferrer">
          Open PDF
        </a>
        <a className="btn" href={LINKS.resumePdf} download>
          Download
        </a>
      </div>

      <div className="resumeEmbed">
        <object
          data={LINKS.resumePdf}
          type="application/pdf"
          className="resumeEmbedObj"
        >
          <p>
            PDF embed unavailable.{" "}
            <a href={LINKS.resumePdf} target="_blank" rel="noopener noreferrer">
              Open the PDF
            </a>.
          </p>
        </object>
      </div>
    </main>
  );
}
