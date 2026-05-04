"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";

export function LabsProblem() {
  const t = useTranslations("Labs");

  return (
    <section className="relative">
      <div className="container mx-auto px-4 py-24 sm:py-32 md:py-40">
        <div className="mx-auto max-w-3xl">
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.5 }}
            className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-green"
          >
            {t("problem_eyebrow")}
          </motion.span>

          <div className="mt-10 space-y-7 font-display text-2xl font-medium leading-snug tracking-tight text-[color:var(--labs-fg)] sm:text-3xl md:text-4xl">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6 }}
            >
              {t("problem_p1")}
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="text-[color:var(--labs-muted)]"
            >
              {t("problem_p2")}
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-brand-green"
            >
              {t("problem_p3")}
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
}
