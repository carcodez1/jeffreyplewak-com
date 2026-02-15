import type { Viewport } from "next";
import type { ReactNode } from "react";
import Script from "next/script";
import "./globals.css";

import { siteGraphJsonLd } from "@/lib/jsonld";
import { getNonce } from "@/lib/nonce";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export { rootMetadata as metadata } from "@/lib/metadata/root";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0b0f17",
};

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const nonce = await getNonce();
  const nonceAttr = nonce || undefined;

  return (
    <html lang="en">
      <head>
        <Script
          id="site-jsonld"
          type="application/ld+json"
          nonce={nonceAttr}
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(siteGraphJsonLd()),
          }}
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
