// tests/site-chrome.test.tsx
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";

import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

// If you currently ship SocialFloater, include it; otherwise remove this import + test.
// import { SocialFloater } from "@/components/SocialFloater";

describe("site chrome", () => {
  it("renders header with primary navigation", () => {
    render(<SiteHeader />);

    // Adjust these to match your actual header links/text.
    // Use role-based queries; stable for a11y and SEO.
    expect(screen.getByRole("banner")).toBeInTheDocument();
  });

  it("renders footer with contact links", () => {
    render(<SiteFooter />);
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
  });

  // Uncomment if SocialFloater exists in src/components
  // it("renders social floater quick links", () => {
  //   render(<SocialFloater />);
  //   expect(screen.getByLabelText(/quick links/i)).toBeInTheDocument();
  // });
});