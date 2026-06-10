import { ArrowUpRight } from "lucide-react";
import { PrivateEventsNav } from "@/components/private-events/nav";
import type { PrivateEvent } from "@/lib/private-events";

function formatDate(iso: string) {
  return new Date(`${iso}T12:00:00`).toLocaleDateString("es-GT", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function formatHour(hhmm: string): string {
  const [h, m] = hhmm.split(":").map(Number);
  const display = h % 12 === 0 ? 12 : h % 12;
  const period = h >= 12 ? "PM" : "AM";
  return m ? `${display}:${String(m).padStart(2, "0")} ${period}` : `${display} ${period}`;
}

function formatTimeRange(event: PrivateEvent): string {
  if (!event.endTime) return formatHour(event.time);
  return `${formatHour(event.time)} a ${formatHour(event.endTime)}`;
}

type Props = { event: PrivateEvent };

export function PrivateEventHero({ event }: Props) {
  const facts: { label: string; value: string; accent?: boolean }[] = [
    { label: "Fecha", value: formatDate(event.date) },
    { label: "Lugar", value: event.location },
    { label: "Horario", value: formatTimeRange(event) },
    { label: "Inversión", value: event.priceLabel, accent: true },
  ];

  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[420px] bg-[radial-gradient(60%_100%_at_50%_0%,color-mix(in_srgb,var(--ws-accent)_14%,transparent),transparent_70%)]"
      />
      <PrivateEventsNav
        backHref="/workshops"
        backLabel="Volver a workshops"
        showEmpresasLink
      />
      <div className="container mx-auto px-4 pb-12 pt-16 sm:pb-16 sm:pt-24">
        <div className="mx-auto max-w-3xl">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="inline-flex items-center gap-2 border border-[color:var(--ws-line)] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-[color:var(--ws-muted)]">
              Edición {event.edition}
            </span>
            <span className="inline-flex items-center gap-2 border border-[color:var(--ws-accent)]/40 bg-[color:var(--ws-accent)]/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-[color:var(--ws-accent)]">
              {event.level}
            </span>
            <span className="inline-flex items-center gap-2 border border-[color:var(--ws-line)] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-[color:var(--ws-muted)]">
              Cupo limitado
            </span>
          </div>

          <h1 className="mt-7 font-display text-4xl font-bold leading-[1.05] tracking-tight text-[color:var(--ws-fg)] sm:text-5xl md:text-6xl">
            {event.title}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[color:var(--ws-muted)] sm:text-xl">
            {event.tagline}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[10px] uppercase tracking-[0.18em] text-[color:var(--ws-muted)]">
            <span>{event.format}</span>
            <span className="text-[color:var(--ws-line)]">/</span>
            <span>
              Facilita:{" "}
              {event.facilitatorUrl ? (
                <a
                  href={event.facilitatorUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[color:var(--ws-fg)] underline decoration-[color:var(--ws-line)] underline-offset-4 transition-colors hover:text-[color:var(--ws-accent)] hover:decoration-[color:var(--ws-accent)]"
                >
                  {event.facilitator}
                </a>
              ) : (
                event.facilitator
              )}
            </span>
          </div>

          <div className="mt-7">
            <a
              href={event.registrationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 border border-[color:var(--ws-accent)]/40 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-[color:var(--ws-accent)] transition-colors hover:bg-[color:var(--ws-accent)]/10"
            >
              Pagar ahora · {event.priceLabel}
              <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>

        <dl className="mx-auto mt-12 grid max-w-3xl grid-cols-2 gap-px overflow-hidden border border-[color:var(--ws-line)] bg-[color:var(--ws-line)] sm:grid-cols-4">
          {facts.map((fact) => (
            <div
              key={fact.label}
              className="bg-[color:var(--ws-elevated)] px-5 py-6"
            >
              <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-[color:var(--ws-muted)]">
                {fact.label}
              </dt>
              <dd
                className={`mt-2 text-sm font-medium sm:text-base ${
                  fact.accent
                    ? "font-display text-xl font-bold text-[color:var(--ws-accent)] sm:text-2xl"
                    : "text-[color:var(--ws-fg)]"
                }`}
              >
                {fact.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
