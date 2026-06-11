import Link from "next/link";
import { PrivateEventsNav } from "@/components/private-events/nav";

export function PrivateEventsHero() {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[320px] bg-[radial-gradient(70%_100%_at_50%_0%,var(--ws-accent-soft),transparent_75%)]"
      />
      <PrivateEventsNav showEmpresasLink />
      <div className="container mx-auto max-w-5xl px-4 pb-10 pt-12 sm:pb-14 sm:pt-16">
        <span className="inline-flex items-center rounded-full bg-[color:var(--ws-accent-soft)] px-3.5 py-1.5 text-xs font-semibold text-[color:var(--ws-accent)]">
          The 502 Project
        </span>
        <h1 className="mt-5 font-display text-[2.5rem] font-bold leading-[1.04] tracking-tight sm:text-5xl md:text-6xl">
          Workshops
        </h1>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-[color:var(--ws-muted)] sm:text-lg">
          Talleres prácticos en grupos pequeños, explicados en lenguaje
          sencillo. Con coffee break y parqueo incluidos.
        </p>
        <p className="mt-3 text-sm text-[color:var(--ws-muted)]">
          ¿Buscas nuestros eventos abiertos? Están en{" "}
          <Link
            href="/eventos"
            className="font-medium text-[color:var(--ws-accent)] underline decoration-[color:var(--ws-line)] underline-offset-4 hover:decoration-[color:var(--ws-accent)]"
          >
            Eventos
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
