// src/components/SiteHeader.tsx
import Link from "next/link";

const LINKS = {
  home: "/",
  projects: "/projects",
  resume: "/downloads/jeffrey-plewak-resume.pdf",
  email: "mailto:plewak.jeff@gmail.com",
} as const;

export function SiteHeader() {
  return (
    <header className="siteHeader" role="banner">
      <div className="siteHeaderInner">
        <Link href={LINKS.home} className="brand" aria-label="Home">
          <span className="brandMark" aria-hidden="true" />
          <span className="brandText">Jeffrey R. Plewak</span>
        </Link>

        <nav className="siteNav" aria-label="Primary">
          <Link href={LINKS.projects} className="navLink">
            Projects
          </Link>

          <a
            href={LINKS.resume}
            className="navLink"
            target="_blank"
            rel="noopener noreferrer"
          >
            Resume
          </a>

          <a href={LINKS.email} className="navLink">
            Contact
          </a>
        </nav>
      </div>
    </header>
  );
}