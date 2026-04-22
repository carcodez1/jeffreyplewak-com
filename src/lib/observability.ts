import { SITE } from "@/config/site";

type EnvLike = {
  NODE_ENV?: string;
  VERCEL_ENV?: string;
};

type ObservabilityEvent = {
  url: string;
};

const BLOCKED_PATH_PREFIXES = [
  "/api",
  "/admin",
  "/private",
  "/_next",
  "/_vercel",
  "/__vitest",
  "/downloads/recruiter-pack",
] as const;

function matchesBlockedPrefix(pathname: string): boolean {
  return BLOCKED_PATH_PREFIXES.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`));
}

export function isPublicProductionObservabilityEnv(env: EnvLike = process.env): boolean {
  return env.NODE_ENV === "production" && env.VERCEL_ENV !== "preview" && env.VERCEL_ENV !== "development";
}

export function getObservabilityPathname(url: string): string {
  try {
    return new URL(url, SITE.url).pathname;
  } catch {
    return url.split(/[?#]/, 1)[0] || "/";
  }
}

export function filterObservabilityEvent<T extends ObservabilityEvent>(event: T): T | null {
  return matchesBlockedPrefix(getObservabilityPathname(event.url)) ? null : event;
}

