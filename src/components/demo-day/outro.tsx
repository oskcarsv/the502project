function KineticRow({ reverse = false }: { reverse?: boolean }) {
  const items = Array.from({ length: 6 });
  return (
    <div
      aria-hidden
      className="flex w-max select-none items-center gap-8"
      style={{
        animation: `demo-marquee ${reverse ? "38s" : "30s"} linear infinite${
          reverse ? " reverse" : ""
        }`,
      }}
    >
      {items.map((_, i) => (
        <span key={i} className="flex items-center gap-8">
          <span
            className={
              i % 2 === 0
                ? "font-display text-[16vw] font-extrabold uppercase leading-none tracking-[-0.04em]"
                : "demo-text-outline font-display text-[16vw] font-extrabold uppercase leading-none tracking-[-0.04em]"
            }
          >
            502 demo day
          </span>
          <span className="text-[var(--demo-accent)] text-[10vw] leading-none">
            ✦
          </span>
        </span>
      ))}
    </div>
  );
}

export function DemoOutro() {
  return (
    <footer className="overflow-hidden border-t border-[var(--demo-line)] py-16 sm:py-24">
      <div className="flex flex-col gap-2">
        <KineticRow />
        <KineticRow reverse />
      </div>
    </footer>
  );
}
