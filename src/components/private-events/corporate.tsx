import { PrivateEventsCalTrigger } from "@/components/private-events/cal-trigger";

export function PrivateEventsCorporate() {
  return (
    <section id="empresas" className="scroll-mt-16">
      <div className="container mx-auto max-w-5xl px-4 pb-16 sm:pb-20">
        <div className="flex flex-col items-start justify-between gap-6 rounded-3xl bg-[color:var(--ws-elevated)] p-7 ring-1 ring-[color:var(--ws-line)] sm:flex-row sm:items-center sm:p-9">
          <div>
            <h2 className="font-display text-xl font-bold tracking-tight sm:text-2xl">
              ¿Lo quieres para tu empresa?
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-[color:var(--ws-muted)] sm:text-base">
              Llevamos este workshop a tu equipo o diseñamos uno a tu medida.
              Agenda una llamada de 15 minutos, sin compromiso.
            </p>
          </div>
          <PrivateEventsCalTrigger className="w-full shrink-0 sm:w-auto">
            Agendar llamada
          </PrivateEventsCalTrigger>
        </div>
      </div>
    </section>
  );
}
