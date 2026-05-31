import { DEMO_PARTNERS } from "@/lib/demo-day";
import { LogoSlot } from "./logo-slot";
import { BarrileteLink, Tag } from "./primitives";
import { Reveal } from "./reveal";

const BARRILETE = DEMO_PARTNERS.find((p) => p.id === "barrilete")!;

export function DemoBarrilete({ logoSrc }: { logoSrc: string | null }) {
  return (
    <section
      id="inversionistas"
      className="flex min-h-screen flex-col justify-center overflow-hidden bg-[var(--demo-accent)] text-[var(--demo-bg)] scroll-mt-16"
    >
      <div className="container mx-auto w-full px-4 py-20">
        {/* Label row: clear top anchor for the whole block. */}
        <Reveal>
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-black/20 pb-6">
            <Tag tone="dark">En colaboración con</Tag>
            <span className="font-space text-xs uppercase tracking-[0.18em] text-black/60">
              Ante quién pitcheas · Edición 01
            </span>
          </div>
        </Reveal>

        {/* Dominant headline. */}
        <Reveal delay={0.05}>
          <h2 className="mt-12 font-display text-[clamp(2.5rem,9vw,8.5rem)] font-extrabold uppercase leading-[0.82] tracking-[-0.045em] sm:mt-16">
            El primer fondo ángel
            <br />
            de Guatemala.
          </h2>
        </Reveal>

        {/* Two columns: logo | description (stacks on mobile). */}
        <div className="mt-16 grid gap-10 border-t border-black/20 pt-12 lg:grid-cols-2 lg:items-center lg:gap-16 sm:mt-20">
          <Reveal>
            <a
              href={BARRILETE.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Barrilete Ventures"
              className="inline-block transition-transform hover:-translate-y-1"
            >
              <LogoSlot
                partner={BARRILETE}
                src={logoSrc}
                className="h-20 w-auto sm:h-32 lg:h-40"
              />
            </a>
          </Reveal>

          <Reveal delay={0.08}>
            <p className="text-xl font-medium leading-relaxed sm:text-2xl">
              Fondo ángel de capital de riesgo: inversión, mentoría y
              orientación estratégica para emprendedores en etapa temprana.
            </p>
            <p className="mt-6 font-space text-xs uppercase tracking-[0.16em] text-black/60">
              Edición 1, exclusivamente con{" "}
              <BarrileteLink>Barrilete Ventures</BarrileteLink>.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
