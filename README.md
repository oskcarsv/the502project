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

You can run the Events section from a Notion database without changing the website every time you publish an event. Pages that are pasted with images, callouts, headings, lists, etc. are rendered on the site automatically.

### 1. Create an integration

1. Open [https://www.notion.so/profile/integrations](https://www.notion.so/profile/integrations) and create an **internal integration**.
2. Give it _Read content_ capability. (Write is not required.)
3. Copy the **Internal Integration Token** — this becomes `NOTION_TOKEN`.

### 2. Create the events database

Create a Notion database called **Events** (or anything you want) and share it with the integration (page menu → **Connections** → add your integration).

Use this schema. Property names are matched exactly (case-sensitive). Only `Title`, `Date`, and `Status` are required — everything else is optional.

| Property             | Type       | Notes                                                                          |
| -------------------- | ---------- | ------------------------------------------------------------------------------ |
| `Title`              | Title      | English title.                                                                 |
| `Title ES`           | Rich text  | Spanish title. Falls back to `Title` if empty.                                 |
| `Slug`               | Rich text  | Optional. Used in the URL. Falls back to a slugified `Title`.                  |
| `Status`             | Select or Status | Must equal **`Published`** for the event to appear on the site.         |
| `Date`               | Date       | Used for sorting and for the upcoming/past split (today's date is the cutoff). |
| `Time`               | Rich text  | Free-form, e.g. `7:00 PM`.                                                     |
| `End Time`           | Rich text  | Free-form.                                                                     |
| `Category`           | Select     | One of `hackathon`, `workshop`, `talk`, `mentorship`, `meetup`. Defaults to `meetup`. |
| `Format`             | Select     | e.g. `presencial`, `virtual`, `hybrid`. Defaults to `presencial`.              |
| `Location`           | Rich text  | Venue or city.                                                                 |
| `Description`        | Rich text  | English short description (used on cards and meta tags).                       |
| `Description ES`     | Rich text  | Spanish short description.                                                     |
| `Cover`              | Files & media | Card image. Falls back to the page _cover_ if empty.                         |
| `Collaboration`      | Checkbox   | Show the "with X" pill.                                                        |
| `Collaborator Name`  | Rich text  |                                                                                |
| `Collaborator URL`   | URL        |                                                                                |
| `Luma URL`           | URL        | Primary registration CTA.                                                      |
| `Registration URL`   | URL        | Alternative CTA when `Luma URL` is empty.                                      |
| `Recording URL`      | URL        | Shown on past events.                                                          |
| `Sponsors`           | Rich text  | One per line, formatted as `Name | https://url` or `Name (https://url)`.       |

The body of each Notion page becomes the event detail content. It's fetched via the [`/v1/pages/{id}/markdown`](https://developers.notion.com/reference/retrieve-page-markdown) endpoint, so anything you can paste in Notion — including images, callouts, toggles, lists and code blocks — will render on the site. Inline images pasted into the page show up automatically; we only stage the page cover or the `Cover` files property as the card image.

### 3. Configure env vars

Set these in your hosting platform (e.g. Vercel → Project Settings → Environment Variables):

```bash
NOTION_TOKEN=secret_xxx                  # Internal integration token
NOTION_EVENTS_DATABASE_ID=xxxxxxxxxxxx   # DB id from the URL (or share link)
NOTION_REVALIDATE_SECRET=your-secret     # Optional: enables the webhook below
```

### 4. (Optional) Instant refresh from Notion

The site already revalidates every 60 seconds, but if you want events to appear immediately when you flip a Status to `Published`, expose the webhook:

```
POST https://<your-domain>/api/revalidate-events
x-revalidate-secret: <NOTION_REVALIDATE_SECRET>
```

Configure a Notion automation: _When `Status` changes to `Published` → call webhook → URL above with the header set_.

### Caveats

- Notion-hosted file URLs are signed and expire in ~1 hour. ISR re-fetches every minute, so inline images stay fresh as long as the page is visited regularly. If you need durable URLs (e.g. for OG previews), use the **external URL** flavor of the `Cover` files property (paste an image link instead of uploading) or host the asset on Vercel Blob / Cloudflare R2 / S3.
- The Notion API version pinned in [`src/lib/notion-events.ts`](src/lib/notion-events.ts) is `2026-03-11`. Bumping it may change the response schema.
- The integration only reads `Status = Published` pages — drafts stay private.

## Deploy

Push to GitHub → connect with Vercel. The included `vercel.json` keeps things minimal. Default branch is `main`.
