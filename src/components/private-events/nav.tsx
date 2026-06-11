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
    <header className="border-b border-[color:var(--ws-line)] bg-[color:var(--ws-bg)]/80 backdrop-blur">
      <div className="container mx-auto flex h-14 items-center justify-between gap-4 px-4 sm:h-16">
        <a
          href={href}
          className="shrink-0 font-display text-sm font-bold tracking-tight sm:text-base"
        >
          The 502 Project
        </a>
        <div className="flex items-center gap-3">
          {showEmpresasLink ? (
            <a
              href="#empresas"
              className="hidden rounded-full px-3.5 py-1.5 text-sm font-medium text-[color:var(--ws-muted)] transition-colors hover:bg-[color:var(--ws-accent-soft)] hover:text-[color:var(--ws-accent)] sm:inline"
            >
              Para empresas
            </a>
          ) : null}
          <a
            href={href}
            className="rounded-full bg-[color:var(--ws-elevated)] px-3.5 py-1.5 text-sm font-medium ring-1 ring-[color:var(--ws-line)] transition-colors hover:text-[color:var(--ws-accent)]"
          >
            {label}
          </a>
        </div>
      </div>
    </header>
  );
}
