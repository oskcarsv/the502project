import { ArrowUpRight } from "lucide-react";
import type { PrivateEvent } from "@/lib/private-events";

type Props = { event: PrivateEvent };

export function PrivateEventCta({ event }: Props) {
  return (
    <section className="rounded-3xl bg-[color:var(--ws-fg)] p-7 text-[color:var(--ws-bg)] sm:p-9">
      <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
        <div>
          <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
            Reserva tu lugar
          </h2>
          <p className="mt-2 text-sm leading-relaxed opacity-80 sm:text-base">
            Cupo limitado a {event.capacity} personas · {event.priceLabel} por
            persona
          </p>
        </div>
        <a
          href={event.registrationUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-[color:var(--ws-accent)] px-7 text-sm font-semibold text-white transition-opacity hover:opacity-90"
        >
          Reservar mi lugar
          <ArrowUpRight className="size-4" />
        </a>
      </div>
    </section>
  );
}
