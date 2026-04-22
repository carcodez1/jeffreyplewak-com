"use client";

import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { filterObservabilityEvent } from "@/lib/observability";

export function Observability() {
  return (
    <>
      <Analytics beforeSend={filterObservabilityEvent} />
      <SpeedInsights beforeSend={filterObservabilityEvent} />
    </>
  );
}
