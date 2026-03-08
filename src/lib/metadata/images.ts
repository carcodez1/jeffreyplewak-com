import { SITE_URL } from "@/lib/jsonld";

const DEFAULT_OG_ALT = "Jeffrey R. Plewak — Senior Software Engineer";
const KPROVENGINE_OG_ALT = "KProvEngine";

export const DEFAULT_OG_IMAGES = [
  {
    url: `${SITE_URL}/og-image.jpg`,
    width: 933,
    height: 630,
    alt: DEFAULT_OG_ALT,
  },
  {
    url: `${SITE_URL}/og-image.png`,
    width: 933,
    height: 630,
    alt: DEFAULT_OG_ALT,
  },
];

export const DEFAULT_TWITTER_IMAGES = DEFAULT_OG_IMAGES.map((image) => image.url);

export const RECRUITER_OG_IMAGES = DEFAULT_OG_IMAGES;
export const RECRUITER_TWITTER_IMAGES = RECRUITER_OG_IMAGES.map((image) => image.url);

export const RESUME_OG_IMAGES = DEFAULT_OG_IMAGES;
export const RESUME_TWITTER_IMAGES = RESUME_OG_IMAGES.map((image) => image.url);

export const PROJECTS_OG_IMAGES = DEFAULT_OG_IMAGES;
export const PROJECTS_TWITTER_IMAGES = PROJECTS_OG_IMAGES.map((image) => image.url);

export const KPROVENGINE_OG_IMAGES = [
  {
    url: `${SITE_URL}/projects/kprovengine/og.jpg`,
    width: 1200,
    height: 630,
    alt: KPROVENGINE_OG_ALT,
  },
];

export const KPROVENGINE_TWITTER_IMAGES = KPROVENGINE_OG_IMAGES.map((image) => image.url);
