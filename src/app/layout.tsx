// src/app/layout.tsx
import type { Metadata, Viewport } from "next";
import "./globals.css";
import { SITE_URL, siteGraphJsonLd } from "@/lib/jsonld";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const viewport: Viewport = {
  width: 1,
  initialScale: 1,
  themeColor: "#0b0f17",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Jeffrey R. Plewak — Senior Software Engineer",
    template: "%s — Jeffrey R. Plewak",
  },
  description:
    "Platform engineering, AI provenance systems, and reliability-focused backend architecture.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: "Jeffrey R. Plewak — Senior Software Engineer",
    description: "Platform engineering and deterministic AI systems.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Jeffrey R. Plewak" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jeffrey R. Plewak — Senior Software Engineer",
    description: "Platform engineering and deterministic AI systems.",
    images: ["/og-image.png"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <a className="skipLink" href="#main">
          Skip to content
        </a>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteGraphJsonLd()) }}
        />

        <SiteHeader />

        <main id="main">{children}</main>

        <SiteFooter />
      </body>
    </html>
  );
}