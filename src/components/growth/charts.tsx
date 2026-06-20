"use client";

import { useMemo } from "react";
import { formatMonthLabel, type GrowthSnapshot } from "@/lib/growth";

type Point = { x: number; y: number; label: string; value: number };

function buildPoints(
  snapshots: GrowthSnapshot[],
  width: number,
  height: number,
  padding: { top: number; right: number; bottom: number; left: number },
  locale: "es" | "en",
): Point[] {
  const values = snapshots.map((s) => s.members);
  const min = Math.min(...values) * 0.85;
  const max = Math.max(...values) * 1.05;
  const range = max - min || 1;
  const innerW = width - padding.left - padding.right;
  const innerH = height - padding.top - padding.bottom;

  return snapshots.map((snap, i) => {
    const x =
      padding.left +
      (snapshots.length === 1 ? innerW / 2 : (i / (snapshots.length - 1)) * innerW);
    const y = padding.top + innerH - ((snap.members - min) / range) * innerH;
    return {
      x,
      y,
      label: formatMonthLabel(snap.month, locale),
      value: snap.members,
    };
  });
}

function linePath(points: Point[]): string {
  return points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
}

function areaPath(points: Point[], baseline: number): string {
  if (points.length === 0) return "";
  const first = points[0];
  const last = points[points.length - 1];
  return [
    `M ${first.x} ${baseline}`,
    ...points.map((p) => `L ${p.x} ${p.y}`),
    `L ${last.x} ${baseline}`,
    "Z",
  ].join(" ");
}

export function MembersLineChart({
  snapshots,
  locale,
}: {
  snapshots: GrowthSnapshot[];
  locale: "es" | "en";
}) {
  const width = 900;
  const height = 320;
  const padding = { top: 24, right: 24, bottom: 48, left: 56 };
  const baseline = height - padding.bottom;

  const points = useMemo(
    () => buildPoints(snapshots, width, height, padding, locale),
    [snapshots, locale, padding.bottom, padding.left, padding.right, padding.top],
  );

  const path = linePath(points);
  const area = areaPath(points, baseline);

  const yTicks = useMemo(() => {
    const values = snapshots.map((s) => s.members);
    const min = Math.min(...values) * 0.85;
    const max = Math.max(...values) * 1.05;
    const step = Math.ceil((max - min) / 4 / 50) * 50;
    const ticks: number[] = [];
    for (let v = Math.floor(min / step) * step; v <= max; v += step) {
      ticks.push(v);
    }
    return ticks;
  }, [snapshots]);

  const innerH = height - padding.top - padding.bottom;
  const minVal = yTicks[0] ?? 0;
  const maxVal = yTicks[yTicks.length - 1] ?? 1;
  const range = maxVal - minVal || 1;

  return (
    <div className="w-full overflow-x-auto">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="min-w-[640px] w-full"
        role="img"
        aria-label="Community member growth over time"
      >
        <defs>
          <linearGradient id="growthArea" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#56ef9f" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#56ef9f" stopOpacity="0.02" />
          </linearGradient>
        </defs>

        {yTicks.map((tick) => {
          const y = padding.top + innerH - ((tick - minVal) / range) * innerH;
          return (
            <g key={tick}>
              <line
                x1={padding.left}
                y1={y}
                x2={width - padding.right}
                y2={y}
                stroke="currentColor"
                strokeOpacity={0.08}
              />
              <text
                x={padding.left - 10}
                y={y + 4}
                textAnchor="end"
                className="fill-foreground/45 text-[11px]"
              >
                {tick}
              </text>
            </g>
          );
        })}

        <path d={area} fill="url(#growthArea)" />
        <path
          d={path}
          fill="none"
          stroke="#56ef9f"
          strokeWidth={3}
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {points.map((p, i) => {
          const snap = snapshots[i];
          const isConfirmed = snap.confirmed !== false;
          return (
            <g key={snap.month}>
              <circle
                cx={p.x}
                cy={p.y}
                r={6}
                fill={isConfirmed ? "#56ef9f" : "#ffffff"}
                stroke="#56ef9f"
                strokeWidth={2}
              />
              <text
                x={p.x}
                y={baseline + 22}
                textAnchor="middle"
                className="fill-foreground/60 text-[11px] font-medium"
              >
                {p.label}
              </text>
              <text
                x={p.x}
                y={p.y - 12}
                textAnchor="middle"
                className="fill-foreground text-[11px] font-semibold"
              >
                {p.value}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

export function NetNewBarChart({
  snapshots,
  netNew,
  locale,
}: {
  snapshots: GrowthSnapshot[];
  netNew: number[];
  locale: "es" | "en";
}) {
  const max = Math.max(...netNew, 1);

  return (
    <div className="flex h-56 items-end justify-between gap-2 sm:gap-3">
      {snapshots.map((snap, i) => {
        const value = netNew[i];
        const heightPct = (value / max) * 100;
        const isConfirmed = snap.confirmed !== false;

        return (
          <div
            key={snap.month}
            className="flex min-w-0 flex-1 flex-col items-center justify-end gap-2"
          >
            <span className="text-xs font-semibold text-foreground/80">
              +{value}
            </span>
            <div
              className="relative w-full max-w-[56px] rounded-t-md transition-all"
              style={{
                height: `${Math.max(heightPct, 8)}%`,
                backgroundColor: isConfirmed ? "#56ef9f" : "rgba(86,239,159,0.35)",
                border: isConfirmed ? "none" : "1px dashed rgba(86,239,159,0.8)",
              }}
              title={snap.note}
            />
            <span className="text-[10px] font-medium uppercase tracking-wide text-foreground/50 sm:text-[11px]">
              {formatMonthLabel(snap.month, locale)}
            </span>
          </div>
        );
      })}
    </div>
  );
}
