import growthData from "../../content/growth.json";

export type GrowthSnapshot = {
  month: string;
  members: number;
  events?: number;
  eventAttendees?: number;
  sponsors?: number;
  note?: string;
  source?: string;
  confirmed?: boolean;
};

export type GrowthMilestone = {
  date: string;
  title: string;
  description: string;
  members?: number;
  eventAttendees?: number;
};

export type GrowthSummary = {
  totalMembers: number;
  totalGrowth: number;
  growthPercent: number;
  monthsActive: number;
  avgMonthlyGrowth: number;
  totalEvents: number;
  confirmedSnapshots: number;
  estimatedSnapshots: number;
};

const MONTH_LABELS_ES: Record<string, string> = {
  "01": "Ene",
  "02": "Feb",
  "03": "Mar",
  "04": "Abr",
  "05": "May",
  "06": "Jun",
  "07": "Jul",
  "08": "Ago",
  "09": "Sep",
  "10": "Oct",
  "11": "Nov",
  "12": "Dic",
};

const MONTH_LABELS_EN: Record<string, string> = {
  "01": "Jan",
  "02": "Feb",
  "03": "Mar",
  "04": "Apr",
  "05": "May",
  "06": "Jun",
  "07": "Jul",
  "08": "Aug",
  "09": "Sep",
  "10": "Oct",
  "11": "Nov",
  "12": "Dec",
};

export function getGrowthData() {
  return growthData;
}

export function getSnapshots(): GrowthSnapshot[] {
  return growthData.snapshots.slice().sort((a, b) => a.month.localeCompare(b.month));
}

export function getMilestones(): GrowthMilestone[] {
  return growthData.milestones.slice().sort((a, b) => a.date.localeCompare(b.date));
}

export function formatMonthLabel(month: string, locale: "es" | "en" = "es"): string {
  const [year, monthNum] = month.split("-");
  const labels = locale === "es" ? MONTH_LABELS_ES : MONTH_LABELS_EN;
  return `${labels[monthNum] ?? monthNum} ${year.slice(2)}`;
}

export function getNetNewMembers(snapshots: GrowthSnapshot[]): number[] {
  return snapshots.map((snap, i) => {
    if (i === 0) return snap.members;
    return snap.members - snapshots[i - 1].members;
  });
}

export function getGrowthSummary(snapshots: GrowthSnapshot[]): GrowthSummary {
  if (snapshots.length === 0) {
    return {
      totalMembers: 0,
      totalGrowth: 0,
      growthPercent: 0,
      monthsActive: 0,
      avgMonthlyGrowth: 0,
      totalEvents: 0,
      confirmedSnapshots: 0,
      estimatedSnapshots: 0,
    };
  }

  const first = snapshots[0];
  const last = snapshots[snapshots.length - 1];
  const totalGrowth = last.members - first.members;
  const growthPercent = first.members > 0 ? (totalGrowth / first.members) * 100 : 0;
  const totalEvents = snapshots.reduce((sum, s) => sum + (s.events ?? 0), 0);

  return {
    totalMembers: last.members,
    totalGrowth,
    growthPercent,
    monthsActive: snapshots.length,
    avgMonthlyGrowth: Math.round(totalGrowth / Math.max(snapshots.length - 1, 1)),
    totalEvents,
    confirmedSnapshots: snapshots.filter((s) => s.confirmed).length,
    estimatedSnapshots: snapshots.filter((s) => !s.confirmed).length,
  };
}
