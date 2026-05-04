"use client";

import * as React from "react";
import { ArrowRight } from "lucide-react";
import { getCalApi } from "@calcom/embed-react";
import { cn } from "@/lib/utils";

const NAMESPACE = "the-502-project-corporate-labs";
const CAL_LINK = "nura-labs/the-502-project-corporate-labs";

type Props = {
  children: React.ReactNode;
  className?: string;
};

export function CalTrigger({ children, className }: Props) {
  React.useEffect(() => {
    (async () => {
      const cal = await getCalApi({ namespace: NAMESPACE });
      cal("ui", {
        hideEventTypeDetails: false,
        layout: "month_view",
        theme: "dark",
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
  }, []);

  return (
    <button
      type="button"
      data-cal-namespace={NAMESPACE}
      data-cal-link={CAL_LINK}
      data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true"}'
      className={cn(
        "group inline-flex items-center gap-2 text-sm font-medium tracking-tight text-foreground transition-colors hover:text-brand-green",
        className,
      )}
    >
      {children}
      <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
    </button>
  );
}
