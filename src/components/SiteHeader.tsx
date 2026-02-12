import Link from "next/link";
import { SocialIcon } from "./SocialIcon";

const LINKS = {
  github: "https://github.com/carcodez1",
  linkedin: "https://www.linkedin.com/in/jeffreyplewak",
  email: "mailto:plewak.jeff@gmail.com",
  calendly: "https://calendly.com/plewak-jeff",
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
          <Link className="navLink" href="/#focus">
            Focus
          </Link>
          <Link className="navLink" href="/#work">
            Work
          </Link>
          <Link className="navLink" href="/projects">
            Projects
          </Link>
        </nav>

        {/* Desktop: full cluster */}
        <div className="siteActions siteActionsDesktop" aria-label="Social links (desktop)">
          <a
            className="iconBtn brandGithub"
            href={LINKS.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <SocialIcon src="/assets/icons/github.svg" label="GitHub" className="icon--social" />
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

          <a
            className="iconBtn brandCalendly"
            href={LINKS.calendly}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Calendly"
          >
            <SocialIcon src="/assets/icons/calendly.svg" label="Calendly" className="icon--social" />
          </a>
        </div>

        {/* Mobile: minimal cluster (3 icons) */}
        <div className="siteActions siteActionsMobile" aria-label="Social links (mobile)">
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
      </div>
    </header>
  );
}