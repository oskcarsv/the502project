import { WorkshopLabel } from "@/components/private-events/label";
import type { PrivateEvent } from "@/lib/private-events";

type Props = { event: PrivateEvent };

export function PrivateEventDescription({ event }: Props) {
  return (
    <section className="border-t border-[color:var(--ws-line)]">
      <div className="container mx-auto max-w-3xl px-4 py-14 sm:py-16">
        <WorkshopLabel>El taller</WorkshopLabel>
        <div className="mt-5 space-y-4">
          {event.description.map((paragraph, i) => (
            <p
              key={i}
              className="text-lg leading-relaxed text-[color:var(--ws-fg)]/90"
            >
              {paragraph}
            </p>
          ))}
        </div>

        <div className="mt-10 border-t border-[color:var(--ws-line)] pt-8">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[color:var(--ws-fg)]">
            Qué vas a aprender
          </p>
          <ul className="mt-5 grid gap-x-8 gap-y-3 sm:grid-cols-2">
            {event.agenda.map((topic, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-[color:var(--ws-accent)]" />
                <span className="text-sm leading-relaxed text-[color:var(--ws-muted)] sm:text-base">
                  {topic}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
