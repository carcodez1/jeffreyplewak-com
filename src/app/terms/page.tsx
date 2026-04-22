// src/app/terms/page.tsx
import type { Metadata } from "next";
import { SITE } from "@/config/site";

export const metadata: Metadata = {
  title: `Terms of Service — ${SITE.name}`,
  description: "Terms for using this professional portfolio, downloadable materials, and external links.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <div className="wrap">
      <header className="section">
        <h1 className="h2">Terms of Service</h1>
        <p className="lede">Effective date: 2026-02-28</p>
      </header>

      <section className="section legal">
        <h2 className="h3">1. Use of this website</h2>
        <p className="muted">
          This website is a professional portfolio and informational site. You may browse, link to, and share pages
          using standard web practices. You may not misuse the site, attempt to disrupt service, scrape it abusively,
          or attempt unauthorized access.
        </p>
        <p className="muted">
          Downloadable resume files, recruiter-pack artifacts, and contact-card exports are provided for professional
          evaluation, recruiting, and standard business contact use. These materials should be treated as current only
          as of the version you downloaded.
        </p>

        <h2 className="h3">2. Intellectual property</h2>
        <p className="muted">
          Unless otherwise noted, all content on this site (text, layout, graphics, and code as presented) is owned by{" "}
          {SITE.name}. All rights reserved. Third-party marks/logos are the property of their respective owners and are
          used for identification only.
        </p>

        <h2 className="h3">3. No warranties</h2>
        <p className="muted">
          This site is provided “as is” without warranties of any kind. While reasonable effort is made to keep
          information accurate, no guarantee is made that content, downloads, or external references are complete,
          current, available, or error-free.
        </p>

        <h2 className="h3">4. Limitation of liability</h2>
        <p className="muted">
          To the maximum extent permitted by law, {SITE.name} will not be liable for any damages arising from your use
          of this site.
        </p>

        <h2 className="h3">5. External links</h2>
        <p className="muted">This site may link to third-party websites. {SITE.name} is not responsible for them.</p>

        <h2 className="h3">6. Contact</h2>
        <p className="muted">For questions about these terms, contact via the email link in the footer.</p>
      </section>
    </div>
  );
}
