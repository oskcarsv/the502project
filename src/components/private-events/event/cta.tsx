import { getLocale, getTranslations } from "next-intl/server";
import { ArrowUpRight } from "lucide-react";
import { localizedPrivateField, type PrivateEvent } from "@/lib/private-events";

type Props = { event: PrivateEvent };

export async function PrivateEventCta({ event }: Props) {
  const t = await getTranslations("PrivateEvents");
  const locale = await getLocale();
  const format = localizedPrivateField(locale, event.format, event.formatEn);

  return (
    <section className="border-t border-[color:var(--ws-line)] bg-[color:var(--ws-elevated)]">
      <div className="container mx-auto max-w-3xl px-4 py-14 sm:py-16">
        <div className="border border-[color:var(--ws-line)] bg-[color:var(--ws-bg)] p-8 sm:p-10">
          <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[color:var(--ws-muted)]">
                {t("cta_eyebrow")}
              </p>
              <p className="mt-3 font-display text-5xl font-bold tracking-tight text-[color:var(--ws-accent)] sm:text-6xl">
                {event.priceLabel}
              </p>
              <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.18em] text-[color:var(--ws-muted)]">
                {format}
              </p>
            </div>
            <a
              href={event.registrationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 shrink-0 items-center justify-center gap-2 bg-[color:var(--ws-accent)] px-8 text-sm font-semibold text-[color:var(--ws-bg)] transition-opacity hover:opacity-90"
            >
              {t("cta_button")}
              <ArrowUpRight className="size-4" />
            </a>
          </div>

          <div className="mt-8 flex flex-col gap-2 border-t border-[color:var(--ws-line)] pt-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[color:var(--ws-accent)]">
              {t("seats_note", { n: event.capacity })}
            </p>
            <p className="text-sm leading-relaxed text-[color:var(--ws-muted)]">
              {t("cta_note")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
