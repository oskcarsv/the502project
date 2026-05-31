import { Fragment, type ReactNode } from "react";
import { DEMO_DAY, DEMO_DAY_FLOW } from "@/lib/demo-day";
import { BarrileteLink, Tag } from "./primitives";
import { Reveal } from "./reveal";

/** Linkify every "Barrilete Ventures" mention inside an agenda body string. */
function linkifyBarrilete(text: string): ReactNode {
  const parts = text.split("Barrilete Ventures");
  return parts.map((part, i) => (
    <Fragment key={i}>
      {part}
      {i < parts.length - 1 && <BarrileteLink>Barrilete Ventures</BarrileteLink>}
    </Fragment>
  ));
}

export function DemoDayFlow() {
  return (
    <section
      id="el-dia"
      className="border-b border-[var(--demo-line)] scroll-mt-16"
    >
      <div className="container mx-auto px-4 py-24 sm:py-32">
        <Reveal>
          <Tag>La agenda</Tag>
          <div className="mt-8 flex flex-wrap items-end justify-between gap-4">
            <h2 className="font-display text-[clamp(2rem,6vw,5rem)] font-extrabold uppercase leading-[0.9] tracking-[-0.03em]">
              Un día. Cuatro
              <br />
              movimientos.
            </h2>
            <span className="font-space text-xs uppercase tracking-[0.18em] text-[var(--demo-muted)]">
              {DEMO_DAY.dateLabel} · {DEMO_DAY.city}
            </span>
          </div>
        </Reveal>

        {/* Itinerary: time rail on the left, connected by a green line. */}
        <div className="mt-16 border-t border-[var(--demo-line)]">
          {DEMO_DAY_FLOW.map((step, i) => (
            <Reveal key={step.title} delay={i * 0.05}>
              <div className="group grid grid-cols-[auto_1fr] gap-x-5 border-b border-[var(--demo-line)] py-8 sm:grid-cols-[7rem_auto_1fr] sm:gap-x-10 sm:py-10">
                <span className="font-space text-xl font-bold tabular-nums text-[var(--demo-accent)] sm:text-2xl">
                  {step.time}
                </span>

                {/* Node + line rail (desktop). */}
                <div className="relative hidden sm:flex sm:justify-center">
                  <span className="absolute top-2 size-3 rounded-full bg-[var(--demo-accent)]" />
                  <span className="absolute top-2 h-[calc(100%+2.5rem)] w-px -translate-y-0 bg-[var(--demo-line)] group-last:hidden" />
                </div>

                <div className="col-span-1">
                  <div className="flex items-baseline gap-3">
                    <span className="font-space text-xs font-bold text-[var(--demo-muted)]">
                      0{i + 1}
                    </span>
                    <h3 className="font-display text-2xl font-extrabold uppercase tracking-tight sm:text-3xl">
                      {step.title}
                    </h3>
                  </div>
                  <p className="mt-3 max-w-xl leading-relaxed text-[var(--demo-muted)]">
                    {linkifyBarrilete(step.body)}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
