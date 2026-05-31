"use client";

import { ArrowRight, ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";
import { DEMO_DAY } from "@/lib/demo-day";

export function DemoClosing() {
  return (
    <section
      id="aplicar"
      className="bg-[var(--demo-accent)] text-[var(--demo-bg)] scroll-mt-16"
    >
      <div className="container mx-auto px-4 py-28 sm:py-40">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <span className="font-space text-xs font-bold uppercase tracking-[0.18em]">
            Solo {DEMO_DAY.spots} plazas · revisamos cada aplicación cuidadosamente
          </span>

          <h2 className="mt-8 font-display text-[clamp(3rem,12vw,11rem)] font-extrabold uppercase leading-[0.82] tracking-[-0.045em]">
            ¿Ya construyes?
            <br />
            Demuéstralo.
          </h2>

          <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center">
            <a
              href={DEMO_DAY.applyUrl}
              className="group inline-flex items-center justify-center gap-2 bg-[var(--demo-bg)] px-9 py-5 text-base font-bold uppercase tracking-wide text-[var(--demo-accent)] transition-transform hover:-translate-y-0.5"
            >
              Aplicar ahora
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href={DEMO_DAY.communityUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 border border-black/30 px-8 py-5 text-base font-bold uppercase tracking-wide transition-colors hover:bg-black/5"
            >
              ¿Dudas? Escríbenos
              <ArrowUpRight className="size-4" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
