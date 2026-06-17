import { DEMO_PARTNERS } from "@/lib/demo-day";
import { DemoSponsorSection } from "./sponsor-section";

const NOTION = DEMO_PARTNERS.find((p) => p.id === "notion")!;
const CODEX = DEMO_PARTNERS.find((p) => p.id === "codex")!;
const CURSOR = DEMO_PARTNERS.find((p) => p.id === "cursor")!;

export function DemoSponsors({
  notionLogoSrc,
  codexLogoSrc,
  cursorLogoSrc,
}: {
  notionLogoSrc: string | null;
  codexLogoSrc: string | null;
  cursorLogoSrc: string | null;
}) {
  return (
    <>
      <DemoSponsorSection
        id="notion"
        partner={NOTION}
        logoSrc={notionLogoSrc}
        tone="accent"
        headline="El workspace con IA de las mejores startups."
        whatItIs="Notion es el espacio de trabajo todo-en-uno donde equipos documentan, planifican y construyen con IA integrada."
        whatItsFor="Tres meses de Notion + AI para las startups seleccionadas, más un taller para arrancar con el stack con el que operan las mejores startups del mundo."
      />

      <DemoSponsorSection
        id="cursor"
        partner={CURSOR}
        logoSrc={cursorLogoSrc}
        tone="light"
        logoClassName="h-24 w-auto brightness-0 invert sm:h-36 lg:h-44"
        headline="El IDE con IA para construir más rápido."
        whatItIs="Cursor es el editor de código con IA integrada: autocompletado, edición en lenguaje natural y agentes que trabajan dentro de tu codebase."
        whatItsFor="Créditos en Cursor para las startups seleccionadas, para acelerar el desarrollo mientras te preparas para el Demo Day."
        attribution={{
          label: "En colaboración con",
          people: [
            {
              name: "Walter Morales",
              role: "Regional Lead de Centroamérica",
              href: "https://www.linkedin.com/in/wmoralesdev",
            },
            {
              name: "Oscar Morales",
              role: "Cursor Ambassador",
              href: "https://www.linkedin.com/in/theoscarvibes",
            },
          ],
        }}
      />

      <DemoSponsorSection
        id="codex"
        partner={CODEX}
        logoSrc={codexLogoSrc}
        tone="accent"
        headline="Agentes de código que construyen contigo."
        whatItIs="Codex es el agente de código de OpenAI: entiende tu repositorio, escribe, refactoriza y shippea features con contexto real del proyecto."
        whatItsFor="Créditos en Codex para las startups seleccionadas, para construir y shippear con agentes durante el programa."
        attribution={{
          label: "Programa",
          people: [
            {
              name: "Codex Ambassadors",
              role: "Este apoyo es parte del programa Codex Ambassadors.",
            },
          ],
        }}
      />
    </>
  );
}
