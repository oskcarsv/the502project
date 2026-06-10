import { WorkshopLabel } from "@/components/private-events/label";

export function PrivateEventsContext() {
  return (
    <section className="border-t border-[color:var(--ws-line)]">
      <div className="container mx-auto px-4 py-10 sm:py-14">
        <div className="mx-auto max-w-3xl">
          <WorkshopLabel>Por qué workshops</WorkshopLabel>
          <div className="mt-4 space-y-4 text-base leading-relaxed text-[color:var(--ws-muted)] sm:text-lg">
            <p>
              En The 502 Project realizamos eventos abiertos de más de 100
              personas para enseñar el uso práctico de la inteligencia
              artificial: hackathons, charlas y meetups donde mucha gente
              aprende en simultáneo.
            </p>
            <p>
              En esos eventos masivos no podemos acompañarte uno a uno. Los
              workshops son diferentes: grupos pequeños, acompañamiento paso a
              paso y un ambiente relajado con coffee break y parqueo incluidos,
              para que aprendas a tu ritmo y salgas aplicando lo aprendido.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
