"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";

export function AiBuild1Invitation() {
  const t = useTranslations("AiBuild1");

  return (
    <section className="relative">
      <div className="container mx-auto px-4 py-20 sm:py-24 md:py-28">
        <div className="mx-auto max-w-2xl space-y-7 sm:space-y-8">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5 }}
            className="font-display text-2xl font-bold tracking-tight text-[color:var(--labs-fg)] sm:text-3xl"
          >
            {t("invitation_salutation")}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ delay: 0.05, duration: 0.6 }}
            className="text-base leading-relaxed text-[color:var(--labs-fg)]/85 sm:text-lg"
          >
            {t("invitation_p1")}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-base leading-relaxed text-[color:var(--labs-muted)] sm:text-lg"
          >
            {t("invitation_p2")}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ delay: 0.18, duration: 0.6 }}
            className="pt-4 font-display text-2xl font-bold leading-snug tracking-tight text-[color:var(--labs-fg)] sm:text-3xl md:text-4xl"
          >
            {t("outcome_p1")}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ delay: 0.24, duration: 0.6 }}
            className="text-base leading-relaxed text-[color:var(--labs-muted)] sm:text-lg"
          >
            {t("outcome_p2")}
          </motion.p>
        </div>
      </div>
    </section>
  );
}
