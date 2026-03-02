// src/app/projects/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { LINKS } from "@/config/site";

export const metadata: Metadata = {
  title: "Projects — Jeffrey R. Plewak",
  description: "Selected projects and engineering work.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  return (
    <div className="wrap">
      <header className="section" aria-label="Projects intro">
        <h1 className="h1">Projects</h1>

        <p className="lede">A focused set of projects with architecture notes and source.</p>

        <div className="ctaRow">
          <Link className="btn btnPrimary" href="/projects/kprovengine">
            KProvEngine
          </Link>
          <a className="btn" href={LINKS.github} target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <Link className="btn" href="/resume">
            Resume
          </Link>
          <a className="btn btnTertiary" href={LINKS.emailProject}>
            Email
          </a>
        </div>
      </header>
    </div>
  );
}
