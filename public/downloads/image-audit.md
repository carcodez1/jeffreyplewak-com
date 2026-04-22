# Image Audit (Deterministic)
Date: 2026-04-22

## Summary
- Total references: 27
- OK: 27
- MISSING: 0
- WRONG-PATH: 0
- DUPLICATE: 0

## Reference Map
| Reference | Status | Resolved Location |
|---|---|---|
| `/assets/favicon/apple-touch-icon.png` | OK | `public/assets/favicon/apple-touch-icon.png` |
| `/assets/favicon/favicon-16x16.png` | OK | `public/assets/favicon/favicon-16x16.png` |
| `/assets/favicon/favicon-32x32.png` | OK | `public/assets/favicon/favicon-32x32.png` |
| `/assets/favicon/site.webmanifest` | OK | `public/assets/favicon/site.webmanifest` |
| `/assets/icons/calendly.svg` | OK | `public/assets/icons/calendly.svg` |
| `/assets/icons/github.svg` | OK | `public/assets/icons/github.svg` |
| `/assets/icons/linkedin.svg` | OK | `public/assets/icons/linkedin.svg` |
| `/assets/icons/mail.svg` | OK | `public/assets/icons/mail.svg` |
| `/assets/images/jeffrey-plewak-portrait.webp` | OK | `public/assets/images/jeffrey-plewak-portrait.webp` |
| `/assets/logos/aws.svg` | OK | `public/assets/logos/aws.svg` |
| `/assets/logos/bae-systems.svg` | OK | `public/assets/logos/bae-systems.svg` |
| `/assets/logos/expedia.svg` | OK | `public/assets/logos/expedia.svg` |
| `/assets/logos/fidelity.svg` | OK | `public/assets/logos/fidelity.svg` |
| `/assets/logos/ibm.svg` | OK | `public/assets/logos/ibm.svg` |
| `/assets/logos/jp-morgan-chase.svg` | OK | `public/assets/logos/jp-morgan-chase.svg` |
| `/assets/logos/lockheed-martin.svg` | OK | `public/assets/logos/lockheed-martin.svg` |
| `/assets/logos/mstro.png` | OK | `public/assets/logos/mstro.png` |
| `/assets/logos/nintendo.svg` | OK | `public/assets/logos/nintendo.svg` |
| `/assets/logos/placeholder.svg` | OK | `public/assets/logos/placeholder.svg` |
| `/assets/logos/raytheon.svg` | OK | `public/assets/logos/raytheon.svg` |
| `/favicon.ico` | OK | `src/app/favicon.ico` |
| `/icon-192.png` | OK | `public/icon-192.png` |
| `/icon-512.png` | OK | `public/icon-512.png` |
| `/og-image.jpg` | OK | `public/og-image.jpg` |
| `/og-image.png` | OK | `public/og-image.png` |
| `/projects/kprovengine/architecture.svg` | OK | `public/projects/kprovengine/architecture.svg` |
| `/projects/kprovengine/og.jpg` | OK | `public/projects/kprovengine/og.jpg` |

## Risk Classification
- SEO critical: favicon, manifest, OG, Twitter image paths are present.
- LCP risk: home hero portrait is the sole `priority` image and has reserved dimensions.
- CLS risk: fill-based images are wrapped in explicit aspect-ratio containers (`homePortraitFrame`, `pMedia*`).
- Accessibility risk: decorative logos/icons use empty alt where text label exists nearby; content previews include meaningful alt.
