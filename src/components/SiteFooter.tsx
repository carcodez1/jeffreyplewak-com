// src/components/SiteFooter.tsx
// Production: Next.js 16.x + TypeScript strict + SEO/A11y.
// Jeffrey R. Plewak | Senior Software Engineer Portfolio
//
// Notes:
// - Avoid `JSX.Element` return types (can fail depending on TS JSX namespace config).
// - Prefer explicit React types imported from "react" or omit return type.
// - Keep semantic structure: contentinfo, headings, lists, address.

import type { ReactElement } from "react";
import Link from "next/link";
import { LINKS, SITE, SOCIALS, extLinkProps } from "@/config/site";
import { SocialIcon } from "./SocialIcon";

const START_YEAR = 2026;

function copyrightLine(year: number): string {
  return year <= START_YEAR ? `${year}` : `${START_YEAR}–${year}`;
}

export function SiteFooter(): ReactElement {
  const year = new Date().getFullYear();

  return (
    <footer className="siteFooter" role="contentinfo" aria-label="Footer">
      <div className="siteFooterInner">
        {/* Brand + Primary CTAs */}
        <section className="footerCol" aria-labelledby="footer-site-title">
          <h3 id="footer-site-title" className="footerTitle">
            {SITE.name}
          </h3>
          <p className="footerSub">{SITE.footerBlurb}</p>

          <div className="footerCtas" aria-label="Primary actions">
            <Link className="btn btnPrimary" href="/resume">
              View Resume
            </Link>

            <a
              className="btn"
              href={LINKS.calendly}
              {...extLinkProps(true)}
              aria-label="Schedule a consultation"
            >
              Book a Call
            </a>
          </div>

          <nav className="footerIcons" aria-label="Social links">
            {SOCIALS.filter((s) => s.key !== "calendly").map((s) => (
              <a
                key={s.key}
                className="iconBtn"
                href={s.href}
                aria-label={s.label}
                {...extLinkProps(s.external)}
              >
                {/* Icon is decorative because the <a> has an aria-label */}
                <span aria-hidden="true">
                  <SocialIcon src={s.icon} title={s.label} className="icon--social" />
                </span>
              </a>
            ))}
          </nav>

          <div className="footerCopy">
            © {copyrightLine(year)} {SITE.name}. All rights reserved.
          </div>
        </section>

        {/* Contact */}
        <section className="footerCol" aria-labelledby="footer-contact-heading">
          <h3 id="footer-contact-heading" className="footerHead">
            Contact
          </h3>

          <address className="footerAddr">
            <a
              className="footerLink"
              href={LINKS.emailProject}
              aria-label="Email Jeffrey R. Plewak"
            >
              plewak.jeff@gmail.com
            </a>
          </address>

          <p className="footerHint">Fastest response: email. Consulting: 15min call.</p>
        </section>

        {/* Navigation + Resources */}
        <nav className="footerCol" aria-labelledby="footer-nav-heading">
          <h3 id="footer-nav-heading" className="footerHead">
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

          <h3 className="footerHead footerHeadSpacer">Downloads</h3>
          <ul className="footerLinksStack" role="list">
            <li>
              <a className="footerLink" href={LINKS.resumePdf} {...extLinkProps(true)}>
                Resume (PDF)
              </a>
            </li>
            <li>
              <a className="footerLink" href={LINKS.vcf} download>
                Contact (.vcf)
              </a>
            </li>
          </ul>

          <h3 className="footerHead footerHeadSpacer">Legal</h3>
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
        </nav>
      </div>
    </footer>
  );
}
