import { WHATSAPP_INVITE } from "@/lib/links";

export const BUILD_PITCH = {
  /** Number of startups selected for the cohort. */
  capacity: 20,
  /** Contact / questions channel. */
  whatsappUrl: "https://wa.me/50230059646",
  /** Public invite to join the the502project community. */
  communityUrl: WHATSAPP_INVITE,
  /** Stage options — must match the Notion "Etapa" select. */
  stages: ["Idea", "MVP", "Tracción"] as const,
  /** Industry options — must match the Notion "Industria" select. */
  industries: [
    "Fintech",
    "SaaS / Software",
    "E-commerce / Retail",
    "HealthTech / Salud",
    "EdTech / Educación",
    "AgTech / Agro",
    "IA / Datos",
    "Logística / Movilidad",
    "Marketplace",
    "Consumo / Alimentos",
    "Turismo",
    "Otra",
  ] as const,
  /** Yes/No options — must match the Notion "¿Tiene co-founders?" select. */
  yesNo: ["Sí", "No"] as const,
  /** Attendance options — must match the Notion "¿Pueden asistir?" select. */
  attendance: ["Sí", "Tal vez", "No"] as const,
} as const;

export type BuildPitchStage = (typeof BUILD_PITCH.stages)[number];
export type BuildPitchIndustry = (typeof BUILD_PITCH.industries)[number];
