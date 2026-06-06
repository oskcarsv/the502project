"use client";

import { BarrileteLink } from "./primitives";

export function DemoApplyHero() {
  return (
    <section className="border-b border-[var(--demo-line)]">
      <div className="container mx-auto px-4 py-8 sm:py-12 md:py-16">
        <h1 className="font-display text-[clamp(1.75rem,6vw,3.5rem)] font-extrabold uppercase tracking-tight">
          Aplica al Demo Day
        </h1>
        <p className="mt-4 max-w-xl break-words text-sm text-[var(--demo-muted)] sm:text-base">
          Si cumples los criterios de abajo, completa el formulario y pitchea
          ante <BarrileteLink>Barrilete Ventures</BarrileteLink>.
        </p>
      </div>
    </section>
  );
}
