import type { Metadata, Viewport } from "next";
import "./globals.css";

import { SITE_URL, siteGraphJsonLd } from "@/lib/jsonld";
import { getNonce } from "@/lib/nonce";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const viewport: Viewport = {
  width: "device-width",
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
    "Senior backend & platform engineering. Deterministic AI provenance systems. Reliability-focused architecture.",
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Jeffrey R. Plewak",
    title: "Jeffrey R. Plewak — Senior Software Engineer",
    description:
      "Senior backend & platform engineering. Deterministic AI systems. Production architecture.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Jeffrey R. Plewak" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jeffrey R. Plewak — Senior Software Engineer",
    description:
      "Senior backend & platform engineering. Deterministic AI systems. Production architecture.",
    images: ["/og-image.png"],
  },
  robots: { index: true, follow: true },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const nonce = await getNonce();
  const nonceAttr = nonce || undefined;

  return (
    <html lang="en">
      <head>
        <script
          id="site-jsonld"
          type="application/ld+json"
          nonce={nonceAttr}
          // JSON-LD must be raw JSON string, not an object
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteGraphJsonLd()) }}
        />
      </head>
      <body>
        <a className="skipLink" href="#main">
          Skip to content
        </a>

        <SiteHeader />

        <main id="main" className="appMain">
          {children}
        </main>

        <SiteFooter />
      </body>
    </html>
  );
}