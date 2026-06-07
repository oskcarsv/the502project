import "server-only";
import {
  DEMO_DAY_APPLY_EMAIL,
  getDemoDayApplicationErrors,
  isDemoDayApplicationComplete,
  normalizeVideoUrl,
  normalizeWebsite,
  type DemoDayApplication,
  type DemoDayApplicationForm,
  type DemoDayStage,
} from "./demo-day-apply-shared";

export type { DemoDayApplication } from "./demo-day-apply-shared";
export {
  DEMO_DAY_APPLY_EMAIL,
  DEMO_DAY_STAGES,
  DEMO_DAY_WIZARD_STEPS,
} from "./demo-day-apply-shared";

type ValidationResult =
  | { ok: true; data: DemoDayApplication }
  | { ok: false; error: string };

function parseBoolean(value: unknown): boolean | null {
  if (value === true || value === "true") return true;
  if (value === false || value === "false") return false;
  return null;
}

export function validateDemoDayApplication(
  body: Record<string, unknown>,
): ValidationResult {
  const form: DemoDayApplicationForm = {
    companyName: typeof body.companyName === "string" ? body.companyName : "",
    website: typeof body.website === "string" ? body.website : "",
    founded: typeof body.founded === "string" ? body.founded : "",
    stage:
      typeof body.stage === "string"
        ? (body.stage as DemoDayApplicationForm["stage"])
        : "",
    seekingInvestment: parseBoolean(body.seekingInvestment),
    contactName: typeof body.contactName === "string" ? body.contactName : "",
    contactEmail: typeof body.contactEmail === "string" ? body.contactEmail : "",
    contactPhone: typeof body.contactPhone === "string" ? body.contactPhone : "",
    videoUrl: typeof body.videoUrl === "string" ? body.videoUrl : "",
    hasCoFounders: parseBoolean(body.hasCoFounders),
    coFounderNames:
      typeof body.coFounderNames === "string" ? body.coFounderNames : "",
    problem: typeof body.problem === "string" ? body.problem : "",
    solution: typeof body.solution === "string" ? body.solution : "",
    targetMarket: typeof body.targetMarket === "string" ? body.targetMarket : "",
    team: typeof body.team === "string" ? body.team : "",
    traction: typeof body.traction === "string" ? body.traction : "",
  };

  const errors = getDemoDayApplicationErrors(form);
  const firstError = Object.values(errors)[0];
  if (firstError) {
    return { ok: false, error: firstError };
  }

  if (!isDemoDayApplicationComplete(form)) {
    return { ok: false, error: "Datos de aplicación incompletos." };
  }

  return {
    ok: true,
    data: {
      ...form,
      website: normalizeWebsite(form.website),
      videoUrl: normalizeVideoUrl(form.videoUrl),
    },
  };
}

function formatApplicationText(data: DemoDayApplication): string {
  return [
    `Empresa: ${data.companyName}`,
    `Sitio web: ${data.website}`,
    `Fundación: ${data.founded}`,
    `Etapa: ${data.stage}`,
    `¿Buscan inversión?: ${data.seekingInvestment ? "Sí" : "No"}`,
    "",
    `Founder: ${data.contactName}`,
    `Correo: ${data.contactEmail}`,
    `Teléfono: ${data.contactPhone}`,
    `Video (1 min): ${data.videoUrl}`,
    `¿Tiene socios?: ${data.hasCoFounders ? "Sí" : "No"}`,
    ...(data.hasCoFounders ? [`Socios: ${data.coFounderNames}`] : []),
    "",
    "Problema:",
    data.problem,
    "",
    "Solución y producto:",
    data.solution,
    "",
    "Mercado objetivo:",
    data.targetMarket,
    "",
    "Equipo fundador:",
    data.team,
    "",
    "Tracción:",
    data.traction,
  ].join("\n");
}

export function demoDayApplicationMailto(data: DemoDayApplication) {
  const subject = `[Demo Day] Aplicación — ${data.companyName}`;
  const body = formatApplicationText(data);
  return `mailto:${DEMO_DAY_APPLY_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

const NOTION_API = "https://api.notion.com/v1";
const NOTION_VERSION = "2026-03-11";

function notionHeaders(token: string): HeadersInit {
  return {
    Authorization: `Bearer ${token}`,
    "Notion-Version": NOTION_VERSION,
    "Content-Type": "application/json",
  };
}

const NOTION_RICH_TEXT_LIMIT = 2000;

function notionRichText(value: string) {
  const chunks: Array<{ text: { content: string } }> = [];
  let remaining = value;
  while (remaining.length > 0) {
    chunks.push({ text: { content: remaining.slice(0, NOTION_RICH_TEXT_LIMIT) } });
    remaining = remaining.slice(NOTION_RICH_TEXT_LIMIT);
  }
  return { rich_text: chunks.length ? chunks : [{ text: { content: "" } }] };
}

/**
 * Maps form stage values to Notion Stage select option names.
 * Manual Notion cleanup: ensure "Bootstrapped" exists on the Stage property;
 * "Bootstrapped / sin levantar" and "Sin levantar" can be removed once
 * existing rows are migrated or left as legacy options.
 */
const NOTION_STAGE_NAMES: Record<DemoDayStage, string> = {
  "Pre-seed": "Pre-seed",
  Seed: "Seed",
  Bootstrapped: "Bootstrapped",
};

function buildDemoDayNotionProperties(data: DemoDayApplication) {
  const properties: Record<string, unknown> = {
    Name: {
      title: [{ text: { content: data.companyName.slice(0, 200) } }],
    },
    Founder: notionRichText(data.contactName),
    Email: { email: data.contactEmail },
    Phone: { phone_number: data.contactPhone },
    Website: { url: data.website },
    Founded: { number: Number.parseInt(data.founded, 10) },
    Stage: { select: { name: NOTION_STAGE_NAMES[data.stage] } },
    "Seeking Investment": { checkbox: data.seekingInvestment },
    "Has Co-founders": { checkbox: data.hasCoFounders },
    "Video URL": { url: data.videoUrl },
    Problem: notionRichText(data.problem),
    Solution: notionRichText(data.solution),
    "Target Market": notionRichText(data.targetMarket),
    Team: notionRichText(data.team),
    Traction: notionRichText(data.traction),
    Status: { select: { name: "Nueva" } },
  };

  if (data.hasCoFounders && data.coFounderNames) {
    properties["Co-founder Names"] = notionRichText(data.coFounderNames);
  }

  return properties;
}

function isNotionConfigured() {
  return Boolean(
    process.env.NOTION_TOKEN && process.env.NOTION_DEMO_DAY_APPLICATIONS_DATABASE_ID,
  );
}

/** Persists an application to Notion when configured. */
export async function submitDemoDayApplicationToNotion(
  data: DemoDayApplication,
): Promise<boolean> {
  const token = process.env.NOTION_TOKEN;
  const databaseId = process.env.NOTION_DEMO_DAY_APPLICATIONS_DATABASE_ID;
  if (!token || !databaseId) return false;

  try {
    const res = await fetch(`${NOTION_API}/pages`, {
      method: "POST",
      headers: notionHeaders(token),
      body: JSON.stringify({
        parent: { database_id: databaseId },
        properties: buildDemoDayNotionProperties(data),
      }),
    });

    if (!res.ok) {
      const detail = await res.text();
      console.error("[demo-day-apply] Notion create failed:", res.status, detail);
      return false;
    }

    return true;
  } catch (error) {
    console.error("[demo-day-apply] Notion create error:", error);
    return false;
  }
}

type SubmitSuccess =
  | { ok: true; method: "notion" }
  | { ok: true; method: "mailto"; mailto: string };

type SubmitFailure = { ok: false; error: string };

export async function submitDemoDayApplication(
  data: DemoDayApplication,
): Promise<SubmitSuccess | SubmitFailure> {
  try {
    if (isNotionConfigured()) {
      const saved = await submitDemoDayApplicationToNotion(data);
      if (saved) {
        return { ok: true, method: "notion" };
      }
      return {
        ok: false,
        error:
          "No pudimos guardar tu aplicación. Intenta de nuevo en unos minutos.",
      };
    }

    return {
      ok: true,
      method: "mailto",
      mailto: demoDayApplicationMailto(data),
    };
  } catch (error) {
    console.error("[demo-day-apply] Submission error:", error);
    return {
      ok: false,
      error: "Ocurrió un error inesperado al enviar tu aplicación.",
    };
  }
}
