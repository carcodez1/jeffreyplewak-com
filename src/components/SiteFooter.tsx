// src/components/SiteFooter.tsx
import { SocialIcon } from "./SocialIcon";

const LINKS = {
  github: "https://github.com/carcodez1",
  linkedin: "https://www.linkedin.com/in/jeffreyplewak",
  email: "mailto:plewak.jeff@gmail.com?subject=Project%20inquiry",
  calendly: "https://calendly.com/plewak-jeff",
  resume: "/downloads/jeffrey-plewak-resume.pdf",
  vcf: "/downloads/jeffrey-plewak.vcf",
} as const;

const SOCIALS = [
  { href: LINKS.linkedin, label: "LinkedIn", icon: "/assets/icons/linkedin.svg", external: true },
  { href: LINKS.email, label: "Email", icon: "/assets/icons/mail.svg", external: false },
  { href: LINKS.github, label: "GitHub", icon: "/assets/icons/github.svg", external: true },
] as const;

function extProps(external: boolean) {
  return external ? { target: "_blank", rel: "noopener noreferrer" } : {};
}

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="siteFooter" aria-label="Footer">
      <div className="siteFooterInner">
        <div className="footerCol">
          <div className="footerTitle">Jeffrey R. Plewak</div>
          <div className="footerSub">
            Senior Software Engineer — platform, full-stack, compliance-critical systems.
          </div>

          <div className="footerCtas" aria-label="Footer actions">
            <a className="btn btnPrimary" href={LINKS.resume} target="_blank" rel="noopener noreferrer">
              View résumé
            </a>
            <a className="btn" href={LINKS.calendly} target="_blank" rel="noopener noreferrer">
              Book a call
            </a>
          </div>

          <div className="footerIcons" aria-label="Footer social">
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

          <div className="footerCopy">© {year}</div>
        </div>

        <div className="footerCol" aria-label="Contact">
          <div className="footerHead">Contact</div>
          <address className="footerAddr">
            <a className="footerLink" href={LINKS.email}>
              plewak.jeff@gmail.com
            </a>
          </address>
          <div className="footerHint">Fastest: email. For consulting: short call.</div>
        </div>

        <div className="footerCol" aria-label="Links">
          <div className="footerHead">Links</div>
          <div className="footerLinksStack">
            <a className="footerLink" href={LINKS.linkedin} target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
            <a className="footerLink" href={LINKS.github} target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
            <a className="footerLink" href="/projects">
              Projects
            </a>
          </div>

          <div className="footerHead footerHeadSpacer">Downloads</div>
          <div className="footerLinksStack">
            <a className="footerLink" href={LINKS.resume} target="_blank" rel="noopener noreferrer">
              Résumé (PDF)
            </a>
            <a className="footerLink" href={LINKS.vcf} download>
              Contact card (VCF)
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
