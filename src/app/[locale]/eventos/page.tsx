import Image from "next/image";
import { ArrowRight, Calendar, Clock, MapPin } from "lucide-react";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import {
  getAllEvents,
  partitionEvents,
  type EventItem,
} from "@/lib/events";

function localizedTitle(event: EventItem, locale: string) {
  return locale === "en" ? event.title : event.titleEs;
}

function localizedDescription(event: EventItem, locale: string) {
  return locale === "en" ? event.description : event.descriptionEs;
}

function formatDate(iso: string, locale: string) {
  return new Date(`${iso}T12:00:00`).toLocaleDateString(
    locale === "es" ? "es-GT" : "en-US",
    { year: "numeric", month: "long", day: "numeric" },
  );
}

function formatShortDate(iso: string, locale: string) {
  return new Date(`${iso}T12:00:00`).toLocaleDateString(
    locale === "es" ? "es-GT" : "en-US",
    { month: "short", day: "numeric", year: "numeric" },
  );
}

function FeaturedUpcoming({
  event,
  locale,
  registerLabel,
  upcomingLabel,
}: {
  event: EventItem;
  locale: string;
  registerLabel: string;
  upcomingLabel: string;
}) {
  const ctaUrl = event.lumaUrl ?? event.customRegistrationUrl;
  return (
    <a
      href={`/eventos/${event.slug}`}
      className="group relative block overflow-hidden rounded-3xl bg-brand-dark text-white"
    >
      <div className="grid md:grid-cols-2">
        <div className="relative aspect-[16/10] md:aspect-auto">
          {event.image ? (
            <Image
              src={event.image}
              alt={localizedTitle(event, locale)}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          ) : (
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(86,239,159,0.25),transparent_55%),radial-gradient(circle_at_80%_85%,rgba(86,239,159,0.12),transparent_50%)]" />
          )}
        </div>

        <div className="flex flex-col justify-center gap-5 p-8 sm:p-12">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="rounded-full bg-brand-green px-3 py-1 font-semibold uppercase tracking-[0.14em] text-brand-dark">
              {upcomingLabel}
            </span>
            <span className="rounded-full border border-white/20 px-3 py-1 font-medium uppercase tracking-[0.14em] text-white/80">
              {event.category}
            </span>
          </div>

          <h2 className="font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl md:text-[2.5rem]">
            {localizedTitle(event, locale)}
          </h2>

          <p className="text-base leading-relaxed text-white/70 sm:text-lg">
            {localizedDescription(event, locale)}
          </p>

          <div className="flex flex-col gap-2 text-sm text-white/80 sm:text-base">
            <div className="flex items-center gap-2.5">
              <Calendar className="size-4 shrink-0 text-brand-green" />
              <span>{formatDate(event.date, locale)}</span>
            </div>
            {event.time && (
              <div className="flex items-center gap-2.5">
                <Clock className="size-4 shrink-0 text-brand-green" />
                <span>
                  {event.time}
                  {event.endTime ? ` — ${event.endTime}` : ""}
                </span>
              </div>
            )}
            {event.location && (
              <div className="flex items-center gap-2.5">
                <MapPin className="size-4 shrink-0 text-brand-green" />
                <span>{event.location}</span>
              </div>
            )}
          </div>

          {ctaUrl && (
            <div className="mt-2">
              <span className="inline-flex h-12 items-center gap-2 rounded-md bg-brand-green px-5 text-sm font-semibold text-brand-dark transition-colors group-hover:bg-brand-green/85">
                {registerLabel}
                <ArrowRight className="size-4" />
              </span>
            </div>
          )}
        </div>
      </div>
    </a>
  );
}

function EventCard({
  event,
  locale,
  pastLabel,
}: {
  event: EventItem;
  locale: string;
  pastLabel?: string;
}) {
  return (
    <a
      href={`/eventos/${event.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-foreground/10 bg-background transition-colors hover:border-brand-green/50"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-brand-dark">
        {event.image ? (
          <Image
            src={event.image}
            alt={localizedTitle(event, locale)}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(86,239,159,0.18),transparent_55%),radial-gradient(circle_at_80%_85%,rgba(86,239,159,0.08),transparent_50%)]" />
        )}
        <span className="absolute left-4 top-4 rounded-full border border-white/15 bg-black/40 px-3 py-1 text-xs font-medium text-white/90 backdrop-blur">
          {event.category}
        </span>
        {pastLabel && (
          <span className="absolute right-4 top-4 rounded-full bg-foreground/10 px-3 py-1 text-xs font-medium text-white/90 backdrop-blur">
            {pastLabel}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-3 p-6">
        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-green">
          {formatShortDate(event.date, locale)}
        </div>
        <h3 className="font-display text-lg font-bold leading-tight tracking-tight transition-colors group-hover:text-brand-dark sm:text-xl">
          {localizedTitle(event, locale)}
        </h3>
        <p className="line-clamp-2 text-sm leading-relaxed text-foreground/65">
          {localizedDescription(event, locale)}
        </p>
        {event.collaboratorName && (
          <p className="mt-auto pt-2 text-xs text-foreground/55">
            <span className="font-medium text-foreground/70">
              {event.collaboratorName}
            </span>
          </p>
        )}
      </div>
    </a>
  );
}

export default async function EventsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Events");

  const events = await getAllEvents();
  const { upcoming, past } = partitionEvents(events);
  const [featured, ...otherUpcoming] = upcoming;

  return (
    <>
      <div className="bg-background">
        <div className="container mx-auto px-4">
          <Navbar />
        </div>
      </div>

      <main className="bg-background">
        <div className="container mx-auto px-4 py-20 sm:py-32">
          {/* Header */}
          <header className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-green">
              {t("eyebrow")}
            </p>
            <h1 className="mt-4 font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl">
              {t("title")}
            </h1>
            <p className="mt-6 text-base leading-relaxed text-foreground/70 sm:text-lg">
              {t("subline")}
            </p>
          </header>

          {/* Featured upcoming */}
          {featured && (
            <section className="mt-16 sm:mt-20">
              <FeaturedUpcoming
                event={featured}
                locale={locale}
                registerLabel={t("register")}
                upcomingLabel={t("next_label")}
              />
            </section>
          )}

          {/* Other upcoming */}
          {otherUpcoming.length > 0 && (
            <section className="mt-16 sm:mt-20">
              <div className="mb-8 flex items-end justify-between">
                <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
                  {t("upcoming_title")}
                </h2>
              </div>
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {otherUpcoming.map((event) => (
                  <EventCard key={event.slug} event={event} locale={locale} />
                ))}
              </div>
            </section>
          )}

          {/* Past */}
          {past.length > 0 && (
            <section className="mt-20 sm:mt-28">
              <div className="mb-8 flex items-end justify-between">
                <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
                  {t("past_title")}
                </h2>
                <span className="text-sm text-foreground/55">
                  {past.length} {t("events_count")}
                </span>
              </div>
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {past.map((event) => (
                  <EventCard
                    key={event.slug}
                    event={event}
                    locale={locale}
                    pastLabel={t("past_label")}
                  />
                ))}
              </div>
            </section>
          )}

          {events.length === 0 && (
            <p className="mt-20 text-center text-foreground/60">
              {t("empty")}
            </p>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}
