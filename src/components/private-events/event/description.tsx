import { Check } from "lucide-react";
import type { PrivateEvent } from "@/lib/private-events";

type Props = { event: PrivateEvent };

export function PrivateEventDescription({ event }: Props) {
  return (
    <section>
      <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
        El taller
      </h2>
      <div className="mt-4 space-y-4">
        {event.description.map((paragraph, i) => (
          <p
            key={i}
            className="text-base leading-relaxed text-[color:var(--ws-muted)] sm:text-lg"
          >
            {paragraph}
          </p>
        ))}
      </div>

      <h3 className="mt-10 font-display text-xl font-bold tracking-tight sm:text-2xl">
        Qué vas a aprender
      </h3>
      <ul className="mt-5 grid gap-3 sm:grid-cols-2">
        {event.agenda.map((topic, i) => (
          <li
            key={i}
            className="flex items-start gap-3 rounded-2xl bg-[color:var(--ws-elevated)] p-4 ring-1 ring-[color:var(--ws-line)]"
          >
            <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-[color:var(--ws-accent-soft)] text-[color:var(--ws-accent)]">
              <Check className="size-3" strokeWidth={3} />
            </span>
            <span className="text-sm leading-relaxed sm:text-[15px]">
              {topic}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
