"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";

const ITEMS = [1, 2, 3, 4] as const;

export function AiBuild1Filter() {
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
            {t("filter_eyebrow")}
          </motion.span>

          <div className="mt-12 grid gap-12 sm:mt-16 md:grid-cols-2 md:gap-16">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col gap-6"
            >
              <h3 className="font-display text-2xl font-bold leading-tight tracking-tight text-[color:var(--labs-fg)] sm:text-3xl">
                {t("filter_yes_title")}
              </h3>
              <ul className="space-y-4">
                {ITEMS.map((n) => (
                  <li
                    key={n}
                    className="flex gap-3 text-base leading-relaxed text-[color:var(--labs-fg)]/85 sm:text-lg"
                  >
                    <span className="select-none text-brand-green">·</span>
                    <span>{t(`filter_yes_${n}`)}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex flex-col gap-6"
            >
              <h3 className="font-display text-2xl font-bold leading-tight tracking-tight text-[color:var(--labs-muted)] sm:text-3xl">
                {t("filter_no_title")}
              </h3>
              <ul className="space-y-4">
                {ITEMS.map((n) => (
                  <li
                    key={n}
                    className="flex gap-3 text-base leading-relaxed text-[color:var(--labs-muted)] sm:text-lg"
                  >
                    <span className="select-none">·</span>
                    <span>{t(`filter_no_${n}`)}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
