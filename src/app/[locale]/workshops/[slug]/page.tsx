import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { SITE } from "@/lib/site";
import { getPrivateEvent, getPrivateEventSlugs } from "@/lib/private-events";
import { PrivateEventHero } from "@/components/private-events/event/hero";
import { PrivateEventCard } from "@/components/private-events/event/card";
import { PrivateEventDescription } from "@/components/private-events/event/description";
import { PrivateEventRequirements } from "@/components/private-events/requirements";
import { PrivateEventIncludes } from "@/components/private-events/event/includes";
import { PrivateEventOutcome } from "@/components/private-events/event/outcome";
import { PrivateEventsCorporate } from "@/components/private-events/corporate";
import { PrivateEventCta } from "@/components/private-events/event/cta";
import { PrivateEventClosing } from "@/components/private-events/event/closing";

export const dynamicParams = false;

export function generateStaticParams() {
  // Los workshops son solo en español; la variante /en redirige.
  return getPrivateEventSlugs().flatMap((slug) => [
    { locale: "es", slug },
    { locale: "en", slug },
  ]);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const event = getPrivateEvent(slug);
  if (!event) return {};

  const path = `/workshops/${slug}`;

  return {
    title: `${event.title} · Workshops`,
    description: event.tagline,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: SITE.name,
      title: event.title,
      description: event.tagline,
      url: `${SITE.url}${path}`,
      locale: "es_GT",
    },
    robots: { index: false, follow: false },
  };
}

export default async function PrivateEventDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  // Los workshops son solo en español.
  if (locale !== "es") redirect(`/workshops/${slug}`);
  setRequestLocale(locale);

  const event = getPrivateEvent(slug);
  if (!event) notFound();

  return (
    <div className="workshop-surface min-h-screen">
      <main>
        <PrivateEventHero event={event} />
        <div className="container mx-auto max-w-5xl px-4 pb-16 pt-8 sm:pt-10">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start lg:gap-14">
            <aside className="lg:sticky lg:top-8 lg:order-2">
              <PrivateEventCard event={event} />
            </aside>
            <div className="space-y-12 lg:order-1 sm:space-y-14">
              <PrivateEventDescription event={event} />
              <PrivateEventRequirements event={event} />
              <PrivateEventIncludes event={event} />
              <PrivateEventOutcome event={event} />
              <PrivateEventCta event={event} />
            </div>
          </div>
        </div>
        <PrivateEventsCorporate />
      </main>
      <PrivateEventClosing />
    </div>
  );
}
