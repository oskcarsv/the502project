"use client";

import { Link } from "@/i18n/navigation";
import { LanguageSwitcher } from "@/components/language-switcher";

export function LabsNav() {
  return (
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
  );
}
