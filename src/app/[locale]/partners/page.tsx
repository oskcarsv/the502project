import Image from "next/image";
import {
  ArrowRight,
  ArrowUpRight,
  Calendar,
  Handshake,
  Megaphone,
  Sparkles,
  Users,
} from "lucide-react";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { WHATSAPP_INVITE } from "@/lib/links";

const STAT_KEYS = ["members", "events", "sponsors"] as const;
const STAT_ICONS: Record<(typeof STAT_KEYS)[number], React.ElementType> = {
  members: Users,
  events: Calendar,
  sponsors: Handshake,
};

const COLLAB_KEYS = ["sponsor_event", "year_partner", "talent", "co_create"] as const;
const COLLAB_ICONS: Record<(typeof COLLAB_KEYS)[number], React.ElementType> = {
  sponsor_event: Sparkles,
  year_partner: Handshake,
  talent: Users,
  co_create: Megaphone,
};

const TRUSTED_LOGOS = [
  { src: "/img/logos/notion.png", alt: "Notion", className: "h-6 sm:h-9" },
  { src: "/img/logos/cursor.png", alt: "Cursor", className: "h-5 sm:h-8" },
  { src: "/img/logos/v0.png", alt: "v0 by Vercel", className: "h-9 sm:h-12" },
  { src: "/img/logos/finny.png", alt: "Finny", className: "h-6 sm:h-9" },
  { src: "/img/logos/ddr.png", alt: "DDR", className: "h-9 sm:h-12" },
  { src: "/img/logos/uvg.png", alt: "Universidad del Valle", className: "h-9 sm:h-12" },
  { src: "/img/logos/unis.png", alt: "Universidad del Istmo", className: "h-10 sm:h-14" },
  { src: "/img/logos/esource.png", alt: "esource", className: "h-6 sm:h-9" },
];

const PARTNERS_EMAIL = "hello@the502project.com";

export default async function PartnersPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Partners");

  return (
    <>
      <div className="bg-background">
        <div className="container mx-auto px-4">
          <Navbar />
        </div>
      </div>

      <main className="bg-background">
        {/* Hero */}
        <section className="container mx-auto px-4 py-16 sm:py-24 md:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-green">
              {t("eyebrow")}
            </p>
            <h1 className="mt-4 font-display text-3xl font-bold leading-[1.1] tracking-tight sm:text-5xl md:text-6xl">
              {t("title")}
            </h1>
            <p className="mt-5 text-base leading-relaxed text-foreground/70 sm:mt-6 sm:text-lg">
              {t("subline")}
            </p>

            <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:mt-10 sm:flex-row sm:items-center">
              <a
                href={`mailto:${PARTNERS_EMAIL}?subject=${encodeURIComponent(
                  t("email_subject"),
                )}`}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-brand-green px-6 text-sm font-semibold text-brand-dark transition-colors hover:bg-brand-green/85"
              >
                {t("cta_primary")}
                <ArrowRight className="size-4" />
              </a>
              <a
                href={WHATSAPP_INVITE}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-md border border-foreground/15 px-6 text-sm font-semibold text-brand-dark transition-colors hover:border-brand-green hover:bg-brand-green/5"
              >
                {t("cta_secondary")}
                <ArrowUpRight className="size-4" />
              </a>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="bg-background">
          <div className="container mx-auto px-4 pb-16 sm:pb-24 md:pb-32">
            <div className="mx-auto mb-10 max-w-3xl text-center sm:mb-12">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-green">
                {t("stats_eyebrow")}
              </p>
              <h2 className="mt-4 font-display text-2xl font-bold leading-tight tracking-tight sm:text-4xl">
                {t("stats_title")}
              </h2>
            </div>

            <div className="mx-auto grid max-w-6xl md:grid-cols-3">
              {STAT_KEYS.map((key) => {
                const Icon = STAT_ICONS[key];
                return (
                  <div
                    key={key}
                    className="group flex flex-row items-center gap-5 border border-foreground/10 bg-background p-5 sm:flex-col sm:items-center sm:p-10 sm:text-center"
                  >
                    <div className="shrink-0 rounded-full bg-brand-dark p-3 transition-transform group-hover:scale-105 sm:mb-6 sm:p-4">
                      <Icon className="size-5 text-brand-green sm:size-8" />
                    </div>
                    <div className="flex flex-1 flex-col gap-1.5 sm:items-center sm:gap-0">
                      <div className="flex items-baseline gap-3 sm:flex-col sm:items-center sm:gap-2">
                        <div className="font-display text-3xl font-bold leading-none tracking-tight text-brand-dark sm:text-6xl">
                          {t(`stats.${key}.value`)}
                        </div>
                        <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-foreground/80 sm:mb-4 sm:text-sm">
                          {t(`stats.${key}.label`)}
                        </div>
                      </div>
                      <p className="text-sm leading-relaxed text-foreground/65">
                        {t(`stats.${key}.description`)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Forms of collaboration */}
        <section className="bg-background">
          <div className="container mx-auto px-4 py-16 sm:py-24 md:py-32">
            <div className="mx-auto mb-12 max-w-3xl text-center sm:mb-16 md:mb-20">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-green">
                {t("collab_eyebrow")}
              </p>
              <h2 className="mt-4 font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl md:text-5xl">
                {t("collab_title")}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-foreground/70 sm:mt-5 sm:text-lg">
                {t("collab_subline")}
              </p>
            </div>

            <div className="mx-auto grid max-w-6xl gap-5 sm:gap-6 md:grid-cols-2">
              {COLLAB_KEYS.map((key) => {
                const Icon = COLLAB_ICONS[key];
                return (
                  <div
                    key={key}
                    className="group flex flex-col gap-4 rounded-2xl border border-foreground/10 bg-background p-6 transition-colors hover:border-brand-green/50 sm:p-8 md:p-9"
                  >
                    <div className="flex size-11 items-center justify-center rounded-md bg-brand-green/15 sm:size-12">
                      <Icon className="size-5 text-brand-green sm:size-6" />
                    </div>
                    <h3 className="font-display text-lg font-bold leading-tight tracking-tight sm:text-xl md:text-2xl">
                      {t(`collab.${key}.title`)}
                    </h3>
                    <p className="text-sm leading-relaxed text-foreground/70 sm:text-base">
                      {t(`collab.${key}.description`)}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Trusted by */}
        <section className="bg-background">
          <div className="container mx-auto px-4 pb-16 sm:pb-24 md:pb-32">
            <div className="mx-auto max-w-5xl">
              <p className="text-center text-xs font-semibold uppercase tracking-[0.18em] text-brand-green">
                {t("trusted_eyebrow")}
              </p>
              <h2 className="mt-4 text-center font-display text-2xl font-bold leading-tight tracking-tight sm:text-3xl md:text-4xl">
                {t("trusted_title")}
              </h2>

              <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-6 sm:mt-12 sm:gap-x-12 sm:gap-y-8 md:gap-x-16">
                {TRUSTED_LOGOS.map((logo) => (
                  <Image
                    key={logo.alt}
                    src={logo.src}
                    alt={logo.alt}
                    width={400}
                    height={400}
                    className={`${logo.className} w-auto opacity-70 grayscale transition-opacity duration-300 hover:opacity-100 hover:grayscale-0`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Final contact CTA */}
        <section className="bg-background">
          <div className="container mx-auto px-4 pb-20 sm:pb-24 md:pb-32">
            <div className="mx-auto max-w-4xl rounded-3xl bg-brand-dark p-7 text-white sm:p-12 md:p-16">
              <div className="text-center">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-green">
                  {t("contact_eyebrow")}
                </p>
                <h2 className="mt-4 font-display text-2xl font-bold leading-tight tracking-tight sm:text-4xl md:text-5xl">
                  {t("contact_title")}
                </h2>
                <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-white/70 sm:mt-5 sm:text-base md:text-lg">
                  {t("contact_subline")}
                </p>
              </div>

              <div className="mt-8 grid gap-4 sm:mt-10 sm:gap-6 sm:grid-cols-2">
                <a
                  href={`mailto:${PARTNERS_EMAIL}?subject=${encodeURIComponent(
                    t("email_subject"),
                  )}`}
                  className="group flex flex-col gap-2 rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-colors hover:border-brand-green/50 hover:bg-brand-green/5 sm:p-6"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-green">
                    {t("contact_email_label")}
                  </p>
                  <p className="break-all font-display text-base font-bold tracking-tight text-white sm:text-lg md:text-xl">
                    {PARTNERS_EMAIL}
                  </p>
                  <span className="mt-2 inline-flex items-center gap-1.5 text-sm text-white/70 transition-colors group-hover:text-brand-green">
                    {t("contact_email_cta")}
                    <ArrowUpRight className="size-3.5" />
                  </span>
                </a>

                <a
                  href={WHATSAPP_INVITE}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col gap-2 rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-colors hover:border-brand-green/50 hover:bg-brand-green/5 sm:p-6"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-green">
                    {t("contact_community_label")}
                  </p>
                  <p className="font-display text-base font-bold tracking-tight text-white sm:text-lg md:text-xl">
                    {t("contact_community_value")}
                  </p>
                  <span className="mt-2 inline-flex items-center gap-1.5 text-sm text-white/70 transition-colors group-hover:text-brand-green">
                    {t("contact_community_cta")}
                    <ArrowUpRight className="size-3.5" />
                  </span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
