import Link from "next/link";
import { LINKS, SITE, SOCIALS, extLinkProps } from "@/config/site";
import { SocialIcon } from "./SocialIcon";
import { MobileNav } from "./MobileNav";
import { DownloadMenu } from "./DownloadMenu";

const DESKTOP_NAV = [
  { href: "/resume", label: "Resume", external: false },
  { href: "/r", label: "Recruiter", external: false },
  { href: "/projects", label: "Projects", external: false },
] as const;

const MOBILE_PRIMARY = { href: "/resume", label: "Open Resume", external: false } as const;

const MOBILE_NAV = [
  { href: "/r", label: "Recruiter", external: false },
  { href: "/projects", label: "Projects", external: false },
  { href: `${LINKS.emailConsulting}?subject=Consulting%20Inquiry`, label: "Consulting", external: true },
] as const;

export function SiteHeader() {
  return (
    <header className="siteHeader" aria-label="Site header">
      <div className="siteHeaderInner">

        <Link className="brand" href="/" aria-label="Home">
          <span className="brandText">
            {SITE.name}
          </span>
          <span className="brandSub" aria-hidden="true">{SITE.title}</span>
        </Link>

        <nav className="siteNav" aria-label="Primary navigation">
          {DESKTOP_NAV.map((n) => (
            n.external ? (
              <a
                key={n.href}
                className="navLink"
                href={n.href}
                aria-label={n.href.startsWith("mailto:") ? `${n.label} (opens email)` : n.label}
              >
                {n.label}
              </a>
            ) : (
              <Link key={n.href} className="navLink" href={n.href}>
                {n.label}
              </Link>
            )
          ))}
        </nav>

        <div className="siteUtilities">
          <div className="headerIcons" aria-label="Social links">
            {SOCIALS.filter((s) => s.key !== "calendly").map((s) => (
              <a
                key={s.key}
                className={`iconBtn iconBtn--${s.key}`}
                href={s.href}
                aria-label={s.label}
                {...extLinkProps(s.external)}
              >
                <SocialIcon src={s.icon} title={s.label} className="icon--social"/>
              </a>
            ))}
          </div>

          <DownloadMenu compact iconOnly className="headerDownloadMenu" label="Downloads" />
        </div>

        <MobileNav primaryAction={MOBILE_PRIMARY} nav={MOBILE_NAV} />
      </div>
    </header>
  );
}
