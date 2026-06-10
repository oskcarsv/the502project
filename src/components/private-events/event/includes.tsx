import { Check, Gift, X } from "lucide-react";
import { WorkshopLabel } from "@/components/private-events/label";
import type { PrivateEvent } from "@/lib/private-events";

type Props = { event: PrivateEvent };

export function PrivateEventIncludes({ event }: Props) {
  return (
    <section className="border-t border-[color:var(--ws-line)] bg-[color:var(--ws-elevated)]">
      <div className="container mx-auto max-w-3xl px-4 py-14 sm:py-16">
        <WorkshopLabel>Qué incluye</WorkshopLabel>

        <div className="mt-6 flex items-center gap-4 border border-[color:var(--ws-accent)]/40 bg-[color:var(--ws-accent)]/10 p-5 sm:p-6">
          <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-[color:var(--ws-accent)] text-[color:var(--ws-bg)]">
            <Gift className="size-5" />
          </span>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[color:var(--ws-accent)]">
              Regalo de bienvenida
            </p>
            <p className="mt-1 font-display text-lg font-bold text-[color:var(--ws-fg)] sm:text-xl">
              {event.gift}
            </p>
          </div>
        </div>

        <div className="mt-8 grid gap-8 sm:grid-cols-2 sm:gap-12">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[color:var(--ws-fg)]">
              Incluye
            </p>
            <ul className="mt-5 space-y-4">
              {event.included.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <Check
                    className="mt-1 size-4 shrink-0 text-[color:var(--ws-accent)]"
                    strokeWidth={2.5}
                  />
                  <span className="text-base leading-relaxed text-[color:var(--ws-fg)]">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[color:var(--ws-muted)]">
              No incluye
            </p>
            <ul className="mt-5 space-y-4">
              {event.notIncluded.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <X
                    className="mt-1 size-4 shrink-0 text-[color:var(--ws-muted)]"
                    strokeWidth={2.5}
                  />
                  <span className="text-base leading-relaxed text-[color:var(--ws-muted)]">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
