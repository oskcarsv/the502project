"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, X } from "lucide-react";
import { useTranslations } from "next-intl";

const STORAGE_KEY = "demoday-announcement-dismissed";
const DISMISS_EVENT = "demoday-announcement-dismissed";

function subscribe(callback: () => void) {
  window.addEventListener(DISMISS_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(DISMISS_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

/**
 * Reads the dismissed flag from localStorage without a setState-in-effect.
 * Server renders the banner visible; the client reconciles after hydration.
 */
function useDismissed() {
  return React.useSyncExternalStore(
    subscribe,
    () => localStorage.getItem(STORAGE_KEY) === "1",
    () => false,
  );
}

export function AnnouncementBar() {
  const t = useTranslations("DemoDayBanner");
  const dismissed = useDismissed();

  if (dismissed) return null;

  const dismiss = () => {
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // ignore storage errors (private mode, etc.)
    }
    window.dispatchEvent(new Event(DISMISS_EVENT));
  };

  return (
    <div className="relative bg-black text-white">
      <Link
        href="/demo-day"
        className="group flex flex-wrap items-center justify-center gap-x-2.5 gap-y-0.5 px-10 py-2.5 text-center text-xs font-medium sm:text-sm"
      >
        <span className="relative flex size-2 shrink-0" aria-hidden>
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-brand-green opacity-75" />
          <span className="relative inline-flex size-2 rounded-full bg-brand-green" />
        </span>
        <span className="font-bold uppercase tracking-[0.18em] text-brand-green">
          {t("live")}
        </span>
        <span className="font-semibold">· {t("title")}</span>
        <span className="hidden text-white/55 sm:inline">· {t("badge")}</span>
        <span className="inline-flex items-center gap-1 font-semibold text-brand-green underline decoration-brand-green/40 underline-offset-2 transition-colors group-hover:decoration-brand-green">
          {t("cta")}
          <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
        </span>
      </Link>

      <button
        type="button"
        onClick={dismiss}
        aria-label="Cerrar"
        className="absolute right-2 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-full text-white/50 transition-colors hover:bg-white/10 hover:text-white"
      >
        <X className="size-4" />
      </button>
    </div>
  );
}
