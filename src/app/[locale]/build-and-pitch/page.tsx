import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { BuildPitchHero } from "@/components/build-pitch/hero";
import { BuildPitchMarquee } from "@/components/build-pitch/marquee";
import { BuildPitchAbout } from "@/components/build-pitch/about";
import { BuildPitchFilter } from "@/components/build-pitch/filter";
import { BuildPitchBenefits } from "@/components/build-pitch/benefits";
import { BuildPitchPartners } from "@/components/build-pitch/partners";
import { BuildPitchApply } from "@/components/build-pitch/apply";
import { BuildPitchClosing } from "@/components/build-pitch/closing";
import { Footer } from "@/components/footer";
import { SITE } from "@/lib/site";

const TITLE = "Build & Pitch #2 · Sprint para founders de Guatemala";
const DESCRIPTION =
  "20 startups con MVP. Un día. Ordena tu startup con Notion y pitchea ante Barrilete Ventures. Programa gratuito de the502project en Ciudad de Guatemala.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: "/build-and-pitch",
  },
  openGraph: {
    type: "website",
    siteName: SITE.name,
    title: TITLE,
    description: DESCRIPTION,
    url: `${SITE.url}/build-and-pitch`,
    locale: "es_GT",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

export default async function BuildAndPitchPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <BuildPitchHero />
      <BuildPitchMarquee />
      <BuildPitchAbout />
      <BuildPitchFilter />
      <BuildPitchBenefits />
      <BuildPitchPartners />
      <BuildPitchApply />
      <BuildPitchClosing />
      <Footer showLanguageSwitcher={false} />
    </div>
  );
}
