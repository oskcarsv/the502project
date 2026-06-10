import Link from "next/link";

export function PrivateEventClosing() {
  return (
    <footer className="border-t border-[color:var(--ws-line)]">
      <div className="container mx-auto max-w-3xl px-4 py-10">
        <Link
          href="/workshops"
          className="text-sm text-[color:var(--ws-muted)] transition-colors hover:text-[color:var(--ws-accent)]"
        >
          ← Volver a workshops
        </Link>
      </div>
    </footer>
  );
}
