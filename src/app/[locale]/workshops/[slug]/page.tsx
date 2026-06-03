import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { SITE } from "@/lib/site";
import {
  getPrivateEvent,
  getPrivateEventSlugs,
  localizedPrivateField,
} from "@/lib/private-events";
import { PrivateEventHero } from "@/components/private-events/event/hero";
import { PrivateEventDescription } from "@/components/private-events/event/description";
import { PrivateEventRequirements } from "@/components/private-events/requirements";
import { PrivateEventIncludes } from "@/components/private-events/event/includes";
import { PrivateEventOutcome } from "@/components/private-events/event/outcome";
import { PrivateEventsCorporate } from "@/components/private-events/corporate";
import { PrivateEventCta } from "@/components/private-events/event/cta";
import { PrivateEventClosing } from "@/components/private-events/event/closing";

export const dynamicParams = false;

export function generateStaticParams() {
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
  const { locale, slug } = await params;
  const event = getPrivateEvent(slug);
  if (!event) return {};

  const title = localizedPrivateField(locale, event.title, event.titleEn);
  const description = localizedPrivateField(
    locale,
    event.tagline,
    event.taglineEn,
  );
  const path =
    locale === "es"
      ? `/workshops/${slug}`
      : `/en/workshops/${slug}`;

  return {
    title: `${title} · Workshops`,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: SITE.name,
      title,
      description,
      url: `${SITE.url}${path}`,
      locale: locale === "es" ? "es_GT" : "en_US",
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
  setRequestLocale(locale);

  const event = getPrivateEvent(slug);
  if (!event) notFound();

  return (
    <div className="workshop-surface min-h-screen">
      <main>
        <PrivateEventHero event={event} />
        <PrivateEventDescription event={event} />
        <PrivateEventRequirements event={event} />
        <PrivateEventIncludes event={event} />
        <PrivateEventOutcome event={event} />
        <PrivateEventCta event={event} />
        <PrivateEventsCorporate />
      </main>
      <PrivateEventClosing />
    </div>
  );
}
