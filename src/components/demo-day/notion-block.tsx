import { DEMO_PARTNERS } from "@/lib/demo-day";
import { LogoSlot } from "./logo-slot";
import { Tag } from "./primitives";
import { Reveal } from "./reveal";

const NOTION = DEMO_PARTNERS.find((p) => p.id === "notion")!;
const CODEX = DEMO_PARTNERS.find((p) => p.id === "codex")!;

/** Same bounding box for square icons and wide wordmarks. */
const SPONSOR_LOGO_BOX = "h-14 w-32 sm:h-16 sm:w-40";

export function DemoNotionBlock({
  notionLogoSrc,
  codexLogoSrc,
}: {
  notionLogoSrc: string | null;
  codexLogoSrc: string | null;
}) {
  return (
    <section
      id="patrocinadores"
      className="bg-[var(--demo-accent)] text-[var(--demo-bg)] scroll-mt-16"
    >
      <div className="container mx-auto px-4 py-24 sm:py-32">
        <Reveal>
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-black/20 pb-6">
            <Tag tone="dark">Notion · Codex</Tag>
            <span className="font-space text-xs uppercase tracking-[0.18em] text-black/60">
              Patrocina el Demo Day
            </span>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-12 lg:grid-cols-[1fr_auto] lg:items-center sm:mt-16">
          <Reveal>
            <h2 className="font-display text-[clamp(2rem,6vw,5rem)] font-extrabold uppercase leading-[0.88] tracking-[-0.03em]">
              Construye como
              <br />
              los grandes.
            </h2>
            <p className="mt-8 flex items-center gap-3 font-display text-2xl font-bold tracking-tight sm:text-3xl">
              <span className="size-3 bg-[var(--demo-bg)]" aria-hidden />
              3 meses de Notion + AI
            </p>
            <p className="mt-3 max-w-md font-space text-xs uppercase tracking-[0.14em] text-black/60">
              Taller para arrancar y el stack con el que operan las mejores
              startups del mundo.
            </p>
            <p className="mt-6 flex items-center gap-3 font-display text-2xl font-bold tracking-tight sm:text-3xl">
              <span className="size-3 bg-[var(--demo-bg)]" aria-hidden />
              Créditos en Codex para las startups seleccionadas
            </p>
            <p className="mt-3 max-w-md font-space text-xs uppercase tracking-[0.14em] text-black/60">
              Taller para construir y shippear con agentes de Codex el día del
              Demo Day.
            </p>
          </Reveal>

          <Reveal
            delay={0.1}
            className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 lg:justify-end"
          >
            <a
              href={NOTION.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Notion"
              className="inline-flex transition-transform hover:-translate-y-1"
            >
              <LogoSlot
                partner={NOTION}
                src={notionLogoSrc}
                boxClassName={SPONSOR_LOGO_BOX}
              />
            </a>
            <a
              href={CODEX.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Codex"
              className="inline-flex transition-transform hover:-translate-y-1"
            >
              <LogoSlot
                partner={CODEX}
                src={codexLogoSrc}
                boxClassName={SPONSOR_LOGO_BOX}
              />
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
