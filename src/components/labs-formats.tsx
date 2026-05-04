"use client";

import * as React from "react";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { CalTrigger } from "@/components/cal-trigger";
import { LabsInterestForm } from "@/components/labs-interest-form";

export function LabsFormats() {
  const t = useTranslations("Labs");
  const [open, setOpen] = React.useState(false);
  const formAnchor = React.useRef<HTMLDivElement>(null);

  const reveal = React.useCallback(() => {
    setOpen(true);
    requestAnimationFrame(() => {
      formAnchor.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  }, []);

  return (
    <section id="formats" className="relative scroll-mt-24">
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
              {t("formats_eyebrow")}
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="mt-4 font-display text-4xl font-bold leading-tight tracking-tight text-[color:var(--labs-fg)] sm:text-5xl md:text-6xl"
            >
              {t("formats_title")}
            </motion.h2>
          </div>

          {/* Two formats */}
          <div className="mt-16 grid border-t border-[color:var(--labs-line)] sm:mt-20 md:grid-cols-2 md:divide-x md:divide-[color:var(--labs-line)]">
            {/* Open Labs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col gap-7 pt-12 md:pr-12 md:pt-14 lg:pr-16"
            >
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs uppercase tracking-[0.18em] text-brand-green">
                  01
                </span>
                <span className="h-px w-8 bg-brand-green/60" />
              </div>

              <h3 className="font-display text-3xl font-bold leading-tight tracking-tight text-[color:var(--labs-fg)] sm:text-4xl md:text-5xl">
                {t("open_label")}
              </h3>

              <div className="space-y-5 text-base leading-relaxed text-[color:var(--labs-muted)] sm:text-lg">
                <p>{t("open_p1")}</p>
                <p>{t("open_p2")}</p>
              </div>

              <div className="mt-2">
                <button
                  type="button"
                  onClick={reveal}
                  className="inline-flex h-12 items-center gap-2 rounded-md bg-brand-green px-6 text-sm font-semibold text-brand-dark transition-colors hover:bg-brand-green/85"
                >
                  {t("open_cta")}
                  <ArrowRight className="size-4" />
                </button>
              </div>
            </motion.div>

            {/* Corporate Labs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex flex-col gap-7 border-t border-[color:var(--labs-line)] pt-12 md:border-t-0 md:pl-12 md:pt-14 lg:pl-16"
            >
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs uppercase tracking-[0.18em] text-brand-green">
                  02
                </span>
                <span className="h-px w-8 bg-brand-green/60" />
              </div>

              <h3 className="font-display text-3xl font-bold leading-tight tracking-tight text-[color:var(--labs-fg)] sm:text-4xl md:text-5xl">
                {t("corporate_label")}
              </h3>

              <div className="space-y-5 text-base leading-relaxed text-[color:var(--labs-muted)] sm:text-lg">
                <p>{t("corporate_p1")}</p>
                <p>{t("corporate_p2")}</p>
              </div>

              <div className="mt-2">
                <CalTrigger className="inline-flex h-12 items-center gap-2 rounded-md border border-[color:var(--labs-line)] px-6 text-sm font-semibold text-[color:var(--labs-fg)] transition-colors hover:border-brand-green hover:bg-brand-green/5 hover:text-brand-green">
                  {t("corporate_cta")}
                </CalTrigger>
              </div>
            </motion.div>
          </div>

          {/* Open Labs interest form (revealed) */}
          <div ref={formAnchor} className="mt-20 sm:mt-28">
            {open ? (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mx-auto max-w-2xl border-t border-[color:var(--labs-line)] pt-12 sm:pt-16"
              >
                <div className="mb-10 flex flex-col gap-3">
                  <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-green">
                    {t("form_eyebrow")}
                  </span>
                  <h3 className="font-display text-3xl font-bold leading-tight tracking-tight text-[color:var(--labs-fg)] sm:text-4xl">
                    {t("form_title")}
                  </h3>
                  <p className="text-base text-[color:var(--labs-muted)] sm:text-lg">
                    {t("form_subtitle")}
                  </p>
                </div>
                <LabsInterestForm onClose={() => setOpen(false)} />
              </motion.div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
