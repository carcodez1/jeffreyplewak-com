import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { DownloadMenu } from "@/app/components/DownloadMenu";
import { MobileNav } from "@/app/components/MobileNav";

describe("site chrome interactions", () => {
  it("opens and closes the download menu via trigger, escape, and outside click", async () => {
    const user = userEvent.setup();
    render(<DownloadMenu />);

    const trigger = screen.getByRole("button", { name: "Downloads" });
    const panel = screen.getByRole("menu", { hidden: true });

    expect(panel).toHaveAttribute("aria-label", "Download options");
    expect(panel).not.toBeVisible();

    await user.click(trigger);
    expect(panel).toBeVisible();
    expect(screen.getByRole("link", { name: "PDF" })).toHaveAttribute("href", "/downloads/jeffrey-plewak-resume.pdf");

    await user.keyboard("{Escape}");
    await waitFor(() => expect(panel).not.toBeVisible());

    await user.click(trigger);
    expect(panel).toBeVisible();

    await user.pointer({ keys: "[MouseLeft]", target: document.body });
    await waitFor(() => expect(panel).not.toBeVisible());
  });

  it("opens the mobile nav, traps page scroll, and restores focus on close", async () => {
    const user = userEvent.setup();
    const raf = vi.spyOn(window, "requestAnimationFrame").mockImplementation((callback: FrameRequestCallback) => {
      callback(0);
      return 0;
    });

    render(
      <MobileNav
        primaryAction={{ href: "/resume", label: "Open Resume" }}
        nav={[
          { href: "/r", label: "Recruiter" },
          { href: "/projects", label: "Projects" },
        ]}
      />,
    );

    const toggle = screen.getByRole("button", { name: "Open navigation menu" });
    await user.click(toggle);

    expect(document.body.style.overflow).toBe("hidden");
    expect(screen.getByRole("link", { name: "Open Resume" })).toHaveFocus();

    await user.keyboard("{Escape}");

    await waitFor(() => {
      expect(document.body.style.overflow).toBe("");
      expect(screen.getByRole("button", { name: "Open navigation menu" })).toHaveFocus();
    });

    raf.mockRestore();
  });
});
