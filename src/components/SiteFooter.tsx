export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="siteFooter">
      <div className="siteFooterInner">
        <div>
          <div className="footerTitle">Jeffrey R. Plewak</div>
          <div className="footerSub">Senior Software Engineer — platform, full-stack, compliance-critical systems.</div>
          <div className="footerCopy">© {year}</div>
        </div>

        <div className="footerLinks" aria-label="Footer links">
          <a className="footerLink" href="mailto:plewak.jeff@gmail.com">
            Email
          </a>
          <a className="footerLink" href="https://calendly.com/plewak-jeff" target="_blank" rel="noopener noreferrer">
            Calendly
          </a>
          <a className="footerLink" href="https://www.linkedin.com/in/jeffreyplewak" target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
          <a className="footerLink" href="https://github.com/carcodez1" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}