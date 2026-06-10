export type PrivateEventStatus = "upcoming" | "past";

// Los workshops son solo en español: una sola fuente de copy, sin variantes EN.
export type PrivateEvent = {
  slug: string;
  status: PrivateEventStatus;
  edition: string;
  format: string;
  title: string;
  tagline: string;
  /** Nivel, p. ej. Principiante. */
  level: string;
  /** Duración de la sesión en horas, para los datos del hero. */
  durationHours: number;
  date: string;
  time: string;
  endTime?: string;
  location: string;
  priceLabel: string;
  capacity: number;
  /** 0-100 lugares aún disponibles (manual). */
  availablePercent: number;
  registrationUrl: string;
  facilitator: string;
  facilitatorUrl?: string;
  /** Párrafos que explican qué es el workshop. */
  description: string[];
  /** Agenda / temas, se muestra como "qué vas a aprender". */
  agenda: string[];
  requirements: string[];
  /** Qué incluye el workshop. */
  included: string[];
  /** Qué no incluye. */
  notIncluded: string[];
  /** Regalo de bienvenida destacado. */
  gift: string;
  outcomes: string[];
};

/** Cal.com embed for corporate / custom workshops. https://cal.com/nura-labs/the-502-project-workshops */
export const PRIVATE_EVENTS_CORPORATE_CAL = {
  namespace: "the-502-project-workshops",
  link: "nura-labs/the-502-project-workshops",
} as const;

export const PRIVATE_EVENTS = {
  claude: {
    slug: "claude",
    status: "upcoming",
    edition: "01",
    format: "3 horas · presencial · grupo reducido",
    title: "Claude for Entrepreneurs",
    tagline:
      "Aprende paso a paso a usar Claude para ahorrar horas en tu negocio. No necesitas ser técnico.",
    level: "Principiante",
    durationHours: 3,
    date: "2026-06-25",
    time: "17:00",
    endTime: "20:00",
    location: "Campus Tec, zona 4",
    priceLabel: "$65",
    capacity: 15,
    availablePercent: 80,
    registrationUrl:
      "https://app.recurrente.com/s/the-502-project/claude-for-entrepreneurs-8pe0iw",
    facilitator: "Oscar Morales",
    facilitatorUrl: "https://www.linkedin.com/in/theoscarvibes/",
    description: [
      "Un taller práctico y sin complicaciones para aprender a usar Claude, un asistente de inteligencia artificial, en la operación real de tu negocio. Todo explicado en lenguaje sencillo, paso a paso y con ejemplos de empresas como la tuya.",
      "Vas a aprender a pedirle las cosas de la forma correcta, a conectarlo con las herramientas que ya usas todos los días (correo, calendario, documentos) y a quitarte de encima esas tareas repetitivas que te roban horas cada semana.",
    ],
    agenda: [
      "Cómo pedirle las cosas a Claude para obtener buenos resultados, sin fórmulas complicadas.",
      "Los modos de Claude y cuándo conviene usar cada uno.",
      "Claude Co-work: cómo apoyarte en Claude para organizar tareas y trabajar en equipo.",
      "Cómo conectar Claude con tus herramientas de todos los días: correo, calendario, documentos y más.",
      "Skills y conexiones, explicadas en palabras simples: qué son y para qué te sirven.",
      "Cómo llevar Claude a los canales donde ya hablas con tu equipo y tus clientes.",
      "Ideas y flujos listos para usar en la administración de tu empresa.",
    ],
    requirements: [
      "Eres emprendedor o estás construyendo tu empresa.",
      "No necesitas experiencia previa ni saber de tecnología: es un taller para principiantes.",
      "Vienes con ganas de ahorrar tiempo en el día a día de tu negocio.",
    ],
    included: [
      "Taller presencial de 3 horas con acompañamiento directo y en lenguaje sencillo.",
      "Coffee break para recargar energías y conocer a otros emprendedores.",
      "Parqueo incluido en el lugar del evento.",
      "3 meses de Notion + AI gratis para empezar a organizar tu empresa.",
      "Te compartimos nuestras plantillas y flujos para que los uses desde el día uno.",
      "Material didáctico para que repases con calma en casa.",
    ],
    notIncluded: ["No incluye licencia de Claude."],
    gift: "3 meses de Notion + AI gratis",
    outcomes: [
      "Te llevas el conocimiento para usar la inteligencia artificial correctamente en tu empresa.",
      "Sales con criterio y flujos claros para dejar de perder horas en tareas repetitivas.",
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
