"use client";

import { motion } from "motion/react";

export function BuildPitchAbout() {
  return (
    <section className="bg-background">
      <div className="container mx-auto px-4 py-20 sm:py-28">
        <div className="mx-auto max-w-3xl">
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.5 }}
            className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-green"
          >
            Qué es
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="mt-4 font-display text-3xl font-bold leading-tight tracking-tight sm:text-5xl"
          >
            Un programa de the502project para los founders más top de Guatemala.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, delay: 0.12 }}
            className="mt-6 text-base leading-relaxed text-foreground/70 sm:text-lg"
          >
            Build &amp; Pitch es un programa de the502project. Esta es la segunda
            edición: un solo día en Ciudad de Guatemala donde 20 de los founders
            y emprendedores más top del país trabajan en su startup junto a
            mentores y la presentan ante inversionistas.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, delay: 0.18 }}
            className="mt-5 text-base leading-relaxed text-foreground/70 sm:text-lg"
          >
            No es una conferencia ni un panel de speakers. Es un sprint de
            trabajo real: capacitación de Notion (y 3 meses de Notion + AI
            gratis), 5 mentores expertos que nos acompañan durante todo el día
            y, al final, un pitch ante inversionistas para recibir feedback que
            te ayude a crecer.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
