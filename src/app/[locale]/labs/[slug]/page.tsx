import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { getLabsEvent } from "@/lib/labs-events";
import { AiBuild1Hero } from "@/components/ai-build-1/hero";
import { AiBuild1Invitation } from "@/components/ai-build-1/invitation";
import { AiBuild1Outcome } from "@/components/ai-build-1/outcome";
import { AiBuild1Filter } from "@/components/ai-build-1/filter";
import { AiBuild1Facilitator } from "@/components/ai-build-1/facilitator";
import { AiBuild1Practical } from "@/components/ai-build-1/practical";
import { AiBuild1Closing } from "@/components/ai-build-1/closing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const event = getLabsEvent(slug);
  if (!event) {
    return { robots: { index: false, follow: false } };
  }

  const isEs = locale === "es";
  const title = isEs
    ? "AI Build Lab #1 · Sesión privada por invitación"
    : "AI Build Lab #1 · Private session by invitation";

  return {
    title,
    robots: { index: false, follow: false },
  };
}

export default async function LabsEventPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const event = getLabsEvent(slug);
  if (!event || event.slug !== "ai-build-1") {
    notFound();
  }

  await getTranslations("AiBuild1");

  return (
    <div className="labs-surface relative isolate">
      <AiBuild1Hero />
      <AiBuild1Invitation />
      <AiBuild1Outcome />
      <AiBuild1Filter />
      <AiBuild1Facilitator />
      <AiBuild1Practical
        recurrenteUrl={event.recurrenteUrl}
        availablePercent={event.availablePercent}
      />
      <AiBuild1Closing whatsappUrl={event.whatsappUrl} />
    </div>
  );
}
