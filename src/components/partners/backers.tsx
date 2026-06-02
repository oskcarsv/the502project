import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Reveal } from "@/components/demo-day/reveal";

const BACKERS = [
  {
    key: "cursor",
    src: "/img/logos/cursor.png",
    className: "h-7 sm:h-8",
    href: "https://cursor.com",
  },
  {
    key: "notion",
    src: "/img/logos/notion.png",
    className: "h-7 sm:h-9",
    href: "https://notion.com",
  },
] as const;

export async function PartnersBackers() {
  const t = await getTranslations("Partners");

  return (
    <section className="border-b border-foreground/10 bg-background">
      <div className="container mx-auto px-4 py-16 sm:py-24 md:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-green">
              {t("backers.eyebrow")}
            </p>
            <h2 className="mt-4 font-display text-3xl font-bold leading-[1.1] tracking-tight sm:text-4xl">
              {t("backers.title")}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-foreground/65 sm:text-lg">
              {t("backers.note")}
            </p>
          </Reveal>
        </div>

        <div className="mx-auto mt-10 grid max-w-3xl gap-4 sm:mt-14 sm:grid-cols-2 sm:gap-6">
          {BACKERS.map((backer, i) => (
            <Reveal key={backer.key} delay={i * 0.1}>
              <a
                href={backer.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t(`backers.items.${backer.key}.name`)}
                className="group flex h-full flex-col items-center gap-4 rounded-2xl border border-foreground/10 bg-background p-6 text-center transition-all hover:-translate-y-0.5 hover:border-brand-green/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2 sm:gap-5 sm:p-8 md:p-10"
              >
                <div className="flex h-12 w-full items-center justify-center">
                  <Image
                    src={backer.src}
                    alt=""
                    aria-hidden
                    width={400}
                    height={400}
                    className={`${backer.className} w-auto max-w-full opacity-80 grayscale transition duration-300 group-hover:opacity-100 group-hover:grayscale-0`}
                  />
                </div>
                <p className="text-sm leading-relaxed text-foreground/60 transition-colors group-hover:text-foreground/80">
                  {t(`backers.items.${backer.key}.tag`)}
                </p>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
