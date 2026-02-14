export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="siteFooter" role="contentinfo">
      <div className="siteFooterInner">

        <div>
          <div className="footerTitle">Jeffrey R. Plewak</div>
          <div className="footerSub">
            Senior Backend & Platform Engineer — AI Systems, Production Architecture, Compliance-Critical Workflows.
          </div>
          <div className="footerCopy">© {year} Jeffrey R. Plewak</div>
        </div>

        <nav className="footerLinks" aria-label="Footer navigation">
          <a className="footerLink" href="/projects">
            Projects
          </a>
          <a className="footerLink" href="/downloads/jeffrey-plewak-resume.pdf">
            Resume
          </a>
          <a className="footerLink" href="mailto:plewak.jeff@gmail.com">
            Email
          </a>
          <a
            className="footerLink"
            href="https://calendly.com/plewak-jeff"
            target="_blank"
            rel="noopener noreferrer"
          >
            Book Consultation
          </a>
          <a
            className="footerLink"
            href="https://www.linkedin.com/in/jeffreyplewak"
            target="_blank"
            rel="noopener noreferrer me"
          >
            LinkedIn
          </a>
          <a
            className="footerLink"
            href="https://github.com/carcodez1"
            target="_blank"
            rel="noopener noreferrer me"
          >
            GitHub
          </a>
        </nav>

      </div>
    </footer>
  );
}