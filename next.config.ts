// next.config.ts
import type { NextConfig } from "next";

type HeaderKV = {
  key: string;
  value: string;
};

function hstsHeader(): HeaderKV {
  return {
    key: "Strict-Transport-Security",
    value: "max-age=31536000; includeSubDomains; preload",
  };
}

/**
 * IMPORTANT:
 * - Do NOT use `as const` on this array.
 * - We want HeaderKV[] so we can push conditionals without literal-union type errors.
 */
const baseSecurityHeaders: HeaderKV[] = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-DNS-Prefetch-Control", value: "off" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "DENY" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },

  // Enable only after validating all embeds / cross-origin flows.
  // { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  // { key: "Cross-Origin-Resource-Policy", value: "same-origin" },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  trailingSlash: false,

  async headers() {
    const headers: HeaderKV[] = [...baseSecurityHeaders];

    // Only enable HSTS on Vercel Production (avoid localhost/preview surprises).
    if (process.env.VERCEL_ENV === "production") {
      headers.push(hstsHeader());
    }

    return [{ source: "/(.*)", headers }];
  },
};

export default nextConfig;
