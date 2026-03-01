// src/app/layout.tsx
import type { ReactNode } from "react";
import type { Viewport } from "next";
import Script from "next/script";
import "./globals.css";

import { siteGraphJsonLd } from "@/lib/jsonld";
import { getNonce } from "@/lib/nonce";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Haptics } from "@/components/Haptics";
import { BackgroundMotion } from "@/components/BackgroundMotion";
import { BackgroundFx } from "@/components/BackgroundFx";

export { rootMetadata as metadata } from "@/lib/metadata/root";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0b0f17",
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  const nonce = await getNonce();
  const nonceAttr = nonce || undefined;

  return (
    <html lang="en" className="no-js" suppressHydrationWarning>
      <body>
        <Script
          id="preflight"
          nonce={nonceAttr}
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
(function () {
  try {
    var root = document.documentElement;
    try { localStorage.removeItem("theme"); } catch (e) {}
    root.dataset.theme = "dark";
    root.classList.remove("no-js");
    root.classList.add("js");
  } catch (e) {}
})();`,
          }}
        />

        <Script
          id="site-jsonld"
          type="application/ld+json"
          nonce={nonceAttr}
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteGraphJsonLd()) }}
        />

        {/* Background layers (fixed, behind content). */}
        <BackgroundMotion preload="metadata" />
        <BackgroundFx />

        <Haptics selector=".btnPrimary, .iconBtn" patternMs={12} touchOnly />

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
