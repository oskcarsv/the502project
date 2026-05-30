"use client";

import { ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";

const PARTNERS = [
  {
    key: "notion",
    name: "Notion",
    role: "Patrocinador",
    desc: "Notion patrocina el programa y entrega 3 meses de Notion + AI a cada startup seleccionada.",
    url: "https://www.notion.com",
  },
  {
    key: "barrilete",
    name: "Barrilete Ventures",
    role: "Aliado · Edición 2",
    desc: "Barrilete Ventures acompaña esta edición: su equipo escucha los pitches finales y da feedback directo a las startups.",
    url: "https://www.barrilete.vc",
  },
];

export function BuildPitchPartners() {
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
            Quién lo hace posible
          </motion.span>

          <div className="mt-10 grid gap-5 sm:mt-14 md:grid-cols-2">
            {PARTNERS.map((p, i) => (
              <motion.a
                key={p.key}
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="group flex flex-col gap-5 rounded-2xl border border-foreground/10 bg-background p-8 transition-colors hover:border-brand-green/40 sm:p-10"
              >
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-foreground/50">
                  {p.role}
                </span>
                <span className="flex items-center gap-2 font-display text-3xl font-bold tracking-tight text-brand-dark sm:text-4xl">
                  {p.name}
                  <ArrowUpRight className="size-5 text-foreground/40 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-brand-green" />
                </span>
                <span className="text-base leading-relaxed text-foreground/65">
                  {p.desc}
                </span>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
