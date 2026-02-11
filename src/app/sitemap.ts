// src/app/sitemap.ts
import type { MetadataRoute } from "next";

const baseUrl = "https://www.jeffreyplewak.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();

  return [
    { url: `${baseUrl}/`, lastModified: now },
    { url: `${baseUrl}/projects`, lastModified: now },
    { url: `${baseUrl}/projects/kprovengine`, lastModified: now },
  ];
}