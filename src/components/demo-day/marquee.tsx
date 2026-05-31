const WORDS = ["DEMO DAY", "PITCH", "BUILD", "502"] as const;

type Variant = "green" | "dark";

function Row({ variant }: { variant: Variant }) {
  const solid =
    "font-display text-4xl font-extrabold uppercase tracking-tight sm:text-6xl md:text-7xl";
  const outline =
    variant === "green"
      ? `demo-text-outline-dark ${solid}`
      : `demo-text-outline ${solid}`;

  return (
    <>
      {WORDS.map((word, i) => (
        <span key={`${word}-${i}`} className="flex items-center gap-6 sm:gap-10">
          <span className={i % 2 === 0 ? solid : outline}>{word}</span>
          <span aria-hidden className="text-2xl sm:text-4xl">
            ·
          </span>
        </span>
      ))}
    </>
  );
}

export function DemoMarquee({ variant = "green" }: { variant?: Variant }) {
  const surface =
    variant === "green"
      ? "bg-[var(--demo-accent)] text-[var(--demo-bg)]"
      : "border-y border-[var(--demo-line)] bg-[var(--demo-bg)] text-[var(--demo-accent)]";

  return (
    <div
      aria-hidden
      className={`relative select-none overflow-hidden py-6 sm:py-8 ${surface}`}
    >
      <div className="flex w-max items-center gap-6 [animation:demo-marquee_30s_linear_infinite] sm:gap-10">
        <Row variant={variant} />
        <Row variant={variant} />
        <Row variant={variant} />
        <Row variant={variant} />
      </div>
    </div>
  );
}
