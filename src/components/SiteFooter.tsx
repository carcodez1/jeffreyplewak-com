// src/components/SiteFooter.tsx
import Link from "next/link";
import { LINKS, SITE, SOCIALS, extLinkProps } from "@/config/site";
import { SocialIcon } from "./SocialIcon";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="siteFooter" aria-label="Footer">
      <div className="siteFooterInner">
        <div className="footerCol">
          <div className="footerTitle">{SITE.name}</div>
          <div className="footerSub">{SITE.title} — {SITE.roleLine}</div>

          <div className="footerCtas" aria-label="Footer actions">
            <a className="btn btnPrimary" href={LINKS.resumePdf} {...extLinkProps(true)}>
              View résumé
            </a>
            <a className="btn" href={LINKS.calendly} {...extLinkProps(true)}>
              Book a call
            </a>
          </div>

          <div className="footerIcons" aria-label="Footer social">
            {SOCIALS.filter((s) => s.key !== "calendly").map((s) => (
              <a key={s.key} className="iconBtn" href={s.href} aria-label={s.label} {...extLinkProps(s.external)}>
                <SocialIcon src={s.icon} title={s.label} className="icon--social" />
              </a>
            ))}
          </div>

          <div className="footerCopy">© {year} {SITE.name}. All rights reserved.</div>
        </div>

        <div className="footerCol" aria-label="Contact">
          <div className="footerHead">Contact</div>
          <address className="footerAddr">
            <a className="footerLink" href={LINKS.emailProject}>
              plewak.jeff@gmail.com
            </a>
          </address>
          <div className="footerHint">Fastest: email. If it’s easier, book a short call.</div>
        </div>

        <div className="footerCol" aria-label="Links">
          <div className="footerHead">Links</div>
          <div className="footerLinksStack">
            <a className="footerLink" href={LINKS.linkedin} {...extLinkProps(true)}>LinkedIn</a>
            <a className="footerLink" href={LINKS.github} {...extLinkProps(true)}>GitHub</a>
            <Link className="footerLink" href="/projects">Projects</Link>
          </div>

          <div className="footerHead footerHeadSpacer">Downloads</div>
          <div className="footerLinksStack">
            <a className="footerLink" href={LINKS.resumePdf} {...extLinkProps(true)}>Résumé (PDF)</a>
            <a className="footerLink" href={LINKS.vcf} download>Contact card (VCF)</a>
          </div>

          <div className="footerHead footerHeadSpacer">Legal</div>
          <div className="footerLinksStack">
            <Link className="footerLink" href="/terms">Terms</Link>
            <Link className="footerLink" href="/privacy">Privacy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
