"use client";

import { Check } from "lucide-react";
import { motion } from "motion/react";

const ITEMS = [
  "Capacitación de Notion para ordenar tu startup",
  "3 meses de Notion + AI gratis",
  "5 mentores expertos (founders, CEOs, CTOs) que te ayudan a validar negocio, tecnología y producto",
  "Acompañamiento durante todo el día",
  "Comida y bebidas durante el evento",
  "Pitch y feedback directo ante inversionistas",
];

export function BuildPitchBenefits() {
  return (
    <section className="bg-background">
      <div className="container mx-auto px-4 py-20 sm:py-28">
        <div className="mx-auto max-w-5xl">
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.5 }}
            className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-green"
          >
            Qué te llevas
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="mt-4 font-display text-3xl font-bold leading-tight tracking-tight sm:text-5xl"
          >
            Todo incluido para los seleccionados.
          </motion.h2>

          <div className="mt-12 grid gap-4 sm:mt-16 sm:grid-cols-2 sm:gap-5">
            {ITEMS.map((item, i) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="flex items-center gap-4 rounded-2xl border border-foreground/10 bg-background p-5 sm:p-6"
              >
                <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-brand-green/15">
                  <Check className="size-5 text-brand-green" strokeWidth={2.5} />
                </div>
                <span className="text-base leading-relaxed text-foreground/80">
                  {item}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
