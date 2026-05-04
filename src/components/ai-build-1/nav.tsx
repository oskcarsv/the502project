"use client";

import { ArrowLeft } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { LanguageSwitcher } from "@/components/language-switcher";

export function AiBuild1Nav() {
  const t = useTranslations("AiBuild1");

  return (
    <header className="relative z-20">
      <div className="container mx-auto flex h-16 items-center justify-between gap-4 px-4 sm:h-20 md:h-24">
        <Link href="/labs" className="flex min-w-0 items-center gap-2 sm:gap-3">
          <span className="truncate font-display text-base font-bold tracking-tight text-[color:var(--labs-fg)] sm:text-lg md:text-xl">
            The 502 Project
          </span>
          <span className="text-[color:var(--labs-muted)]">/</span>
          <span className="font-display text-base font-bold tracking-tight text-brand-green sm:text-lg md:text-xl">
            Labs
          </span>
        </Link>

        <div className="flex items-center gap-4 sm:gap-6">
          <Link
            href="/labs"
            className="group hidden items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-[color:var(--labs-muted)] transition-colors hover:text-[color:var(--labs-fg)] sm:inline-flex"
          >
            <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-0.5" />
            <span>{t("nav_back")}</span>
          </Link>
          <LanguageSwitcher tone="dark" />
        </div>
      </div>
    </header>
  );
}
