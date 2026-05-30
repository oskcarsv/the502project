"use client";

const WORDS = ["Build", "Pitch"] as const;

function Row() {
  return (
    <>
      {WORDS.map((word, i) => (
        <span key={`${word}-${i}`} className="flex items-center gap-8 sm:gap-12">
          <span
            className={
              i % 2 === 0
                ? "font-display text-5xl font-bold tracking-tight text-brand-dark sm:text-7xl md:text-8xl"
                : "bp-text-outline font-display text-5xl font-bold tracking-tight sm:text-7xl md:text-8xl"
            }
          >
            {word}
          </span>
          <span className="text-brand-green" aria-hidden>
            ·
          </span>
        </span>
      ))}
    </>
  );
}

export function BuildPitchMarquee() {
  return (
    <div
      aria-hidden
      className="relative select-none overflow-hidden border-y border-foreground/10 bg-background py-8 sm:py-10 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
    >
      <div className="flex w-max items-center gap-8 animate-[marquee_28s_linear_infinite] sm:gap-12">
        <Row />
        <Row />
        <Row />
        <Row />
      </div>
    </div>
  );
}
