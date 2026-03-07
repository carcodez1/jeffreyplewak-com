// src/components/SiteFooter.tsx
// Server Component: Zero JS, static rendering, SEO/A11y oriented.

import Link from "next/link";
import { LINKS, SITE, SOCIALS, extLinkProps } from "@/config/site";
import { SocialIcon } from "./SocialIcon";
import { DownloadMenu } from "./DownloadMenu";

const START_YEAR = 2026;

function copyrightLine(year: number): string {
  return year <= START_YEAR ? `${year}` : `${START_YEAR}–${year}`;
}

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="siteFooter" role="contentinfo" aria-label="Footer">
      <div className="siteFooterInner">
        {/* Brand / About */}
        <section className="footerCol" aria-labelledby="footer-about-title">
          <h3 id="footer-about-title" className="footerTitle">
            {SITE.name}
          </h3>
          <p className="footerSub">{SITE.footerBlurb}</p>

          <div className="footerCtas" aria-label="Primary actions">
            <Link className="btn btnPrimary" href="/resume">
              Open Resume
            </Link>
          </div>

          <nav className="footerIcons" aria-label="Social links">
            {SOCIALS.filter((s) => s.key !== "calendly").map((s) => (
              <a
                key={s.key}
                className={`iconBtn iconBtn--${s.key}`}
                href={s.href}
                aria-label={s.label}
                {...extLinkProps(s.external)}
              >
                <SocialIcon src={s.icon} title={s.label} className="icon--social" />
              </a>
            ))}
          </nav>

          <div className="footerUtilities" aria-label="Support actions">
            <DownloadMenu compact className="footerDownloadMenu" label="Downloads" />
            <a className="footerLink footerUtilityLink" href={LINKS.calendly} {...extLinkProps(true)}>
              Schedule Call
            </a>
          </div>

          <div className="footerCopy">
            © {copyrightLine(year)} {SITE.name}. All rights reserved.
          </div>
        </section>

        {/* Contact */}
        <section className="footerCol" aria-labelledby="footer-contact-title">
          <h3 id="footer-contact-title" className="footerHead">
            Contact
          </h3>
          <address className="footerAddr">
            <a className="footerLink" href={LINKS.emailProject}>
              plewak.jeff@gmail.com
            </a>
          </address>
          <p className="footerHint">Fastest: email. Consulting: short call.</p>
        </section>

        {/* Links */}
        <nav className="footerCol" aria-labelledby="footer-links-title">
          <h3 id="footer-links-title" className="footerHead">
            Links
          </h3>

          <ul className="footerLinksStack" role="list">
            <li>
              <a className="footerLink" href={LINKS.linkedin} {...extLinkProps(true)}>
                LinkedIn
              </a>
            </li>
            <li>
              <a className="footerLink" href={LINKS.github} {...extLinkProps(true)}>
                GitHub
              </a>
            </li>
            <li>
              <Link className="footerLink" href="/projects">
                Projects
              </Link>
            </li>
            <li>
              <Link className="footerLink" href="/resume">
                Resume
              </Link>
            </li>
          </ul>

          <h4 className="footerHead footerHeadSpacer">Legal</h4>
          <ul className="footerLinksStack" role="list">
            <li>
              <Link className="footerLink" href="/terms">
                Terms of Service
              </Link>
            </li>
            <li>
              <Link className="footerLink" href="/privacy">
                Privacy Policy
              </Link>
            </li>
          </ul>

          <h4 className="footerHead footerHeadSpacer">Writing</h4>
          <ul className="footerLinksStack" role="list">
            <li>
              <span className="footerHint">Blog (coming soon)</span>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}
