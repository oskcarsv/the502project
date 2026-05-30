const NOTION_VERSION = "2022-06-28";
const NOTION_API = "https://api.notion.com/v1";

type NotionTextProperty = {
  rich_text: Array<{ text: { content: string } }>;
};

type NotionTitleProperty = {
  title: Array<{ text: { content: string } }>;
};

type NotionEmailProperty = { email: string };
type NotionSelectProperty = { select: { name: string } };

type LabsInterestRecord = {
  name: string;
  email: string;
  building: string;
  locale: string;
};

export async function createLabsInterestRecord(record: LabsInterestRecord) {
  const token = process.env.NOTION_TOKEN;
  const databaseId = process.env.NOTION_LABS_DATABASE_ID;

  if (!token || !databaseId) {
    throw new Error("Notion credentials not configured");
  }

  const properties: Record<
    string,
    NotionTitleProperty | NotionTextProperty | NotionEmailProperty | NotionSelectProperty
  > = {
    Name: { title: [{ text: { content: record.name } }] },
    Email: { email: record.email },
    Locale: { select: { name: record.locale } },
    Status: { select: { name: "New" } },
  };

  if (record.building) {
    properties.Building = {
      rich_text: [{ text: { content: record.building } }],
    };
  }

  const res = await fetch(`${NOTION_API}/pages`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Notion-Version": NOTION_VERSION,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      parent: { database_id: databaseId },
      properties,
    }),
  });

  if (!res.ok) {
    const detail = await res.text();
    throw new Error(`Notion API error ${res.status}: ${detail}`);
  }
}

type NotionUrlProperty = { url: string };
type NotionPhoneProperty = { phone_number: string };

type BuildPitchApplication = {
  startup: string;
  role: string;
  founderName: string;
  email: string;
  whatsapp: string;
  linkedin: string;
  video: string;
  problem: string;
  industry: string;
  stage: string;
  mvpLink: string;
  traction: string;
  hasCofounders: string;
  cofounders: string;
  canAttend: string;
  sprint: string;
  moment: string;
  why: string;
  locale: string;
};

const text = (content: string): NotionTextProperty => ({
  rich_text: [{ text: { content: content.slice(0, 2000) } }],
});

export async function createBuildPitchApplication(app: BuildPitchApplication) {
  const token = process.env.NOTION_TOKEN;
  const databaseId = process.env.NOTION_BUILD_PITCH_DATABASE_ID;

  if (!token || !databaseId) {
    throw new Error("Notion Build & Pitch credentials not configured");
  }

  const properties: Record<
    string,
    | NotionTitleProperty
    | NotionTextProperty
    | NotionEmailProperty
    | NotionSelectProperty
    | NotionUrlProperty
    | NotionPhoneProperty
  > = {
    Startup: { title: [{ text: { content: app.startup } }] },
    Rol: text(app.role),
    "Fundador/a": text(app.founderName),
    Email: { email: app.email },
    LinkedIn: { url: app.linkedin },
    "¿Qué problema resuelve?": text(app.problem),
    Industria: { select: { name: app.industry } },
    Etapa: { select: { name: app.stage } },
    "¿Tiene co-founders?": { select: { name: app.hasCofounders } },
    "¿Cómo aprovechará el sprint?": text(app.sprint),
    "¿Por qué es su momento?": text(app.moment),
    "¿Por qué esta edición?": text(app.why),
    Idioma: { select: { name: app.locale } },
    Estado: { select: { name: "Nueva" } },
  };

  if (app.video) properties["Video (1 min)"] = { url: app.video };
  if (app.mvpLink) properties["Link al MVP / Demo"] = { url: app.mvpLink };
  if (app.whatsapp) properties.WhatsApp = { phone_number: app.whatsapp };
  if (app.cofounders) properties["Co-founders"] = text(app.cofounders);
  if (app.canAttend) properties["¿Pueden asistir?"] = { select: { name: app.canAttend } };
  if (app.traction) properties["Tracción"] = text(app.traction);

  const res = await fetch(`${NOTION_API}/pages`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Notion-Version": NOTION_VERSION,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      parent: { database_id: databaseId },
      properties,
    }),
  });

  if (!res.ok) {
    const detail = await res.text();
    throw new Error(`Notion API error ${res.status}: ${detail}`);
  }
}
