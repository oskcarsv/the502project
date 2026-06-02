import { Check } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { CalTrigger } from "@/components/cal-trigger";
import { Reveal } from "@/components/demo-day/reveal";

const TIERS = [
  { key: "supporter", featured: false },
  { key: "partner", featured: false },
  { key: "lead", featured: true },
] as const;

const BENEFIT_KEYS = ["b1", "b2", "b3", "b4"] as const;

export async function PartnersTiers() {
  const t = await getTranslations("Partners");

  return (
    <section className="border-b border-foreground/10 bg-background">
      <div className="container mx-auto px-4 py-16 sm:py-24 md:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-green">
              {t("tiers.eyebrow")}
            </p>
            <h2 className="mt-4 font-display text-3xl font-bold leading-[1.1] tracking-tight sm:text-4xl md:text-5xl">
              {t("tiers.title")}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-foreground/65 sm:text-lg">
              {t("tiers.intro")}
            </p>
          </Reveal>
        </div>

        <div className="mx-auto mt-10 grid max-w-6xl gap-4 sm:mt-14 sm:gap-5 md:gap-6 lg:mt-16 lg:grid-cols-3">
          {TIERS.map((tier, i) => {
            const featured = tier.featured;
            const ctaClass = featured
              ? "mt-2 inline-flex h-11 w-full items-center justify-center gap-2 rounded-md bg-brand-green px-5 text-sm font-semibold text-brand-dark transition-colors hover:bg-brand-green/85 hover:text-brand-dark sm:w-auto [&_svg]:text-current"
              : "mt-2 inline-flex h-11 w-full items-center justify-center gap-2 rounded-md border border-foreground/15 px-5 text-sm font-semibold text-brand-dark transition-colors hover:border-brand-green hover:bg-brand-green/5 hover:text-brand-dark sm:w-auto [&_svg]:text-current";

            return (
              <Reveal
                key={tier.key}
                delay={i * 0.08}
                className={featured ? "lg:-mt-4" : ""}
              >
                <div
                  className={`flex h-full flex-col gap-5 rounded-2xl border p-6 sm:gap-6 sm:p-7 md:p-8 ${
                    featured
                      ? "border-brand-green/40 bg-brand-dark text-white shadow-[0_24px_60px_-30px_rgba(0,0,0,0.5)]"
                      : "border-foreground/10 bg-background"
                  }`}
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <h3
                      className={`font-display text-xl font-bold tracking-tight sm:text-2xl md:text-3xl ${
                        featured ? "text-white" : "text-brand-dark"
                      }`}
                    >
                      {t(`tiers.items.${tier.key}.name`)}
                    </h3>
                    {featured ? (
                      <span className="inline-block shrink-0 bg-brand-green px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-brand-dark">
                        {t("tiers.featured_label")}
                      </span>
                    ) : null}
                  </div>

                  <span
                    className={`inline-flex w-fit items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] ${
                      featured ? "text-brand-green" : "text-foreground/55"
                    }`}
                  >
                    <span
                      aria-hidden
                      className="size-1.5 rounded-full bg-brand-green"
                    />
                    {t("tiers.spots_label")}
                  </span>

                  <p
                    className={`text-sm leading-relaxed sm:text-base ${
                      featured ? "text-white/70" : "text-foreground/65"
                    }`}
                  >
                    {t(`tiers.items.${tier.key}.audience`)}
                  </p>

                  <ul
                    className={`flex flex-1 flex-col gap-3 border-t pt-5 sm:pt-6 ${
                      featured ? "border-white/10" : "border-foreground/10"
                    }`}
                  >
                    {BENEFIT_KEYS.map((b) => (
                      <li key={b} className="flex gap-3">
                        <Check className="mt-0.5 size-4 shrink-0 text-brand-green" />
                        <span
                          className={`text-sm leading-relaxed ${
                            featured ? "text-white/85" : "text-foreground/75"
                          }`}
                        >
                          {t(`tiers.items.${tier.key}.benefits.${b}`)}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <CalTrigger className={ctaClass}>{t("tiers.cta")}</CalTrigger>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
