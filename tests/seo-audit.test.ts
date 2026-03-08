import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { rootMetadata } from "@/lib/metadata/root";
import { metadata as homeMetadata } from "@/app/page";
import { metadata as resumeMetadata } from "@/app/resume/page";
import { metadata as recruiterMetadata } from "@/app/r/page";
import { metadata as projectsMetadata } from "@/app/projects/page";
import { metadata as termsMetadata } from "@/app/terms/page";
import { metadata as privacyMetadata } from "@/app/privacy/page";

const repoRoot = path.resolve(__dirname, "..");

function inRepo(absOrPublicPath: string): string {
  const normalized = absOrPublicPath.replace(/^\//, "");
  return path.join(repoRoot, "public", normalized);
}

function resolveStaticPath(absPath: string): string | null {
  const publicPath = inRepo(absPath);
  if (fs.existsSync(publicPath)) return publicPath;

  const appPath = path.join(repoRoot, "src", "app", absPath.replace(/^\//, ""));
  if (fs.existsSync(appPath)) return appPath;

  return null;
}

function iconUrlsFromRootMetadata(): string[] {
  const iconsValue = rootMetadata.icons;
  if (!iconsValue || iconsValue instanceof URL || typeof iconsValue === "string" || Array.isArray(iconsValue)) return [];

  const iconField = iconsValue.icon;
  if (!iconField) return [];

  const iconList = Array.isArray(iconField) ? iconField : [iconField];
  const urls: string[] = [];
  for (const icon of iconList) {
    if (typeof icon === "string") {
      urls.push(icon);
      continue;
    }
    if (icon && typeof icon === "object" && "url" in icon && typeof icon.url === "string") {
      urls.push(icon.url);
    }
  }
  return urls;
}

describe("seo audit guardrails", () => {
  it("keeps critical OG/icon assets present", () => {
    const required = [
      "/og-image.jpg",
      "/icon-192.png",
      "/icon-512.png",
      "/assets/favicon/site.webmanifest",
      "/assets/favicon/apple-touch-icon.png",
      "/assets/favicon/favicon-16x16.png",
      "/assets/favicon/favicon-32x32.png",
      "/projects/kprovengine/og.jpg",
      "/projects/kprovengine/architecture.svg",
    ];

    for (const p of required) {
      const abs = inRepo(p);
      expect(fs.existsSync(abs)).toBe(true);
      expect(fs.statSync(abs).size).toBeGreaterThan(0);
    }
  });

  it("keeps webmanifest icon references resolvable", () => {
    const manifestPath = inRepo("/assets/favicon/site.webmanifest");
    const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8")) as {
      icons?: Array<{ src?: string }>;
    };

    const iconSrcs = (manifest.icons ?? []).map((i) => i.src).filter(Boolean) as string[];
    expect(iconSrcs.length).toBeGreaterThan(0);

    for (const src of iconSrcs) {
      const abs = inRepo(src);
      expect(fs.existsSync(abs)).toBe(true);
      expect(fs.statSync(abs).size).toBeGreaterThan(0);
    }
  });

  it("keeps canonical metadata set on public narrative routes", () => {
    const canonicals = [
      homeMetadata.alternates?.canonical,
      resumeMetadata.alternates?.canonical,
      recruiterMetadata.alternates?.canonical,
      projectsMetadata.alternates?.canonical,
      termsMetadata.alternates?.canonical,
      privacyMetadata.alternates?.canonical,
    ];

    for (const canonical of canonicals) {
      expect(typeof canonical).toBe("string");
      expect((canonical as string).length).toBeGreaterThan(0);
      expect((canonical as string).startsWith("/")).toBe(true);
    }
  });

  it("keeps root metadata pointing at existing icon/webmanifest paths", () => {
    const manifestPath = rootMetadata.manifest;
    expect(typeof manifestPath).toBe("string");
    expect(fs.existsSync(inRepo(manifestPath as string))).toBe(true);

    const icons = iconUrlsFromRootMetadata();
    expect(icons.length).toBeGreaterThan(0);
    for (const url of icons) {
      expect(resolveStaticPath(url)).not.toBeNull();
    }
  });
});
