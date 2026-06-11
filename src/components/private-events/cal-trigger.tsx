"use client";

import * as React from "react";
import { ArrowRight } from "lucide-react";
import { getCalApi } from "@calcom/embed-react";
import { PRIVATE_EVENTS_CORPORATE_CAL } from "@/lib/private-events";
import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  className?: string;
};

export function PrivateEventsCalTrigger({ children, className }: Props) {
  const { namespace, link } = PRIVATE_EVENTS_CORPORATE_CAL;

  React.useEffect(() => {
    (async () => {
      const cal = await getCalApi({ namespace });
      cal("ui", {
        hideEventTypeDetails: false,
        layout: "month_view",
        theme: "light",
        cssVarsPerTheme: {
          dark: {
            "cal-brand": "#56ef9f",
            "cal-brand-emphasis": "#56ef9f",
            "cal-brand-text": "#000000",
          },
          light: {
            "cal-brand": "#56ef9f",
            "cal-brand-emphasis": "#56ef9f",
            "cal-brand-text": "#000000",
          },
        },
        styles: { branding: { brandColor: "#56ef9f" } },
      });
    })();
  }, [namespace]);

  return (
    <button
      type="button"
      data-cal-namespace={namespace}
      data-cal-link={link}
      data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true"}'
      className={cn(
        "group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[color:var(--ws-accent)] px-7 text-sm font-semibold text-white transition-opacity hover:opacity-90",
        className,
      )}
    >
      {children}
      <ArrowRight className="size-4" />
    </button>
  );
}
