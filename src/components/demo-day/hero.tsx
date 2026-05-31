"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { DEMO_DAY } from "@/lib/demo-day";
import { BarrileteLink } from "./primitives";

const FACTS = [DEMO_DAY.dateLabel, DEMO_DAY.city, `${DEMO_DAY.spots} startups`];

const BIG = "block text-[clamp(3.5rem,15vw,14rem)]";
const SMALL =
  "block whitespace-nowrap text-[clamp(2rem,8.6vw,8rem)] text-[var(--demo-accent)]";

const LINES = [
  { t: "Pitchea", c: BIG },
  { t: "ante", c: BIG },
  { t: "inversionistas", c: SMALL },
] as const;

const EASE = [0.16, 1, 0.3, 1] as const;

function Cross({ className }: { className: string }) {
  return (
    <span
      aria-hidden
      className={`pointer-events-none absolute font-space text-sm text-[var(--demo-accent)] opacity-25 ${className}`}
    >
      +
    </span>
  );
}

export function DemoHero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y502 = useTransform(scrollYProgress, [0, 1], [0, -140]);
  const x502 = useTransform(scrollYProgress, [0, 1], [0, 80]);

  return (
    <section
      ref={ref}
      id="top"
      className="relative flex min-h-[92vh] flex-col justify-between overflow-hidden pt-7"
    >
      {/* Editorial scaffolding: faint blueprint hairlines + corner ticks. */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute left-4 top-0 hidden h-full w-px bg-[var(--demo-accent)]/10 sm:block" />
        <div className="absolute right-4 top-0 hidden h-full w-px bg-[var(--demo-accent)]/10 sm:block" />
        <div className="absolute inset-x-0 top-16 h-px bg-[var(--demo-accent)]/[0.07]" />
      </div>
      <Cross className="left-3 top-3" />
      <Cross className="right-3 top-3" />
      <Cross className="bottom-3 left-3" />
      <Cross className="bottom-3 right-3" />

      {/* Identity + mono annotations (no navbar). */}
      <div className="container relative mx-auto flex items-start justify-between px-4">
        <span className="font-display text-lg font-extrabold tracking-tight sm:text-xl">
          the<span className="text-[var(--demo-accent)]">502</span>project
        </span>
        <div className="text-right">
          <span className="block font-space text-[0.65rem] uppercase tracking-[0.2em] text-[var(--demo-muted)] sm:text-xs">
            Edición 01 · 27.06.2026
          </span>
          <span className="mt-1 block font-space text-[0.6rem] uppercase tracking-[0.18em] text-[var(--demo-muted)]/60">
            14.6349° N · 90.5069° W
          </span>
        </div>
      </div>

      {/* Layered depth: oversized outline word with scroll parallax. */}
      <motion.span
        aria-hidden
        style={{ y: y502, x: x502 }}
        className="demo-text-outline pointer-events-none absolute -right-[6vw] top-[20%] select-none font-display text-[30vw] font-extrabold uppercase leading-none tracking-[-0.04em] opacity-[0.1]"
      >
        502
      </motion.span>

      <div className="container relative mx-auto w-full px-4">
        <span className="mb-5 block font-space text-[0.65rem] uppercase tracking-[0.24em] text-[var(--demo-muted)]/70">
          01 / Hero
        </span>
        <h1 className="font-display font-extrabold uppercase leading-[0.82] tracking-[-0.045em]">
          {LINES.map((line, i) => (
            <span key={line.t} className="block overflow-hidden">
              <motion.span
                initial={{ y: "115%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.85, delay: 0.1 + i * 0.1, ease: EASE }}
                className={line.c}
              >
                {line.t}
              </motion.span>
            </span>
          ))}
        </h1>
      </div>

      <div className="relative border-t border-[var(--demo-line)]">
        <div className="container mx-auto flex flex-col gap-5 px-4 py-6 sm:flex-row sm:items-center sm:justify-between">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="flex flex-wrap items-center gap-x-3 gap-y-2"
          >
            <span className="inline-block bg-[var(--demo-accent)] px-3 py-1.5 font-space text-xs font-bold uppercase tracking-[0.14em] text-[var(--demo-bg)]">
              En colaboración con
            </span>
            <BarrileteLink className="font-display text-lg font-extrabold uppercase tracking-tight no-underline hover:text-[var(--demo-accent)] sm:text-2xl">
              Barrilete Ventures
            </BarrileteLink>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex flex-wrap items-center gap-x-6 gap-y-2"
          >
            {FACTS.map((fact) => (
              <span
                key={fact}
                className="flex items-center gap-2 font-space text-xs uppercase tracking-[0.14em] text-[var(--demo-muted)]"
              >
                <span className="size-1.5 bg-[var(--demo-accent)]" aria-hidden />
                {fact}
              </span>
            ))}
            <motion.span
              aria-hidden
              animate={{ y: [0, 4, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              className="font-space text-xs uppercase tracking-[0.2em] text-[var(--demo-accent)]"
            >
              scroll ↓
            </motion.span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
