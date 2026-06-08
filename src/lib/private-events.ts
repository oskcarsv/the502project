export type PrivateEventStatus = "upcoming" | "past";

export type PrivateEvent = {
  slug: string;
  status: PrivateEventStatus;
  edition: string;
  format: string;
  formatEn: string;
  title: string;
  titleEn: string;
  tagline: string;
  taglineEn: string;
  /** Skill level, e.g. Principiante / Beginner. */
  level: string;
  levelEn: string;
  /** Session length in hours, used for the hero key facts. */
  durationHours: number;
  date: string;
  time: string;
  endTime?: string;
  location: string;
  locationEn: string;
  priceLabel: string;
  capacity: number;
  /** 0-100 seats still available (manual). */
  availablePercent: number;
  registrationUrl: string;
  facilitator: string;
  facilitatorUrl?: string;
  /** Description body paragraphs explaining what the workshop is. */
  description: string[];
  descriptionEn: string[];
  /** Agenda / topics covered, rendered as the "what you'll learn" list. */
  agenda: string[];
  agendaEn: string[];
  requirements: string[];
  requirementsEn: string[];
  /** What's included with the workshop. */
  included: string[];
  includedEn: string[];
  /** What's explicitly not included. */
  notIncluded: string[];
  notIncludedEn: string[];
  /** Highlighted welcome gift. */
  gift: string;
  giftEn: string;
  outcomes: string[];
  outcomesEn: string[];
};

/** Cal.com embed for corporate / custom workshops. https://cal.com/nura-labs/the-502-project-workshops */
export const PRIVATE_EVENTS_CORPORATE_CAL = {
  namespace: "the-502-project-workshops",
  link: "nura-labs/the-502-project-workshops",
} as const;

export const PRIVATE_EVENTS = {
  "claude-for-entrepreneurs": {
    slug: "claude-for-entrepreneurs",
    status: "upcoming",
    edition: "01",
    format: "4 horas · presencial · grupo reducido",
    formatEn: "4 hours · in person · small group",
    title: "Claude for Entrepreneurs",
    titleEn: "Claude for Entrepreneurs",
    tagline:
      "Sácale el máximo provecho a Claude y conéctalo con las herramientas de tu día a día.",
    taglineEn:
      "Get the most out of Claude and connect it to the tools you use every day.",
    level: "Principiante",
    levelEn: "Beginner",
    durationHours: 4,
    date: "2026-06-18",
    time: "9:00",
    endTime: "13:00",
    location: "Ciudad de Guatemala",
    locationEn: "Guatemala City",
    priceLabel: "$65",
    capacity: 15,
    availablePercent: 80,
    registrationUrl:
      "https://app.recurrente.com/s/the-502-project/claude-for-entrepreneurs-8pe0iw",
    facilitator: "Oscar Morales",
    facilitatorUrl: "https://www.linkedin.com/in/theoscarvibes/",
    description: [
      "Aprende a usar Claude como los pros para administrar tu empresa y tu equipo. Vemos prompting, los modos de Claude, Claude Co-work, MCPs y skills, todo aplicado a la operación real de tu negocio.",
      "Vas a conectar Claude con las herramientas que ya usas todos los días, con plataformas externas y con los canales donde te comunicas hoy, para dejar de perder horas en tareas repetitivas.",
    ],
    descriptionEn: [
      "Learn to use Claude like the pros to run your company and your team. We cover prompting, Claude's modes, Claude Co-work, MCPs, and skills, all applied to the real operation of your business.",
      "You'll connect Claude with the tools you already use every day, with external platforms, and with the channels where you communicate today, so you stop losing hours on repetitive tasks.",
    ],
    agenda: [
      "Prompting efectivo para obtener mejores resultados.",
      "Los modos de Claude y cuándo usar cada uno.",
      "Claude Co-work para tareas y flujos en equipo.",
      "MCPs: qué son y cómo conectarlos.",
      "Skills para ampliar lo que Claude puede hacer por ti.",
      "Conectar Claude a las herramientas de tu día a día y a plataformas externas.",
      "Llevar Claude a los canales donde ya te comunicas hoy.",
      "Flujos para administrar tu empresa y tu equipo.",
    ],
    agendaEn: [
      "Effective prompting to get better results.",
      "Claude's modes and when to use each one.",
      "Claude Co-work for tasks and team workflows.",
      "MCPs: what they are and how to connect them.",
      "Skills to extend what Claude can do for you.",
      "Connecting Claude to your everyday tools and external platforms.",
      "Bringing Claude to the channels where you already communicate.",
      "Workflows to run your company and your team.",
    ],
    requirements: [
      "Eres emprendedor o estás construyendo tu empresa.",
      "No necesitas experiencia previa: es un taller para principiantes.",
      "Vienes con ganas de aplicar AI a la operación real de tu negocio.",
    ],
    requirementsEn: [
      "You're an entrepreneur or building your own company.",
      "No prior experience needed: this is a workshop for beginners.",
      "You want to apply AI to the real operation of your business.",
    ],
    included: [
      "Taller presencial de 4 horas con acompañamiento directo.",
      "3 meses de Notion + AI gratis para empezar a organizar tu empresa.",
      "Te compartimos nuestras skills y plantillas para que las uses.",
      "Material de la sesión y café durante el taller.",
    ],
    includedEn: [
      "A 4 hour in person workshop with direct support.",
      "3 months of Notion + AI free to start organizing your company.",
      "We share our skills and templates for you to use.",
      "Session materials and coffee during the workshop.",
    ],
    notIncluded: ["No incluye licencia de Claude."],
    notIncludedEn: ["A Claude license is not included."],
    gift: "3 meses de Notion + AI gratis",
    giftEn: "3 months of Notion + AI free",
    outcomes: [
      "Te llevas el conocimiento para usar la inteligencia artificial correctamente en tu empresa.",
      "Sales con criterio y flujos claros para dejar de perder horas en tareas repetitivas.",
    ],
    outcomesEn: [
      "You take home the knowledge to use artificial intelligence correctly in your company.",
      "You leave with the judgment and clear workflows to stop losing hours on repetitive tasks.",
    ],
  },
} satisfies Record<string, PrivateEvent>;

export type PrivateEventSlug = keyof typeof PRIVATE_EVENTS;

export function getPrivateEvent(slug: string): PrivateEvent | null {
  if (slug in PRIVATE_EVENTS) {
    return PRIVATE_EVENTS[slug as PrivateEventSlug];
  }
  return null;
}

export function getAllPrivateEvents(): PrivateEvent[] {
  return Object.values(PRIVATE_EVENTS).sort((a, b) =>
    a.date < b.date ? -1 : 1,
  );
}

export function getPrivateEventSlugs(): string[] {
  return Object.keys(PRIVATE_EVENTS);
}

export function localizedPrivateField(
  locale: string,
  es: string,
  en: string,
): string {
  return locale === "en" ? en : es;
}

export function localizedPrivateList(
  locale: string,
  es: string[],
  en: string[],
): string[] {
  return locale === "en" ? en : es;
}
