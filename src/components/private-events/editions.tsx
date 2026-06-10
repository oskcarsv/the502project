import { ArrowRight } from "lucide-react";
import { WorkshopLabel } from "@/components/private-events/label";
import { getAllPrivateEvents, type PrivateEvent } from "@/lib/private-events";

function formatDate(iso: string) {
  return new Date(`${iso}T12:00:00`).toLocaleDateString("es-GT", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function EditionCard({ event }: { event: PrivateEvent }) {
  return (
    <a
      href={`/workshops/${event.slug}`}
      className="group block bg-[color:var(--ws-elevated)] ring-1 ring-[color:var(--ws-line)] transition-[box-shadow,ring-color] hover:ring-[color:var(--ws-accent)]/50"
    >
      <div className="grid lg:grid-cols-[1.15fr_1fr]">
        <div className="flex flex-col justify-between gap-8 p-8 sm:p-10 lg:border-r lg:border-[color:var(--ws-line)]">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[color:var(--ws-muted)]">
              Edición {event.edition} · Grupo reducido
            </p>
            <h3 className="mt-5 font-display text-3xl font-bold leading-tight tracking-tight text-[color:var(--ws-fg)] sm:text-4xl">
              {event.title}
            </h3>
            <p className="mt-3 text-[color:var(--ws-muted)]">{event.tagline}</p>
          </div>
          <span className="inline-flex items-center gap-2 text-sm font-medium text-[color:var(--ws-fg)] transition-colors group-hover:text-[color:var(--ws-accent)]">
            Ver workshop
            <ArrowRight className="size-4" />
          </span>
        </div>
        <div className="flex flex-col justify-center gap-0 p-8 text-sm sm:p-10">
          <div className="flex justify-between gap-4 border-b border-[color:var(--ws-line)] py-4">
            <span className="text-[color:var(--ws-muted)]">Fecha</span>
            <span className="text-[color:var(--ws-fg)]">
              {formatDate(event.date)}
            </span>
          </div>
          <div className="flex justify-between gap-4 border-b border-[color:var(--ws-line)] py-4">
            <span className="text-[color:var(--ws-muted)]">Formato</span>
            <span className="text-right text-[color:var(--ws-fg)]">
              {event.format}
            </span>
          </div>
          <div className="flex justify-between gap-4 py-4">
            <span className="text-[color:var(--ws-muted)]">Inversión</span>
            <span className="font-display text-xl font-bold text-[color:var(--ws-accent)]">
              {event.priceLabel}
            </span>
          </div>
        </div>
      </div>
    </a>
  );
}

export function PrivateEventsEditions() {
  const events = getAllPrivateEvents().filter((e) => e.status === "upcoming");

  if (events.length === 0) return null;

  return (
    <section
      id="talleres"
      className="scroll-mt-16 border-t border-[color:var(--ws-line)]"
    >
      <div className="container mx-auto px-4 py-12 sm:py-16">
        <div className="mx-auto max-w-4xl">
          <WorkshopLabel>Workshops</WorkshopLabel>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-[color:var(--ws-fg)] sm:text-4xl md:text-5xl">
            Próximas ediciones
          </h2>
          <div className="mt-8 sm:mt-10">
            {events.map((event) => (
              <EditionCard key={event.slug} event={event} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
