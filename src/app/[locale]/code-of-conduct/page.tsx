import { setRequestLocale, getTranslations } from "next-intl/server";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export default async function CodeOfConductPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("CodeOfConduct");

  const FORBIDDEN_GROUPS = [
    {
      key: "lang",
      title: t("forbidden_lang_title"),
      items: [
        t("forbidden_lang_1"),
        t("forbidden_lang_2"),
        t("forbidden_lang_3"),
        t("forbidden_lang_4"),
      ],
    },
    {
      key: "harass",
      title: t("forbidden_harass_title"),
      items: [
        t("forbidden_harass_1"),
        t("forbidden_harass_2"),
        t("forbidden_harass_3"),
        t("forbidden_harass_4"),
      ],
    },
    {
      key: "misuse",
      title: t("forbidden_misuse_title"),
      items: [
        t("forbidden_misuse_1"),
        t("forbidden_misuse_2"),
        t("forbidden_misuse_3"),
        t("forbidden_misuse_4"),
      ],
    },
  ];

  return (
    <>
      <div className="bg-background">
        <div className="container mx-auto px-4">
          <Navbar />
        </div>
      </div>

      <main className="bg-background">
        <article className="container mx-auto px-4 py-16 sm:py-24">
          {/* Header */}
          <header className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-green">
              {t("intro_eyebrow")}
            </p>
            <h1 className="mt-4 font-display text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl">
              {t("title")}
            </h1>
            <p className="mt-8 text-base leading-relaxed text-foreground/70 sm:text-lg">
              {t("intro_body")}
            </p>
          </header>

          {/* Three principle sections */}
          <section className="mx-auto mt-20 max-w-3xl space-y-12 sm:mt-24 sm:space-y-16">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="border-l-2 border-brand-green/30 pl-6 sm:pl-8"
              >
                <h2 className="font-display text-2xl font-bold leading-tight tracking-tight sm:text-3xl">
                  {t(`section${n}_title`)}
                </h2>
                <p className="mt-4 text-base leading-relaxed text-foreground/70 sm:text-lg">
                  {t(`section${n}_body`)}
                </p>
              </div>
            ))}
          </section>

          {/* Forbidden behaviors */}
          <section className="mx-auto mt-24 max-w-4xl sm:mt-32">
            <div className="text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-green">
                {t("forbidden_eyebrow")}
              </p>
              <h2 className="mt-4 font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl md:text-5xl">
                {t("forbidden_title")}
              </h2>
            </div>

            <div className="mt-12 grid gap-8 sm:mt-16 md:grid-cols-3">
              {FORBIDDEN_GROUPS.map((group) => (
                <div
                  key={group.key}
                  className="rounded-2xl border border-foreground/10 bg-background p-6 sm:p-7"
                >
                  <h3 className="font-display text-lg font-bold leading-tight tracking-tight">
                    {group.title}
                  </h3>
                  <ul className="mt-5 space-y-3">
                    {group.items.map((item) => (
                      <li
                        key={item}
                        className="flex gap-3 text-sm leading-relaxed text-foreground/70"
                      >
                        <span
                          aria-hidden
                          className="mt-2 size-1 shrink-0 rounded-full bg-brand-green"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Report */}
          <section className="mx-auto mt-24 max-w-3xl sm:mt-32">
            <div className="rounded-3xl bg-brand-dark p-10 text-center text-white sm:p-14">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-green">
                {t("report_eyebrow")}
              </p>
              <h2 className="mt-4 font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
                {t("report_title")}
              </h2>
              <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg">
                {t("report_body")}
              </p>
            </div>
          </section>
        </article>
      </main>

      <Footer />
    </>
  );
}
