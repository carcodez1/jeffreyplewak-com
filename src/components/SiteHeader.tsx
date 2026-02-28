// src/components/SiteHeader.tsx
import Link from "next/link";
import { SocialIcon } from "./SocialIcon";

const LINKS = {
  github: "https://github.com/carcodez1",
  linkedin: "https://www.linkedin.com/in/jeffreyplewak",
  email: "mailto:plewak.jeff@gmail.com?subject=Project%20inquiry",
  calendly: "https://calendly.com/plewak-jeff",
  resume: "/downloads/jeffrey-plewak-resume.pdf",
} as const;

const NAV = [
  { href: "/#work", label: "Work" },
  { href: "/#focus", label: "Focus" },
  { href: "/projects", label: "Projects" },
  { href: "/#contact", label: "Contact" },
] as const;

const ACTIONS = [
  { kind: "primary", href: LINKS.resume, label: "Resume", external: true },
  { kind: "secondary", href: LINKS.calendly, label: "Book a call", external: true },
] as const;

const SOCIALS = [
  { href: LINKS.linkedin, label: "LinkedIn", icon: "/assets/icons/linkedin.svg", external: true },
  { href: LINKS.email, label: "Email", icon: "/assets/icons/mail.svg", external: false },
  { href: LINKS.github, label: "GitHub", icon: "/assets/icons/github.svg", external: true },
] as const;

function extProps(external: boolean) {
  return external ? { target: "_blank", rel: "noopener noreferrer" } : {};
}

export function SiteHeader() {
  return (
    <header className="siteHeader" aria-label="Header">
      <div className="siteHeaderInner">
        <Link className="brand" href="/" aria-label="Home">
          <span className="brandMark" aria-hidden="true" />
          <span className="brandText">Jeffrey R. Plewak</span>
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
            {ACTIONS.map((a) => (
              <a
                key={a.href}
                className={a.kind === "primary" ? "btn btnPrimary btnHeader" : "btn btnHeader"}
                href={a.href}
                {...extProps(a.external)}
              >
                {a.label}
              </a>
            ))}
          </div>

          <span className="headerDivider" aria-hidden="true" />

          <div className="headerIcons" aria-label="Social links">
            {SOCIALS.map((s) => (
              <a
                key={s.href}
                className="iconBtn"
                href={s.href}
                aria-label={s.label}
                {...extProps(s.external)}
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
