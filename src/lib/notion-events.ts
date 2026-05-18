import "server-only";
import type {
  EventFrontmatter,
  EventItem,
  EventStatus,
  EventType,
  Sponsor,
} from "./events";

const NOTION_API = "https://api.notion.com/v1";
// 2026-03-11 supports the data-sources query model AND the
// `GET /v1/pages/{id}/markdown` endpoint that lets us pull the page body
// straight as Notion-flavored Markdown — no block walking required.
const NOTION_VERSION = "2026-03-11";

/**
 * Cache tag used by the events fetches. Call `revalidateTag(NOTION_EVENTS_TAG)`
 * to force a refresh (see /api/revalidate-events).
 */
export const NOTION_EVENTS_TAG = "notion-events";

// How long (in seconds) Notion responses live in the Next.js data cache before
// being treated as stale. Short enough that newly-published events show up
// quickly, long enough to stay well under Notion's rate limit and to outlast
// individual signed file URLs being re-fetched on each revalidation.
const NOTION_REVALIDATE_SECONDS = 60;

type NotionPlainText = { plain_text?: string };
type NotionRichText = NotionPlainText[];

type NotionFile =
  | { type: "external"; external: { url: string } }
  | { type: "file"; file: { url: string; expiry_time?: string } };

type NotionPropertyValue = {
  id?: string;
  type: string;
  title?: NotionRichText;
  rich_text?: NotionRichText;
  select?: { name: string } | null;
  multi_select?: Array<{ name: string }>;
  status?: { name: string } | null;
  url?: string | null;
  email?: string | null;
  checkbox?: boolean;
  date?: { start: string; end: string | null } | null;
  files?: NotionFile[];
};

type NotionPage = {
  id: string;
  cover: NotionFile | null;
  properties: Record<string, NotionPropertyValue>;
};

type NotionDatabase = {
  id: string;
  data_sources?: Array<{ id: string; name: string }>;
};

type NotionListResponse<T> = {
  results: T[];
  has_more: boolean;
  next_cursor: string | null;
};

type NotionPageMarkdown = {
  object: "page_markdown";
  id: string;
  markdown: string;
  truncated: boolean;
  unknown_block_ids: string[];
};

function authHeaders(token: string): HeadersInit {
  return {
    Authorization: `Bearer ${token}`,
    "Notion-Version": NOTION_VERSION,
    "Content-Type": "application/json",
  };
}

let cachedDataSourceId: { databaseId: string; dataSourceId: string } | null =
  null;

async function getEventsDataSourceId(
  token: string,
  databaseId: string,
): Promise<string> {
  if (cachedDataSourceId?.databaseId === databaseId) {
    return cachedDataSourceId.dataSourceId;
  }
  const res = await fetch(`${NOTION_API}/databases/${databaseId}`, {
    headers: authHeaders(token),
    next: { revalidate: 60 * 60, tags: [NOTION_EVENTS_TAG] },
  });
  if (!res.ok) {
    throw new Error(
      `Notion: failed to load database ${databaseId} (${res.status})`,
    );
  }
  const db = (await res.json()) as NotionDatabase;
  const ds = db.data_sources?.[0]?.id;
  if (!ds) {
    throw new Error(
      `Notion: database ${databaseId} has no data_sources. ` +
        `Share the database with the integration and try again.`,
    );
  }
  cachedDataSourceId = { databaseId, dataSourceId: ds };
  return ds;
}

async function queryEvents(
  token: string,
  dataSourceId: string,
): Promise<NotionPage[]> {
  const results: NotionPage[] = [];
  let cursor: string | null = null;

  do {
    const body: Record<string, unknown> = {
      page_size: 100,
      filter: {
        // We support either a `select` or `status` property called "Status".
        // Notion's filter API requires picking one, so we use an OR.
        or: [
          { property: "Status", select: { equals: "Published" } },
          { property: "Status", status: { equals: "Published" } },
        ],
      },
      sorts: [{ property: "Date", direction: "descending" }],
    };
    if (cursor) body.start_cursor = cursor;

    const res = await fetch(
      `${NOTION_API}/data_sources/${dataSourceId}/query`,
      {
        method: "POST",
        headers: authHeaders(token),
        body: JSON.stringify(body),
        next: { revalidate: NOTION_REVALIDATE_SECONDS, tags: [NOTION_EVENTS_TAG] },
      },
    );

    if (!res.ok) {
      const detail = await res.text();
      throw new Error(`Notion query failed (${res.status}): ${detail}`);
    }

    const json = (await res.json()) as NotionListResponse<NotionPage>;
    results.push(...json.results);
    cursor = json.has_more ? json.next_cursor : null;
  } while (cursor);

  return results;
}

async function fetchPageMarkdown(
  token: string,
  pageId: string,
): Promise<string> {
  const res = await fetch(`${NOTION_API}/pages/${pageId}/markdown`, {
    headers: authHeaders(token),
    next: { revalidate: NOTION_REVALIDATE_SECONDS, tags: [NOTION_EVENTS_TAG] },
  });
  if (!res.ok) {
    console.error(
      `[notion-events] page markdown ${pageId} failed: ${res.status}`,
    );
    return "";
  }
  const json = (await res.json()) as NotionPageMarkdown;
  return normalizeEnhancedMarkdown(json.markdown ?? "");
}

/**
 * Notion's "enhanced markdown" embeds XML-like tags for callouts, toggles,
 * mentions, etc. Our `react-markdown` renderer only understands standard
 * Markdown + GFM, so we strip the tags we can't render and keep their text
 * content. Standard syntax (headings, lists, links, images, code, quotes,
 * tables) passes through untouched.
 */
function normalizeEnhancedMarkdown(md: string): string {
  return md
    // <callout icon="..." color="..."> ... </callout>  ->  > ... (quote)
    .replace(/<callout[^>]*>([\s\S]*?)<\/callout>/g, (_, inner: string) => {
      const lines = inner.trim().split(/\r?\n/);
      return lines.map((l) => `> ${l.replace(/^\t/, "")}`).join("\n");
    })
    // <details><summary>Title</summary> body </details>  ->  **Title**\n body
    .replace(
      /<details[^>]*>\s*<summary>([\s\S]*?)<\/summary>([\s\S]*?)<\/details>/g,
      (_, title: string, body: string) => `**${title.trim()}**\n\n${body.trim()}`,
    )
    // <columns><column>...</column>...</columns> -> just inline the columns
    .replace(/<\/?columns>/g, "")
    .replace(/<\/?column>/g, "")
    // <empty-block/>  -> blank line
    .replace(/<empty-block\s*\/>/g, "")
    // <mention-* ...>Label</mention-*>  -> Label
    .replace(/<mention-[^>]*>([\s\S]*?)<\/mention-[^>]*>/g, "$1")
    .replace(/<mention-[^/]*\/>/g, "")
    // <page url="...">Title</page> -> [Title](url)
    .replace(
      /<page[^>]*url="([^"]+)"[^>]*>([\s\S]*?)<\/page>/g,
      (_, url: string, title: string) => `[${title.trim()}](${url})`,
    )
    // <table_of_contents/> -> remove
    .replace(/<table_of_contents[^>]*\/?>/g, "")
    // {color="..."} attribute tails -> drop them
    .replace(/\s*\{color="[^"]*"\}/g, "")
    .replace(/\s*\{toggle="[^"]*"\}/g, "")
    // <unknown-block .../> -> drop
    .replace(/<unknown-block[^>]*\/?>/g, "");
}

function plainText(prop: NotionPropertyValue | undefined): string {
  if (!prop) return "";
  if (prop.type === "title" && prop.title) {
    return prop.title.map((t) => t.plain_text ?? "").join("");
  }
  if (prop.type === "rich_text" && prop.rich_text) {
    return prop.rich_text.map((t) => t.plain_text ?? "").join("");
  }
  return "";
}

function selectName(prop: NotionPropertyValue | undefined): string | null {
  if (!prop) return null;
  if (prop.type === "select") return prop.select?.name ?? null;
  if (prop.type === "status") return prop.status?.name ?? null;
  return null;
}

function urlValue(prop: NotionPropertyValue | undefined): string | undefined {
  if (!prop) return undefined;
  if (prop.type === "url") return prop.url ?? undefined;
  return undefined;
}

function checkboxValue(prop: NotionPropertyValue | undefined): boolean {
  return prop?.type === "checkbox" ? Boolean(prop.checkbox) : false;
}

function dateStart(prop: NotionPropertyValue | undefined): string {
  if (prop?.type === "date" && prop.date?.start) return prop.date.start;
  return "";
}

function fileUrl(file: NotionFile | null | undefined): string | undefined {
  if (!file) return undefined;
  if (file.type === "external") return file.external?.url;
  if (file.type === "file") return file.file?.url;
  return undefined;
}

function firstFileUrl(
  prop: NotionPropertyValue | undefined,
): string | undefined {
  if (!prop || prop.type !== "files" || !prop.files) return undefined;
  return fileUrl(prop.files[0]);
}

function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

function resolveSlug(
  props: Record<string, NotionPropertyValue>,
  pageId: string,
): string {
  const explicit = plainText(props["Slug"]).trim();
  if (explicit) return slugify(explicit);
  const title = plainText(props["Title"] ?? props["Name"]).trim();
  if (title) return slugify(title);
  return pageId.replace(/-/g, "");
}

function categoryValue(raw: string | null): EventType {
  const allowed: EventType[] = [
    "hackathon",
    "workshop",
    "talk",
    "mentorship",
    "meetup",
  ];
  const value = (raw ?? "").toLowerCase() as EventType;
  return allowed.includes(value) ? value : "meetup";
}

function computeStatus(date: string): EventStatus {
  if (!date) return "past";
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const eventDate = new Date(`${date}T12:00:00`);
  eventDate.setHours(0, 0, 0, 0);
  return eventDate >= today ? "upcoming" : "past";
}

function parseSponsors(
  prop: NotionPropertyValue | undefined,
): Sponsor[] | undefined {
  const raw = plainText(prop).trim();
  if (!raw) return undefined;
  // Accept lines like:  Name | https://url   or   Name (https://url)
  const sponsors: Sponsor[] = [];
  for (const line of raw.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    const pipe = trimmed.split("|").map((s) => s.trim());
    if (pipe.length === 2 && pipe[1]) {
      sponsors.push({ name: pipe[0], url: pipe[1] });
      continue;
    }
    const paren = trimmed.match(/^(.*?)\s*\((https?:\/\/[^)]+)\)\s*$/);
    if (paren) {
      sponsors.push({ name: paren[1].trim(), url: paren[2].trim() });
    }
  }
  return sponsors.length ? sponsors : undefined;
}

function mapPage(page: NotionPage, content: string): EventItem {
  const props = page.properties;
  const title = plainText(props["Title"] ?? props["Name"]).trim();
  const titleEs = plainText(props["Title ES"]).trim() || title;
  const description = plainText(props["Description"]).trim();
  const descriptionEs =
    plainText(props["Description ES"]).trim() || description;

  const date = dateStart(props["Date"]);
  const image =
    firstFileUrl(props["Cover"]) ??
    firstFileUrl(props["Image"]) ??
    fileUrl(page.cover);

  const frontmatter: EventFrontmatter = {
    title,
    titleEs,
    date,
    time: plainText(props["Time"]).trim() || undefined,
    endTime: plainText(props["End Time"]).trim() || undefined,
    category: categoryValue(selectName(props["Category"])),
    format: (selectName(props["Format"]) ?? "presencial").toLowerCase(),
    location: plainText(props["Location"]).trim() || undefined,
    description,
    descriptionEs,
    image,
    collaboration: checkboxValue(props["Collaboration"]),
    collaboratorName:
      plainText(props["Collaborator Name"]).trim() || undefined,
    collaboratorUrl: urlValue(props["Collaborator URL"]),
    sponsors: parseSponsors(props["Sponsors"]),
    lumaUrl: urlValue(props["Luma URL"]),
    customRegistrationUrl: urlValue(props["Registration URL"]),
    recordingUrl: urlValue(props["Recording URL"]),
  };

  return {
    ...frontmatter,
    slug: resolveSlug(props, page.id),
    content,
    status: computeStatus(date),
  };
}

/**
 * Fetch published events from the Notion "events" database.
 *
 * Returns:
 *   - `null` when the integration is not configured (no env vars). Callers
 *     should treat this as "no Notion source available" and fall back to the
 *     local markdown files.
 *   - `[]` when configured but the database is empty or every page is in
 *     draft. This is a successful empty response.
 *
 * Required env vars:
 *   - NOTION_TOKEN
 *   - NOTION_EVENTS_DATABASE_ID
 */
export async function getNotionEvents(): Promise<EventItem[] | null> {
  const token = process.env.NOTION_TOKEN;
  const databaseId = process.env.NOTION_EVENTS_DATABASE_ID;
  if (!token || !databaseId) return null;

  try {
    const dataSourceId = await getEventsDataSourceId(token, databaseId);
    const pages = await queryEvents(token, dataSourceId);

    const events = await Promise.all(
      pages.map(async (page) => {
        const content = await fetchPageMarkdown(token, page.id);
        return mapPage(page, content);
      }),
    );

    return events;
  } catch (err) {
    console.error("[notion-events] fetch failed:", err);
    return null;
  }
}
