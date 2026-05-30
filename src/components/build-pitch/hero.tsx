"use client";

import { ArrowRight, ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";
import { Navbar } from "@/components/navbar";
import { BUILD_PITCH } from "@/lib/build-pitch";

const TITLE = "Construye y presenta tu startup.";

const FIELDS = [
  { label: "Fecha", value: "Sábado 20 de junio, 2026" },
  { label: "Lugar", value: "Ciudad de Guatemala" },
  { label: "Cupo", value: "20 startups" },
] as const;

export function BuildPitchHero() {
  const titleWords = TITLE.split(" ");

  return (
    <div className="relative overflow-hidden bg-background">
      <div
        className="bp-glow pointer-events-none absolute inset-x-0 top-0 h-[520px]"
        aria-hidden
      />

      <div className="container relative mx-auto px-4">
        <Navbar showLanguageSwitcher={false} />

        <section className="py-12 text-center sm:py-16 md:py-20">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-green"
          >
            Build &amp; Pitch #2 · Un programa de the502project
          </motion.p>

          <motion.h1
            initial={{ filter: "blur(10px)", opacity: 0, y: 30 }}
            animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mx-auto mt-6 max-w-5xl font-display text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl"
          >
            {titleWords.map((word, i) => (
              <motion.span
                key={`${word}-${i}`}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 + i * 0.1, duration: 0.6 }}
                className="mx-1.5 inline-block md:mx-2.5"
              >
                {word}
              </motion.span>
            ))}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="mx-auto mt-8 max-w-3xl text-lg leading-relaxed text-foreground/70 sm:text-xl"
          >
            Un programa de the502project para los founders y emprendedores más
            top de Guatemala. Un día de sprint con 5 mentores expertos,
            capacitación de Notion y un pitch ante inversionistas.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.95, duration: 0.6 }}
            className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
          >
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
              className="inline-flex h-14 items-center gap-2 rounded-md border border-foreground/15 px-7 text-lg font-semibold text-brand-dark transition-colors hover:border-brand-green hover:bg-brand-green/10"
            >
              Únete a la comunidad
              <ArrowUpRight className="size-4" />
            </a>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.15, duration: 0.6 }}
            className="mt-6 text-sm text-foreground/55"
          >
            Un programa by the502project
          </motion.p>

          <motion.dl
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 border-t border-foreground/10 pt-10 sm:mt-20 sm:grid-cols-3"
          >
            {FIELDS.map((f) => (
              <div key={f.label} className="flex flex-col gap-1.5 text-left sm:text-center">
                <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-foreground/50">
                  {f.label}
                </dt>
                <dd className="font-display text-lg font-bold tracking-tight text-brand-dark">
                  {f.value}
                </dd>
              </div>
            ))}
          </motion.dl>
        </section>
      </div>
    </div>
  );
}
