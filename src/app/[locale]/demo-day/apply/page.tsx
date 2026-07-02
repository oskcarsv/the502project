import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { ArrowLeft } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { DEMO_DAY } from "@/lib/demo-day";
import { SITE } from "@/lib/site";
import { DemoApplyCriteria } from "@/components/demo-day/apply-criteria";
import { DemoApplyScaffold } from "@/components/demo-day/apply-scaffold";
import { DemoApplyHero } from "@/components/demo-day/apply-hero";

const TITLE = "Aplicar · 502 Demo Day · Edición 1";
const DESCRIPTION = `Aplica para ser una de las ${DEMO_DAY.spots} startups seleccionadas del primer Demo Day del 502. Pitchea ante Barrilete Ventures.`;

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: "/demo-day/apply",
  },
  openGraph: {
    type: "website",
    siteName: SITE.name,
    title: TITLE,
    description: DESCRIPTION,
    url: `${SITE.url}/demo-day/apply`,
    locale: "es_GT",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

export default async function DemoDayApplyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="demo-surface min-h-screen overflow-x-clip">
      <header className="relative border-b border-[var(--demo-line)]">
        <DemoApplyScaffold />
        <div className="container relative mx-auto flex min-w-0 items-center justify-between gap-3 px-4 py-4 sm:py-6">
          <Link
            href="/demo-day"
            className="inline-flex shrink-0 items-center gap-1.5 font-space text-[0.65rem] font-bold uppercase tracking-[0.14em] text-[var(--demo-muted)] transition-colors hover:text-[var(--demo-accent)] sm:gap-2 sm:text-xs"
          >
            <ArrowLeft className="size-4 shrink-0" />
            Demo Day
          </Link>
          <span className="min-w-0 truncate text-right font-display text-sm font-extrabold tracking-tight sm:text-lg">
            the<span className="text-[var(--demo-accent)]">502</span>project
          </span>
        </div>
      </header>

      <main>
        <DemoApplyHero />
        <DemoApplyCriteria />

        <section id="aplicacion" className="border-b border-[var(--demo-line)]">
          <div className="container mx-auto px-4 py-8 sm:py-12 md:py-16 text-center">
             <h2 className="font-display text-4xl font-extrabold uppercase">Cerrado, nos vemos en el próximo</h2>
          </div>
        </section>
      </main>
    </div>
  );
}
