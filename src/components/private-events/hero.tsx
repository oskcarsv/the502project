import Link from "next/link";
import { WorkshopLabel } from "@/components/private-events/label";
import { PrivateEventsNav } from "@/components/private-events/nav";

export function PrivateEventsHero() {
  return (
    <section>
      <PrivateEventsNav showEmpresasLink />
      <div className="container mx-auto px-4 pb-12 pt-12 sm:pb-16 sm:pt-16">
        <div className="mx-auto max-w-4xl">
          <WorkshopLabel>the502project</WorkshopLabel>
          <h1 className="mt-4 font-display text-[2.5rem] font-bold leading-[1.04] tracking-tight text-[color:var(--ws-fg)] sm:mt-5 sm:text-5xl md:text-6xl">
            Workshops
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-[color:var(--ws-muted)] sm:text-lg">
            Talleres prácticos en grupos pequeños, explicados en lenguaje
            sencillo. Con coffee break y parqueo incluidos.
          </p>
          <p className="mt-3 text-sm text-[color:var(--ws-muted)]">
            Eventos abiertos en{" "}
            <Link
              href="/eventos"
              className="text-[color:var(--ws-fg)] underline decoration-[color:var(--ws-line)] underline-offset-4 transition-colors hover:text-[color:var(--ws-accent)] hover:decoration-[color:var(--ws-accent)]"
            >
              Eventos
            </Link>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
