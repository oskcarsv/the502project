import { WorkshopLabel } from "@/components/private-events/label";
import type { PrivateEvent } from "@/lib/private-events";

type Props = { event: PrivateEvent };

export function PrivateEventOutcome({ event }: Props) {
  return (
    <section className="border-t border-[color:var(--ws-line)]">
      <div className="container mx-auto max-w-3xl px-4 py-14 sm:py-16">
        <WorkshopLabel>Qué te llevas</WorkshopLabel>
        <div className="mt-6 space-y-5">
          {event.outcomes.map((item, i) => (
            <p
              key={i}
              className="border-l-2 border-[color:var(--ws-accent)] pl-5 font-display text-xl font-semibold leading-snug tracking-tight text-[color:var(--ws-fg)] sm:text-2xl"
            >
              {item}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
