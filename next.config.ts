// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.jeffreyplewak.com" }],
        destination: "https://jeffreyplewak.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;