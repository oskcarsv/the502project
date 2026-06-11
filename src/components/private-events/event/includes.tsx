import {
  BookOpen,
  Clock,
  Coffee,
  Gift,
  LayoutTemplate,
  SquareParking,
  X,
} from "lucide-react";
import type { PerkIcon, PrivateEvent } from "@/lib/private-events";

const PERK_ICONS: Record<PerkIcon, typeof Coffee> = {
  clock: Clock,
  coffee: Coffee,
  parking: SquareParking,
  book: BookOpen,
  templates: LayoutTemplate,
};

type Props = { event: PrivateEvent };

export function PrivateEventIncludes({ event }: Props) {
  return (
    <section>
      <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
        Qué incluye
      </h2>

      <ul className="mt-5 grid gap-3 sm:grid-cols-2">
        {event.included.map((perk) => {
          const Icon = PERK_ICONS[perk.icon];
          return (
            <li
              key={perk.text}
              className="flex items-center gap-3.5 rounded-2xl bg-[color:var(--ws-elevated)] p-4 ring-1 ring-[color:var(--ws-line)]"
            >
              <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[color:var(--ws-accent-soft)] text-[color:var(--ws-accent)]">
                <Icon className="size-5" strokeWidth={2} />
              </span>
              <span className="text-sm leading-snug sm:text-[15px]">
                {perk.text}
              </span>
            </li>
          );
        })}

        <li className="flex items-center gap-3.5 rounded-2xl bg-[color:var(--ws-accent)] p-4 text-white">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white/20">
            <Gift className="size-5" strokeWidth={2} />
          </span>
          <span className="text-sm leading-snug sm:text-[15px]">
            <span className="font-semibold">Regalo de bienvenida:</span>{" "}
            {event.gift}
          </span>
        </li>
      </ul>

      {event.notIncluded.length > 0 ? (
        <p className="mt-4 flex items-center gap-2 text-sm text-[color:var(--ws-muted)]">
          <X className="size-4" strokeWidth={2.5} />
          No incluye: {event.notIncluded.join(" · ")}.
        </p>
      ) : null}
    </section>
  );
}
