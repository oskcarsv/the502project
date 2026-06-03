import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { SITE } from "@/lib/site";
import { PrivateEventsHero } from "@/components/private-events/hero";
import { PrivateEventsContext } from "@/components/private-events/context";
import { PrivateEventsEditions } from "@/components/private-events/editions";
import { PrivateEventsCorporate } from "@/components/private-events/corporate";
import { PrivateEventsClosing } from "@/components/private-events/closing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "PrivateEvents" });
  const title = t("meta_title");
  const description = t("meta_description");
  const path = locale === "es" ? "/workshops" : "/en/workshops";
  const url = `${SITE.url}${path}`;

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: SITE.name,
      title,
      description,
      url,
      locale: locale === "es" ? "es_GT" : "en_US",
    },
    twitter: { card: "summary_large_image", title, description },
    robots: { index: false, follow: false },
  };
}

export default async function PrivateEventsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="workshop-surface min-h-screen">
      <main>
        <PrivateEventsHero />
        <PrivateEventsContext />
        <PrivateEventsEditions />
        <PrivateEventsCorporate />
      </main>
      <PrivateEventsClosing />
    </div>
  );
}
