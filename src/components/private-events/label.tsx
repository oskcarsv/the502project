import type { ReactNode } from "react";

export function WorkshopLabel({ children }: { children: ReactNode }) {
  return (
    <p className="font-mono text-[10px] uppercase tracking-[0.26em] text-[color:var(--ws-muted)] sm:text-[11px]">
      {children}
    </p>
  );
}
