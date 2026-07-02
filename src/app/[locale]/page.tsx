import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/hero";
import { Sponsors } from "@/components/sponsors";
import { Stats } from "@/components/stats";
import { Gallery } from "@/components/gallery";
import { About } from "@/components/about";
import { Team } from "@/components/team";
import { FinalCTA } from "@/components/final-cta";
import { Footer } from "@/components/footer";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <div className="flex min-h-screen flex-col bg-background">
        <Hero />
        <Sponsors />
      </div>
      <Stats />
      <About />
      <Gallery />
      <Team />
      <FinalCTA />
      <Footer />
    </>
  );
}
