import { getTranslations } from "next-intl/server";
import { WorkshopLabel } from "@/components/private-events/label";

export async function PrivateEventsContext() {
  const t = await getTranslations("PrivateEvents");

  return (
    <section className="border-t border-[color:var(--ws-line)]">
      <div className="container mx-auto px-4 py-10 sm:py-14">
        <div className="mx-auto max-w-3xl">
          <WorkshopLabel>{t("context_eyebrow")}</WorkshopLabel>
          <p className="mt-4 text-base leading-relaxed text-[color:var(--ws-muted)] sm:text-lg">
            {t("context_body")}
          </p>
        </div>
      </div>
    </section>
  );
}
