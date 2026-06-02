import { existsSync, readdirSync } from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { DEMO_PARTNERS } from "@/lib/demo-day";
import { SITE } from "@/lib/site";
import { DemoHero } from "@/components/demo-day/hero";
import { DemoMarquee } from "@/components/demo-day/marquee";
import { DemoAbout } from "@/components/demo-day/about";
import { DemoStats } from "@/components/demo-day/stats";
import { DemoWho } from "@/components/demo-day/who";
import { DemoCountdown } from "@/components/demo-day/countdown";
import { DemoBarrilete } from "@/components/demo-day/barrilete";
import { DemoNotionBlock } from "@/components/demo-day/notion-block";
import { DemoClosing } from "@/components/demo-day/closing";
import { DemoOutro } from "@/components/demo-day/outro";
import { DemoApplyFab } from "@/components/demo-day/apply-fab";

const TITLE = "502 Demo Day · Edición 1 · con Barrilete Ventures";
const DESCRIPTION =
  "El primer Demo Day del 502: 20 startups guatemaltecas que ya están construyendo se preparan un día con mentores y herramientas, y pitchean ante Barrilete Ventures, el primer fondo ángel de Guatemala.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: "/demo-day",
  },
  openGraph: {
    type: "website",
    siteName: SITE.name,
    title: TITLE,
    description: DESCRIPTION,
    url: `${SITE.url}/demo-day`,
    locale: "es_GT",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

/**
 * Resolve official logos dropped into /public/logos/, matched by partner id
 * with any image extension (svg, png, webp, jpg). Returns the public path or
 * null so the slot falls back to a text wordmark.
 */
function resolveLogos(): Record<string, string | null> {
  const dir = path.join(process.cwd(), "public", "logos");
  const files = existsSync(dir) ? readdirSync(dir) : [];
  return Object.fromEntries(
    DEMO_PARTNERS.map((p) => {
      const match = files.find(
        (f) =>
          /\.(svg|png|webp|jpe?g|avif)$/i.test(f) &&
          f.toLowerCase().startsWith(`${p.id.toLowerCase()}.`),
      );
      return [p.id, match ? `/logos/${match}` : null];
    }),
  );
}

export default async function DemoDayPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const logos = resolveLogos();

  return (
    <div className="demo-surface min-h-screen overflow-x-clip">
      <main>
        <DemoHero />
        <DemoMarquee variant="dark" />
        <DemoBarrilete logoSrc={logos.barrilete} />
        <DemoAbout />
        <DemoStats />
        <DemoWho />
        <DemoNotionBlock
          notionLogoSrc={logos.notion}
          codexLogoSrc={logos.codex}
        />
        <DemoCountdown />
        <DemoMarquee />
        <DemoClosing />
      </main>
      <DemoOutro />
      <DemoApplyFab />
    </div>
  );
}
