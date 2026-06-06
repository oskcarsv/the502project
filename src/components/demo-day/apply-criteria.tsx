"use client";

import { Check } from "lucide-react";
import { DEMO_SIGNALS } from "@/lib/demo-day";

const SHORT_BODY: Record<string, string> = {
  "01": "Producto real, no deck.",
  "02": "Usuarios o ventas.",
  "03": "Founders construyendo a diario.",
  "04": "Ambición de escalar.",
};

export function DemoApplyCriteria() {
  return (
    <section id="criterios" className="border-b border-[var(--demo-line)]">
      <div className="container mx-auto px-4 py-8 sm:py-12 md:py-16">
        <h2 className="font-display text-lg font-extrabold uppercase tracking-tight sm:text-xl md:text-2xl">
          ¿Encaja tu startup?
        </h2>
        <ul className="mt-5 space-y-3 sm:mt-6">
          {DEMO_SIGNALS.map((signal) => (
            <li key={signal.n} className="flex items-start gap-2.5 sm:gap-3">
              <Check
                className="mt-0.5 size-4 shrink-0 text-[var(--demo-accent)]"
                aria-hidden
              />
              <span className="min-w-0 break-words text-sm text-[var(--demo-muted)] sm:text-base">
                <span className="font-medium text-[var(--demo-fg)]">
                  {signal.title}
                </span>
                {" — "}
                {SHORT_BODY[signal.n]}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
