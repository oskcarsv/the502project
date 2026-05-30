"use client";

import { motion } from "motion/react";
import { BuildPitchApplicationForm } from "@/components/build-pitch/application-form";

export function BuildPitchApply() {
  return (
    <section id="aplicar" className="scroll-mt-20 bg-background">
      <div className="container mx-auto px-4 py-20 sm:py-28">
        <div className="mx-auto max-w-3xl">
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.5 }}
            className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-green"
          >
            Aplica
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="mt-4 font-display text-3xl font-bold leading-tight tracking-tight sm:text-5xl"
          >
            Cuéntanos sobre tu startup.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, delay: 0.12 }}
            className="mt-6 max-w-xl text-base leading-relaxed text-foreground/70 sm:text-lg"
          >
            20 lugares, convocatoria abierta. Revisamos cada aplicación a mano.
            Sé concreto: lo que más pesa es tu producto.
          </motion.p>

          <div className="mt-12 sm:mt-16">
            <BuildPitchApplicationForm />
          </div>
        </div>
      </div>
    </section>
  );
}
