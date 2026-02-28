// src/app/privacy/page.tsx
import type { Metadata } from "next";
import { SITE, LINKS } from "@/config/site";

export const metadata: Metadata = {
  title: `Privacy Policy — ${SITE.name}`,
  description: `Privacy Policy for ${SITE.name}.`,
  alternates: { canonical: "/privacy" },
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  const effectiveDate = "2026-02-28";

  return (
    <main className="wrap" aria-label="Privacy Policy">
      <section className="section">
        <h1 className="h1" style={{ marginBottom: 10 }}>
          Privacy Policy
        </h1>
        <p className="muted" style={{ marginTop: 0 }}>
          Effective date: {effectiveDate}
        </p>

        <p className="lede">
          This site is a portfolio. I keep data collection minimal. This page explains what happens when you visit.
        </p>

        <h2 className="h2">Information I collect</h2>
        <p className="muted">
          By default, I do not ask you to create an account and I do not run a contact form on this site.
        </p>
        <ul className="muted" style={{ paddingLeft: 18 }}>
          <li>
            Server logs may record basic request data (IP address, user-agent, requested path, timestamp) for security
            and reliability.
          </li>
          <li>
            If you email me using the mailto link, your email provider will transmit your message to me. That content is
            handled via email, not a site form.
          </li>
        </ul>

        <h2 className="h2">Cookies</h2>
        <p className="muted">
          This site does not intentionally set advertising cookies. If hosting or embedded third-party services add
          cookies, they are governed by those providers.
        </p>

        <h2 className="h2">Third-party links</h2>
        <p className="muted">
          This site links to third-party sites (e.g., GitHub, LinkedIn, Calendly). Their privacy practices are governed
          by their own policies.
        </p>

        <h2 className="h2">Contact</h2>
        <p className="muted">
          Questions:{" "}
          <a href={LINKS.emailProject} className="footerLink">
            email me
          </a>
          .
        </p>
      </section>
    </main>
  );
}
