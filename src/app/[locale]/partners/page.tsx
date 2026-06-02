import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { SITE } from "@/lib/site";
import { PartnersHero } from "@/components/partners/hero";
import { PartnersMission } from "@/components/partners/mission";
import { PartnersProof } from "@/components/partners/proof";
import { PartnersBackers } from "@/components/partners/backers";
import { PartnersTiers } from "@/components/partners/tiers";
import { PartnersClose } from "@/components/partners/close";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Partners" });
  const title = t("meta_title");
  const description = t("meta_description");
  const url = `${SITE.url}${locale === "es" ? "/partners" : "/en/partners"}`;

  return {
    title,
    description,
    alternates: { canonical: locale === "es" ? "/partners" : "/en/partners" },
    openGraph: {
      type: "website",
      siteName: SITE.name,
      title,
      description,
      url,
      locale: locale === "es" ? "es_GT" : "en_US",
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function PartnersPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <div className="bg-background">
        <div className="container mx-auto px-4">
          <Navbar />
        </div>
      </div>

      <main className="bg-background">
        <PartnersHero />
        <PartnersMission />
        <PartnersProof />
        <PartnersBackers />
        <PartnersTiers />
        <PartnersClose />
      </main>

      <Footer />
    </>
  );
}
