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
