# The 502 Project — Website

Bilingual (ES/EN) Next.js site for The 502 Project community in Guatemala. Events, blog, labs, and partner pages live here.

## Tech

- **Next.js 16** (App Router) with `next-intl` for ES/EN routing.
- **Tailwind CSS v4** + brand tokens in `src/app/globals.css`.
- **Markdown content** under `content/` (events + blog) parsed with `gray-matter` and rendered with `react-markdown` + `remark-gfm`.
- **Notion as headless CMS** (optional) for the Events section — see below.

## Development

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
npm run lint
```

## Content

### Events

Two sources, merged by `slug` (Notion wins when there is overlap):

1. **Local Markdown** files in `content/events/*.md`. Frontmatter shape lives in [`src/lib/events.ts`](src/lib/events.ts).
2. **Notion database** (optional). See _Notion as CMS_ below.

The pages live at `/eventos` and `/eventos/[slug]` (also `/en/eventos/...`). They use ISR with `export const revalidate = 60`, so new Notion entries appear within ~1 minute. You can also trigger an instant refresh from a Notion automation via the webhook (see below).

### Blog

Local Markdown only, under `content/blog/`.

## Notion as CMS

The Events section can be authored entirely in Notion. New events show up on the site without a redeploy.

### Database

A Notion database already exists: **Events (Website)** in the _The 502 Project_ teamspace (Teamspace Home → Events (Website)). Its id (`b439af06e86d48b593b393834c4af08c`) is the value of `NOTION_EVENTS_DATABASE_ID`.

Schema — **exactly 12 fields, names matched verbatim**:

Spanish is the **default** locale on this site (no URL prefix), so the built-in `Name` and `Description` columns hold the Spanish copy. The `Title EN` / `Description EN` columns hold the English variant and fall back to Spanish when empty.

| Property            | Type                                                              | Used for                                                                                |
| ------------------- | ----------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| `Name`              | Title (built-in)                                                  | Título en **español** (default).                                                        |
| `Title EN`          | Text                                                              | Title in **English**. Falls back to `Name` if empty.                                    |
| `Status`            | Select: `Draft`, `Published`                                      | Only `Published` rows appear on the site.                                               |
| `Date`              | Date (include start time + optional end time in the same field)   | Sorts the list, drives upcoming/past, populates the time labels on cards.               |
| `Category`          | Select: `hackathon`, `workshop`, `talk`, `mentorship`, `meetup`   | Pill on cards and detail. Defaults to `meetup`.                                         |
| `Format`            | Select: `presencial`, `virtual`, `hybrid`                         | Defaults to `presencial`.                                                               |
| `Location`          | Text                                                              | Venue / city. Hidden when empty.                                                        |
| `Description`       | Text                                                              | Descripción corta en **español** (cards + `<meta>` tags + OG).                          |
| `Description EN`    | Text                                                              | Short description in English. Falls back to `Description` when empty.                   |
| `Registration URL`  | URL                                                               | CTA link — Luma, Eventbrite, Google Form, whatever.                                     |
| `Collaborator`      | Text                                                              | Collaborator name. Empty = no collab. You can add an inline link to the collaborator.   |
| `Sponsors`          | Text (multiline)                                                  | One sponsor per line, formatted `Name \| https://url` or `Name (https://url)`. Empty = no sponsors. |

**Image (card + hero):** the **page cover** built into every Notion page. Set it from the page itself (`Add cover` at the top). No separate field.

**Body (long-form content):** whatever you write inside the page — text, headings, lists, images, callouts, code, columns. Fetched via [`GET /v1/pages/{id}/markdown`](https://developers.notion.com/reference/retrieve-page-markdown). Inline images pasted into the page render on the site automatically.

**Bilingual notes:** Spanish is the canonical content (`Name`, `Description`). English is a variant (`Title EN`, `Description EN`) and falls back to the Spanish copy when empty — useful if an event doesn't need translation. The body is a single blob — write it in the language you prefer (today the `.md` files are all in Spanish). For truly bilingual long-form content per event, ping us to add a second body field.

### Setup

1. Create (or reuse) an internal integration at [notion.so/profile/integrations](https://www.notion.so/profile/integrations) with _Read content_ capability. The 502 Project workspace already has one called **`the502project web`** — reuse it. The token is its _Internal Integration Token_.
2. Share the database with the integration: open the DB → `•••` → **Connections** → add `the502project web`.
3. Set env vars (Vercel → Project Settings → Environment Variables):

   ```bash
   NOTION_TOKEN=secret_xxx                                 # the502project web token
   NOTION_EVENTS_DATABASE_ID=b439af06e86d48b593b393834c4af08c
   NOTION_REVALIDATE_SECRET=any-long-random-string         # used by the webhook
   ```

4. (Optional) Instant refresh. The site already revalidates every 60s, but for immediate updates when you flip a Status to `Published`, configure a Notion automation:

   ```
   POST https://<your-domain>/api/revalidate-events
   x-revalidate-secret: <NOTION_REVALIDATE_SECRET>
   ```

### Caveats

- Notion-hosted file URLs (page covers and pasted images) are signed and expire in ~1 hour. ISR refetches every minute, so they stay fresh as long as the page gets traffic. For long-lived OG images, use an external URL (paste a link instead of uploading the file).
- The Notion API version pinned in [`src/lib/notion-events.ts`](src/lib/notion-events.ts) is `2026-03-11`. Bumping it may change the response schema.
- Notion + local Markdown coexist. If a Notion event's slug collides with a `content/events/*.md` file, Notion wins.

## Deploy

Push to GitHub → connect with Vercel. The included `vercel.json` keeps things minimal. Default branch is `main`.
