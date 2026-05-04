"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";

export function AiBuild1WhyYou() {
  const t = useTranslations("AiBuild1");

  return (
    <section className="relative border-t border-[color:var(--labs-line)]">
      <div className="container mx-auto px-4 py-20 sm:py-24 md:py-28">
        <div className="mx-auto max-w-5xl">
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.5 }}
            className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-green"
          >
            {t("why_you_eyebrow")}
          </motion.span>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="mt-6 max-w-3xl font-display text-3xl font-bold leading-tight tracking-tight text-[color:var(--labs-fg)] sm:mt-8 sm:text-4xl md:text-5xl"
          >
            {t("why_you_p1")}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, delay: 0.18 }}
            className="mt-8 max-w-2xl text-base leading-relaxed text-[color:var(--labs-muted)] sm:text-lg md:text-xl"
          >
            {t("why_you_p2")}
          </motion.p>
        </div>
      </div>
    </section>
  );
}
