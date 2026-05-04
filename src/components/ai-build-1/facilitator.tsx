"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useTranslations } from "next-intl";

const STATS = [1, 2, 3] as const;
const ROLES = [1, 2, 3] as const;

export function AiBuild1Facilitator() {
  const t = useTranslations("AiBuild1");
  const [expanded, setExpanded] = React.useState(false);

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

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5 }}
            className="mt-10 max-w-2xl text-base leading-relaxed text-[color:var(--labs-fg)]/80 sm:mt-12 sm:text-lg"
          >
            {t("facilitator_credentials_1")}
          </motion.p>

          <AnimatePresence initial={false}>
            {expanded ? (
              <motion.div
                key="expanded"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.45, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="mt-12 border-t border-[color:var(--labs-line)] pt-12 sm:mt-14 sm:pt-14">
                  <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-brand-green sm:text-[11px]">
                    {t("facilitator_stats_eyebrow")}
                  </p>

                  <dl className="mt-8 grid gap-10 sm:grid-cols-3 sm:gap-8 md:gap-12">
                    {STATS.map((n) => (
                      <div key={n} className="flex flex-col gap-2">
                        <dt className="font-display text-4xl font-bold leading-none tracking-tight text-brand-green sm:text-5xl md:text-6xl">
                          {t(`facilitator_stat_${n}_value`)}
                        </dt>
                        <dd className="text-sm text-[color:var(--labs-muted)] sm:text-base">
                          {t(`facilitator_stat_${n}_label`)}
                        </dd>
                      </div>
                    ))}
                  </dl>

                  <p className="mt-10 max-w-2xl text-base leading-relaxed text-[color:var(--labs-fg)]/80 sm:mt-12 sm:text-lg">
                    {t("facilitator_extended_body")}
                  </p>

                  <div className="mt-10 border-t border-[color:var(--labs-line)] pt-8 sm:mt-12 sm:pt-10">
                    <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[color:var(--labs-muted)] sm:text-[11px]">
                      {t("facilitator_roles_eyebrow")}
                    </p>
                    <dl className="mt-6">
                      {ROLES.map((n) => (
                        <div
                          key={n}
                          className="grid grid-cols-[120px_1fr] items-baseline gap-4 border-t border-[color:var(--labs-line)] py-4 sm:grid-cols-[180px_1fr] sm:gap-6"
                        >
                          <dt className="font-mono text-xs uppercase tracking-[0.18em] text-[color:var(--labs-muted)]">
                            {t(`facilitator_role_${n}_label`)}
                          </dt>
                          <dd className="font-display text-base font-medium tracking-tight text-[color:var(--labs-fg)] sm:text-lg">
                            {t(`facilitator_role_${n}_value`)}
                          </dd>
                        </div>
                      ))}
                      <div className="border-t border-[color:var(--labs-line)]" aria-hidden />
                    </dl>
                  </div>
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>

          <motion.button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.4 }}
            className="group mt-10 inline-flex items-center gap-2 border-b border-[color:var(--labs-line)] pb-1 text-xs font-medium uppercase tracking-[0.18em] text-[color:var(--labs-muted)] transition-colors hover:border-brand-green hover:text-brand-green sm:mt-12"
          >
            {expanded ? t("facilitator_less") : t("facilitator_more")}
            <ChevronDown
              className={`size-3.5 transition-transform duration-300 ${
                expanded ? "rotate-180" : ""
              }`}
            />
          </motion.button>
        </div>
      </div>
    </section>
  );
}
