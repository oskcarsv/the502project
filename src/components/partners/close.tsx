import { getTranslations } from "next-intl/server";
import { Reveal } from "@/components/demo-day/reveal";
import { PartnerCtas } from "./ctas";

export async function PartnersClose() {
  const t = await getTranslations("Partners");

  return (
    <section className="relative overflow-hidden bg-brand-dark text-white">
      <span
        aria-hidden
        className="pointer-events-none absolute -left-[8vw] bottom-[-6vw] select-none font-display text-[min(32vw,16rem)] font-extrabold leading-none tracking-tighter text-white/[0.03] sm:text-[32vw]"
      >
        502
      </span>

      <div className="container relative mx-auto px-4 py-20 text-center sm:py-28 md:py-36 lg:py-40">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-green">
            {t("close.cta_eyebrow")}
          </p>
          <h2 className="mx-auto mt-4 max-w-3xl font-display text-[clamp(2rem,7vw,4.5rem)] font-bold leading-[0.98] tracking-tight sm:mt-5 sm:text-5xl md:text-6xl lg:text-7xl">
            {t("close.cta_title")}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/70 sm:mt-6 sm:text-lg">
            {t("close.cta_body")}
          </p>
          <div className="mt-8 sm:mt-10">
            <PartnerCtas align="center" />
          </div>
          <p className="mx-auto mt-6 max-w-sm text-center text-[11px] font-semibold uppercase tracking-[0.16em] text-white/70 sm:mt-8 sm:text-xs">
            {t("close.note")}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
