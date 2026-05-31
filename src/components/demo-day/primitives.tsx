import type { ReactNode } from "react";
import { BARRILETE_URL } from "@/lib/demo-day";

type Tone = "solid" | "ghost" | "dark";

/** Every "Barrilete Ventures" mention links to their site, styled consistently. */
export function BarrileteLink({
  children = "Barrilete Ventures",
  className,
}: {
  children?: ReactNode;
  className?: string;
}) {
  return (
    <a
      href={BARRILETE_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`underline decoration-current/30 underline-offset-4 transition-[text-decoration-color] hover:decoration-current ${className ?? ""}`}
    >
      {children}
    </a>
  );
}

/** Green highlight box: the recurring editorial label motif. */
export function Tag({
  children,
  tone = "solid",
}: {
  children: ReactNode;
  tone?: Tone;
}) {
  const base =
    "inline-block px-3 py-1 font-space text-xs font-bold uppercase tracking-[0.16em]";

  if (tone === "ghost") {
    return (
      <span
        className={`${base} border border-[var(--demo-accent)] text-[var(--demo-accent)]`}
      >
        {children}
      </span>
    );
  }

  if (tone === "dark") {
    // For use on top of green full-bleed panels.
    return (
      <span className={`${base} bg-[var(--demo-bg)] text-[var(--demo-accent)]`}>
        {children}
      </span>
    );
  }

  return (
    <span className={`${base} bg-[var(--demo-accent)] text-[var(--demo-bg)]`}>
      {children}
    </span>
  );
}
