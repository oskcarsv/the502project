import Link from "next/link";
import { ArrowRight, CalendarDays, Clock, MapPin } from "lucide-react";
import { getAllPrivateEvents, type PrivateEvent } from "@/lib/private-events";

function formatDate(iso: string) {
  return new Date(`${iso}T12:00:00`).toLocaleDateString("es-GT", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function formatHour(hhmm: string): string {
  const [h, m] = hhmm.split(":").map(Number);
  const display = h % 12 === 0 ? 12 : h % 12;
  const period = h >= 12 ? "PM" : "AM";
  return m ? `${display}:${String(m).padStart(2, "0")} ${period}` : `${display} ${period}`;
}

function EditionCard({ event }: { event: PrivateEvent }) {
  const details = [
    { icon: CalendarDays, value: formatDate(event.date) },
    {
      icon: Clock,
      value: event.endTime
        ? `${formatHour(event.time)} a ${formatHour(event.endTime)}`
        : formatHour(event.time),
    },
    { icon: MapPin, value: event.location },
  ];

  return (
    <Link
      href={`/workshops/${event.slug}`}
      className="group block overflow-hidden rounded-3xl bg-[color:var(--ws-elevated)] ring-1 ring-[color:var(--ws-line)] transition-shadow hover:shadow-[0_16px_40px_-16px_rgba(32,42,36,0.2)]"
    >
      <div className="p-7 sm:p-9">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center rounded-full bg-[color:var(--ws-accent-soft)] px-3 py-1 text-xs font-semibold text-[color:var(--ws-accent)]">
            Edición {event.edition}
          </span>
          <span className="inline-flex items-center rounded-full bg-[color:var(--ws-bg)] px-3 py-1 text-xs font-medium text-[color:var(--ws-muted)] ring-1 ring-[color:var(--ws-line)]">
            {event.level}
          </span>
        </div>

        <h3 className="mt-4 font-display text-2xl font-bold leading-tight tracking-tight sm:text-3xl">
          {event.title}
        </h3>
        <p className="mt-2 max-w-2xl text-[color:var(--ws-muted)]">
          {event.tagline}
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2.5 text-sm text-[color:var(--ws-muted)]">
          {details.map((d, i) => (
            <span key={i} className="inline-flex items-center gap-2">
              <d.icon className="size-4 text-[color:var(--ws-accent)]" />
              {d.value}
            </span>
          ))}
        </div>

        <div className="mt-7 flex items-center justify-between border-t border-[color:var(--ws-line)] pt-5">
          <span className="font-display text-2xl font-bold">
            {event.priceLabel}
            <span className="ml-1.5 text-sm font-normal text-[color:var(--ws-muted)]">
              por persona
            </span>
          </span>
          <span className="inline-flex items-center gap-2 text-sm font-semibold text-[color:var(--ws-accent)] transition-transform group-hover:translate-x-0.5">
            Ver workshop
            <ArrowRight className="size-4" />
          </span>
        </div>
      </div>
    </Link>
  );
}

export function PrivateEventsEditions() {
  const events = getAllPrivateEvents().filter((e) => e.status === "upcoming");

  if (events.length === 0) return null;

  return (
    <section id="talleres" className="scroll-mt-16">
      <div className="container mx-auto max-w-5xl px-4 py-10 sm:py-12">
        <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
          Próximos workshops
        </h2>
        <div className="mt-6 space-y-6 sm:mt-8">
          {events.map((event) => (
            <EditionCard key={event.slug} event={event} />
          ))}
        </div>
      </div>
    </section>
  );
}
