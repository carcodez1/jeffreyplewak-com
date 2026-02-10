// src/app/projects/layout.tsx
import type { ReactNode } from "react";

export default function ProjectsLayout({ children }: { children: ReactNode }) {
  return <div className="pWrap">{children}</div>;
}