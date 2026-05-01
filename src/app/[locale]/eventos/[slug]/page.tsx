import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import {
  ArrowLeft,
  ArrowUpRight,
  Calendar,
  Clock,
  MapPin,
  PlayCircle,
} from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { BlogContent } from "@/components/blog-content";
import {
  getAllEventSlugs,
  getAllEvents,
  getEventBySlug,
  partitionEvents,
  type EventItem,
} from "@/lib/events";
import { SITE } from "@/lib/site";

export async function generateStaticParams() {
  const slugs = await getAllEventSlugs();
  return slugs.flatMap((slug) => [
    { locale: "es", slug },
    { locale: "en", slug },
  ]);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const event = await getEventBySlug(slug);
  if (!event) return {};

  const isEn = locale === "en";
  const title = isEn ? event.title : event.titleEs;
  const description = isEn ? event.description : event.descriptionEs;
  const url = `${isEn ? "/en" : ""}/eventos/${slug}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title,
      description,
      url: `${SITE.url}${url}`,
      // Only override image if event has its own; otherwise inherit dynamic opengraph-image.tsx
      ...(event.image && {
        images: [{ url: event.image, width: 1200, height: 630, alt: title }],
      }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(event.image && { images: [event.image] }),
    },
  };
}

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

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Events");

  const event = await getEventBySlug(slug);
  if (!event) notFound();

  const allEvents = await getAllEvents();
  const { upcoming, past } = partitionEvents(allEvents);
  const related = (event.status === "upcoming" ? upcoming : past)
    .filter((e) => e.slug !== slug)
    .slice(0, 2);

  const ctaUrl = event.lumaUrl ?? event.customRegistrationUrl;
  const isUpcoming = event.status === "upcoming";

  return (
    <>
      <div className="bg-background">
        <div className="container mx-auto px-4">
          <Navbar />
        </div>
      </div>

      <main className="bg-background">
        <article>
          {/* Back link */}
          <div className="container mx-auto px-4 pt-8 sm:pt-12">
            <a
              href="/eventos"
              className="inline-flex items-center gap-2 text-sm font-medium text-foreground/60 transition-colors hover:text-brand-dark"
            >
              <ArrowLeft className="size-4" />
              {t("back")}
            </a>
          </div>

          {/* Header */}
          <header className="container mx-auto max-w-4xl px-4 pt-10 pb-12 sm:pt-14 sm:pb-16">
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span
                className={
                  isUpcoming
                    ? "rounded-full bg-brand-green px-3 py-1 font-semibold uppercase tracking-[0.14em] text-brand-dark"
                    : "rounded-full bg-foreground/10 px-3 py-1 font-semibold uppercase tracking-[0.14em] text-foreground/70"
                }
              >
                {isUpcoming ? t("upcoming_label") : t("past_label")}
              </span>
              <span className="rounded-full border border-foreground/15 px-3 py-1 font-medium uppercase tracking-[0.14em] text-foreground/70">
                {event.category}
              </span>
              {event.collaboration && event.collaboratorName && (
                <span className="rounded-full bg-brand-green/15 px-3 py-1 text-foreground/80">
                  {t("with")}{" "}
                  <span className="font-semibold text-brand-dark">
                    {event.collaboratorName}
                  </span>
                </span>
              )}
            </div>

            <h1 className="mt-6 font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
              {localizedTitle(event, locale)}
            </h1>

            <p className="mt-6 text-lg leading-relaxed text-foreground/70 sm:text-xl">
              {localizedDescription(event, locale)}
            </p>

            <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 border-t border-foreground/10 pt-6 text-sm text-foreground/75">
              <div className="flex items-center gap-2">
                <Calendar className="size-4 text-brand-green" />
                <span>{formatDate(event.date, locale)}</span>
              </div>
              {event.time && (
                <div className="flex items-center gap-2">
                  <Clock className="size-4 text-brand-green" />
                  <span>
                    {event.time}
                    {event.endTime ? ` — ${event.endTime}` : ""}
                  </span>
                </div>
              )}
              {event.location && (
                <div className="flex items-center gap-2">
                  <MapPin className="size-4 text-brand-green" />
                  <span>{event.location}</span>
                </div>
              )}
            </div>

            {/* Primary CTA */}
            {(isUpcoming && ctaUrl) ||
            event.recordingUrl ||
            (!isUpcoming && ctaUrl) ? (
              <div className="mt-8 flex flex-wrap gap-3">
                {isUpcoming && ctaUrl && (
                  <a
                    href={ctaUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-12 items-center gap-2 rounded-md bg-brand-green px-6 text-sm font-semibold text-brand-dark transition-colors hover:bg-brand-green/85"
                  >
                    {t("register")}
                    <ArrowUpRight className="size-4" />
                  </a>
                )}
                {event.recordingUrl && (
                  <a
                    href={event.recordingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-12 items-center gap-2 rounded-md border border-foreground/15 px-6 text-sm font-semibold text-brand-dark transition-colors hover:border-brand-green hover:bg-brand-green/5"
                  >
                    <PlayCircle className="size-4" />
                    {t("watch_recording")}
                  </a>
                )}
                {!isUpcoming && ctaUrl && (
                  <a
                    href={ctaUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-12 items-center gap-2 rounded-md border border-foreground/15 px-6 text-sm font-semibold text-foreground/80 transition-colors hover:border-brand-green hover:bg-brand-green/5 hover:text-brand-dark"
                  >
                    {t("view_event")}
                    <ArrowUpRight className="size-4" />
                  </a>
                )}
              </div>
            ) : null}
          </header>

          {/* Cover */}
          <div className="container mx-auto px-4">
            <div className="relative mx-auto aspect-[16/9] max-w-5xl overflow-hidden rounded-3xl bg-brand-dark">
              {event.image ? (
                <Image
                  src={event.image}
                  alt={localizedTitle(event, locale)}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 1024px"
                  priority
                />
              ) : (
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(86,239,159,0.25),transparent_55%),radial-gradient(circle_at_80%_85%,rgba(86,239,159,0.1),transparent_50%)]" />
              )}
            </div>
          </div>

          {/* Body */}
          <div className="container mx-auto px-4 py-16 sm:py-20">
            <div className="mx-auto max-w-3xl">
              {event.content.trim() && (
                <BlogContent>{event.content}</BlogContent>
              )}

              {/* Sponsors */}
              {event.sponsors && event.sponsors.length > 0 && (
                <div className="mt-12 rounded-2xl border border-foreground/10 p-6 sm:p-8">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-green">
                    {t("sponsors_label")}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-x-6 gap-y-3">
                    {event.sponsors.map((s) => (
                      <a
                        key={s.url}
                        href={s.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground/80 transition-colors hover:text-brand-dark"
                      >
                        {s.name}
                        <ArrowUpRight className="size-3.5" />
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* Bottom CTA card */}
              {isUpcoming && ctaUrl && (
                <div className="mt-12 rounded-3xl bg-brand-dark p-8 text-center text-white sm:p-12">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-green">
                    {t("upcoming_label")}
                  </p>
                  <h2 className="mt-3 font-display text-2xl font-bold leading-tight tracking-tight sm:text-3xl">
                    {t("dont_miss")}
                  </h2>
                  <a
                    href={ctaUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex h-12 items-center gap-2 rounded-md bg-brand-green px-6 text-sm font-semibold text-brand-dark transition-colors hover:bg-brand-green/85"
                  >
                    {t("register")}
                    <ArrowUpRight className="size-4" />
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Related events */}
          {related.length > 0 && (
            <section className="border-t border-foreground/10 bg-background">
              <div className="container mx-auto px-4 py-20 sm:py-24">
                <div className="mx-auto max-w-5xl">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-green">
                    {isUpcoming
                      ? t("more_upcoming_eyebrow")
                      : t("more_past_eyebrow")}
                  </p>
                  <h2 className="mt-4 font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
                    {isUpcoming ? t("more_upcoming_title") : t("more_past_title")}
                  </h2>

                  <div className="mt-10 grid gap-8 md:grid-cols-2">
                    {related.map((e) => (
                      <a
                        key={e.slug}
                        href={`/eventos/${e.slug}`}
                        className="group flex flex-col overflow-hidden rounded-2xl border border-foreground/10 transition-colors hover:border-brand-green/50"
                      >
                        <div className="relative aspect-[16/10] overflow-hidden bg-brand-dark">
                          {e.image ? (
                            <Image
                              src={e.image}
                              alt={localizedTitle(e, locale)}
                              fill
                              className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                              sizes="(max-width: 768px) 100vw, 50vw"
                            />
                          ) : (
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(86,239,159,0.18),transparent_55%),radial-gradient(circle_at_80%_85%,rgba(86,239,159,0.08),transparent_50%)]" />
                          )}
                        </div>
                        <div className="flex flex-col gap-3 p-6">
                          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-green">
                            {formatShortDate(e.date, locale)}
                          </span>
                          <h3 className="font-display text-xl font-bold leading-tight tracking-tight">
                            {localizedTitle(e, locale)}
                          </h3>
                          <p className="line-clamp-2 text-sm leading-relaxed text-foreground/65">
                            {localizedDescription(e, locale)}
                          </p>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          )}
        </article>
      </main>

      <Footer />
    </>
  );
}
