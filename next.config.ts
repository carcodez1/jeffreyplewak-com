// next.config.ts
import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "origin-when-cross-origin" },
  // If you embed nothing that needs these, lock them down:
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), browsing-topics=()" },
  // CSP: start conservative. If you add analytics or embeds later, you will need to relax this.
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'none'",
      "img-src 'self' data: https:",
      "font-src 'self' data:",
      "style-src 'self' 'unsafe-inline'",
      "script-src 'self'",
      "connect-src 'self' https:",
      "upgrade-insecure-requests",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  trailingSlash: false,
  async headers() {
    return [{ source: "/(.*)", headers: securityHeaders }];
  },
};

export default nextConfig;