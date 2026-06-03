import { getTranslations } from "next-intl/server";
import { WorkshopLabel } from "@/components/private-events/label";
import { PrivateEventsCalTrigger } from "@/components/private-events/cal-trigger";

export async function PrivateEventsCorporate() {
  const t = await getTranslations("PrivateEvents");

  return (
    <section
      id="empresas"
      className="scroll-mt-16 border-t-2 border-[color:var(--ws-accent)]/40 bg-[color:var(--ws-elevated)]"
    >
      <div className="container mx-auto px-4 py-16 sm:py-20">
        <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-16">
          <div>
            <WorkshopLabel>{t("corporate_eyebrow")}</WorkshopLabel>
            <h2 className="mt-4 font-display text-3xl font-bold leading-[1.08] tracking-tight text-[color:var(--ws-fg)] sm:text-4xl md:text-5xl">
              {t("corporate_title")}
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-[color:var(--ws-muted)]">
              {t("corporate_body")}
            </p>
            <ul className="mt-8 space-y-3 text-base text-[color:var(--ws-fg)] sm:text-lg">
              <li className="flex gap-3">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-[color:var(--ws-accent)]" />
                {t("corporate_bullet_1")}
              </li>
              <li className="flex gap-3">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-[color:var(--ws-accent)]" />
                {t("corporate_bullet_2")}
              </li>
            </ul>
          </div>
          <div className="flex flex-col gap-4 lg:items-end lg:pb-1">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[color:var(--ws-muted)] lg:text-right">
              {t("corporate_cta_hint")}
            </p>
            <PrivateEventsCalTrigger className="w-full sm:w-auto lg:min-w-[240px]">
              {t("corporate_cta")}
            </PrivateEventsCalTrigger>
          </div>
        </div>
      </div>
    </section>
  );
}
