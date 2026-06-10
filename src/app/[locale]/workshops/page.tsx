import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { SITE } from "@/lib/site";
import { PrivateEventsHero } from "@/components/private-events/hero";
import { PrivateEventsContext } from "@/components/private-events/context";
import { PrivateEventsEditions } from "@/components/private-events/editions";
import { PrivateEventsCorporate } from "@/components/private-events/corporate";
import { PrivateEventsClosing } from "@/components/private-events/closing";

const TITLE = "Workshops · The 502 Project";
const DESCRIPTION =
  "Workshops prácticos para aprender a usar la inteligencia artificial en tu negocio, sin necesidad de ser técnico. Grupos pequeños, coffee break y parqueo incluidos.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/workshops" },
  openGraph: {
    type: "website",
    siteName: SITE.name,
    title: TITLE,
    description: DESCRIPTION,
    url: `${SITE.url}/workshops`,
    locale: "es_GT",
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
  robots: { index: false, follow: false },
};

export default async function PrivateEventsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  // Los workshops son solo en español.
  if (locale !== "es") redirect("/workshops");
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
