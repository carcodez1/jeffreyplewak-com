import type { ReactNode } from "react";
import type { Viewport } from "next";
import Script from "next/script";
import "./globals.css";

import { siteGraphJsonLd } from "@/lib/jsonld";
import { isPublicProductionObservabilityEnv } from "@/lib/observability";
import { getNonce } from "@/lib/nonce";
import { SiteHeader } from "@/app/components/SiteHeader";
import { SiteFooter } from "@/app/components/SiteFooter";
import { Haptics } from "@/app/components/Haptics";
import { BackgroundMotion } from "@/app/components/BackgroundMotion";
import { BackgroundFx } from "@/app/components/BackgroundFx";
import { ScrollReveal } from "@/app/components/ScrollReveal";
import { Observability } from "@/app/components/Observability";

export { rootMetadata as metadata } from "@/lib/metadata/root";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f5f1" },
    { media: "(prefers-color-scheme: dark)", color: "#0e1116" },
  ],
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  const nonce = await getNonce();
  const nonceAttr = nonce || undefined;
  const observabilityEnabled = isPublicProductionObservabilityEnv();

  return (
    <html lang="en" className="no-js" suppressHydrationWarning>
      <body className="appRoot">
        {/* Preflight:
           - DOES NOT delete localStorage.theme
           - Defaults to DARK when no stored preference
        */}
        <Script
          id="preflight"
          nonce={nonceAttr}
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
(function () {
  try {
    var root = document.documentElement;
    var defaultTheme = "dark";
    var stored = null;
    try { stored = localStorage.getItem("theme"); } catch (e) {}
    var next = (stored === "dark" || stored === "light") ? stored : defaultTheme;
    root.dataset.theme = next;
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

        <BackgroundMotion />
        <BackgroundFx />

        <Haptics selector=".btnPrimary, .iconBtn" patternMs={12} touchOnly />

        <a className="skipLink" href="#main">
          Skip to content
        </a>

        <SiteHeader />

        <main id="main" className="appMain">
          <ScrollReveal selector=".focusCard" visibleClass="focusCard--visible" />
          {children}
        </main>

        <SiteFooter />
        {observabilityEnabled ? <Observability /> : null}
      </body>
    </html>
  );
}
