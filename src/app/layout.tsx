// src/app/layout.tsx
import type { Viewport } from "next";
import type { ReactNode } from "react";
import Script from "next/script";
import "./globals.css";

import { siteGraphJsonLd } from "@/lib/jsonld";
import { getNonce } from "@/lib/nonce";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Haptics } from "@/components/Haptics";

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
        {/* Pre-paint: set theme + enable JS class (no SEO impact; prevents flash) */}
        <Script
          id="preflight"
          nonce={nonceAttr}
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
(function () {
  try {
    var root = document.documentElement;
    // Theme: localStorage wins, else system preference
    var t = localStorage.getItem("theme");
    if (t !== "light" && t !== "dark") {
      t = (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) ? "dark" : "light";
    }
    root.dataset.theme = t;

    // Progressive enhancement class toggle
    root.classList.remove("no-js");
    root.classList.add("js");
  } catch (e) {
    // no-op
  }
})();`,
          }}
        />

        {/* Site-wide structured data */}
        <Script
          id="site-jsonld"
          type="application/ld+json"
          nonce={nonceAttr}
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(siteGraphJsonLd()),
          }}
        />

        {/* Mobile haptics (supported platforms only; ignored elsewhere) */}
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
