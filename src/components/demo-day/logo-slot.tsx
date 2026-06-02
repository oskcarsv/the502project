import Image from "next/image";
import type { DemoPartner } from "@/lib/demo-day";
import { cn } from "@/lib/utils";

/**
 * Renders the official logo when the file exists in /public/logos/, otherwise
 * a clean text wordmark fallback. We never reproduce partner marks
 * ourselves; the slot just waits for the real asset to be dropped in.
 */
export function LogoSlot({
  partner,
  src,
  className,
  boxClassName,
}: {
  partner: DemoPartner;
  src: string | null;
  className?: string;
  /** Fixed-size flex box so mixed aspect-ratio marks read at the same height. */
  boxClassName?: string;
}) {
  if (src) {
    const image = (
      <Image
        src={src}
        alt={partner.name}
        width={520}
        height={140}
        className={
          boxClassName
            ? cn("max-h-full max-w-full object-contain", className)
            : (className ?? "h-8 w-auto")
        }
        priority
      />
    );

    // Logos live on full-bleed green panels: dark lockups read perfectly on
    // the brand green, so we render the mark bare, no chip.
    if (boxClassName) {
      return (
        <span
          className={cn(
            "inline-flex shrink-0 items-center justify-center",
            boxClassName,
          )}
        >
          {image}
        </span>
      );
    }

    return image;
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
