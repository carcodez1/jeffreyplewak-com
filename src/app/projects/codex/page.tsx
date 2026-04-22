import Link from "next/link";
import type { Metadata } from "next";
import "../projects.css";

export const metadata: Metadata = {
  title: "Codex in This Repo — Workflow Proof",
  description:
    "Concise proof page showing how this repo uses Codex through AGENTS.md, repo-local Skills, verification, and human review.",
  alternates: {
    canonical: "/projects/codex",
  },
  openGraph: {
    type: "article",
    title: "Codex in This Repo — Workflow Proof",
    description:
      "Concise proof page showing how this repo uses Codex through AGENTS.md, repo-local Skills, verification, and human review.",
    url: "/projects/codex",
  },
  twitter: {
    card: "summary_large_image",
    title: "Codex in This Repo — Workflow Proof",
    description:
      "Concise proof page showing how this repo uses Codex through AGENTS.md, repo-local Skills, verification, and human review.",
  },
};

const LINKS = {
  projects: "/projects",
  proof: "/projects/kprovengine",
  docsHub: "https://developers.openai.com/codex/",
  agentsGuide: "https://developers.openai.com/codex/guides/agents-md/",
  skillsDocs: "https://developers.openai.com/codex/skills/",
  customization: "https://developers.openai.com/codex/concepts/customization/",
} as const;

const FLOW = [
  {
    title: "Start with a bounded task",
    body: "The repo treats Codex as a coding agent for a concrete change, not a free-form chat demo.",
  },
  {
    title: "Load repo guardrails",
    body: "AGENTS.md defines scope, approval triggers, and the working rules before edits begin.",
  },
  {
    title: "Attach reusable setup",
    body: "Repeatable workflows live in repo-local Skills instead of scattered one-off prompts.",
  },
  {
    title: "Patch and verify",
    body: "Changes are expected to run through build, test, and Codex-specific checks.",
  },
  {
    title: "Keep HITL visible",
    body: "Human approval stays explicit for consequential changes and proof-sensitive routes.",
  },
] as const;

const PROOF = [
  {
    label: "AGENTS.md",
    body: "This repo uses persistent project guidance for scope, review boundaries, and verification expectations.",
  },
  {
    label: ".agents/skills/",
    body: "Repo-local Skills handle repeatable work such as project pages, SEO, accessibility, and Codex context.",
  },
  {
    label: "Verification",
    body: "Patch work runs real checks including verify:patch, test:ci, check:build, check:codex, and codex:skills.",
  },
  {
    label: "Route proof",
    body: "This page is here to show implementation judgment in this repo, not to restate product docs that already live on OpenAI.",
  },
] as const;

const WHY = [
  "Persistent guardrails reduce prompt drift.",
  "Repo-local Skills make repeatable workflows easier to reuse and review.",
  "Verification plus visible human approval makes the workflow easier to trust.",
] as const;

export default function Page() {
  return (
    <div className="pWrap codexWrap">
      <header className="pHero codexHero" aria-label="Codex project hero">
        <div className="pCrumb">
          <Link href={LINKS.projects} className="pBack">
            ← Projects
          </Link>
        </div>

        <div className="pHeroGrid pHeroGridSingle">
          <div className="codexHeroBody">
            <p className="codexKicker">Repo workflow proof</p>
            <h1 className="pH1">Codex in this repo</h1>

            <p className="pSub">
              Codex is the coding agent. This page shows the repo setup I actually use: guardrails, local Skills,
              verification, and human review.
            </p>

            <p className="pLede">
              This is not a documentation mirror. For current Codex product behavior, use the official docs. This route
              exists to show how the workflow is implemented and governed in this repository.
            </p>

            <nav className="pCtas" aria-label="Codex route actions">
              <a className="pBtn pBtnPrimary" href={LINKS.docsHub} target="_blank" rel="noopener noreferrer">
                Official Codex docs
              </a>
              <Link className="pBtn" href={LINKS.projects}>
                Back to projects
              </Link>
            </nav>

            <div className="codexMiniLinks" aria-label="High-value Codex references">
              <a className="pLink" href={LINKS.agentsGuide} target="_blank" rel="noopener noreferrer">
                AGENTS.md guide
              </a>
              <a className="pLink" href={LINKS.skillsDocs} target="_blank" rel="noopener noreferrer">
                Skills docs
              </a>
              <a className="pLink" href={LINKS.customization} target="_blank" rel="noopener noreferrer">
                Customization overview
              </a>
            </div>
          </div>
        </div>
      </header>

      <section className="pSection codexSection" aria-label="Workflow map">
        <div className="codexSectionHead">
          <h2 className="pH2">How this repo uses Codex</h2>
          <p className="pMuted">One bounded workflow, one proof surface, and one handoff to the official docs.</p>
        </div>

        <div className="codexFlowShell">
          <ol className="codexFlow" aria-label="Codex workflow in this repo">
            {FLOW.map((item, index) => (
              <li key={item.title} className="codexFlowItem">
                <span className="codexFlowNum" aria-hidden="true">
                  {index + 1}
                </span>
                <h3 className="codexFlowTitle">{item.title}</h3>
                <p className="codexFlowText">{item.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="pSection codexSection" aria-label="Implementation proof">
        <div className="codexSectionHead">
          <h2 className="pH2">Implementation proof</h2>
          <p className="pMuted">Everything below exists in this repo today.</p>
        </div>

        <div className="codexProofRows">
          {PROOF.map((item) => (
            <div key={item.label} className="codexProofRow">
              <h3 className="codexProofLabel">{item.label}</h3>
              <p className="codexProofBody">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="pSection codexSection" aria-label="Why this matters">
        <div className="codexSectionHead">
          <h2 className="pH2">Why it matters</h2>
        </div>

        <ul className="codexWhyList">
          {WHY.map((item) => (
            <li key={item} className="codexWhyItem">
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className="pSection codexSection codexFooterCta" aria-label="Next steps">
        <div className="codexSectionHead">
          <h2 className="pH2">Read the docs, then inspect the proof.</h2>
          <p className="pMuted">The official docs should stay authoritative. This repo should stay implementation-specific.</p>
        </div>

        <nav className="pCtas" aria-label="Codex footer actions">
          <a className="pBtn pBtnPrimary" href={LINKS.docsHub} target="_blank" rel="noopener noreferrer">
            Open Codex docs
          </a>
          <Link className="pBtn" href={LINKS.proof}>
            See flagship proof
          </Link>
          <Link className="pBtn" href={LINKS.projects}>
            Back to projects
          </Link>
        </nav>
      </section>
    </div>
  );
}
