// middleware.ts
import { NextResponse } from "next/server";

function base64Nonce(bytes = 16): string {
  const arr = new Uint8Array(bytes);
  crypto.getRandomValues(arr);
  let bin = "";
  for (let i = 0; i < arr.length; i++) bin += String.fromCharCode(arr[i]);
  return btoa(bin).replace(/=+$/g, "");
}

function buildCsp(nonce: string): string {
  // Keep this conservative; Next dev/HMR can break under strict CSP.
  // You already gate CSP to production below.
  const directives = [
    `default-src 'self'`,
    `base-uri 'self'`,
    `object-src 'none'`,
    `frame-ancestors 'none'`,
    `form-action 'self'`,
    `img-src 'self' https: data:`,
    `font-src 'self' data:`,
    `connect-src 'self' https: wss:`,
    `script-src 'self' 'nonce-${nonce}'`,
    `style-src 'self' 'unsafe-inline'`,
    `upgrade-insecure-requests`,
  ];
  return directives.join("; ");
}

export function middleware() {
  const res = NextResponse.next();

  // Always-on hardening headers
  res.headers.set("X-Content-Type-Options", "nosniff");
  res.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  res.headers.set("X-Frame-Options", "DENY");
  res.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  );

  // CSP only in Vercel Production (avoid breaking local dev / preview)
  const enableCsp =
    process.env.VERCEL_ENV === "production" ||
    (process.env.NEXT_PUBLIC_ENABLE_CSP === "1" && process.env.NODE_ENV === "production");

  if (!enableCsp) return res;

  const nonce = base64Nonce();
  res.headers.set("x-nonce", nonce);
  res.headers.set("Content-Security-Policy", buildCsp(nonce));
  return res;
}

// IMPORTANT: matcher must be statically analyzable (no variables).
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
