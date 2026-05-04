"use client";

import { ArrowDown } from "lucide-react";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { LabsNav } from "@/components/labs-nav";

const TEASERS = [
  {
    num: "01",
    label: "open_label",
    teaser: "hero_open_teaser",
    action: "hero_open_action",
    target: "#formats",
  },
  {
    num: "02",
    label: "corporate_label",
    teaser: "hero_corporate_teaser",
    action: "hero_corporate_action",
    target: "#formats",
  },
] as const;

export function LabsHero() {
  const t = useTranslations("Labs");

  return (
    <div className="relative flex min-h-screen flex-col">
      <LabsNav />

      <main className="relative flex flex-1 flex-col">
        <div className="container mx-auto flex flex-1 flex-col px-4">
          <section className="flex flex-1 flex-col justify-center gap-12 py-12 sm:gap-16 sm:py-16 md:gap-20">
            {/* Title block */}
            <div className="flex flex-col">
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-green"
              >
                {t("eyebrow")}
              </motion.span>

              <motion.h1
                initial={{ filter: "blur(10px)", opacity: 0, y: 28 }}
                animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="mt-6 font-display text-6xl font-bold leading-[0.92] tracking-tight text-[color:var(--labs-fg)] sm:mt-8 sm:text-7xl md:text-8xl lg:text-9xl xl:text-[11rem]"
              >
                {t("title")}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="mt-8 max-w-3xl font-display text-2xl font-medium leading-tight tracking-tight text-[color:var(--labs-fg)]/85 sm:mt-12 sm:text-3xl md:text-4xl"
              >
                {t("subline")}
              </motion.p>
            </div>

            {/* Format teasers — give the hero density and clear next action */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.85, duration: 0.6 }}
              className="grid border-t border-[color:var(--labs-line)] md:grid-cols-2 md:divide-x md:divide-[color:var(--labs-line)]"
            >
              {TEASERS.map((teaser, idx) => (
                <a
                  key={teaser.num}
                  href={teaser.target}
                  className={`group flex flex-col gap-4 py-8 transition-colors hover:bg-white/[0.02] sm:py-10 ${
                    idx === 0 ? "md:pr-10" : "border-t border-[color:var(--labs-line)] md:border-t-0 md:pl-10"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs uppercase tracking-[0.18em] text-brand-green">
                      {teaser.num}
                    </span>
                    <span className="h-px w-8 bg-brand-green/60" />
                  </div>
                  <h3 className="font-display text-2xl font-bold tracking-tight text-[color:var(--labs-fg)] sm:text-3xl">
                    {t(teaser.label)}
                  </h3>
                  <p className="text-base leading-relaxed text-[color:var(--labs-muted)] sm:text-lg">
                    {t(teaser.teaser)}
                  </p>
                  <span className="mt-2 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-[color:var(--labs-fg)]/70 transition-colors group-hover:text-brand-green">
                    {t(teaser.action)}
                    <ArrowDown className="size-3.5 transition-transform group-hover:translate-y-0.5" />
                  </span>
                </a>
              ))}
            </motion.div>

            {/* Bottom meta strip */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1, duration: 0.6 }}
              className="flex flex-col gap-2 border-t border-[color:var(--labs-line)] pt-6 text-xs font-medium uppercase tracking-[0.18em] text-[color:var(--labs-muted)] sm:flex-row sm:items-center sm:justify-between"
            >
              <span>{t("hero_caption")}</span>
              <span>
                {t("hero_meta_left")} · {t("hero_meta_right")}
              </span>
            </motion.div>
          </section>
        </div>
      </main>
    </div>
  );
}
