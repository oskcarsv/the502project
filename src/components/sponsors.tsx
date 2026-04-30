import Image from "next/image";
import { getTranslations } from "next-intl/server";

type Sponsor = {
  key: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  className: string;
};

// Add new sponsors here. Drop the PNG into /public/img/logos/ first.
const SPONSORS: Sponsor[] = [
  {
    key: "notion",
    src: "/img/logos/notion.png",
    alt: "Notion",
    width: 528,
    height: 190,
    className: "h-6 sm:h-8",
  },
  {
    key: "cursor",
    src: "/img/logos/cursor.png",
    alt: "Cursor",
    width: 3840,
    height: 935,
    className: "h-6 sm:h-7",
  },
  {
    key: "v0",
    src: "/img/logos/v0.png",
    alt: "v0 by Vercel",
    width: 440,
    height: 440,
    className: "h-9 sm:h-11",
  },
  {
    key: "finny",
    src: "/img/logos/finny.png",
    alt: "Finny",
    width: 1600,
    height: 486,
    className: "h-6 sm:h-8",
  },
  {
    key: "ddr",
    src: "/img/logos/ddr.png",
    alt: "DDR",
    width: 4167,
    height: 4168,
    className: "h-9 sm:h-11",
  },
  {
    key: "uvg",
    src: "/img/logos/uvg.png",
    alt: "Universidad del Valle de Guatemala",
    width: 428,
    height: 404,
    className: "h-9 sm:h-11",
  },
  {
    key: "unis",
    src: "/img/logos/unis.png",
    alt: "Universidad del Istmo",
    width: 679,
    height: 824,
    className: "h-10 sm:h-12",
  },
  {
    key: "esource",
    src: "/img/logos/esource.png",
    alt: "esource",
    width: 380,
    height: 133,
    className: "h-6 sm:h-8",
  },
];

export async function Sponsors() {
  const t = await getTranslations("Sponsors");

  // Render the list twice for a seamless loop.
  const loop = [...SPONSORS, ...SPONSORS];

  return (
    <section className="bg-background">
      <div className="container mx-auto px-4 pb-10 pt-6 sm:pb-14 sm:pt-8">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.18em] text-brand-green">
          {t("eyebrow")}
        </p>

        <div className="group relative mt-10 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
          <div className="flex w-max items-center gap-x-16 animate-[marquee_30s_linear_infinite] group-hover:[animation-play-state:paused]">
            {loop.map((logo, i) => {
              const isDuplicate = i >= SPONSORS.length;
              return (
                <Image
                  key={`${logo.key}-${i}`}
                  src={logo.src}
                  alt={isDuplicate ? "" : logo.alt}
                  aria-hidden={isDuplicate}
                  width={logo.width}
                  height={logo.height}
                  className={`${logo.className} w-auto shrink-0 opacity-70 grayscale transition-opacity duration-300 hover:opacity-100`}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
