// src/app/privacy/page.tsx
import type { Metadata } from "next";
import { SITE } from "@/config/site";

export const metadata: Metadata = {
  title: `Privacy Policy — ${SITE.name}`,
  description: "Privacy Policy for analytics, downloads, and contact surfaces on this website.",
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
          This site does not request account creation and does not use advertising trackers. It does use Vercel Web
          Analytics and Vercel Speed Insights to understand traffic, referrers, page usefulness, and real-world
          performance. The hosting provider may also process standard request logs such as IP address, user agent, and
          timestamps for security, delivery, and reliability.
        </p>

        <h2 className="h3">2. Cookies and local storage</h2>
        <p className="muted">
          This site does not intentionally set advertising or marketing cookies. It may store a local theme preference
          in your browser so the site can remember light or dark mode. If the hosting platform sets essential cookies
          for security or delivery, those are controlled by the platform.
        </p>

        <h2 className="h3">3. How information is used</h2>
        <p className="muted">
          Analytics and performance data are used in a privacy-conscious way to understand which pages are useful, where
          traffic comes from, and how the site performs in real browsers. The goal is aggregate usage and performance
          insight, not ad targeting or cross-site profiling. Analytics events are filtered for download paths before
          they are sent, including resume files and recruiter-pack artifacts. Any operational logs are used for security,
          debugging, and reliability. If you email, your message is used solely to respond to your inquiry.
        </p>

        <h2 className="h3">4. Public downloads and contact data</h2>
        <p className="muted">
          This site intentionally offers downloadable resume and recruiter materials, including machine-readable exports
          and contact files, for professional evaluation and recruiting workflows. Those files may include public
          professional contact details such as email, phone number, and location. Download links are ordinary static
          files; the site does not use analytics events to profile which resume or recruiter-pack files you open.
        </p>

        <h2 className="h3">5. Sharing</h2>
        <p className="muted">
          We do not sell personal information. Analytics and performance information may be processed by Vercel to
          provide site analytics and speed reporting. Other information may be processed by the hosting provider to
          deliver the site.
        </p>

        <h2 className="h3">6. External links</h2>
        <p className="muted">
          Links to third-party sites (e.g., GitHub, LinkedIn, Calendly) are governed by those providers’ policies.
        </p>

        <h2 className="h3">7. Contact</h2>
        <p className="muted">For privacy questions, contact via the email link in the footer.</p>
      </section>
    </div>
  );
}
