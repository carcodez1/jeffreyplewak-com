// src/app/layout.tsx
import type { Metadata, Viewport } from "next";
import "./globals.css";

const SITE_URL = "https://www.jeffreyplewak.com";

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
    "Senior software engineer focused on platform, full-stack, and compliance-critical systems. Python, cloud, reliability-first delivery.",

  alternates: { canonical: "/" },

  openGraph: {
    type: "website",
    url: `${SITE_URL}/`,
    title: "Jeffrey R. Plewak — Senior Software Engineer",
    description:
      "Platform, full-stack, and compliance-critical systems. Reliability-first engineering.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Jeffrey R. Plewak — Senior Software Engineer",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Jeffrey R. Plewak — Senior Software Engineer",
    description:
      "Platform, full-stack, and compliance-critical systems. Reliability-first engineering.",
    images: ["/og-image.png"],
  },

  robots: { index: true, follow: true },

  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png" },
      { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
      { url: "/icon-512.png", type: "image/png", sizes: "512x512" },
    ],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}