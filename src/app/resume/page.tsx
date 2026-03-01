// src/app/resume/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { LINKS, SITE } from "@/config/site";

export const metadata: Metadata = {
  title: `Résumé — ${SITE.name}`,
  description: "Résumé (PDF), embedded for quick review with download and open options.",
  alternates: { canonical: "/resume" },
  openGraph: {
    type: "website",
    title: `Résumé — ${SITE.name}`,
    description: "View the embedded résumé, or download the PDF.",
    url: "/resume",
  },
};

export default function ResumePage() {
  return (
    <main className="wrap section" aria-label="Résumé">
      <h1 className="h2">Résumé</h1>
      <p className="lede">
        Embedded for convenience. If your browser blocks it, use Open or Download.
      </p>

      <div className="ctaRow" aria-label="Résumé actions" style={{ marginBottom: 16 }}>
        <a className="btn btnPrimary" href={LINKS.resumePdf} target="_blank" rel="noopener noreferrer">
          Open PDF
        </a>
        <a className="btn" href={LINKS.resumePdf} download>
          Download
        </a>
        <Link className="btn btnTertiary" href="/projects">
          Projects
        </Link>
        <a className="btn btnTertiary" href={LINKS.emailProject}>
          Email
        </a>
      </div>

      <div className="resumeEmbed" aria-label="Embedded résumé">
        <object data={LINKS.resumePdf} type="application/pdf" className="resumeEmbedObj" aria-label="Résumé PDF">
          <p className="lede">
            PDF embed isn’t available in this browser.{" "}
            <a href={LINKS.resumePdf} target="_blank" rel="noopener noreferrer">
              Open the PDF
            </a>
            .
          </p>
        </object>
      </div>
    </main>
  );
}
