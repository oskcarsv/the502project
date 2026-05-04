"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";

const ITEMS = [1, 2, 3] as const;

export function AiBuild1Transformation() {
  const t = useTranslations("AiBuild1");

  return (
    <section className="relative border-t border-[color:var(--labs-line)]">
      <div className="container mx-auto px-4 py-20 sm:py-24 md:py-28">
        <div className="mx-auto max-w-6xl">
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.5 }}
            className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-green"
          >
            {t("transformation_eyebrow")}
          </motion.span>

          <div className="mt-12 grid gap-12 sm:mt-16 md:grid-cols-2 md:gap-0">
            {/* Before */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col gap-7 md:pr-12 lg:pr-16"
            >
              <h3 className="font-display text-xl font-bold leading-tight tracking-tight text-[color:var(--labs-muted)] sm:text-2xl md:text-3xl">
                {t("transformation_before_label")}
              </h3>
              <ul className="space-y-5">
                {ITEMS.map((n, i) => (
                  <motion.li
                    key={n}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                    className="flex gap-4 border-t border-[color:var(--labs-line)] pt-5 text-base leading-relaxed text-[color:var(--labs-muted)] sm:text-lg"
                  >
                    <span className="font-mono text-xs uppercase tracking-[0.18em] text-[color:var(--labs-muted)]">
                      {String(n).padStart(2, "0")}
                    </span>
                    <span>{t(`transformation_before_${n}`)}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* After */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex flex-col gap-7 border-t border-[color:var(--labs-line)] pt-12 md:border-l md:border-t-0 md:pl-12 md:pt-0 lg:pl-16"
            >
              <h3 className="font-display text-xl font-bold leading-tight tracking-tight text-brand-green sm:text-2xl md:text-3xl">
                {t("transformation_after_label")}
              </h3>
              <ul className="space-y-5">
                {ITEMS.map((n, i) => (
                  <motion.li
                    key={n}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.4, delay: 0.15 + i * 0.05 }}
                    className="flex gap-4 border-t border-[color:var(--labs-line)] pt-5 text-base leading-relaxed text-[color:var(--labs-fg)]/85 sm:text-lg"
                  >
                    <span className="font-mono text-xs uppercase tracking-[0.18em] text-brand-green">
                      {String(n).padStart(2, "0")}
                    </span>
                    <span>{t(`transformation_after_${n}`)}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
