// src/app/privacy/page.tsx
import type { Metadata } from "next";
import { SITE } from "@/config/site";

export const metadata: Metadata = {
  title: `Privacy Policy — ${SITE.name}`,
  description: "Privacy Policy for this website.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <div className="wrap">
      <header className="section">
        <h1 className="h2">Privacy Policy</h1>
        <p className="lede">Effective date: 2026-02-28</p>
      </header>

      <section className="section legal">
        <h2 className="h3">1. What we collect</h2>
        <p className="muted">
          This site does not request account creation. If basic analytics are used by the hosting provider (e.g., request
          logs), they may include IP address, user agent, and timestamps for security and performance.
        </p>

        <h2 className="h3">2. Cookies</h2>
        <p className="muted">
          This site does not intentionally set advertising cookies. If the hosting platform sets essential cookies for
          security or delivery, those are controlled by the platform.
        </p>

        <h2 className="h3">3. How information is used</h2>
        <p className="muted">
          Any operational logs are used for security, debugging, and reliability. If you email, your message is used
          solely to respond to your inquiry.
        </p>

        <h2 className="h3">4. Sharing</h2>
        <p className="muted">
          We do not sell personal information. Information may be processed by the hosting provider to deliver the site.
        </p>

        <h2 className="h3">5. External links</h2>
        <p className="muted">
          Links to third-party sites (e.g., GitHub, LinkedIn, Calendly) are governed by those providers’ policies.
        </p>

        <h2 className="h3">6. Contact</h2>
        <p className="muted">For privacy questions, contact via the email link in the footer.</p>
      </section>
    </div>
  );
}
