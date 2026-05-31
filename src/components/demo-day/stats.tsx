import { DEMO_DAY } from "@/lib/demo-day";
import { BarrileteLink } from "./primitives";
import { Reveal } from "./reveal";
import { CountUp } from "./count-up";

const CELLS = [
  {
    figure: String(DEMO_DAY.spots),
    label: "startups",
    sub: "seleccionadas a mano",
    link: false,
  },
  { figure: "1", label: "día", sub: "de trabajo real, no charlas", link: false },
  { figure: "1", label: "fondo", sub: "Barrilete Ventures", link: true },
] as const;

export function DemoStats() {
  return (
    <section className="bg-[var(--demo-accent)] text-[var(--demo-bg)]">
      <div className="container mx-auto px-4">
        <div className="grid border-t border-black/15 sm:grid-cols-3">
          {CELLS.map((cell, i) => {
            const n = Number(cell.figure);
            return (
              <Reveal
                key={cell.label}
                delay={i * 0.12}
                className="flex flex-col border-b border-black/15 py-12 sm:border-b-0 sm:border-l sm:py-20 sm:[&:first-child]:border-l-0 sm:[&]:px-8"
              >
                <span className="font-display text-[clamp(5rem,18vw,13rem)] font-extrabold uppercase leading-[0.78] tracking-[-0.05em]">
                  {Number.isFinite(n) ? <CountUp value={n} /> : cell.figure}
                </span>
                <span className="mt-5 font-display text-2xl font-extrabold uppercase tracking-tight sm:text-3xl">
                  {cell.label}
                </span>
                <span className="mt-2 font-space text-xs uppercase tracking-[0.14em] text-black/60">
                  {cell.link ? (
                    <BarrileteLink>{cell.sub}</BarrileteLink>
                  ) : (
                    cell.sub
                  )}
                </span>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
