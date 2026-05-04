"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";

const PRINCIPLES = [1, 2, 3, 4] as const;

export function LabsPrinciples() {
  const t = useTranslations("Labs");

  return (
    <section className="relative border-y border-[color:var(--labs-line)]">
      <div className="container mx-auto px-4 py-24 sm:py-32 md:py-40">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.5 }}
              className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-green"
            >
              {t("principles_eyebrow")}
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="mt-4 font-display text-4xl font-bold leading-tight tracking-tight text-[color:var(--labs-fg)] sm:text-5xl md:text-6xl"
            >
              {t("principles_title")}
            </motion.h2>
          </div>

          <ol className="mt-16 flex flex-col sm:mt-20">
            {PRINCIPLES.map((n, i) => (
              <motion.li
                key={n}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.55, delay: i * 0.06 }}
                className="grid gap-4 border-t border-[color:var(--labs-line)] py-9 sm:grid-cols-[100px_1fr] sm:gap-10 sm:py-12 md:grid-cols-[140px_1fr]"
              >
                <span className="font-mono text-sm tracking-[0.18em] text-brand-green sm:text-base">
                  {String(n).padStart(2, "0")}
                </span>
                <div className="flex flex-col gap-3 sm:gap-4">
                  <h3 className="font-display text-2xl font-bold leading-tight tracking-tight text-[color:var(--labs-fg)] sm:text-3xl md:text-4xl">
                    {t(`principle_${n}_title`)}
                  </h3>
                  <p className="max-w-xl text-base leading-relaxed text-[color:var(--labs-muted)] sm:text-lg">
                    {t(`principle_${n}_body`)}
                  </p>
                </div>
              </motion.li>
            ))}
            <li className="border-t border-[color:var(--labs-line)]" aria-hidden />
          </ol>
        </div>
      </div>
    </section>
  );
}
