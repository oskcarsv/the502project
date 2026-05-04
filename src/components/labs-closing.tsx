"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";

export function LabsClosing() {
  const t = useTranslations("Labs");

  return (
    <section className="relative">
      <div className="container mx-auto px-4 pb-32 sm:pb-40 md:pb-48">
        <div className="mx-auto max-w-6xl">
          {/* Facilitators */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
            className="grid gap-8 border-t border-[color:var(--labs-line)] py-20 md:grid-cols-12 md:gap-12 md:py-28"
          >
            <div className="md:col-span-4">
              <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-brand-green">
                {t("facilitators_eyebrow")}
              </span>
            </div>
            <div className="md:col-span-8">
              <p className="font-editorial text-3xl leading-[1.25] tracking-[-0.01em] text-[color:var(--labs-fg)] sm:text-4xl md:text-[2.5rem]">
                {t("facilitators_body")}
              </p>
            </div>
          </motion.div>

          {/* Status */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6 }}
            className="grid gap-6 border-t border-[color:var(--labs-line)] pt-12 md:grid-cols-12 md:gap-12"
          >
            <div className="md:col-span-4">
              <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-[color:var(--labs-muted)]">
                {t("status_label")}
              </span>
            </div>
            <div className="md:col-span-8">
              <p className="max-w-2xl text-sm leading-relaxed text-[color:var(--labs-muted)] sm:text-base">
                {t("status_body")}
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom mark */}
      <div className="border-t border-[color:var(--labs-line)]">
        <div className="container mx-auto flex flex-col gap-2 px-4 py-10 font-mono text-[10px] uppercase tracking-[0.28em] text-[color:var(--labs-muted)] sm:flex-row sm:items-center sm:justify-between">
          <span>The 502 Project / Labs</span>
          <span>{t("hero_meta_left")} · {t("hero_meta_right")}</span>
        </div>
      </div>
    </section>
  );
}
