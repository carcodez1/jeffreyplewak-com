// src/app/sitemap.ts
import type { MetadataRoute } from "next";

const baseUrl = "https://www.jeffreyplewak.com";
const BUILD_TIME = new Date().toISOString();

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${baseUrl}/`, lastModified: BUILD_TIME },
    { url: `${baseUrl}/projects`, lastModified: BUILD_TIME },
    { url: `${baseUrl}/projects/kprovengine`, lastModified: BUILD_TIME },
  ];
}
