"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "motion/react";

/** Splits a value like "+600" into prefix "+", number 600, suffix "". */
const NUMERIC = /^(\D*?)(\d[\d,]*)(.*)$/;

/**
 * Animated metric. Numbers count up from 0 once scrolled into view; values
 * with no numeric part (e.g. "Engineers, entrepreneurs, founders") render as-is.
 * Honors prefers-reduced-motion by showing the final value immediately.
 */
export function MetricValue({
  value,
  className,
}: {
  value: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-12%" });
  const reduce = useReducedMotion();

  const match = value.match(NUMERIC);
  const target = match ? Number.parseInt(match[2].replace(/,/g, ""), 10) : null;
  const [n, setN] = useState(0);

  useEffect(() => {
    if (target === null || reduce || !inView) return;
    const controls = animate(0, target, {
      duration: 1.2,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setN(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, target, reduce]);

  if (target === null || match === null) {
    return (
      <span ref={ref} className={className}>
        {value}
      </span>
    );
  }

  // Reduced motion shows the final value immediately; otherwise count up.
  const shown = reduce ? target : n;
  return (
    <span ref={ref} className={className}>
      {match[1]}
      {shown.toLocaleString("en-US")}
      {match[3]}
    </span>
  );
}
