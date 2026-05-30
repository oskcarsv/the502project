"use client";

import { motion } from "motion/react";

const QUALITIES = [
  {
    lead: "Founders que ya están construyendo",
    rest: " algo real, no solo explorando ideas.",
  },
  {
    lead: "Obsesionados con el problema",
    rest: " que quieren resolver.",
  },
  {
    lead: "Con un producto en marcha",
    rest: " que puedan mostrar y trabajar ese día.",
  },
  {
    lead: "Con ambición real",
    rest: " de llevar su startup al siguiente nivel.",
  },
];

export function BuildPitchFilter() {
  return (
    <section className="bg-background">
      <div className="container mx-auto px-4 py-20 sm:py-28">
        <div className="mx-auto grid max-w-5xl gap-12 md:grid-cols-2 md:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-green">
              Para quién es
            </span>
            <h2 className="mt-4 font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl md:text-5xl">
              Para los que ya están construyendo.
            </h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-foreground/65 sm:text-lg">
              No buscamos curiosos. Buscamos a quienes ya están en la cancha:
              construyendo, resolviendo un problema y obsesionados con resolverlo.
            </p>
          </motion.div>

          <ul className="flex flex-col justify-center gap-7">
            {QUALITIES.map((q, i) => (
              <motion.li
                key={q.lead}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="flex gap-4 border-b border-foreground/10 pb-6 last:border-0 last:pb-0"
              >
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-brand-green" />
                <p className="text-lg leading-snug text-foreground/80 sm:text-xl">
                  <span className="font-semibold text-brand-dark">{q.lead}</span>
                  {q.rest}
                </p>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
