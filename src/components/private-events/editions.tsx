import { ArrowRight } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";
import { WorkshopLabel } from "@/components/private-events/label";
import {
  getAllPrivateEvents,
  localizedPrivateField,
  type PrivateEvent,
} from "@/lib/private-events";

function formatDate(iso: string, locale: string) {
  return new Date(`${iso}T12:00:00`).toLocaleDateString(
    locale === "es" ? "es-GT" : "en-US",
    { year: "numeric", month: "long", day: "numeric" },
  );
}

function EditionCard({
  event,
  locale,
  badgeLabel,
  viewLabel,
  labelDate,
  labelFormat,
  labelPrice,
  editionLabel,
}: {
  event: PrivateEvent;
  locale: string;
  badgeLabel: string;
  viewLabel: string;
  labelDate: string;
  labelFormat: string;
  labelPrice: string;
  editionLabel: string;
}) {
  const title = localizedPrivateField(locale, event.title, event.titleEn);
  const tagline = localizedPrivateField(locale, event.tagline, event.taglineEn);
  const format = localizedPrivateField(locale, event.format, event.formatEn);

  return (
    <a
      href={`/workshops/${event.slug}`}
      className="group block bg-[color:var(--ws-elevated)] ring-1 ring-[color:var(--ws-line)] transition-[box-shadow,ring-color] hover:ring-[color:var(--ws-accent)]/50"
    >
      <div className="grid lg:grid-cols-[1.15fr_1fr]">
        <div className="flex flex-col justify-between gap-8 p-8 sm:p-10 lg:border-r lg:border-[color:var(--ws-line)]">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[color:var(--ws-muted)]">
              {editionLabel} {event.edition} · {badgeLabel}
            </p>
            <h3 className="mt-5 font-display text-3xl font-bold leading-tight tracking-tight text-[color:var(--ws-fg)] sm:text-4xl">
              {title}
            </h3>
            <p className="mt-3 text-[color:var(--ws-muted)]">{tagline}</p>
          </div>
          <span className="inline-flex items-center gap-2 text-sm font-medium text-[color:var(--ws-fg)] transition-colors group-hover:text-[color:var(--ws-accent)]">
            {viewLabel}
            <ArrowRight className="size-4" />
          </span>
        </div>
        <div className="flex flex-col justify-center gap-0 p-8 text-sm sm:p-10">
          <div className="flex justify-between gap-4 border-b border-[color:var(--ws-line)] py-4">
            <span className="text-[color:var(--ws-muted)]">{labelDate}</span>
            <span className="text-[color:var(--ws-fg)]">
              {formatDate(event.date, locale)}
            </span>
          </div>
          <div className="flex justify-between gap-4 border-b border-[color:var(--ws-line)] py-4">
            <span className="text-[color:var(--ws-muted)]">{labelFormat}</span>
            <span className="text-right text-[color:var(--ws-fg)]">{format}</span>
          </div>
          <div className="flex justify-between gap-4 py-4">
            <span className="text-[color:var(--ws-muted)]">{labelPrice}</span>
            <span className="font-display text-xl font-bold text-[color:var(--ws-accent)]">
              {event.priceLabel}
            </span>
          </div>
        </div>
      </div>
    </a>
  );
}

export async function PrivateEventsEditions() {
  const t = await getTranslations("PrivateEvents");
  const locale = await getLocale();
  const events = getAllPrivateEvents().filter((e) => e.status === "upcoming");

  if (events.length === 0) return null;

  return (
    <section id="talleres" className="scroll-mt-16 border-t border-[color:var(--ws-line)]">
      <div className="container mx-auto px-4 py-12 sm:py-16">
        <div className="mx-auto max-w-4xl">
          <WorkshopLabel>{t("editions_eyebrow")}</WorkshopLabel>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-[color:var(--ws-fg)] sm:text-4xl md:text-5xl">
            {t("editions_title")}
          </h2>
          <div className="mt-8 sm:mt-10">
            {events.map((event) => (
              <EditionCard
                key={event.slug}
                event={event}
                locale={locale}
                badgeLabel={t("edition_badge")}
                viewLabel={t("edition_view")}
                labelDate={t("edition_label_date")}
                labelFormat={t("edition_label_format")}
                labelPrice={t("edition_label_price")}
                editionLabel={t("edition_label")}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
