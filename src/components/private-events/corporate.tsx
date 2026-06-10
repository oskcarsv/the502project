import { WorkshopLabel } from "@/components/private-events/label";
import { PrivateEventsCalTrigger } from "@/components/private-events/cal-trigger";

export function PrivateEventsCorporate() {
  return (
    <section
      id="empresas"
      className="scroll-mt-16 border-t-2 border-[color:var(--ws-accent)]/40 bg-[color:var(--ws-elevated)]"
    >
      <div className="container mx-auto px-4 py-16 sm:py-20">
        <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-16">
          <div>
            <WorkshopLabel>Para empresas</WorkshopLabel>
            <h2 className="mt-4 font-display text-3xl font-bold leading-[1.08] tracking-tight text-[color:var(--ws-fg)] sm:text-4xl md:text-5xl">
              ¿Workshop en tu empresa o uno hecho a tu medida?
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-[color:var(--ws-muted)]">
              Llevamos este formato a tu equipo o diseñamos un workshop privado
              según tus objetivos en AI, producto y construcción.
            </p>
            <ul className="mt-8 space-y-3 text-base text-[color:var(--ws-fg)] sm:text-lg">
              <li className="flex gap-3">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-[color:var(--ws-accent)]" />
                Mismo estándar de facilitación y hands-on, en tu sede o la
                nuestra.
              </li>
              <li className="flex gap-3">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-[color:var(--ws-accent)]" />
                Roadmap y contenido adaptados a tu equipo. No es un workshop
                genérico.
              </li>
            </ul>
          </div>
          <div className="flex flex-col gap-4 lg:items-end lg:pb-1">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[color:var(--ws-muted)] lg:text-right">
              15 min · sin compromiso
            </p>
            <PrivateEventsCalTrigger className="w-full sm:w-auto lg:min-w-[240px]">
              Agendar conversación
            </PrivateEventsCalTrigger>
          </div>
        </div>
      </div>
    </section>
  );
}
