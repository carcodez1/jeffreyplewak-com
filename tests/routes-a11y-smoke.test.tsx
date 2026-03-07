import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { axe } from "vitest-axe";
import * as matchers from "vitest-axe/matchers";
import HomePage from "@/app/page";
import ResumePage from "@/app/resume/page";
import RecruiterPage from "@/app/r/page";
import KProvEnginePage from "@/app/projects/kprovengine/page";

expect.extend(matchers);

async function renderMarkup(element: JSX.Element | Promise<JSX.Element>) {
  const resolved = await element;
  const html = renderToStaticMarkup(resolved);
  const container = document.createElement("div");
  container.innerHTML = html;
  document.body.innerHTML = "";
  document.body.appendChild(container);
  return container;
}

describe("route a11y smoke", () => {
  it("has no obvious accessibility violations on the homepage", async () => {
    const container = await renderMarkup(createElement(HomePage));
    expect(await axe(container)).toHaveNoViolations();
  });

  it("has no obvious accessibility violations on the resume page", async () => {
    const container = await renderMarkup(createElement(ResumePage));
    expect(await axe(container)).toHaveNoViolations();
  });

  it("has no obvious accessibility violations on the recruiter page", async () => {
    const container = await renderMarkup(createElement(RecruiterPage));
    expect(await axe(container)).toHaveNoViolations();
  });

  it("has no obvious accessibility violations on the KProvEngine page", async () => {
    const container = await renderMarkup(KProvEnginePage());
    expect(await axe(container)).toHaveNoViolations();
  });
});
