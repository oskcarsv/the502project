import Image from "next/image";
import type { DemoPartner } from "@/lib/demo-day";

/**
 * Renders the official logo when the file exists in /public/logos/, otherwise
 * a clean text wordmark fallback. We never reproduce Barrilete or Notion marks
 * ourselves; the slot just waits for the real asset to be dropped in.
 */
export function LogoSlot({
  partner,
  src,
  className,
}: {
  partner: DemoPartner;
  src: string | null;
  className?: string;
}) {
  if (src) {
    // Logos live on full-bleed green panels: dark lockups read perfectly on
    // the brand green, so we render the mark bare, no chip.
    return (
      <Image
        src={src}
        alt={partner.name}
        width={520}
        height={140}
        className={className ?? "h-8 w-auto"}
        priority
      />
    );
  }

  if (partner.id === "502") {
    return (
      <span className="font-display text-xl font-extrabold tracking-tight">
        the<span className="text-[var(--demo-accent)]">502</span>project
      </span>
    );
  }

  return (
    <span className="font-display text-xl font-extrabold tracking-tight">
      {partner.name}
    </span>
  );
}
