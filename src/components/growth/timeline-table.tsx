import { formatMonthLabel, type GrowthMilestone } from "@/lib/growth";

function formatDate(date: string, locale: "es" | "en"): string {
  const d = new Date(`${date}T12:00:00`);
  return d.toLocaleDateString(locale === "es" ? "es-GT" : "en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function GrowthTimeline({
  milestones,
  locale,
  title,
  membersLabel,
  attendeesLabel,
}: {
  milestones: GrowthMilestone[];
  locale: "es" | "en";
  title: string;
  membersLabel: string;
  attendeesLabel: string;
}) {
  return (
    <section>
      <h2 className="mb-6 font-display text-2xl font-bold tracking-tight sm:text-3xl">
        {title}
      </h2>
      <ol className="relative space-y-0 border-l border-foreground/10 pl-6">
        {milestones.map((m, i) => (
          <li key={m.date} className="relative pb-8 last:pb-0">
            <span
              className="absolute -left-[7px] top-1.5 size-3 rounded-full bg-brand-green ring-4 ring-background"
              aria-hidden
            />
            <time className="text-xs font-semibold uppercase tracking-[0.14em] text-foreground/45">
              {formatDate(m.date, locale)}
            </time>
            <h3 className="mt-1 font-display text-lg font-bold tracking-tight">
              {m.title}
            </h3>
            <p className="mt-1 max-w-2xl text-sm leading-relaxed text-foreground/65">
              {m.description}
            </p>
            {(m.members ?? m.eventAttendees) != null && (
              <p className="mt-2 text-sm font-semibold text-brand-dark">
                {m.members != null &&
                  `${m.members.toLocaleString()} ${membersLabel}`}
                {m.members != null && m.eventAttendees != null && " · "}
                {m.eventAttendees != null &&
                  `${m.eventAttendees.toLocaleString()} ${attendeesLabel}`}
              </p>
            )}
            {i === milestones.length - 1 ? null : null}
          </li>
        ))}
      </ol>
    </section>
  );
}

export function GrowthTable({
  snapshots,
  netNew,
  locale,
  headers,
}: {
  snapshots: ReturnType<typeof import("@/lib/growth").getSnapshots>;
  netNew: number[];
  locale: "es" | "en";
  headers: {
    month: string;
    members: string;
    netNew: string;
    events: string;
    status: string;
    note: string;
    confirmed: string;
    estimated: string;
  };
}) {
  return (
    <div className="overflow-x-auto border border-foreground/10">
      <table className="w-full min-w-[640px] text-left text-sm">
        <thead>
          <tr className="border-b border-foreground/10 bg-foreground/[0.03]">
            <th className="px-4 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-foreground/55">
              {headers.month}
            </th>
            <th className="px-4 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-foreground/55">
              {headers.members}
            </th>
            <th className="px-4 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-foreground/55">
              {headers.netNew}
            </th>
            <th className="px-4 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-foreground/55">
              {headers.events}
            </th>
            <th className="px-4 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-foreground/55">
              {headers.status}
            </th>
            <th className="px-4 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-foreground/55">
              {headers.note}
            </th>
          </tr>
        </thead>
        <tbody>
          {snapshots.map((snap, i) => (
            <tr
              key={snap.month}
              className="border-b border-foreground/5 last:border-b-0"
            >
              <td className="px-4 py-3 font-medium">
                {formatMonthLabel(snap.month, locale)}
              </td>
              <td className="px-4 py-3 font-display text-base font-bold">
                {snap.members.toLocaleString()}
              </td>
              <td className="px-4 py-3 text-brand-dark">
                +{netNew[i].toLocaleString()}
              </td>
              <td className="px-4 py-3 text-foreground/70">
                {snap.events ?? "—"}
              </td>
              <td className="px-4 py-3">
                <span
                  className={
                    snap.confirmed
                      ? "inline-flex rounded-full bg-brand-green/20 px-2.5 py-0.5 text-xs font-semibold text-brand-dark"
                      : "inline-flex rounded-full bg-foreground/5 px-2.5 py-0.5 text-xs font-semibold text-foreground/55"
                  }
                >
                  {snap.confirmed ? headers.confirmed : headers.estimated}
                </span>
              </td>
              <td className="max-w-xs px-4 py-3 text-foreground/60">
                {snap.note ?? "—"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
