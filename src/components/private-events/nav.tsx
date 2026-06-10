type Props = {
  backHref?: string;
  backLabel?: string;
  showEmpresasLink?: boolean;
};

export function PrivateEventsNav({
  backHref,
  backLabel,
  showEmpresasLink = false,
}: Props) {
  const href = backHref ?? "/";
  const label = backLabel ?? "Inicio";

  return (
    <header className="border-b border-[color:var(--ws-line)]">
      <div className="container mx-auto flex h-14 items-center justify-between gap-4 px-4 sm:h-16">
        <a
          href={href}
          className="shrink-0 font-display text-sm font-semibold tracking-tight text-[color:var(--ws-fg)] sm:text-base"
        >
          The 502 Project
        </a>
        <div className="flex items-center gap-4 sm:gap-6">
          {showEmpresasLink ? (
            <a
              href="#empresas"
              className="hidden font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-[color:var(--ws-accent)] transition-opacity hover:opacity-80 sm:inline"
            >
              Para empresas
            </a>
          ) : null}
          <span className="hidden font-mono text-[10px] uppercase tracking-[0.22em] text-[color:var(--ws-muted)] md:inline">
            Workshops
          </span>
          <a
            href={href}
            className="shrink-0 font-mono text-[10px] uppercase tracking-[0.2em] text-[color:var(--ws-muted)] transition-colors hover:text-[color:var(--ws-accent)]"
          >
            {label}
          </a>
        </div>
      </div>
    </header>
  );
}
