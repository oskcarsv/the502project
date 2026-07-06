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
  const closed = !DEMO_DAY.applicationsOpen;

  useEffect(() => {
    if (closed) return;
    const tick = () => setParts(diff(Date.now()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [closed]);

  return (
    <section className="flex min-h-[88vh] flex-col justify-center overflow-hidden border-b border-[var(--demo-line)] py-20">
      <div className="container mx-auto w-full px-4">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <span className="inline-block bg-[var(--demo-accent)] px-4 py-1.5 font-space text-sm font-bold uppercase tracking-[0.18em] text-[var(--demo-bg)]">
            {closed ? "Edición cerrada" : "El reloj corre"}
          </span>
          <span className="font-space text-xs uppercase tracking-[0.18em] text-[var(--demo-muted)]">
            {DEMO_DAY.dateLabel}
          </span>
        </div>

        {closed ? (
          <div className="mt-12 max-w-3xl">
            <p className="font-display text-[clamp(2.5rem,10vw,7rem)] font-extrabold uppercase leading-[0.9] tracking-[-0.04em]">
              Nos vemos
              <br />
              <span className="text-[var(--demo-accent)]">en la próxima.</span>
            </p>
            <p className="mt-8 max-w-xl text-base text-[var(--demo-muted)] sm:text-lg">
              La convocatoria de la Edición 1 ya cerró. Gracias a todos los
              que aplicaron y nos acompañaron.
            </p>
          </div>
        ) : (
          <>
            <div className="mt-12 flex w-full max-w-full items-start justify-center gap-0.5 sm:gap-3">
              {CELLS.map((cell, i) => (
                <div key={cell.key} className="flex items-start gap-0.5 sm:gap-3">
                  <div className="flex flex-col items-center">
                    <span className="font-space text-[clamp(1.75rem,11.5vw,11rem)] font-bold leading-[0.8] tabular-nums text-[var(--demo-accent)]">
                      {parts ? pad(parts[cell.key]) : "··"}
                    </span>
                    <span className="mt-3 font-space text-[0.55rem] uppercase tracking-[0.18em] text-[var(--demo-muted)] sm:mt-4 sm:text-sm">
                      {cell.label}
                    </span>
                  </div>
                  {i < CELLS.length - 1 && (
                    <span className="font-space text-[clamp(1.25rem,6vw,7rem)] font-bold leading-[0.8] text-[var(--demo-line)]">
                      :
                    </span>
                  )}
                </div>
              ))}
            </div>

            <p className="mt-12 max-w-2xl font-display text-2xl font-bold uppercase leading-tight tracking-tight sm:text-4xl">
              {DEMO_DAY.spots} startups. Un día.{" "}
              <span className="text-[var(--demo-accent)]">Cero excusas.</span>
            </p>
          </>
        )}
      </div>
    </section>
  );
}
