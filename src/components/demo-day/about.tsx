import { BarrileteLink, Tag } from "./primitives";
import { Reveal } from "./reveal";

export function DemoAbout() {
  return (
    <section id="que-es" className="border-b border-[var(--demo-line)] scroll-mt-16">
      <div className="container mx-auto px-4 py-24 sm:py-32">
        <Reveal>
          <Tag>Qué es</Tag>
        </Reveal>

        <Reveal delay={0.05}>
          <h2 className="mt-8 font-display text-[clamp(2.25rem,7vw,6rem)] font-extrabold uppercase leading-[0.92] tracking-[-0.03em]">
            No es una conferencia.
            <br />
            No es un panel.
            <br />
            <span className="text-[var(--demo-accent)]">Es un Demo Day.</span>
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mt-10 max-w-3xl font-display text-2xl font-bold leading-[1.15] tracking-tight sm:text-4xl">
            El día en que presentas tu empresa y tu tracción en vivo ante un
            fondo, y se{" "}
            <span className="text-[var(--demo-accent)]">
              abre la conversación de inversión.
            </span>
          </p>
        </Reveal>

        <div className="mt-12 grid gap-8 border-t border-[var(--demo-line)] pt-10 sm:grid-cols-2">
          <Reveal delay={0.1}>
            <p className="text-lg leading-relaxed text-[var(--demo-muted)]">
              Las startups seleccionadas pasan el día trabajando codo a codo
              con mentores y herramientas. Nada de charlas ni show: founders
              construyendo, con foco total.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="text-lg leading-relaxed text-[var(--demo-fg)]">
              Y al cierre, lo que importa: pitcheas en vivo ante{" "}
              <BarrileteLink>Barrilete Ventures</BarrileteLink>, el fondo que
              busca invertir en lo que se construye en Guatemala. Sin premios de
              adorno.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
