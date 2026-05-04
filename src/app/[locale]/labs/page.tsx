import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { LabsHero } from "@/components/labs-hero";
import { LabsProblem } from "@/components/labs-problem";
import { LabsPrinciples } from "@/components/labs-principles";
import { LabsFormats } from "@/components/labs-formats";
import { LabsClosing } from "@/components/labs-closing";
import { SITE } from "@/lib/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isEs = locale === "es";

  const title = isEs
    ? "Labs — Sesiones pequeñas, construcción real"
    : "Labs — Small sessions, real building";

  const description = isEs
    ? "Labs es la vertical de sesiones pequeñas de the502project. Grupos curados, hands-on, con seguimiento directo. Open Labs y Corporate Labs."
    : "Labs is the502project's small-session vertical. Curated groups, hands-on, with direct follow-up. Open Labs and Corporate Labs.";

  const path = isEs ? "/labs" : "/en/labs";

  return {
    title,
    description,
    alternates: {
      canonical: path,
      languages: {
        es: "/labs",
        en: "/en/labs",
      },
    },
    openGraph: {
      type: "website",
      siteName: SITE.name,
      title,
      description,
      url: `${SITE.url}${path}`,
      locale: isEs ? "es_GT" : "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function LabsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  await getTranslations("Labs");

  return (
    <div className="labs-surface relative isolate">
      <LabsHero />
      <LabsProblem />
      <LabsPrinciples />
      <LabsFormats />
      <LabsClosing />
    </div>
  );
}
