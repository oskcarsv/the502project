import {
  ArrowUpRight,
  CalendarDays,
  Clock,
  MapPin,
  Users,
} from "lucide-react";
import type { PrivateEvent } from "@/lib/private-events";

function formatDate(iso: string) {
  const text = new Date(`${iso}T12:00:00`).toLocaleDateString("es-GT", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function formatHour(hhmm: string): string {
  const [h, m] = hhmm.split(":").map(Number);
  const display = h % 12 === 0 ? 12 : h % 12;
  const period = h >= 12 ? "PM" : "AM";
  return m ? `${display}:${String(m).padStart(2, "0")} ${period}` : `${display}:00 ${period}`;
}

type Props = { event: PrivateEvent };

export function PrivateEventCard({ event }: Props) {
  const rows = [
    { icon: CalendarDays, label: "Fecha", value: formatDate(event.date) },
    {
      icon: Clock,
      label: "Horario",
      value: event.endTime
        ? `${formatHour(event.time)} a ${formatHour(event.endTime)}`
        : formatHour(event.time),
    },
    { icon: MapPin, label: "Lugar", value: event.location },
    {
      icon: Users,
      label: "Cupo",
      value: `${event.capacity} lugares · grupo reducido`,
    },
  ];

  return (
    <div className="rounded-3xl bg-[color:var(--ws-elevated)] p-6 shadow-[0_1px_2px_rgba(32,42,36,0.06),0_16px_40px_-16px_rgba(32,42,36,0.18)] ring-1 ring-[color:var(--ws-line)] sm:p-7">
      <ul className="space-y-4">
        {rows.map((row) => (
          <li key={row.label} className="flex items-start gap-3.5">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[color:var(--ws-accent-soft)] text-[color:var(--ws-accent)]">
              <row.icon className="size-5" strokeWidth={2} />
            </span>
            <div className="min-w-0">
              <p className="text-xs font-medium text-[color:var(--ws-muted)]">
                {row.label}
              </p>
              <p className="text-sm font-semibold leading-snug sm:text-[15px]">
                {row.value}
              </p>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-6 flex items-baseline justify-between border-t border-[color:var(--ws-line)] pt-5">
        <span className="font-display text-4xl font-bold text-[color:var(--ws-fg)]">
          {event.priceLabel}
        </span>
        <span className="text-sm text-[color:var(--ws-muted)]">por persona</span>
      </div>

      <a
        href={event.registrationUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[color:var(--ws-accent)] text-sm font-semibold text-white transition-opacity hover:opacity-90"
      >
        Reservar mi lugar
        <ArrowUpRight className="size-4" />
      </a>

      <p className="mt-4 text-center text-xs leading-relaxed text-[color:var(--ws-muted)]">
        Incluye coffee break, parqueo y material didáctico.
        <br />
        Al confirmar tu pago te enviamos los detalles por correo.
      </p>
    </div>
  );
}
