"use client";

import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

const INCLUDES = [1, 2, 3, 4, 5] as const;

type Props = {
  recurrenteUrl: string;
  availablePercent: number;
};

export function AiBuild1Practical({ recurrenteUrl, availablePercent }: Props) {
  const t = useTranslations("AiBuild1");
  const pct = Math.max(0, Math.min(100, availablePercent));

  return (
    <>
      {/* Qué incluye */}
      <section className="relative border-t border-[color:var(--labs-line)]">
        <div className="container mx-auto px-4 py-20 sm:py-24">
          <div className="mx-auto max-w-3xl">
            <motion.span
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.5 }}
              className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-green"
            >
              {t("includes_eyebrow")}
            </motion.span>

            <ul className="mt-12 sm:mt-16">
              {INCLUDES.map((n, i) => (
                <motion.li
                  key={n}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className="flex items-center gap-4 border-t border-[color:var(--labs-line)] py-5 text-base leading-relaxed text-[color:var(--labs-fg)]/85 sm:gap-6 sm:py-6 sm:text-lg"
                >
                  <span className="font-mono text-xs uppercase tracking-[0.18em] text-[color:var(--labs-muted)]">
                    {String(n).padStart(2, "0")}
                  </span>
                  <span>{t(`includes_${n}`)}</span>
                </motion.li>
              ))}
              <li className="border-t border-[color:var(--labs-line)]" aria-hidden />
            </ul>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5 }}
              className="mt-6 max-w-xl text-sm leading-relaxed text-[color:var(--labs-muted)] sm:text-base"
            >
              {t("details_note")}
            </motion.p>
          </div>
        </div>
      </section>

      {/* Capacidad + CTA */}
      <section className="relative border-t border-[color:var(--labs-line)]">
        <div className="container mx-auto px-4 py-24 sm:py-28 md:py-32">
          <div className="mx-auto max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6 }}
              className="mb-12 sm:mb-16"
            >
              <div className="flex items-baseline justify-between gap-4">
                <span className="font-mono text-xs uppercase tracking-[0.18em] text-[color:var(--labs-muted)]">
                  {t("capacity_label")}
                </span>
                <span className="font-display text-lg font-bold tracking-tight text-brand-green sm:text-xl">
                  {pct}%
                </span>
              </div>
              <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-white/8">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${pct}%` }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 1.1, ease: "easeOut", delay: 0.2 }}
                  className="h-full rounded-full bg-brand-green"
                />
              </div>
            </motion.div>

            <motion.span
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.5 }}
              className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-green"
            >
              {t("cta_eyebrow")}
            </motion.span>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="mt-10 flex flex-col gap-6"
            >
              <a
                href={recurrenteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex h-16 w-full items-center justify-between gap-4 rounded-md bg-brand-green px-7 font-display text-lg font-bold tracking-tight text-brand-dark transition-colors hover:bg-brand-green/90 sm:h-20 sm:text-xl md:text-2xl"
              >
                <span>{t("cta_button")}</span>
                <ArrowRight className="size-5 transition-transform group-hover:translate-x-1 sm:size-6" />
              </a>
              <p className="text-sm leading-relaxed text-[color:var(--labs-muted)] sm:text-base">
                {t("cta_disclaimer")}
              </p>
              <p className="text-xs leading-relaxed text-[color:var(--labs-muted)] sm:text-sm">
                {t.rich("cta_terms", {
                  link: (chunks) => (
                    <Link
                      href="/labs/terminos"
                      className="underline underline-offset-2 transition-colors hover:text-brand-green"
                    >
                      {chunks}
                    </Link>
                  ),
                })}
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
