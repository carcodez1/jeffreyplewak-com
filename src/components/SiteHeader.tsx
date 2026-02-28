// src/components/SiteHeader.tsx
import Image from "next/image";
import Link from "next/link";
import { LINKS, SITE, SOCIALS, extLinkProps } from "@/config/site";
import { SocialIcon } from "./SocialIcon";

const NAV = [
  { href: "/projects", label: "Projects" },
  { href: "/#work", label: "Work" },
  { href: "/#contact", label: "Contact" },
] as const;

export function SiteHeader() {
  return (
    <header className="siteHeader" aria-label="Site header">
      <div className="siteHeaderInner">
        <Link className="brand" href="/" aria-label="Home">
          <span className="brandAvatar" aria-hidden="true">
            <Image
              src="/assets/images/avatar.jpeg"
              alt=""
              width={28}
              height={28}
              className="brandAvatarImg"
              // Do NOT set priority; header avatar should not contend with LCP.
            />
          </span>

          <span className="brandText">
            <span className="brandHi" aria-hidden="true">
              Hi, I’m
            </span>{" "}
            {SITE.shortName}
          </span>

          <span className="brandSub" aria-hidden="true">
            {SITE.title}
          </span>
        </Link>

        <nav className="siteNav" aria-label="Primary navigation">
          {NAV.map((n) => (
            <Link key={n.href} className="navLink" href={n.href}>
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="siteActions" aria-label="Header actions">
          <div className="headerCtas" aria-label="Primary actions">
            {/* Internal route to embedded résumé page */}
            <Link className="btn btnPrimary btnHeader" href="/resume" aria-label="View résumé">
              Résumé
            </Link>

            <a className="btn btnHeader" href={LINKS.emailProject} aria-label="Email Jeff">
              Email
            </a>
          </div>

          <span className="headerDivider" aria-hidden="true" />

          <div className="headerIcons" aria-label="Social links">
            {SOCIALS.filter((s) => s.key !== "calendly").map((s) => (
              <a
                key={s.key}
                className="iconBtn"
                href={s.href}
                aria-label={s.label}
                {...extLinkProps(s.external)}
              >
                <SocialIcon src={s.icon} title={s.label} className="icon--social" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
