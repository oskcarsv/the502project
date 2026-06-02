import { getTranslations } from "next-intl/server";
import { Reveal } from "@/components/demo-day/reveal";
import { PartnerCtas } from "./ctas";

export async function PartnersHero() {
  const t = await getTranslations("Partners");

  return (
    <section className="relative overflow-hidden border-b border-foreground/10">
      <span
        aria-hidden
        className="pointer-events-none absolute -right-[8vw] -top-[4vw] select-none font-display text-[min(34vw,18rem)] font-extrabold leading-none tracking-tighter text-foreground/[0.03] sm:text-[34vw]"
      >
        502
      </span>
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute inset-x-0 top-[4.5rem] hidden h-px bg-foreground/[0.05] sm:block" />
      </div>

      <div className="container relative mx-auto px-4 pb-10 pt-16 sm:pb-12 sm:pt-24 md:pt-32">
        <div className="max-w-4xl">
          <Reveal>
            <span className="inline-block bg-brand-green px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-brand-dark">
              {t("hero.eyebrow")}
            </span>
          </Reveal>

          <Reveal delay={0.06}>
            <h1 className="mt-5 font-display text-[clamp(2rem,7.5vw,4.5rem)] font-bold leading-[1.05] tracking-tight sm:mt-6 sm:leading-[1.02] md:text-6xl lg:text-7xl">
              {t("hero.title")}
            </h1>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-foreground/70 sm:mt-6 sm:text-lg md:text-xl">
              {t("hero.subline")}
            </p>
          </Reveal>

          <Reveal delay={0.18}>
            <div className="mt-8 sm:mt-10">
              <PartnerCtas />
            </div>
          </Reveal>
        </div>
      </div>

      <div className="relative border-t border-foreground/10">
        <div className="container mx-auto px-4 py-4 sm:py-5">
          <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-foreground/80 sm:text-xs">
            {t("hero.scarcity")}
          </span>
        </div>
      </div>
    </section>
  );
}
