import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { DEMO_DAY } from "@/lib/demo-day";

/** Minimal floating CTA. No navbar; this is the only persistent action. */
export function DemoApplyFab() {
  return (
    <Link
      href={DEMO_DAY.applyUrl}
      className="group fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 bg-[var(--demo-accent)] px-5 py-3 font-space text-xs font-bold uppercase tracking-[0.14em] text-[var(--demo-bg)] shadow-[0_8px_30px_rgba(0,0,0,0.4)] transition-transform hover:-translate-y-0.5 sm:px-6 sm:py-4 sm:text-sm"
    >
      Aplicar
      <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </Link>
  );
}
