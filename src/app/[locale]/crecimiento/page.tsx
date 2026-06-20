import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { GrowthCanvas } from "@/components/growth/growth-canvas";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Growth" });

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    robots: { index: false, follow: false },
  };
}

export default async function GrowthPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Growth");

  const copy = {
    eyebrow: t("eyebrow"),
    title: t("title"),
    subtitle: t("subtitle"),
    membersChartTitle: t("membersChartTitle"),
    netNewChartTitle: t("netNewChartTitle"),
    tableTitle: t("tableTitle"),
    timelineTitle: t("timelineTitle"),
    howToTitle: t("howToTitle"),
    howToSteps: t.raw("howToSteps") as string[],
    dataNote: t("dataNote"),
    stats: {
      members: { label: t("stats.members") },
      growth: { label: t("stats.growth") },
      avgMonthly: { label: t("stats.avgMonthly") },
      months: { label: t("stats.months") },
    },
    table: {
      month: t("table.month"),
      members: t("table.members"),
      netNew: t("table.netNew"),
      events: t("table.events"),
      status: t("table.status"),
      note: t("table.note"),
      confirmed: t("table.confirmed"),
      estimated: t("table.estimated"),
    },
    legend: {
      confirmed: t("legend.confirmed"),
      estimated: t("legend.estimated"),
    },
    milestoneMembers: t("milestoneMembers"),
    milestoneAttendees: t("milestoneAttendees"),
  };

  return (
    <>
      <div className="container mx-auto px-4 pt-6">
        <Navbar />
      </div>
      <GrowthCanvas locale={locale as "es" | "en"} copy={copy} />
      <Footer />
    </>
  );
}
