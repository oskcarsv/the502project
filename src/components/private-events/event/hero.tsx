import { PrivateEventsNav } from "@/components/private-events/nav";
import type { PrivateEvent } from "@/lib/private-events";

type Props = { event: PrivateEvent };

export function PrivateEventHero({ event }: Props) {
  return (
    <header className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[360px] bg-[radial-gradient(70%_100%_at_50%_0%,var(--ws-accent-soft),transparent_75%)]"
      />
      <PrivateEventsNav
        backHref="/workshops"
        backLabel="Workshops"
        showEmpresasLink
      />
      <div className="container mx-auto max-w-5xl px-4 pb-4 pt-12 sm:pt-16">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center rounded-full bg-[color:var(--ws-accent)] px-3.5 py-1.5 text-xs font-semibold text-white">
            Workshop presencial
          </span>
          <span className="inline-flex items-center rounded-full bg-[color:var(--ws-accent-soft)] px-3.5 py-1.5 text-xs font-semibold text-[color:var(--ws-accent)]">
            Para principiantes
          </span>
          <span className="inline-flex items-center rounded-full bg-[color:var(--ws-elevated)] px-3.5 py-1.5 text-xs font-medium text-[color:var(--ws-muted)] ring-1 ring-[color:var(--ws-line)]">
            Edición {event.edition}
          </span>
        </div>

        <h1 className="mt-6 max-w-3xl font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
          {event.title}
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-[color:var(--ws-muted)] sm:text-xl">
          {event.tagline}
        </p>

        <p className="mt-5 text-sm text-[color:var(--ws-muted)]">
          Facilita{" "}
          {event.facilitatorUrl ? (
            <a
              href={event.facilitatorUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-[color:var(--ws-fg)] underline decoration-[color:var(--ws-line)] underline-offset-4 transition-colors hover:text-[color:var(--ws-accent)] hover:decoration-[color:var(--ws-accent)]"
            >
              {event.facilitator}
            </a>
          ) : (
            <span className="font-semibold text-[color:var(--ws-fg)]">
              {event.facilitator}
            </span>
          )}{" "}
          · The 502 Project
        </p>
      </div>
    </header>
  );
}
