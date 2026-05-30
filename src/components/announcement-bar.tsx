"use client";

import * as React from "react";
import { ArrowRight, X } from "lucide-react";
import { useTranslations } from "next-intl";

const STORAGE_KEY = "bp2-announcement-dismissed";

export function AnnouncementBar() {
  const t = useTranslations("BuildPitchBanner");
  const [visible, setVisible] = React.useState(true);

  React.useEffect(() => {
    if (localStorage.getItem(STORAGE_KEY) === "1") setVisible(false);
  }, []);

  if (!visible) return null;

  const dismiss = () => {
    setVisible(false);
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // ignore storage errors (private mode, etc.)
    }
  };

  return (
    <div className="relative bg-brand-green text-brand-dark">
      <a
        href="/build-and-pitch"
        className="group flex items-center justify-center gap-x-2.5 gap-y-1 px-10 py-2.5 text-center text-sm font-medium"
      >
        <span className="relative flex size-2 shrink-0" aria-hidden>
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-brand-dark opacity-60" />
          <span className="relative inline-flex size-2 rounded-full bg-brand-dark" />
        </span>
        <span className="font-bold">{t("title")}</span>
        <span className="hidden text-brand-dark/70 sm:inline">
          · {t("badge")}
        </span>
        <span className="inline-flex items-center gap-1 font-semibold underline decoration-brand-dark/40 underline-offset-2 transition-colors group-hover:decoration-brand-dark">
          {t("cta")}
          <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
        </span>
      </a>

      <button
        type="button"
        onClick={dismiss}
        aria-label="Cerrar"
        className="absolute right-2 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-full text-brand-dark/60 transition-colors hover:bg-brand-dark/10 hover:text-brand-dark"
      >
        <X className="size-4" />
      </button>
    </div>
  );
}
