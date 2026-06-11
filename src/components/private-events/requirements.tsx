import { Check } from "lucide-react";
import type { PrivateEvent } from "@/lib/private-events";

type Props = { event: PrivateEvent };

export function PrivateEventRequirements({ event }: Props) {
  return (
    <section>
      <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
        ¿Es para ti?
      </h2>
      <ul className="mt-5 space-y-3.5">
        {event.requirements.map((item, i) => (
          <li key={i} className="flex items-start gap-3.5">
            <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-[color:var(--ws-accent)] text-white">
              <Check className="size-3.5" strokeWidth={3} />
            </span>
            <span className="text-base leading-relaxed sm:text-lg">{item}</span>
          </li>
        ))}
      </ul>
      <p className="mt-5 rounded-2xl bg-[color:var(--ws-accent-soft)] px-5 py-4 text-sm leading-relaxed text-[color:var(--ws-fg)] sm:text-base">
        Es un taller para principiantes: vienes a aprender desde cero, en un
        ambiente relajado y sin tecnicismos.
      </p>
    </section>
  );
}
