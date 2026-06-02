import { getTranslations } from "next-intl/server";
import { CalTrigger } from "@/components/cal-trigger";

/** Primary apply action: opens the Cal.com exploration call. */
export async function PartnerCtas({
  align = "start",
}: {
  align?: "start" | "center";
}) {
  const t = await getTranslations("Partners");

  return (
    <div className={align === "center" ? "flex justify-center" : undefined}>
      <CalTrigger className="group inline-flex h-12 w-full items-center justify-center gap-2 rounded-md bg-brand-green px-6 text-sm font-semibold text-brand-dark transition-colors hover:bg-brand-green/85 hover:text-brand-dark sm:w-auto [&_svg]:text-current">
        {t("apply_label")}
      </CalTrigger>
    </div>
  );
}
