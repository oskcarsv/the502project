"use client";

import { ArrowRight, ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";
import { BUILD_PITCH } from "@/lib/build-pitch";

export function BuildPitchClosing() {
  return (
    <section className="bg-background">
      <div className="container mx-auto px-4 py-20 sm:py-28">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl bg-brand-dark px-6 py-16 text-center text-white sm:px-12 sm:py-20 lg:px-20 lg:py-24"
        >
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <div className="absolute left-1/2 top-0 h-[400px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-green/15 blur-[120px]" />
          </div>

          <div className="relative">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-green">
              Build &amp; Pitch #2
            </p>
            <h2 className="mt-4 font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
              ¿Listo para construir y presentar?
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg">
              Programa gratuito y abierto de the502project. 20 lugares para las
              startups de Guatemala que ya están construyendo.
            </p>

            <div className="mt-10 flex flex-col items-center gap-6 sm:mt-12 sm:flex-row sm:justify-center">
              <a
                href="#aplicar"
                className="inline-flex h-14 items-center gap-2 rounded-md bg-brand-green px-9 text-lg font-semibold text-brand-dark transition-colors hover:bg-brand-green/85"
              >
                Aplicar
                <ArrowRight className="size-4" />
              </a>
              <a
                href={BUILD_PITCH.communityUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-14 items-center gap-2 rounded-md border border-white/15 px-7 text-lg font-semibold text-white transition-colors hover:border-brand-green hover:text-brand-green"
              >
                Únete a la comunidad
                <ArrowUpRight className="size-4" />
              </a>
            </div>

            <a
              href={BUILD_PITCH.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 text-sm text-white/55 transition-colors hover:text-brand-green"
            >
              ¿Dudas antes de aplicar? Escríbenos por WhatsApp
              <ArrowUpRight className="size-3.5" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
