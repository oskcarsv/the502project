"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";

export function AiBuild1Facilitator() {
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
            {t("facilitator_eyebrow")}
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="mt-6 font-display text-4xl font-bold leading-tight tracking-tight text-[color:var(--labs-fg)] sm:text-5xl md:text-6xl"
          >
            {t("facilitator_name")}
          </motion.h2>

          <div className="mt-10 max-w-2xl space-y-4 text-base leading-relaxed text-[color:var(--labs-fg)]/80 sm:mt-12 sm:text-lg">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5 }}
            >
              {t("facilitator_credentials_1")}
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: 0.05 }}
            >
              {t("facilitator_credentials_2")}
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
}
