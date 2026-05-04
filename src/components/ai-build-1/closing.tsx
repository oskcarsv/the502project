"use client";

import { ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

type Props = {
  whatsappUrl: string;
};

export function AiBuild1Closing({ whatsappUrl }: Props) {
  const t = useTranslations("AiBuild1");

  return (
    <>
      <section className="relative border-t border-[color:var(--labs-line)]">
        <div className="container mx-auto px-4 py-20 sm:py-24">
          <div className="mx-auto max-w-2xl space-y-7 sm:max-w-3xl">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6 }}
              className="font-display text-xl font-medium leading-snug tracking-tight text-[color:var(--labs-fg)] sm:text-2xl md:text-3xl"
            >
              {t("closing_body")}
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="text-base text-[color:var(--labs-muted)] sm:text-lg"
            >
              {t("closing_signoff")}
            </motion.p>

            <motion.a
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ delay: 0.15, duration: 0.5 }}
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 border-b border-brand-green/40 pb-1 font-mono text-[11px] uppercase tracking-[0.22em] text-[color:var(--labs-fg)] transition-colors hover:border-brand-green hover:text-brand-green"
            >
              {t("closing_whatsapp_label")}
              <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
            </motion.a>
          </div>
        </div>
      </section>

      <footer className="border-t border-[color:var(--labs-line)]">
        <div className="container mx-auto flex flex-col items-start gap-4 px-4 py-12 text-xs uppercase tracking-[0.18em] text-[color:var(--labs-muted)] sm:flex-row sm:items-center sm:justify-between">
          <Link
            href="/"
            className="font-display text-base font-bold tracking-tight text-[color:var(--labs-fg)] no-underline"
          >
            The 502 Project
          </Link>
          <Link
            href="/labs"
            className="transition-colors hover:text-[color:var(--labs-fg)]"
          >
            {t("nav_back")}
          </Link>
        </div>
      </footer>
    </>
  );
}
