"use client";

import { useEffect, useState } from "react";
import { DEMO_DAY } from "@/lib/demo-day";

const TARGET = new Date(DEMO_DAY.eventDate).getTime();

type Parts = { days: number; hours: number; minutes: number; seconds: number };

function diff(now: number): Parts {
  const total = Math.max(0, TARGET - now);
  return {
    days: Math.floor(total / 86_400_000),
    hours: Math.floor((total / 3_600_000) % 24),
    minutes: Math.floor((total / 60_000) % 60),
    seconds: Math.floor((total / 1000) % 60),
  };
}

const CELLS = [
  { key: "days", label: "días" },
  { key: "hours", label: "horas" },
  { key: "minutes", label: "min" },
  { key: "seconds", label: "seg" },
] as const;

const pad = (n: number) => n.toString().padStart(2, "0");

export function DemoCountdown() {
  const [parts, setParts] = useState<Parts | null>(null);

  useEffect(() => {
    const tick = () => setParts(diff(Date.now()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="flex min-h-[88vh] flex-col justify-center overflow-hidden border-b border-[var(--demo-line)] py-20">
      <div className="container mx-auto w-full px-4">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <span className="inline-block bg-[var(--demo-accent)] px-4 py-1.5 font-space text-sm font-bold uppercase tracking-[0.18em] text-[var(--demo-bg)]">
            El reloj corre
          </span>
          <span className="font-space text-xs uppercase tracking-[0.18em] text-[var(--demo-muted)]">
            {DEMO_DAY.dateLabel}
          </span>
        </div>

        <div className="mt-12 flex w-full items-start justify-center gap-1 sm:gap-3">
          {CELLS.map((cell, i) => (
            <div key={cell.key} className="flex items-start gap-1 sm:gap-3">
              <div className="flex flex-col items-center">
                <span className="font-space text-[clamp(2rem,13vw,11rem)] font-bold leading-[0.8] tabular-nums text-[var(--demo-accent)]">
                  {parts ? pad(parts[cell.key]) : "00"}
                </span>
                <span className="mt-4 font-space text-[0.6rem] uppercase tracking-[0.2em] text-[var(--demo-muted)] sm:text-sm">
                  {cell.label}
                </span>
              </div>
              {i < CELLS.length - 1 && (
                <span className="font-space text-[clamp(1.5rem,8vw,7rem)] font-bold leading-[0.8] text-[var(--demo-line)]">
                  :
                </span>
              )}
            </div>
          ))}
        </div>

        <p className="mt-12 max-w-2xl font-display text-2xl font-bold uppercase leading-tight tracking-tight sm:text-4xl">
          20 startups. Un día.{" "}
          <span className="text-[var(--demo-accent)]">Cero excusas.</span>
        </p>
      </div>
    </section>
  );
}
