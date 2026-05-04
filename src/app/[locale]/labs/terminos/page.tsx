import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { LabsTerms } from "@/components/labs-terms";
import { LABS_EVENTS } from "@/lib/labs-events";
import { SITE } from "@/lib/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isEs = locale === "es";

  const title = isEs
    ? "Términos y condiciones · Labs"
    : "Terms and conditions · Labs";

  const description = isEs
    ? "Términos y condiciones aplicables a todas las ediciones de Labs."
    : "Terms and conditions applicable to every edition of Labs.";

  const path = isEs ? "/labs/terminos" : "/en/labs/terminos";

  return {
    title,
    description,
    robots: { index: false, follow: false },
    alternates: {
      canonical: path,
      languages: {
        es: "/labs/terminos",
        en: "/en/labs/terminos",
      },
    },
    openGraph: {
      type: "article",
      siteName: SITE.name,
      title,
      description,
      url: `${SITE.url}${path}`,
      locale: isEs ? "es_GT" : "en_US",
    },
  };
}

export default async function LabsTermsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  // Use the active event's WhatsApp as contact (only one for now).
  const event = LABS_EVENTS["ai-build-1"];

  return (
    <div className="labs-surface relative isolate">
      <LabsTerms whatsappUrl={event.whatsappUrl} />
    </div>
  );
}
