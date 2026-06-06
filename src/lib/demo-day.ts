import { WHATSAPP_INVITE } from "@/lib/links";

/** Barrilete Ventures website. Centralized so every mention links here. */
export const BARRILETE_URL = "https://www.barrilete.vc/";

/**
 * 502 Demo Day · Edición 1: single source of truth for the landing page.
 * Tweak these and the whole page (countdown, stats, copy) follows.
 */
export const DEMO_DAY = {
  edition: "Edición 1",
  /** ISO start, Guatemala time (UTC-6). Drives the live countdown. */
  eventDate: "2026-06-27T09:00:00-06:00",
  dateLabel: "Sábado 27 de junio, 2026",
  dateShort: "Sáb 27 jun 2026",
  city: "Ciudad de Guatemala",
  /** Startups selected for the cohort. */
  spots: 12,
  whatsapp: "https://wa.me/50230059646",
  communityUrl: WHATSAPP_INVITE,
  applyUrl: "/demo-day/apply",
} as const;

/**
 * Logo slots the team will drop into /public/logos/.
 * Name the file after `id` with any extension (e.g. barrilete.svg, notion.png).
 * The page auto-detects it and swaps the text wordmark for the real logo.
 */
export const DEMO_PARTNERS = [
  {
    id: "502",
    name: "The 502 Project",
    role: "Un programa de",
    href: "https://www.the502project.com",
  },
  {
    id: "barrilete",
    name: "Barrilete Ventures",
    role: "junto a",
    href: BARRILETE_URL,
  },
  {
    id: "notion",
    name: "Notion",
    role: "powered by",
    href: "https://www.notion.com",
  },
  {
    id: "codex",
    name: "Codex",
    role: "powered by",
    href: "https://openai.com/codex",
  },
  {
    id: "cursor",
    name: "Cursor",
    role: "powered by",
    href: "https://cursor.com",
  },
] as const;

export type DemoPartner = (typeof DEMO_PARTNERS)[number];

/** "Para los que ya están construyendo": concrete signals, no idea-stage. */
export const DEMO_SIGNALS = [
  {
    n: "01",
    title: "Una empresa en marcha",
    body: "Ya tienes producto en el mundo real, no un deck ni un prototipo guardado.",
  },
  {
    n: "02",
    title: "Usuarios o ventas reales",
    body: "Hay gente usando lo que hiciste y, idealmente, pagando por ello.",
  },
  {
    n: "03",
    title: "Un equipo que construye a diario",
    body: "Founders metidos en el código, el producto y los clientes todos los días.",
  },
  {
    n: "04",
    title: "Ambición de crecer y escalar",
    body: "No buscas un proyecto bonito: vas por una empresa grande.",
  },
] as const;

