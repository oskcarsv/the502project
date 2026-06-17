import type { DemoPartner } from "@/lib/demo-day";
import { LogoSlot } from "./logo-slot";
import { Tag } from "./primitives";
import { Reveal } from "./reveal";

export type SponsorAttribution = {
  label: string;
  people: { name: string; role: string; href?: string }[];
};

type SponsorSectionProps = {
  id: string;
  partner: DemoPartner;
  logoSrc: string | null;
  headline: string;
  whatItIs: string;
  whatItsFor: string;
  attribution?: SponsorAttribution;
  tone?: "light" | "accent";
  /** e.g. brightness-0 invert for dark marks on the demo day's black panels */
  logoClassName?: string;
};

function SponsorAttributionBlock({
  attribution,
  isAccent,
}: {
  attribution: SponsorAttribution;
  isAccent: boolean;
}) {
  return (
    <div
      className={`mt-10 border p-5 sm:mt-12 sm:p-6 ${
        isAccent
          ? "border-black/25 bg-black/5"
          : "border-[var(--demo-line)] bg-white/[0.03]"
      }`}
    >
      <p
        className={`font-space text-xs font-bold uppercase tracking-[0.16em] ${
          isAccent ? "text-black/70" : "text-[var(--demo-accent)]"
        }`}
      >
        {attribution.label}
      </p>

      <div
        className={`mt-5 grid gap-5 sm:gap-6 ${
          attribution.people.length > 1 ? "sm:grid-cols-2" : ""
        }`}
      >
        {attribution.people.map((person) => (
          <div key={person.name}>
            {person.href ? (
              <a
                href={person.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-display text-xl font-extrabold tracking-tight underline decoration-current/25 underline-offset-4 transition-[text-decoration-color] hover:decoration-current sm:text-2xl"
              >
                {person.name}
              </a>
            ) : (
              <p className="font-display text-xl font-extrabold tracking-tight sm:text-2xl">
                {person.name}
              </p>
            )}
            <p
              className={`mt-1 text-sm font-medium leading-snug sm:text-base ${
                isAccent ? "text-black/70" : "text-[var(--demo-muted)]"
              }`}
            >
              {person.role}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function DemoSponsorSection({
  id,
  partner,
  logoSrc,
  headline,
  whatItIs,
  whatItsFor,
  attribution,
  tone = "accent",
  logoClassName,
}: SponsorSectionProps) {
  const isAccent = tone === "accent";

  return (
    <section
      id={id}
      className={
        isAccent
          ? "bg-[var(--demo-accent)] text-[var(--demo-bg)] scroll-mt-16"
          : "border-b border-[var(--demo-line)] scroll-mt-16"
      }
    >
      <div className="container mx-auto px-4 py-24 sm:py-32">
        <Reveal>
          <div
            className={`flex flex-wrap items-center justify-between gap-3 border-b pb-6 ${
              isAccent ? "border-black/20" : "border-[var(--demo-line)]"
            }`}
          >
            <Tag tone={isAccent ? "dark" : "solid"}>{partner.name}</Tag>
            <span
              className={`font-space text-xs uppercase tracking-[0.18em] ${
                isAccent ? "text-black/60" : "text-[var(--demo-muted)]"
              }`}
            >
              Patrocina el Demo Day
            </span>
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <h2 className="mt-12 font-display text-[clamp(2rem,7vw,5.5rem)] font-extrabold uppercase leading-[0.9] tracking-[-0.03em] sm:mt-16">
            {headline}
          </h2>
        </Reveal>

        <div
          className={`mt-16 grid gap-10 border-t pt-12 lg:grid-cols-2 lg:items-center lg:gap-16 sm:mt-20 ${
            isAccent ? "border-black/20" : "border-[var(--demo-line)]"
          }`}
        >
          <Reveal>
            <a
              href={partner.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={partner.name}
              className="inline-block transition-transform hover:-translate-y-1"
            >
              <LogoSlot
                partner={partner}
                src={logoSrc}
                className={logoClassName ?? "h-24 w-auto sm:h-36 lg:h-44"}
              />
            </a>
          </Reveal>

          <Reveal delay={0.08}>
            <div>
              <p
                className={`font-space text-xs font-bold uppercase tracking-[0.16em] ${
                  isAccent ? "text-black/60" : "text-[var(--demo-muted)]"
                }`}
              >
                Qué es
              </p>
              <p className="mt-3 text-xl font-medium leading-relaxed sm:text-2xl">
                {whatItIs}
              </p>

              <p
                className={`mt-8 font-space text-xs font-bold uppercase tracking-[0.16em] ${
                  isAccent ? "text-black/60" : "text-[var(--demo-muted)]"
                }`}
              >
                Para qué sirve en el Demo Day
              </p>
              <p className="mt-3 text-xl font-medium leading-relaxed sm:text-2xl">
                {whatItsFor}
              </p>

              {attribution ? (
                <SponsorAttributionBlock
                  attribution={attribution}
                  isAccent={isAccent}
                />
              ) : null}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
