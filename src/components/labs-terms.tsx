"use client";

import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { LanguageSwitcher } from "@/components/language-switcher";

const SECTIONS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] as const;

type Props = {
  whatsappUrl?: string;
};

export function LabsTerms({ whatsappUrl }: Props) {
  const t = useTranslations("LabsTerms");

  return (
    <div className="relative flex min-h-screen flex-col">
      <header className="relative z-20">
        <div className="container mx-auto flex h-16 items-center justify-between gap-4 px-4 sm:h-20 md:h-24">
          <Link href="/" className="flex min-w-0 items-center gap-2 sm:gap-3">
            <span className="truncate font-display text-base font-bold tracking-tight text-[color:var(--labs-fg)] sm:text-lg md:text-xl">
              The 502 Project
            </span>
            <span className="text-[color:var(--labs-muted)]">/</span>
            <span className="font-display text-base font-bold tracking-tight text-brand-green sm:text-lg md:text-xl">
              Labs
            </span>
          </Link>
          <LanguageSwitcher tone="dark" />
        </div>
      </header>

      <main className="relative flex flex-1 flex-col">
        <div className="container mx-auto px-4 py-12 sm:py-16 md:py-20">
          <div className="mx-auto max-w-3xl">
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-green"
            >
              {t("eyebrow")}
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.05 }}
              className="mt-5 font-display text-4xl font-bold leading-tight tracking-tight text-[color:var(--labs-fg)] sm:mt-6 sm:text-5xl md:text-6xl"
            >
              {t("title")}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="mt-8 text-base leading-relaxed text-[color:var(--labs-fg)]/85 sm:text-lg"
            >
              {t("intro")}
            </motion.p>

            <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.22em] text-[color:var(--labs-muted)] sm:text-[11px]">
              {t("updated")}
            </p>

            <ol className="mt-12 sm:mt-16">
              {SECTIONS.map((n, i) => (
                <motion.li
                  key={n}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: i * 0.03 }}
                  className="grid gap-4 border-t border-[color:var(--labs-line)] py-7 sm:grid-cols-[80px_1fr] sm:gap-8 sm:py-9"
                >
                  <span className="font-mono text-xs uppercase tracking-[0.18em] text-brand-green">
                    {String(n).padStart(2, "0")}
                  </span>
                  <div className="flex flex-col gap-3">
                    <h2 className="font-display text-xl font-bold leading-tight tracking-tight text-[color:var(--labs-fg)] sm:text-2xl">
                      {t(`section_${n}_title`)}
                    </h2>
                    <p className="text-base leading-relaxed text-[color:var(--labs-muted)] sm:text-lg">
                      {t(`section_${n}_body`)}
                    </p>
                  </div>
                </motion.li>
              ))}
              <li className="border-t border-[color:var(--labs-line)]" aria-hidden />
            </ol>

            {whatsappUrl ? (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.6 }}
                className="mt-16 flex flex-col gap-4 sm:mt-20"
              >
                <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-brand-green sm:text-[11px]">
                  {t("contact_eyebrow")}
                </p>
                <p className="text-base leading-relaxed text-[color:var(--labs-fg)]/85 sm:text-lg">
                  {t("contact_body")}
                </p>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 self-start border-b border-brand-green/40 pb-1 font-mono text-[11px] uppercase tracking-[0.22em] text-[color:var(--labs-fg)] transition-colors hover:border-brand-green hover:text-brand-green"
                >
                  {t("contact_cta")}
                  <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                </a>
              </motion.div>
            ) : null}

            <div className="mt-16 flex justify-end sm:mt-20">
              <Link
                href="/labs"
                className="group inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-[color:var(--labs-muted)] transition-colors hover:text-[color:var(--labs-fg)]"
              >
                <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-0.5" />
                {t("nav_back")}
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
