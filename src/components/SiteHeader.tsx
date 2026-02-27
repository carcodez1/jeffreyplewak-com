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

export function SiteHeader() {
  return (
    <header className="siteHeader">
      <div className="siteHeaderInner">
        <Link className="brand" href="/" aria-label="Home">
          <span className="brandMark" aria-hidden="true" />
          <span className="brandText">Jeffrey R. Plewak</span>
        </Link>

        <nav className="siteNav" aria-label="Primary">
          <Link className="navLink" href="/#work">
            Work
          </Link>
          <Link className="navLink" href="/#focus">
            Focus
          </Link>
          <Link className="navLink" href="/projects">
            Projects
          </Link>
          <Link className="navLink" href="/#contact">
            Contact
          </Link>
        </nav>

        {/* Desktop: CTA(s) + icons */}
        <div className="siteActions siteActionsDesktop" aria-label="Actions (desktop)">
          <a className="btn btnPrimary btnHeader" href={LINKS.resume} target="_blank" rel="noopener noreferrer">
            Résumé
          </a>

          <a
            className="btn btnHeader btnSecondary"
            href={LINKS.calendly}
            target="_blank"
            rel="noopener noreferrer"
          >
            Book a call
          </a>

          <span className="headerDivider" aria-hidden="true" />

          <a
            className="iconBtn brandLinkedIn"
            href={LINKS.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <SocialIcon src="/assets/icons/linkedin.svg" label="LinkedIn" className="icon--social" />
          </a>

          <a className="iconBtn brandMail" href={LINKS.email} aria-label="Email">
            <SocialIcon src="/assets/icons/mail.svg" label="Email" className="icon--social icon--mail" />
          </a>

          <a
            className="iconBtn brandGithub"
            href={LINKS.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <SocialIcon src="/assets/icons/github.svg" label="GitHub" className="icon--social" />
          </a>
        </div>

        {/* Mobile: one CTA + two icons (keep minimal) */}
        <div className="siteActions siteActionsMobile" aria-label="Actions (mobile)">
          <a className="btn btnPrimary btnHeader" href={LINKS.resume} target="_blank" rel="noopener noreferrer">
            Résumé
          </a>

          <a
            className="iconBtn brandLinkedIn"
            href={LINKS.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <SocialIcon src="/assets/icons/linkedin.svg" label="LinkedIn" className="icon--social" />
          </a>

          <a className="iconBtn brandMail" href={LINKS.email} aria-label="Email">
            <SocialIcon src="/assets/icons/mail.svg" label="Email" className="icon--social icon--mail" />
          </a>
        </div>
      </div>
    </header>
  );
}
