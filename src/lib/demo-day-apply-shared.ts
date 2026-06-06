/** Inbox for applications when Notion is not configured. */
export const DEMO_DAY_APPLY_EMAIL = "hello@the502project.com";

export const MIN_TEXT_LENGTH = 20;

export const MIN_NAME_LENGTH = 2;

export const MIN_FOUNDING_YEAR = 1900;

export function getMaxFoundingYear(): number {
  return new Date().getFullYear();
}

export const SELECT_EMPTY = "" as const;
export const SELECT_LABEL = "Selecciona…" as const;

const TEXTAREA_FIELDS = [
  "problem",
  "solution",
  "targetMarket",
  "traction",
  "team",
] as const;

export type DemoDayTextareaField = (typeof TEXTAREA_FIELDS)[number];

export const DEMO_DAY_STAGES = [
  "Pre-seed",
  "Seed",
  "Bootstrapped",
] as const;

export const DEMO_DAY_WIZARD_STEPS = [
  { id: 1, key: "empresa", label: "Empresa" },
  { id: 2, key: "founders", label: "Founders" },
  { id: 3, key: "producto", label: "Producto y mercado" },
  { id: 4, key: "equipo", label: "Equipo" },
] as const;

/** Descriptive hints shown under field labels in the apply form. */
export const DEMO_DAY_FIELD_HINTS = {
  companyName:
    "Nombre con el que opera tu startup (legal o comercial).",
  website: "https://…",
  founded: "Año en que constituyeron o empezaron a operar la empresa.",
  stage:
    "Pre-seed (idea/MVP), seed (producto y primeros clientes), o bootstrapped (crecimiento con ingresos propios, sin capital externo).",
  seekingInvestment:
    "¿Planean levantar capital en los próximos 12 meses?",
  contactName:
    "Nombre completo del fundador que llena esta aplicación.",
  contactEmail: "Correo donde te contactaremos sobre tu aplicación.",
  contactPhone: "Incluye código de país si aplica (ej. +502).",
  videoUrl:
    "Enlace a un video de ~1 minuto hablando de ti y tu startup (YouTube, Loom, Drive, Vimeo, etc.).",
  hasCoFounders:
    "Otros fundadores con equity y rol activo en la empresa.",
  coFounderNames:
    "Nombre de cada socio y su rol (ej. María López — CTO, Juan Pérez — ventas).",
  problem:
    "¿Qué dolor o necesidad resuelves? Sé concreto: quién lo sufre, cuánto cuesta y qué hacen hoy sin tu producto.",
  solution:
    "¿Qué construyes y cómo lo resuelve? Producto, tecnología clave y qué ya tienen funcionando (MVP, beta, producción).",
  targetMarket:
    "¿Quién es tu cliente ideal? Segmento, tamaño del mercado, geografía y por qué pagarían por tu solución.",
  team:
    "Quiénes son los fundadores, sus roles, experiencia relevante y si están full-time. Por qué este equipo puede ejecutar.",
  traction:
    "MRR, usuarios activos, clientes pagando, crecimiento mes a mes. Si es pre-revenue, di qué validación tienes (pilots, waitlist, LOIs). Números > adjetivos.",
} as const satisfies Record<keyof DemoDayApplicationForm, string>;

export type DemoDayWizardStep = (typeof DEMO_DAY_WIZARD_STEPS)[number]["id"];

export type DemoDayStage = (typeof DEMO_DAY_STAGES)[number];

export type DemoDayApplication = {
  companyName: string;
  website: string;
  founded: string;
  stage: DemoDayStage;
  seekingInvestment: boolean;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  videoUrl: string;
  hasCoFounders: boolean;
  coFounderNames: string;
  problem: string;
  solution: string;
  targetMarket: string;
  team: string;
  traction: string;
};

/** Client form state — selects and booleans start unset until the user chooses. */
export type DemoDayApplicationForm = Omit<
  DemoDayApplication,
  "stage" | "seekingInvestment" | "hasCoFounders"
> & {
  stage: DemoDayStage | typeof SELECT_EMPTY;
  seekingInvestment: boolean | null;
  hasCoFounders: boolean | null;
};

const STEP_FIELDS: Record<DemoDayWizardStep, (keyof DemoDayApplicationForm)[]> =
  {
    1: ["companyName", "website", "founded", "stage", "seekingInvestment"],
    2: [
      "contactName",
      "contactEmail",
      "contactPhone",
      "videoUrl",
      "hasCoFounders",
      "coFounderNames",
    ],
    3: ["problem", "solution", "targetMarket"],
    4: ["team", "traction"],
  };

const FIELD_ERRORS: Partial<
  Record<keyof DemoDayApplicationForm, string>
> = {
  companyName: "Ingresa el nombre de la empresa.",
  website: "Ingresa el sitio web de la empresa.",
  founded: "Ingresa el año de fundación.",
  stage: "Selecciona tu etapa actual.",
  seekingInvestment: "Indica si buscan inversión.",
  contactName: "Ingresa tu nombre.",
  contactEmail: "Ingresa un correo válido.",
  contactPhone: "Ingresa un teléfono válido (mín. 8 dígitos).",
  videoUrl: "Ingresa el enlace de tu video.",
  hasCoFounders: "Indica si tienes socios.",
  coFounderNames: "Ingresa el nombre de tus socios.",
};

const TEXTAREA_ERRORS: Record<DemoDayTextareaField, string> = {
  problem: `Describe el problema (mín. ${MIN_TEXT_LENGTH} caracteres).`,
  solution: `Describe tu solución (mín. ${MIN_TEXT_LENGTH} caracteres).`,
  targetMarket: `Describe tu mercado objetivo (mín. ${MIN_TEXT_LENGTH} caracteres).`,
  traction: `Comparte tracción concreta (mín. ${MIN_TEXT_LENGTH} caracteres).`,
  team: `Describe tu equipo (mín. ${MIN_TEXT_LENGTH} caracteres).`,
};

function clean(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function isOneOf<T extends readonly string[]>(
  value: string,
  options: T,
): value is T[number] {
  return (options as readonly string[]).includes(value);
}

function isValidPhone(value: string): boolean {
  const digits = value.replace(/\D/g, "");
  return digits.length >= 8 && digits.length <= 15;
}

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

/** Accepts URLs with or without protocol (e.g. example.com or https://example.com). */
export function isValidWebsite(value: string): boolean {
  const trimmed = value.trim();
  if (!trimmed) return false;

  const withProtocol = /^https?:\/\//i.test(trimmed)
    ? trimmed
    : `https://${trimmed}`;

  try {
    const url = new URL(withProtocol);
    if (url.protocol !== "http:" && url.protocol !== "https:") return false;

    const hostname = url.hostname;
    if (!hostname) return false;
    if (hostname === "localhost") return true;
    if (!hostname.includes(".")) return false;
    if (!/^[a-zA-Z0-9.-]+$/.test(hostname)) return false;

    const tld = hostname.split(".").at(-1) ?? "";
    return tld.length >= 2;
  } catch {
    return false;
  }
}

/** Prepends https:// when the user omits a protocol. */
export function normalizeWebsite(value: string): string {
  const trimmed = value.trim();
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
}

const VIDEO_HOST_PATTERNS = [
  /(^|\.)youtube\.com$/i,
  /(^|\.)youtu\.be$/i,
  /(^|\.)loom\.com$/i,
  /(^|\.)drive\.google\.com$/i,
  /(^|\.)vimeo\.com$/i,
  /(^|\.)dropbox\.com$/i,
  /(^|\.)wistia\.com$/i,
  /(^|\.)streamable\.com$/i,
] as const;

function isKnownVideoHost(hostname: string): boolean {
  return VIDEO_HOST_PATTERNS.some((pattern) => pattern.test(hostname));
}

/** Accepts video links on common hosting platforms (YouTube, Loom, Drive, Vimeo, etc.). */
export function isValidVideoUrl(value: string): boolean {
  const trimmed = value.trim();
  if (!trimmed) return false;

  const withProtocol = /^https?:\/\//i.test(trimmed)
    ? trimmed
    : `https://${trimmed}`;

  try {
    const url = new URL(withProtocol);
    if (url.protocol !== "http:" && url.protocol !== "https:") return false;

    const hostname = url.hostname;
    if (!hostname) return false;
    if (hostname === "localhost") return false;

    return isKnownVideoHost(hostname);
  } catch {
    return false;
  }
}

/** Prepends https:// when the user omits a protocol. */
export function normalizeVideoUrl(value: string): string {
  return normalizeWebsite(value);
}

export function isValidFoundedYear(value: string): boolean {
  const trimmed = value.trim();
  if (!/^\d{4}$/.test(trimmed)) return false;

  const year = Number.parseInt(trimmed, 10);
  return year >= MIN_FOUNDING_YEAR && year <= getMaxFoundingYear();
}

function validateField(
  key: keyof DemoDayApplicationForm,
  form: DemoDayApplicationForm,
): string | undefined {
  switch (key) {
    case "companyName": {
      const name = clean(form.companyName);
      if (!name) return FIELD_ERRORS.companyName;
      if (name.length < MIN_NAME_LENGTH) {
        return `El nombre debe tener al menos ${MIN_NAME_LENGTH} caracteres.`;
      }
      break;
    }
    case "website": {
      const website = clean(form.website);
      if (!website) return FIELD_ERRORS.website;
      if (!isValidWebsite(website)) {
        return "Ingresa una URL válida (ej. https://tuempresa.com)";
      }
      break;
    }
    case "founded": {
      const founded = clean(form.founded);
      if (!founded) return FIELD_ERRORS.founded;
      if (!isValidFoundedYear(founded)) {
        return `Ingresa un año válido (${MIN_FOUNDING_YEAR}–${getMaxFoundingYear()}).`;
      }
      break;
    }
    case "stage": {
      const stage = clean(form.stage);
      if (!stage || !isOneOf(stage, DEMO_DAY_STAGES)) {
        return FIELD_ERRORS.stage;
      }
      break;
    }
    case "seekingInvestment":
      if (form.seekingInvestment === null) {
        return FIELD_ERRORS.seekingInvestment;
      }
      break;
    case "contactName": {
      const name = clean(form.contactName);
      if (!name) return FIELD_ERRORS.contactName;
      if (name.length < MIN_NAME_LENGTH) {
        return `Tu nombre debe tener al menos ${MIN_NAME_LENGTH} caracteres.`;
      }
      break;
    }
    case "contactEmail": {
      const email = clean(form.contactEmail);
      if (!email) return "Ingresa tu correo de contacto.";
      if (!isValidEmail(email)) return FIELD_ERRORS.contactEmail;
      break;
    }
    case "contactPhone": {
      const phone = clean(form.contactPhone);
      if (!phone || !isValidPhone(phone)) {
        return FIELD_ERRORS.contactPhone;
      }
      break;
    }
    case "videoUrl": {
      const videoUrl = clean(form.videoUrl);
      if (!videoUrl) return FIELD_ERRORS.videoUrl;
      if (!isValidVideoUrl(videoUrl)) {
        return "Ingresa un enlace válido (YouTube, Loom, Drive, Vimeo, etc.).";
      }
      break;
    }
    case "hasCoFounders":
      if (form.hasCoFounders === null) {
        return FIELD_ERRORS.hasCoFounders;
      }
      break;
    case "coFounderNames": {
      if (form.hasCoFounders !== true) break;
      const names = clean(form.coFounderNames);
      if (!names) return FIELD_ERRORS.coFounderNames;
      if (names.length < MIN_NAME_LENGTH) {
        return `Indica los nombres (mín. ${MIN_NAME_LENGTH} caracteres).`;
      }
      break;
    }
    default: {
      if ((TEXTAREA_FIELDS as readonly string[]).includes(key)) {
        const textareaKey = key as DemoDayTextareaField;
        const value = clean(form[textareaKey]);
        if (!value || value.length < MIN_TEXT_LENGTH) {
          return TEXTAREA_ERRORS[textareaKey];
        }
      }
      break;
    }
  }

  return undefined;
}

/** Field-level errors for client and server validation. */
export function getDemoDayApplicationErrors(
  form: DemoDayApplicationForm,
): Partial<Record<keyof DemoDayApplicationForm, string>> {
  const errors: Partial<Record<keyof DemoDayApplicationForm, string>> = {};

  const allFields = Object.values(STEP_FIELDS).flat();
  for (const key of allFields) {
    const message = validateField(key, form);
    if (message) errors[key] = message;
  }

  return errors;
}

/** First invalid field in wizard order (for scroll-to-error). */
export function getFirstDemoDayInvalidField(
  errors: Partial<Record<keyof DemoDayApplicationForm, string>>,
  step?: DemoDayWizardStep,
): keyof DemoDayApplicationForm | undefined {
  const fields = step
    ? STEP_FIELDS[step]
    : (Object.values(STEP_FIELDS).flat() as (keyof DemoDayApplicationForm)[]);
  return fields.find((key) => errors[key]);
}

/** Errors for a single wizard step (used before advancing). */
export function getDemoDayStepErrors(
  step: DemoDayWizardStep,
  form: DemoDayApplicationForm,
): Partial<Record<keyof DemoDayApplicationForm, string>> {
  const errors: Partial<Record<keyof DemoDayApplicationForm, string>> = {};

  for (const key of STEP_FIELDS[step]) {
    const message = validateField(key, form);
    if (message) errors[key] = message;
  }

  return errors;
}

export function isDemoDayStepComplete(
  step: DemoDayWizardStep,
  form: DemoDayApplicationForm,
): boolean {
  return Object.keys(getDemoDayStepErrors(step, form)).length === 0;
}

export function isDemoDayApplicationComplete(
  form: DemoDayApplicationForm,
): form is DemoDayApplication {
  return Object.keys(getDemoDayApplicationErrors(form)).length === 0;
}
