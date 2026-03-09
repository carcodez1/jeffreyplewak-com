import { CAREER_LOGOS, type CareerLogoEntry, type CareerLogoTone, type CareerSurface } from "@/content/career.ssot";
import { RESUME, type ResumeRole } from "@/content/resume";

export type CareerSurfaceLogo = {
  key: string;
  label: string;
  href: string;
  logoSrc: string;
  width: number;
  height: number;
  logoTone: CareerLogoTone;
};

export type ResumeLogoDisplay = {
  src: string;
  width: number;
  height: number;
  tone: CareerLogoTone;
};

function isLogoSuppressed(src: string | undefined): boolean {
  return !src || src.startsWith("TODO_") || src.includes("placeholder");
}

function byOrder(a: CareerLogoEntry, b: CareerLogoEntry): number {
  return a.order - b.order;
}

function filterBySurface(surface: CareerSurface): readonly CareerLogoEntry[] {
  return CAREER_LOGOS.filter((item) => item.surfaces[surface]).sort(byOrder);
}

export function getCareerSurfaceLogos(surface: CareerSurface): readonly CareerSurfaceLogo[] {
  return filterBySurface(surface)
    .filter((item) => !isLogoSuppressed(item.logoSrc))
    .map((item) => ({
      key: item.key,
      label: item.label,
      href: `/resume#${item.roleId}`,
      logoSrc: item.logoSrc,
      width: item.width,
      height: item.height,
      logoTone: item.logoTone ?? "light",
    }));
}

export function getResumeLogoDisplay(role: ResumeRole): ResumeLogoDisplay | null {
  const fromSsot =
    CAREER_LOGOS.find((item) => item.roleId === role.id && item.surfaces.resume) ??
    CAREER_LOGOS.find((item) => item.employerKey === role.employerKey && item.surfaces.resume);

  if (fromSsot && !isLogoSuppressed(fromSsot.logoSrc)) {
    return {
      src: fromSsot.logoSrc,
      width: fromSsot.width,
      height: fromSsot.height,
      tone: fromSsot.logoTone ?? "light",
    };
  }

  if (isLogoSuppressed(role.logo?.src)) return null;

  return {
    src: role.logo.src,
    width: role.logo.width,
    height: role.logo.height,
    tone: role.logo.src.endsWith(".svg") ? "light" : "brand",
  };
}

export function getRoleAnchorHref(roleId: string): string {
  return `/resume#${roleId}`;
}

export function getRoleResumeHref(role: ResumeRole): string {
  return getRoleAnchorHref(role.id);
}

export function getVisibleResumeRoles(): readonly ResumeRole[] {
  return RESUME.roles;
}
