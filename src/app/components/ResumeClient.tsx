// src/app/components/ResumeClient.tsx
"use client";

import { useEffect, useId, useMemo, useRef, useState, type KeyboardEvent } from "react";
import type { ResumeRole, WorkType } from "@/content/resume";

type FilterTab = "All" | WorkType;
const TABS: FilterTab[] = ["All", "FTE", "Contract", "Consulting", "Owner"];
const QUICK_CHIPS = ["AWS", "EKS", "Terraform", "K8s", "React", "LLM", "RAG", "SBOM", "SLSA", "C++"] as const;

type Props = {
  roles: ResumeRole[];
};

function roleRange(r: ResumeRole): string {
  return r.end ? `${r.start} — ${r.end}` : `${r.start} — Present`;
}

function buildSearchIndex(role: ResumeRole): string {
  return [
    role.employerName,
    role.title,
    role.location,
    ...role.highlights,
    ...(role.technologies ?? []),
  ]
    .join(" ")
    .toLowerCase();
}

function jumpToRoleAnchor(id: string) {
  if (typeof window === "undefined") return;
  window.location.hash = id;
  const node = document.getElementById(id);
  if (node instanceof HTMLElement) node.focus();
}

export function ResumeClient({ roles }: Props) {
  const [activeFilter, setActiveFilter] = useState<FilterTab>("All");
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const searchId = useId();
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = useMemo(() => {
    const byType = activeFilter === "All" ? roles : roles.filter((r) => r.workType === activeFilter);
    const q = query.trim().toLowerCase();
    if (!q) return byType;
    return byType.filter((r) => buildSearchIndex(r).includes(q));
  }, [roles, activeFilter, query]);

  // Count only the tabs we actually show (avoids guessing WorkType variants)
  const counts = useMemo(() => {
    const out: Record<string, number> = {};
    for (const t of TABS) out[t] = 0;
    out.All = roles.length;

    for (const r of roles) {
      const k = r.workType;
      if (k && k in out) out[k] += 1;
    }
    return out;
  }, [roles]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query, activeFilter]);

  function clearAll() {
    setQuery("");
    setActiveFilter("All");
    setActiveIndex(0);
    inputRef.current?.focus();
  }

  function onSearchKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (!filtered.length) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, filtered.length - 1));
      return;
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
      return;
    }
    if (e.key === "Enter") {
      e.preventDefault();
      jumpToRoleAnchor(filtered[activeIndex]?.id ?? filtered[0].id);
    }
  }

  return (
    <div className="resumeEnhancer panel" aria-label="Timeline search and filters">
      <div className="resumeSearchRow">
        <label className="resumeSearchLabel" htmlFor={searchId}>
          Search timeline
        </label>
        <input
          ref={inputRef}
          id={searchId}
          className="resumeSearchInput"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.currentTarget.value)}
          onKeyDown={onSearchKeyDown}
          placeholder="Employer, title, highlights, technology"
        />
        <button type="button" className="btn btnSm btnTertiary" onClick={clearAll}>
          Clear
        </button>
        <p className="resumeSearchLive muted" aria-live="polite">
          {filtered.length} matching {filtered.length === 1 ? "role" : "roles"}
        </p>
      </div>

      <div className="resumeChipRow" aria-label="Quick keyword filters">
        {QUICK_CHIPS.map((chip) => (
          <button
            key={chip}
            type="button"
            className={`resumeChip ${query.toLowerCase() === chip.toLowerCase() ? "resumeChip--active" : ""}`}
            onClick={() => setQuery(chip)}
          >
            {chip}
          </button>
        ))}
      </div>

      <div className="resumeFilters" aria-label="Filter by employment type">
        {TABS.map((tab) => (
          <button
            key={tab}
            type="button"
            aria-pressed={activeFilter === tab}
            className={`resumeFilterTab ${activeFilter === tab ? "resumeFilterTab--active" : ""}`}
            onClick={() => setActiveFilter(tab)}
          >
            {tab}
            <span className="resumeFilterCount" aria-hidden="true">
              {counts[tab] ?? 0}
            </span>
          </button>
        ))}
      </div>

      <ol className="resumeResultList" role="listbox" aria-label="Matching timeline roles">
        {filtered.slice(0, 12).map((r, idx) => (
          <li key={r.id}>
            <button
              type="button"
              className={`resumeResultBtn ${idx === activeIndex ? "resumeResultBtn--active" : ""}`}
              aria-selected={idx === activeIndex}
              onMouseEnter={() => setActiveIndex(idx)}
              onFocus={() => setActiveIndex(idx)}
              onClick={() => jumpToRoleAnchor(r.id)}
            >
              <span className="resumeResultEmployer">{r.employerName}</span>
              <span className="resumeResultMeta">
                {r.title} · {roleRange(r)}
              </span>
            </button>
          </li>
        ))}
      </ol>

      {filtered.length === 0 ? (
        <p className="muted resumeNoResults" role="status">
          No roles match the current search/filter.
        </p>
      ) : null}
    </div>
  );
}
