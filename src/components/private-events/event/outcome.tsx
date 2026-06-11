import type { PrivateEvent } from "@/lib/private-events";

type Props = { event: PrivateEvent };

export function PrivateEventOutcome({ event }: Props) {
  return (
    <section>
      <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
        Qué te llevas
      </h2>
      <div className="mt-5 space-y-4">
        {event.outcomes.map((item, i) => (
          <p
            key={i}
            className="rounded-2xl border-l-4 border-[color:var(--ws-accent)] bg-[color:var(--ws-elevated)] px-5 py-4 text-base font-medium leading-relaxed ring-1 ring-[color:var(--ws-line)] sm:text-lg"
          >
            {item}
          </p>
        ))}
      </div>
    </section>
  );
}
