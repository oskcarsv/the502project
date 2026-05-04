"use client";

import { ArrowUpRight, Check } from "lucide-react";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { AiBuild1Nav } from "@/components/ai-build-1/nav";

type Props = {
  whatsappUrl: string;
};

export function AiBuild1Confirmed({ whatsappUrl }: Props) {
  const t = useTranslations("AiBuild1");

  return (
    <div className="relative flex min-h-screen flex-col">
      <AiBuild1Nav />

      <main className="relative flex flex-1 flex-col">
        <div className="container mx-auto flex flex-1 flex-col px-4 py-6 sm:py-12 md:py-16">
          {/* Card — centered vertically on desktop, top-aligned on mobile so it never clips */}
          <div className="flex flex-1 flex-col justify-start sm:justify-center">
            <motion.article
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="mx-auto flex w-full max-w-3xl flex-col items-start border border-[color:var(--labs-line)] bg-[color:var(--labs-bg-elevated)]/40 p-6 sm:p-10 md:p-14 lg:p-16"
            >
              <motion.div
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.15, duration: 0.5, type: "spring", stiffness: 180, damping: 14 }}
                className="flex size-12 items-center justify-center rounded-full bg-brand-green text-brand-dark sm:size-14 md:size-16"
              >
                <Check className="size-5 sm:size-6 md:size-7" strokeWidth={2.5} />
              </motion.div>

              <p className="mt-7 font-mono text-[10px] uppercase tracking-[0.28em] text-[color:var(--labs-muted)] sm:mt-10 sm:text-[11px]">
                {t("confirmed_eyebrow")}
              </p>

              <h1 className="mt-3 font-display text-5xl font-bold leading-[0.94] tracking-tight text-[color:var(--labs-fg)] sm:mt-4 sm:text-6xl md:text-7xl lg:text-8xl">
                {t("confirmed_title")}
              </h1>

              <p className="mt-5 font-display text-xl font-medium leading-snug tracking-tight text-[color:var(--labs-fg)]/85 sm:mt-7 sm:text-2xl md:text-3xl">
                {t("confirmed_subtitle")}
              </p>

              <div className="my-8 h-px w-full bg-[color:var(--labs-line)] sm:my-10 md:my-12" />

              <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-brand-green sm:text-[11px]">
                {t("confirmed_next_eyebrow")}
              </p>
              <p className="mt-4 text-base leading-relaxed text-[color:var(--labs-fg)]/85 sm:mt-6 sm:text-lg md:text-xl">
                {t("confirmed_next_p1")}
              </p>
              <p className="mt-3 text-base leading-relaxed text-[color:var(--labs-muted)] sm:mt-4 sm:text-lg md:text-xl">
                {t("confirmed_next_p2")}
              </p>

              <div className="my-8 h-px w-full bg-[color:var(--labs-line)] sm:my-10 md:my-12" />

              <p className="font-display text-lg font-medium tracking-tight text-[color:var(--labs-fg)] sm:text-xl md:text-2xl">
                {t("confirmed_closing_p1")}
              </p>
              <p className="mt-3 font-display text-base font-bold tracking-tight text-[color:var(--labs-fg)] sm:text-lg">
                {t("confirmed_closing_signoff")}
              </p>
              <p className="mt-1 text-sm text-[color:var(--labs-muted)] sm:text-base">
                {t("signoff_role")}
              </p>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-6 inline-flex items-center gap-2 border-b border-brand-green/40 pb-1 font-mono text-[11px] uppercase tracking-[0.22em] text-[color:var(--labs-fg)] transition-colors hover:border-brand-green hover:text-brand-green sm:mt-8"
              >
                {t("closing_whatsapp_label")}
                <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
              </a>
            </motion.article>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mt-8 flex justify-center sm:mt-10"
          >
            <Link
              href="/labs"
              className="text-xs uppercase tracking-[0.18em] text-[color:var(--labs-muted)] transition-colors hover:text-[color:var(--labs-fg)]"
            >
              {t("confirmed_back")}
            </Link>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
