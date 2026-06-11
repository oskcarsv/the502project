import Link from "next/link";

export function PrivateEventClosing() {
  return (
    <footer className="border-t border-[color:var(--ws-line)]">
      <div className="container mx-auto flex max-w-5xl items-center justify-between px-4 py-8 text-sm text-[color:var(--ws-muted)]">
        <Link
          href="/workshops"
          className="transition-colors hover:text-[color:var(--ws-accent)]"
        >
          ← Todos los workshops
        </Link>
        <Link
          href="/"
          className="font-display font-semibold text-[color:var(--ws-fg)]"
        >
          The 502 Project
        </Link>
      </div>
    </footer>
  );
}
