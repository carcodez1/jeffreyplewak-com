// src/components/SiteFooter.tsx
const LINKS = {
  github: "https://github.com/carcodez1",
  linkedin: "https://www.linkedin.com/in/jeffreyplewak",
  email: "mailto:plewak.jeff@gmail.com",
  calendly: "https://calendly.com/YOUR_PUBLIC_SLUG",
} as const;

export function SiteFooter() {
  return (
    <footer className="siteFooter" role="contentinfo">
      <div className="siteFooterInner">
        <div>
          <div className="footerTitle">Jeffrey R. Plewak</div>
          <div className="footerSub">Platform • AI Provenance • Reliability</div>
          <div className="footerCopy">© {new Date().getFullYear()}</div>
        </div>

        <div className="footerRight" aria-label="Links">
          <a className="footerLink" href={LINKS.github} target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <a className="footerLink" href={LINKS.linkedin} target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
          <a className="footerLink" href={LINKS.email}>
            Email
          </a>
          <a className="footerLink" href={LINKS.calendly} target="_blank" rel="noopener noreferrer">
            Schedule
          </a>
        </div>
      </div>
    </footer>
  );
}