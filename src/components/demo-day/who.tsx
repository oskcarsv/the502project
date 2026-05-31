import { DEMO_SIGNALS } from "@/lib/demo-day";
import { Tag } from "./primitives";
import { Reveal } from "./reveal";

export function DemoWho() {
  return (
    <section className="border-b border-[var(--demo-line)]">
      <div className="container mx-auto px-4 py-24 sm:py-32">
        <Reveal>
          <Tag>Para quién</Tag>
          <h2 className="mt-8 max-w-4xl font-display text-[clamp(2.25rem,7vw,6rem)] font-extrabold uppercase leading-[0.9] tracking-[-0.03em]">
            Para los que ya construyen.
            <br />
            <span className="text-[var(--demo-accent)]">No para ideas.</span>
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-x-12 sm:grid-cols-2">
          {DEMO_SIGNALS.map((signal, i) => (
            <Reveal
              key={signal.n}
              delay={i * 0.05}
              className="flex items-baseline gap-5 border-t border-[var(--demo-line)] py-7"
            >
              <span className="font-space text-sm font-bold text-[var(--demo-accent)]">
                {signal.n}
              </span>
              <div>
                <h3 className="font-display text-xl font-bold tracking-tight sm:text-2xl">
                  {signal.title}
                </h3>
                <p className="mt-2 text-[var(--demo-muted)]">{signal.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
