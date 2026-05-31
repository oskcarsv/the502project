import { DEMO_PARTNERS } from "@/lib/demo-day";
import { LogoSlot } from "./logo-slot";
import { Tag } from "./primitives";
import { Reveal } from "./reveal";

const NOTION = DEMO_PARTNERS.find((p) => p.id === "notion")!;

export function DemoNotionBlock({ logoSrc }: { logoSrc: string | null }) {
  return (
    <section
      id="notion"
      className="bg-[var(--demo-accent)] text-[var(--demo-bg)] scroll-mt-16"
    >
      <div className="container mx-auto px-4 py-24 sm:py-32">
        <Reveal>
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-black/20 pb-6">
            <Tag tone="dark">Powered by Notion</Tag>
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
          </Reveal>

          <Reveal delay={0.1} className="flex justify-center lg:justify-end">
            <a
              href={NOTION.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Notion"
              className="inline-block transition-transform hover:-translate-y-1"
            >
              <LogoSlot
                partner={NOTION}
                src={logoSrc}
                className="h-14 w-auto sm:h-24"
              />
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
