"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";

type Tone = "light" | "dark";

const TONES: Record<
  Tone,
  { active: string; inactive: string; separator: string }
> = {
  light: {
    active: "font-semibold text-brand-dark",
    inactive: "text-foreground/40 hover:text-foreground/70",
    separator: "text-foreground/20",
  },
  dark: {
    active: "font-semibold text-white",
    inactive: "text-white/40 hover:text-white/70",
    separator: "text-white/20",
  },
};

export function LanguageSwitcher({ tone = "dark" }: { tone?: Tone }) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const colors = TONES[tone];

  function setLocale(next: "es" | "en") {
    if (next === locale) return;
    router.replace(pathname, { locale: next });
  }

  return (
    <div className="flex items-center gap-1 text-xs">
      <button
        type="button"
        onClick={() => setLocale("es")}
        className={`px-1.5 transition-colors ${
          locale === "es" ? colors.active : colors.inactive
        }`}
        aria-label="Cambiar a español"
        aria-pressed={locale === "es"}
      >
        ES
      </button>
      <span className={colors.separator}>·</span>
      <button
        type="button"
        onClick={() => setLocale("en")}
        className={`px-1.5 transition-colors ${
          locale === "en" ? colors.active : colors.inactive
        }`}
        aria-label="Switch to English"
        aria-pressed={locale === "en"}
      >
        EN
      </button>
    </div>
  );
}
