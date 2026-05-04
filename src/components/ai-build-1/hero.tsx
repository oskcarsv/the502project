"use client";

import { ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { AiBuild1Nav } from "@/components/ai-build-1/nav";

const FIELDS = [
  { label: "detail_date_label", value: "detail_date_value" },
  { label: "detail_location_label", value: "detail_location_value" },
  { label: "detail_capacity_label", value: "detail_capacity_value" },
  { label: "detail_price_label", value: "detail_price_value" },
] as const;

export function AiBuild1Hero() {
  const t = useTranslations("AiBuild1");

  return (
    <div className="relative">
      <AiBuild1Nav />

      <div className="container mx-auto px-4 pb-12 pt-6 sm:pb-20 sm:pt-10 md:pb-24 md:pt-12">
        <motion.article
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mx-auto flex max-w-3xl flex-col border border-[color:var(--labs-line)] bg-[color:var(--labs-bg-elevated)]/40 p-7 sm:p-10 md:p-12 lg:p-14"
        >
          {/* To / From — letterhead */}
          <div className="grid gap-5 sm:grid-cols-2 sm:gap-12">
            <div className="flex flex-col gap-1.5">
              <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-[color:var(--labs-muted)]">
                {t("hero_to_label")}
              </span>
              <span className="font-display text-sm font-medium tracking-tight text-[color:var(--labs-fg)] sm:text-base">
                {t("hero_to_value")}
              </span>
            </div>
            <div className="flex flex-col gap-1.5 sm:items-end">
              <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-[color:var(--labs-muted)]">
                {t("hero_from_label")}
              </span>
              <span className="font-display text-sm font-medium tracking-tight text-[color:var(--labs-fg)] sm:text-base">
                {t("hero_from_value")}
              </span>
            </div>
          </div>

          <div className="my-8 h-px w-full bg-[color:var(--labs-line)] sm:my-10" />

          {/* Edition mark */}
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-brand-green sm:text-[11px]">
            {t("hero_edition_mark")}
          </p>

          {/* Title */}
          <h1 className="mt-5 font-display text-4xl font-bold leading-[0.96] tracking-tight text-[color:var(--labs-fg)] sm:mt-6 sm:text-5xl md:text-6xl">
            {t("title")}
          </h1>

          {/* Subline */}
          <p className="mt-5 max-w-xl font-display text-base font-medium leading-snug tracking-tight text-[color:var(--labs-fg)]/85 sm:mt-6 sm:text-lg md:text-xl">
            {t("subline")}
          </p>

          <div className="my-8 h-px w-full bg-[color:var(--labs-line)] sm:my-10" />

          {/* Detail grid */}
          <dl className="grid grid-cols-2 gap-x-5 gap-y-5 sm:grid-cols-4 sm:gap-x-6">
            {FIELDS.map((f) => (
              <div key={f.label} className="flex flex-col gap-1.5">
                <dt className="font-mono text-[10px] uppercase tracking-[0.28em] text-[color:var(--labs-muted)]">
                  {t(f.label)}
                </dt>
                <dd className="font-display text-sm font-medium tracking-tight text-[color:var(--labs-fg)] sm:text-base">
                  {t(f.value)}
                </dd>
              </div>
            ))}
          </dl>
        </motion.article>

        {/* "What is Labs?" link below the card */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mx-auto mt-6 flex max-w-3xl justify-end sm:mt-8"
        >
          <Link
            href="/labs"
            className="group inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-[color:var(--labs-muted)] transition-colors hover:text-brand-green"
          >
            {t("what_is_labs")}
            <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
