import { getLocale, getTranslations } from "next-intl/server";
import { WorkshopLabel } from "@/components/private-events/label";
import { localizedPrivateList, type PrivateEvent } from "@/lib/private-events";

type Props = { event: PrivateEvent };

export async function PrivateEventOutcome({ event }: Props) {
  const t = await getTranslations("PrivateEvents");
  const locale = await getLocale();
  const items = localizedPrivateList(locale, event.outcomes, event.outcomesEn);

  return (
    <section className="border-t border-[color:var(--ws-line)]">
      <div className="container mx-auto max-w-3xl px-4 py-14 sm:py-16">
        <WorkshopLabel>{t("outcome_eyebrow")}</WorkshopLabel>
        <div className="mt-6 space-y-5">
          {items.map((item, i) => (
            <p
              key={i}
              className="border-l-2 border-[color:var(--ws-accent)] pl-5 font-display text-xl font-semibold leading-snug tracking-tight text-[color:var(--ws-fg)] sm:text-2xl"
            >
              {item}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
