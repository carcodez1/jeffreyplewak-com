# Codex Development Workflow Reference Guide
## A practical reference for safe, productive software development with ChatGPT, Codex, VS Code, zsh, Git, and MCP

_Last updated: 2026-03-06_

---

## Table of contents

1. [Purpose](#purpose)
2. [What each tool is for](#what-each-tool-is-for)
3. [Core ontology](#core-ontology)
4. [Epistemology: what to trust, and in what order](#epistemology-what-to-trust-and-in-what-order)
5. [Setup](#setup)
   1. [Install Codex CLI](#install-codex-cli)
   2. [Use Codex in VS Code](#use-codex-in-vs-code)
   3. [Create minimal Codex config](#create-minimal-codex-config)
   4. [Add repository policy with `AGENTS.md`](#add-repository-policy-with-agentsmd)
   5. [Add one verification command](#add-one-verification-command)
   6. [Add skills for repeated work](#add-skills-for-repeated-work)
   7. [Add MCP only when needed](#add-mcp-only-when-needed)
   8. [Set up zsh helpers](#set-up-zsh-helpers)
6. [Daily workflow](#daily-workflow)
7. [Inspect, patch, review](#inspect-patch-review)
8. [Safe development practices](#safe-development-practices)
9. [Git and repository management](#git-and-repository-management)
10. [Frontend and web-app guidance](#frontend-and-web-app-guidance)
11. [Sequence diagrams](#sequence-diagrams)
12. [Quick reference](#quick-reference)
13. [Glossary](#glossary)
14. [Examples](#examples)
    1. [Minimal `AGENTS.md`](#example-minimal-agentsmd)
    2. [Minimal `.codex/config.toml`](#example-minimal-codexconfigtoml)
    3. [zsh helper block](#example-zsh-helper-block)
    4. [VS Code settings ideas](#example-vs-code-settings-ideas)
    5. [Prompt examples](#example-prompt-examples)
15. [Common mistakes](#common-mistakes)
16. [Reference sources](#reference-sources)

---

## Purpose

This guide explains how to use **ChatGPT for planning** and **Codex for repository execution** in a way that is safe, repeatable, and productive. It is intended to be generic enough for most software projects and clear enough for a junior developer, while still being useful for senior engineers who want a disciplined workflow. OpenAI documents Codex CLI as a local coding agent that can read, change, and run code in the selected directory, and documents `AGENTS.md`, skills, and MCP as the main customization layers.  
Sources: <https://developers.openai.com/codex/cli/> · <https://developers.openai.com/codex/guides/agents-md/> · <https://developers.openai.com/codex/skills/> · <https://developers.openai.com/codex/mcp/>

The core idea is simple:

- **ChatGPT** helps you decide what to do.
- **Codex** helps you do it in the repository.
- **`AGENTS.md`** defines repository behavior.
- **Skills** package reusable workflows.
- **MCP** connects tools and documentation.
- **Tests and builds** are the truth check.

---

## What each tool is for

### ChatGPT

Use ChatGPT for:
- planning
- critique
- architecture and UX reasoning
- documentation review
- prompt drafting

### Codex

Use Codex for:
- reading the real repository
- editing files
- running local commands
- applying patches
- verifying changes

OpenAI describes Codex CLI as a local coding agent that runs in your terminal, works in the selected directory, and can read, change, and run code.  
Source: <https://developers.openai.com/codex/cli/>

### `AGENTS.md`

Use `AGENTS.md` for:
- project identity
- repository rules
- route or subsystem roles
- execution mode expectations
- safety and verification expectations

Codex reads `AGENTS.md` files before work and layers instructions from broader scope to narrower scope.  
Source: <https://developers.openai.com/codex/guides/agents-md/>

### Skills

Use skills for:
- repeated audits
- export workflows
- repository-specific checks
- reusable project tasks

OpenAI documents skills as the supported reusable workflow mechanism for Codex.  
Sources: <https://developers.openai.com/codex/skills/> · <https://developers.openai.com/blog/eval-skills/>

### MCP

Use MCP for:
- docs servers
- memory servers
- internal tools
- external integrations

OpenAI documents MCP as the model and tool connectivity layer for Codex CLI and the IDE extension.  
Sources: <https://developers.openai.com/codex/mcp/> · <https://developers.openai.com/resources/docs-mcp/>

---

## Core ontology

```text
OPENAI CODING STACK
│
├─ Planning layer
│  └─ ChatGPT
│     ├─ decide scope
│     ├─ refine intent
│     ├─ interpret docs
│     └─ review output
│
├─ Execution layer
│  ├─ Codex CLI
│  ├─ Codex IDE extension
│  └─ Codex app / rich clients
│
├─ Repo control layer
│  ├─ AGENTS.md
│  ├─ nested AGENTS.md
│  ├─ .codex/config.toml
│  └─ skills
│
├─ Tool integration layer
│  └─ MCP servers
│     ├─ docs
│     ├─ memory
│     ├─ internal tools
│     └─ external systems
│
└─ Truth layer
   ├─ source files
   ├─ command output
   ├─ tests
   ├─ build
   └─ git history
```

This model is consistent with OpenAI’s Codex customization guidance.  
Sources: <https://developers.openai.com/codex/concepts/customization/> · <https://developers.openai.com/codex/guides/agents-md/>

---

## Epistemology: what to trust, and in what order

```text
TRUTH HIERARCHY
│
├─ Highest confidence
│  ├─ actual repo files
│  ├─ command output
│  ├─ tests
│  ├─ build results
│  └─ official documentation
│
├─ High confidence
│  ├─ AGENTS.md rules
│  ├─ skills instructions
│  ├─ scoped task prompts
│  └─ MCP tool results
│
├─ Medium confidence
│  ├─ model inference
│  ├─ design judgment
│  └─ cleanup recommendations
│
└─ Lowest confidence
   ├─ guesses
   ├─ implied intent
   └─ unstated assumptions
```

The practical rule is:

- trust **files, commands, tests, and builds** before intuition
- trust **repository policy** before improvisation
- treat model suggestions as proposals until verified

This aligns with OpenAI’s guidance to use milestone-style work with explicit validation, and with NIST’s Secure Software Development Framework, which emphasizes defined practices, verification, and reduction of software risk.  
Sources: <https://developers.openai.com/blog/run-long-horizon-tasks-with-codex/> · <https://csrc.nist.gov/pubs/sp/800/218/final>

---

## Setup

### Install Codex CLI

Follow the official install path for your platform, then verify:

```bash
codex --version
codex --help
```

OpenAI documents Codex CLI commands and flags in the CLI reference.  
Sources: <https://developers.openai.com/codex/cli/> · <https://developers.openai.com/codex/cli/reference/>

### Use Codex in VS Code

Install the official Codex VS Code extension, sign in, and use it side by side with your editor. OpenAI documents the IDE extension as a Codex client that can read, edit, and run code, and share configuration concepts with the CLI.  
Sources: <https://developers.openai.com/codex/ide/> · <https://developers.openai.com/codex/ide/settings/>

### Create minimal Codex config

A minimal project config is usually enough:

```toml
project_root_markers = [".git"]
model = "gpt-5.4"
```

OpenAI documents project root detection and layered configuration in `config.toml`.  
Sources: <https://developers.openai.com/codex/config-advanced/> · <https://developers.openai.com/codex/config-reference/>

### Add repository policy with `AGENTS.md`

At minimum, include:
- project identity
- route or subsystem roles
- source-of-truth rules
- execution modes
- safety rules
- verification contract

OpenAI documents `AGENTS.md` as the durable instruction layer for Codex.  
Source: <https://developers.openai.com/codex/guides/agents-md/>

### Add one verification command

Create a stable command such as:

```json
"verify:patch": "npm run -s lint && npm run -s typecheck && npm run -s build"
```

This is a strong repository convention because it gives humans and Codex one standard post-patch truth check. The habit is consistent with OpenAI’s milestone-based Codex guidance.  
Source: <https://developers.openai.com/blog/run-long-horizon-tasks-with-codex/>

### Add skills for repeated work

Examples:
- accessibility audit
- route audit
- export workflow
- SEO report generation
- dependency cleanup audit

OpenAI documents skills as the supported reusable workflow mechanism.  
Sources: <https://developers.openai.com/codex/skills/> · <https://developers.openai.com/blog/eval-skills/>

### Add MCP only when needed

Use MCP when you actually need:
- docs lookup
- memory/context tools
- design system lookups
- internal services

OpenAI hosts a docs MCP server and documents MCP setup for Codex.  
Sources: <https://developers.openai.com/resources/docs-mcp/> · <https://developers.openai.com/codex/mcp/>

### Set up zsh helpers

A clean shell block should prioritize stability and avoid duplicates. The following commands are grounded in the Codex CLI reference: `resume`, `fork`, `exec`, `apply`, `app`, `mcp`, `--full-auto`, `--sandbox`, and `-C`.  
Source: <https://developers.openai.com/codex/cli/reference/>

---

## Daily workflow

The simplest stable pattern is:

```text
CHOOSE SLICE
   ↓
INSPECT
   ↓
APPROVE
   ↓
PATCH
   ↓
VERIFY
   ↓
MANUAL CHECK
   ↓
COMMIT
```

OpenAI recommends milestone-style work for long-running Codex tasks instead of mixed-scope requests.  
Source: <https://developers.openai.com/blog/run-long-horizon-tasks-with-codex/>

### What counts as one slice

A slice is one bounded change, such as:
- fix one mobile layout defect
- simplify one homepage section
- refine recruiter CTA hierarchy
- clean one project page
- update one export flow

A slice is **not**:
- “stabilize the whole app”
- “do UI, SEO, performance, and exports together”
- “refactor the entire project”

---

## Inspect, patch, review

### Inspect

Use INSPECT when scope is unclear.

Goal:
- identify the smallest safe next action
- gather facts first
- do not edit

Example:

```text
Mode: INSPECT

Task:
Inspect the homepage only for the next smallest safe cleanup that makes it clearer and less cluttered.

Inspect only:
- src/app/page.tsx
- src/app/layout.tsx
- related homepage styles

Goals:
1. identify the next highest-ROI cleanup
2. keep the page as identity + navigation
3. do not patch yet
```

### Patch

Use PATCH only after the scope is approved.

Goal:
- apply the smallest correct patch
- verify immediately
- stop if ambiguity appears

Example:

```text
Mode: PATCH

Task:
Refine the homepage only to remove duplication between hero copy and CTA routing.

Approved scope:
- homepage files only
- no metadata changes
- no sitemap changes
- no new dependencies
```

### Review

Use REVIEW after a patch.

Goal:
- inspect the diff
- look for regressions
- assess remaining risk

This aligns with the `AGENTS.md` model and Codex’s strengths.  
Source: <https://developers.openai.com/codex/guides/agents-md/>

---

## Safe development practices

### Verify after every patch

Run the repo verification contract after each patch. This is consistent with OpenAI’s milestone-based Codex guidance and NIST SSDF’s secure development emphasis on verification.  
Sources: <https://developers.openai.com/blog/run-long-horizon-tasks-with-codex/> · <https://csrc.nist.gov/pubs/sp/800/218/final>

### Keep tasks bounded

Limit each Codex run to:
- one route
- one subsystem
- one defect
- one audit

### Prefer read-only inspection first

If you are unsure, inspect first. This reduces accidental scope creep and preserves reviewability.

### Respect accessibility and safe UI defaults

For web applications:
- keep content keyboard accessible
- preserve focus visibility
- honor reduced motion
- keep contrast readable

WCAG 2.2 is the standard reference.  
Source: <https://www.w3.org/TR/WCAG22/>

### Treat security as part of the workflow

NIST SSDF recommends secure development throughout the lifecycle, and OWASP identifies common application risks that should inform code changes.  
Sources: <https://csrc.nist.gov/pubs/sp/800/218/final> · <https://owasp.org/www-project-top-ten/>

### Keep structured data honest

If you use JSON-LD or machine-readable metadata, it must reflect what users can actually see. Google Search Central explicitly prohibits misleading or unsupported structured data.  
Source: <https://developers.google.com/search/docs/appearance/structured-data/sd-policies>

---

## Git and repository management

### Use branches intentionally

Use one branch for one coherent effort:
- `fix/resume-mobile-overlap`
- `feat/homepage-clarity`
- `chore/seo-cleanup`

### Commit in slices

Do not wait until dozens of unrelated files have changed.

Good grouping examples:
- control layer changes
- homepage changes
- recruiter-route changes
- metadata/discovery changes
- asset replacements

### Protect important branches

GitHub protected branches help enforce review rules, required checks, and merge behavior.  
Source: <https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches>

### Use signed commits where appropriate

GitHub documents commit signature verification for verifying authorship.  
Source: <https://docs.github.com/en/enterprise-cloud%40latest/authentication/managing-commit-signature-verification/about-commit-signature-verification>

### Keep generated artifacts intentional

Decide whether items like:
- audit reports
- SEO reports
- export artifacts
- generated manifests

belong in git or are only local outputs.

---

## Frontend and web-app guidance

### Keep core routes focused

Examples:
- homepage = identity + routing
- recruiter page = screening / decision
- project page = proof
- utility page = artifact downloads

### Keep server-first when possible

In Next App Router, Server and Client Components have distinct roles. For content-first pages, server-oriented rendering is often a strong default because it improves stability and predictability.  
Source: <https://nextjs.org/docs/app/getting-started/server-and-client-components>

### Write people-first content

Google recommends helpful, reliable, people-first content rather than keyword stuffing or synthetic filler.  
Source: <https://developers.google.com/search/docs/fundamentals/creating-helpful-content>

### Avoid mixed-purpose pages

A page should not try to be:
- a landing page
- a recruiter console
- an export center
- a deep technical proof page

at the same time.

---

## Sequence diagrams

### Standard inspect-to-patch flow

```text
Developer        ChatGPT            Codex CLI          Repo           Verify
   |                |                  |                |               |
   | ask for plan   |                  |                |               |
   |--------------->|                  |                |               |
   | get prompt     |                  |                |               |
   |<---------------|                  |                |               |
   | paste INSPECT  |----------------->|                |               |
   |                |                  | read files     |               |
   |                |                  |--------------->|               |
   |                |                  | findings       |               |
   |                |                  |<---------------|               |
   | inspect output |                  |                |               |
   | paste PATCH    |----------------->| edit files     |               |
   |                |                  |--------------->|               |
   |                |                  | run verify     |-------------->|
   |                |                  | verify result  |<--------------|
   | review result  |                  |                |               |
```

### Codex runtime on your machine

```text
Terminal
  |
  | codex / codex resume --last
  v
Codex CLI
  |
  |-- reads ~/.codex/config.toml
  |-- reads repo/.codex/config.toml
  |-- finds root AGENTS.md
  |-- finds narrower AGENTS.md if in subtree
  |-- loads MCP servers if configured
  |
  v
Task execution
  |
  |-- inspect files
  |-- run commands
  |-- patch files (if allowed)
  |-- verify
  v
Output
```

Project root detection, config layering, and `AGENTS.md` loading are documented Codex behaviors.  
Sources: <https://developers.openai.com/codex/config-advanced/> · <https://developers.openai.com/codex/guides/agents-md/>

---

## Quick reference

### Commands

```bash
codex --version
codex --help
codex resume --last
codex -m gpt-5.4
codex mcp list
npm run -s verify:patch
```

Codex CLI documents model selection, MCP management, `apply`, `exec`, `resume`, `fork`, `app`, sandbox options, and working-directory flags.  
Source: <https://developers.openai.com/codex/cli/reference/>

### Best use

- use **INSPECT** when unclear
- use **PATCH** when approved
- use **REVIEW** after patching
- use **skills** for repeated workflows
- use **MCP** for docs/tools
- use **Git** to checkpoint every stable slice

### Minimal prompt template

```text
Mode: INSPECT

Task:
[exact bounded task]

Inspect only:
[list of files]

Goals:
1. [goal]
2. [goal]
3. do not patch yet
```

---

## Glossary

**Agent** — A system that can read context, decide on actions, and execute or recommend steps toward a goal.

**Codex CLI** — OpenAI’s local coding agent that runs in your terminal and can inspect, edit, and run code in the selected directory.  
Source: <https://developers.openai.com/codex/cli/>

**Codex IDE extension** — The Codex client inside VS Code or another supported IDE.  
Source: <https://developers.openai.com/codex/ide/>

**`AGENTS.md`** — A repository instruction file that Codex reads before work.  
Source: <https://developers.openai.com/codex/guides/agents-md/>

**Skill** — A reusable package of instructions, resources, and optional scripts that teaches Codex a workflow.  
Source: <https://developers.openai.com/codex/skills/>

**MCP** — Model Context Protocol, a standard way to connect models to tools and external context.  
Sources: <https://developers.openai.com/codex/mcp/> · <https://developers.openai.com/apps-sdk/concepts/mcp-server/>

**Repository policy** — The rules that govern how work should happen in a codebase.

**Source of truth** — The canonical place where a piece of information should be treated as authoritative.

**Verification contract** — The standard set of commands the repository uses to prove a patch is acceptable.

**Protected branch** — A GitHub branch with enforcement rules such as required reviews or checks.  
Source: <https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches>

**WCAG 2.2** — The Web Content Accessibility Guidelines standard for accessible web content.  
Source: <https://www.w3.org/TR/WCAG22/>

---

## Examples

### Example: minimal `AGENTS.md`

```md
# Project Identity

You are the implementation operator for this repository.

Primary purpose:
- maintain a stable, verifiable codebase
- keep changes small and reviewable
- preserve accessibility, reliability, and performance

# Execution Modes

## INSPECT
- no edits
- gather facts first

## PATCH
- apply the smallest correct patch
- verify after patching

## REVIEW
- inspect the diff and verify result only
```

### Example: minimal `.codex/config.toml`

```toml
project_root_markers = [".git"]
model = "gpt-5.4"
```

### Example: zsh helper block

```zsh
# --- Codex productivity ---

groot() { git rev-parse --show-toplevel 2>/dev/null || pwd; }
cdroot() { cd "$(groot)" || return; }

alias gs='git status -sb'
alias gds='git diff --stat'

alias cdx='codex'
alias cdxv='codex --version'
alias cdxh='codex --help'

cdxr() { cdroot; codex "$@"; }
cdxlast() { cdroot; codex resume --last; }
cdxfa() { cdroot; codex --full-auto "$@"; }
cdxro() { cdroot; codex --sandbox read-only "$@"; }
cdxe() { cdroot; codex exec "$@"; }
cdxapply() { cdroot; codex apply "$@"; }
cdxfork() { cdroot; codex fork "$@"; }
cdxapp() { cdroot; codex app .; }
alias cdxm='codex mcp'
```

Commands such as `resume`, `fork`, `exec`, `apply`, `app`, `mcp`, `--full-auto`, and `--sandbox` are documented in the Codex CLI reference.  
Source: <https://developers.openai.com/codex/cli/reference/>

### Example: VS Code settings ideas

These are generic quality-of-life suggestions, not OpenAI requirements:

```json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll": "explicit"
  },
  "files.trimTrailingWhitespace": true,
  "files.insertFinalNewline": true,
  "terminal.integrated.defaultProfile.osx": "zsh"
}
```

For Codex-specific IDE behavior, use the official Codex IDE extension and its documented settings and slash commands.  
Sources: <https://developers.openai.com/codex/ide/> · <https://developers.openai.com/codex/ide/settings/>

### Example: prompt examples

#### Inspect

```text
Mode: INSPECT

Task:
Inspect the homepage only for the next smallest safe cleanup.

Inspect only:
- src/app/page.tsx
- related homepage styles

Goals:
1. identify the next highest-ROI cleanup
2. do not patch yet
```

#### Patch

```text
Mode: PATCH

Task:
Remove duplicate CTA guidance from the homepage hero.

Approved scope:
- src/app/page.tsx only
- no metadata changes
- no new dependencies
```

---

## Common mistakes

### Asking Codex to do everything at once

Bad:
- “stabilize the whole app”
- “clean UI, SEO, performance, and exports”

Better:
- “inspect homepage hero only”
- “fix one mobile overlap defect”

### Repeating repository policy in every prompt

If `AGENTS.md` is good, prompts should be short.

### Treating MCP as policy

MCP is tools and integrations, not repository behavior.

### Trusting model intuition over repository evidence

Prefer:
- files
- command output
- tests
- builds
- official docs

### Keeping generated clutter in git without intent

Decide whether generated outputs are:
- public artifacts
- internal audit outputs
- disposable local files

---

## Reference sources

### OpenAI
- Codex `AGENTS.md` guide: <https://developers.openai.com/codex/guides/agents-md/>
- Codex CLI overview: <https://developers.openai.com/codex/cli/>
- Codex CLI reference: <https://developers.openai.com/codex/cli/reference/>
- Codex IDE extension: <https://developers.openai.com/codex/ide/>
- Codex IDE settings: <https://developers.openai.com/codex/ide/settings/>
- Codex MCP documentation: <https://developers.openai.com/codex/mcp/>
- Docs MCP resource: <https://developers.openai.com/resources/docs-mcp/>
- Codex skills: <https://developers.openai.com/codex/skills/>
- Advanced configuration: <https://developers.openai.com/codex/config-advanced/>
- Configuration reference: <https://developers.openai.com/codex/config-reference/>
- Run long-horizon tasks with Codex: <https://developers.openai.com/blog/run-long-horizon-tasks-with-codex/>
- GPT prompt guidance: <https://developers.openai.com/api/docs/guides/prompt-guidance>
- OpenAI Apps SDK MCP concept: <https://developers.openai.com/apps-sdk/concepts/mcp-server/>

### GitHub
- Protected branches: <https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches>
- Commit signature verification: <https://docs.github.com/en/enterprise-cloud%40latest/authentication/managing-commit-signature-verification/about-commit-signature-verification>

### NIST
- Secure Software Development Framework (SP 800-218): <https://csrc.nist.gov/pubs/sp/800/218/final>

### OWASP
- OWASP Top Ten: <https://owasp.org/www-project-top-ten/>
- OWASP DevSecOps Guideline: <https://owasp.org/www-project-devsecops-guideline/latest/>

### W3C
- WCAG 2.2: <https://www.w3.org/TR/WCAG22/>

### Next.js
- Server and Client Components: <https://nextjs.org/docs/app/getting-started/server-and-client-components>

### Google Search Central
- Helpful, reliable, people-first content: <https://developers.google.com/search/docs/fundamentals/creating-helpful-content>
- Structured data policies: <https://developers.google.com/search/docs/appearance/structured-data/sd-policies>
