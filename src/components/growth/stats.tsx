"use client";

import { CountUp } from "@/components/demo-day/count-up";
import type { GrowthSummary } from "@/lib/growth";

const CARD_KEYS = [
  "members",
  "growth",
  "avgMonthly",
  "months",
] as const;

export function GrowthStats({
  summary,
  labels,
}: {
  summary: GrowthSummary;
  labels: Record<(typeof CARD_KEYS)[number], { value: string; label: string }>;
}) {
  const values: Record<(typeof CARD_KEYS)[number], number | string> = {
    members: summary.totalMembers,
    growth: summary.totalGrowth,
    avgMonthly: summary.avgMonthlyGrowth,
    months: summary.monthsActive,
  };

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {CARD_KEYS.map((key) => {
        const { label } = labels[key];
        const raw = values[key];

        return (
          <div
            key={key}
            className="border border-foreground/10 bg-background p-6"
          >
            <div className="font-display text-4xl font-bold tracking-tight text-brand-dark sm:text-5xl">
              {typeof raw === "number" ? (
                <>
                  {key === "growth" || key === "avgMonthly" ? "+" : ""}
                  <CountUp value={raw} />
                </>
              ) : (
                raw
              )}
            </div>
            <p className="mt-2 text-xs font-semibold uppercase tracking-[0.16em] text-foreground/55">
              {label}
            </p>
          </div>
        );
      })}
    </div>
  );
}
