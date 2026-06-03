import { getLocale, getTranslations } from "next-intl/server";
import { ArrowUpRight } from "lucide-react";
import { PrivateEventsNav } from "@/components/private-events/nav";
import {
  localizedPrivateField,
  type PrivateEvent,
} from "@/lib/private-events";

function formatDate(iso: string, locale: string) {
  return new Date(`${iso}T12:00:00`).toLocaleDateString(
    locale === "es" ? "es-GT" : "en-US",
    { year: "numeric", month: "long", day: "numeric" },
  );
}

type Props = { event: PrivateEvent };

export async function PrivateEventHero({ event }: Props) {
  const t = await getTranslations("PrivateEvents");
  const locale = await getLocale();
  const title = localizedPrivateField(locale, event.title, event.titleEn);
  const tagline = localizedPrivateField(locale, event.tagline, event.taglineEn);
  const format = localizedPrivateField(locale, event.format, event.formatEn);
  const level = localizedPrivateField(locale, event.level, event.levelEn);
  const location = localizedPrivateField(
    locale,
    event.location,
    event.locationEn,
  );

  const facts: { label: string; value: string; accent?: boolean }[] = [
    { label: t("detail_date"), value: formatDate(event.date, locale) },
    { label: t("detail_place"), value: location },
    {
      label: t("detail_format"),
      value: `${event.durationHours} h`,
    },
    { label: t("detail_price"), value: event.priceLabel, accent: true },
  ];

  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[420px] bg-[radial-gradient(60%_100%_at_50%_0%,color-mix(in_srgb,var(--ws-accent)_14%,transparent),transparent_70%)]"
      />
      <PrivateEventsNav
        backHref="/workshops"
        backLabel={t("nav_back_index")}
        showEmpresasLink
      />
      <div className="container mx-auto px-4 pb-12 pt-16 sm:pb-16 sm:pt-24">
        <div className="mx-auto max-w-3xl">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="inline-flex items-center gap-2 border border-[color:var(--ws-line)] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-[color:var(--ws-muted)]">
              {t("event_edition", { n: event.edition })}
            </span>
            <span className="inline-flex items-center gap-2 border border-[color:var(--ws-accent)]/40 bg-[color:var(--ws-accent)]/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-[color:var(--ws-accent)]">
              {level}
            </span>
            <span className="inline-flex items-center gap-2 border border-[color:var(--ws-line)] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-[color:var(--ws-muted)]">
              {t("limited_seats")}
            </span>
          </div>

          <h1 className="mt-7 font-display text-4xl font-bold leading-[1.05] tracking-tight text-[color:var(--ws-fg)] sm:text-5xl md:text-6xl">
            {title}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[color:var(--ws-muted)] sm:text-xl">
            {tagline}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[10px] uppercase tracking-[0.18em] text-[color:var(--ws-muted)]">
            <span>{format}</span>
            <span className="text-[color:var(--ws-line)]">/</span>
            <span>
              {t("detail_facilitator")}:{" "}
              {event.facilitatorUrl ? (
                <a
                  href={event.facilitatorUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[color:var(--ws-fg)] underline decoration-[color:var(--ws-line)] underline-offset-4 transition-colors hover:text-[color:var(--ws-accent)] hover:decoration-[color:var(--ws-accent)]"
                >
                  {event.facilitator}
                </a>
              ) : (
                event.facilitator
              )}
            </span>
          </div>

          <div className="mt-7">
            <a
              href={event.registrationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 border border-[color:var(--ws-accent)]/40 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-[color:var(--ws-accent)] transition-colors hover:bg-[color:var(--ws-accent)]/10"
            >
              {t("pay_now")} · {event.priceLabel}
              <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>

        <dl className="mx-auto mt-12 grid max-w-3xl grid-cols-2 gap-px overflow-hidden border border-[color:var(--ws-line)] bg-[color:var(--ws-line)] sm:grid-cols-4">
          {facts.map((fact) => (
            <div
              key={fact.label}
              className="bg-[color:var(--ws-elevated)] px-5 py-6"
            >
              <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-[color:var(--ws-muted)]">
                {fact.label}
              </dt>
              <dd
                className={`mt-2 text-sm font-medium sm:text-base ${
                  fact.accent
                    ? "font-display text-xl font-bold text-[color:var(--ws-accent)] sm:text-2xl"
                    : "text-[color:var(--ws-fg)]"
                }`}
              >
                {fact.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
