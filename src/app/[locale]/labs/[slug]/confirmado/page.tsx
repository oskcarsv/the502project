import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { getLabsEvent } from "@/lib/labs-events";
import { AiBuild1Confirmed } from "@/components/ai-build-1/confirmed";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isEs = locale === "es";

  return {
    title: isEs ? "AI Build Lab #1 · Confirmado" : "AI Build Lab #1 · Confirmed",
    robots: { index: false, follow: false },
  };
}

export default async function LabsEventConfirmedPage({
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

  return (
    <div className="labs-surface relative isolate">
      <AiBuild1Confirmed whatsappUrl={event.whatsappUrl} />
    </div>
  );
}
