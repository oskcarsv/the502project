import { getTranslations } from "next-intl/server";
import { Reveal } from "@/components/demo-day/reveal";

const PILLARS = ["gather", "produce", "connect"] as const;

export async function PartnersMission() {
  const t = await getTranslations("Partners");

  return (
    <section className="border-b border-foreground/10 bg-foreground/[0.02]">
      <div className="container mx-auto px-4 py-16 sm:py-24 md:py-32">
        <div className="flex flex-col gap-10 lg:grid lg:grid-cols-12 lg:items-start lg:gap-12 xl:gap-16">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-green">
                {t("mission.eyebrow")}
              </p>
              <h2 className="mt-4 font-display text-3xl font-bold leading-[1.08] tracking-tight sm:mt-5 sm:text-4xl lg:text-[2.75rem] lg:leading-[1.05] xl:text-5xl">
                {t("mission.title")}
              </h2>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <div className="overflow-hidden rounded-2xl border border-foreground/10">
              <div className="flex flex-col divide-y divide-foreground/10 md:grid md:grid-cols-2 md:divide-x md:divide-y-0 lg:grid-cols-3 lg:divide-x">
                {PILLARS.map((key, i) => (
                  <Reveal
                    key={key}
                    delay={i * 0.08}
                    className={`flex flex-col gap-3 bg-background p-6 sm:p-7 ${
                      i === 2 ? "md:col-span-2 lg:col-span-1" : ""
                    }`}
                  >
                    <span className="font-mono text-sm font-bold text-brand-green">
                      {`0${i + 1}`}
                    </span>
                    <h3 className="font-display text-lg font-bold leading-tight tracking-tight sm:text-xl">
                      {t(`mission.pillars.${key}.title`)}
                    </h3>
                    <p className="text-sm leading-relaxed text-foreground/65 sm:text-base">
                      {t(`mission.pillars.${key}.body`)}
                    </p>
                  </Reveal>
                ))}
              </div>
            </div>

            <Reveal delay={0.12}>
              <p className="mt-6 font-display text-lg font-bold leading-snug tracking-tight text-brand-dark sm:mt-8 sm:text-xl lg:text-2xl">
                {t("mission.kicker")}
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
