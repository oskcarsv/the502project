import { MembersLineChart, NetNewBarChart } from "./charts";
import { GrowthStats } from "./stats";
import { GrowthTable, GrowthTimeline } from "./timeline-table";
import {
  getGrowthData,
  getGrowthSummary,
  getMilestones,
  getNetNewMembers,
  getSnapshots,
} from "@/lib/growth";

type GrowthCanvasProps = {
  locale: "es" | "en";
  copy: {
    eyebrow: string;
    title: string;
    subtitle: string;
    membersChartTitle: string;
    netNewChartTitle: string;
    tableTitle: string;
    timelineTitle: string;
    howToTitle: string;
    howToSteps: string[];
    dataNote: string;
    stats: {
      members: { label: string };
      growth: { label: string };
      avgMonthly: { label: string };
      months: { label: string };
    };
    table: {
      month: string;
      members: string;
      netNew: string;
      events: string;
      status: string;
      note: string;
      confirmed: string;
      estimated: string;
    };
    legend: {
      confirmed: string;
      estimated: string;
    };
    milestoneMembers: string;
    milestoneAttendees: string;
  };
};

export function GrowthCanvas({ locale, copy }: GrowthCanvasProps) {
  const data = getGrowthData();
  const snapshots = getSnapshots();
  const milestones = getMilestones();
  const netNew = getNetNewMembers(snapshots);
  const summary = getGrowthSummary(snapshots);

  return (
    <div className="bg-background text-foreground">
      {/* Hero band — presentation-ready canvas header */}
      <section className="border-b border-foreground/10 bg-brand-dark text-white">
        <div className="container mx-auto px-4 py-16 sm:py-24">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-green">
            {copy.eyebrow}
          </p>
          <h1 className="mt-4 max-w-4xl font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
            {copy.title}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg">
            {copy.subtitle}
          </p>
          <p className="mt-6 text-xs text-white/40">
            {copy.dataNote} · {data.meta.lastUpdated}
          </p>
        </div>
      </section>

      <div className="container mx-auto space-y-16 px-4 py-12 sm:py-16">
        <GrowthStats
          summary={summary}
          labels={{
            members: { value: String(summary.totalMembers), label: copy.stats.members.label },
            growth: { value: String(summary.totalGrowth), label: copy.stats.growth.label },
            avgMonthly: {
              value: String(summary.avgMonthlyGrowth),
              label: copy.stats.avgMonthly.label,
            },
            months: { value: String(summary.monthsActive), label: copy.stats.months.label },
          }}
        />

        <section className="grid gap-8 lg:grid-cols-5">
          <div className="border border-foreground/10 p-6 lg:col-span-3">
            <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
              <h2 className="font-display text-xl font-bold tracking-tight sm:text-2xl">
                {copy.membersChartTitle}
              </h2>
              <div className="flex gap-4 text-xs text-foreground/55">
                <span className="flex items-center gap-1.5">
                  <span className="size-2.5 rounded-full bg-brand-green" />
                  {copy.legend.confirmed}
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="size-2.5 rounded-full border border-brand-green bg-white" />
                  {copy.legend.estimated}
                </span>
              </div>
            </div>
            <MembersLineChart snapshots={snapshots} locale={locale} />
          </div>

          <div className="border border-foreground/10 p-6 lg:col-span-2">
            <h2 className="mb-6 font-display text-xl font-bold tracking-tight sm:text-2xl">
              {copy.netNewChartTitle}
            </h2>
            <NetNewBarChart snapshots={snapshots} netNew={netNew} locale={locale} />
          </div>
        </section>

        <section>
          <h2 className="mb-6 font-display text-2xl font-bold tracking-tight sm:text-3xl">
            {copy.tableTitle}
          </h2>
          <GrowthTable
            snapshots={snapshots}
            netNew={netNew}
            locale={locale}
            headers={copy.table}
          />
        </section>

        <div className="grid gap-12 lg:grid-cols-2">
          <GrowthTimeline
            milestones={milestones}
            locale={locale}
            title={copy.timelineTitle}
            membersLabel={copy.milestoneMembers}
            attendeesLabel={copy.milestoneAttendees}
          />

          <section className="border border-brand-green/30 bg-brand-green/5 p-6 sm:p-8">
            <h2 className="font-display text-xl font-bold tracking-tight sm:text-2xl">
              {copy.howToTitle}
            </h2>
            <ol className="mt-5 space-y-3">
              {copy.howToSteps.map((step, i) => (
                <li
                  key={step}
                  className="flex gap-3 text-sm leading-relaxed text-foreground/75"
                >
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-brand-green text-xs font-bold text-brand-dark">
                    {i + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
            <p className="mt-6 rounded-md border border-foreground/10 bg-background px-4 py-3 font-mono text-xs text-foreground/60">
              content/growth.json
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
