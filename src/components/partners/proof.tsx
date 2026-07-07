import { getTranslations } from "next-intl/server";
import { Reveal } from "@/components/demo-day/reveal";
import { MetricValue } from "./metric-value";

/*
 * TRACK-RECORD METRICS (proof of momentum).
 * The `value` strings are PLACEHOLDERS. Edit them in the messages files under
 * `Partners.proof.items.<key>.value` (es.json and en.json):
 *   - members.value   → total builders in the community (referential)
 *   - events.value    → events organized to date (referential: +25)
 *   - attendees.value → total attendees across events (referential: +1500)
 * Audience makeup lives in `Partners.proof.audience_value` (free text).
 * Numeric values count up on scroll; text renders as-is.
 */
const ITEM_KEYS = ["members", "events", "attendees"] as const;

export async function PartnersProof() {
  const t = await getTranslations("Partners");

  return (
    <section className="overflow-hidden bg-brand-dark text-white">
      <div className="container mx-auto px-4 py-16 sm:py-24 md:py-32">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-green">
            {t("proof.eyebrow")}
          </p>
          <h2 className="mt-4 max-w-3xl font-display text-3xl font-bold leading-[1.1] tracking-tight sm:text-4xl md:text-5xl">
            {t("proof.title")}
          </h2>
        </Reveal>

        <div className="mt-10 grid border-t border-white/15 sm:mt-14 md:grid-cols-3">
          {ITEM_KEYS.map((key, i) => (
            <Reveal
              key={key}
              delay={i * 0.1}
              className="flex flex-col border-b border-white/10 py-7 last:border-b-0 md:border-b-0 md:border-l md:px-6 md:py-10 lg:px-8 md:[&:first-child]:border-l-0 md:[&:first-child]:pl-0"
            >
              <MetricValue
                value={t(`proof.items.${key}.value`)}
                className="font-display text-[clamp(2.75rem,12vw,7rem)] font-bold leading-[0.85] tracking-tight text-brand-green"
              />
              <span className="mt-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/60 sm:mt-4 sm:text-xs md:text-sm">
                {t(`proof.items.${key}.label`)}
              </span>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className="mt-8 flex flex-col gap-3 border-t border-white/15 pt-7 sm:mt-10 sm:flex-row sm:items-start sm:justify-between sm:gap-6 sm:pt-8 md:items-baseline">
            <span className="shrink-0 text-xs font-semibold uppercase tracking-[0.18em] text-brand-green">
              {t("proof.audience_label")}
            </span>
            <span className="font-display text-lg font-bold leading-snug tracking-tight text-white sm:text-right sm:text-xl md:text-2xl lg:max-w-[65%]">
              {t("proof.audience_value")}
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
