import "vitest-axe/extend-expect";
import { createElement, type ReactElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { axe } from "vitest-axe";
import * as matchers from "vitest-axe/matchers";
import type { AxeMatchers } from "vitest-axe";
import HomePage from "@/app/page";
import ResumePage from "@/app/resume/page";
import RecruiterPage from "@/app/r/page";
import KProvEnginePage from "@/app/projects/kprovengine/page";

expect.extend(matchers);

function expectAxe(result: Awaited<ReturnType<typeof axe>>): ReturnType<typeof expect> & AxeMatchers {
  return expect(result) as unknown as ReturnType<typeof expect> & AxeMatchers;
}

async function renderMarkup(element: ReactElement | Promise<ReactElement>) {
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
    expectAxe(await axe(container)).toHaveNoViolations();
  });

  it("has no obvious accessibility violations on the resume page", async () => {
    const container = await renderMarkup(createElement(ResumePage));
    expectAxe(await axe(container)).toHaveNoViolations();
  });

  it("has no obvious accessibility violations on the recruiter page", async () => {
    const container = await renderMarkup(createElement(RecruiterPage));
    expectAxe(await axe(container)).toHaveNoViolations();
  });

  it("has no obvious accessibility violations on the KProvEngine page", async () => {
    const container = await renderMarkup(KProvEnginePage());
    expectAxe(await axe(container)).toHaveNoViolations();
  });
});
