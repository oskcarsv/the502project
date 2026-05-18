import "server-only";
import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { getNotionEvents } from "./notion-events";

const CONTENT_DIR = path.join(process.cwd(), "content/events");

export type EventType = "hackathon" | "workshop" | "talk" | "mentorship" | "meetup";
export type EventStatus = "upcoming" | "past";

export type Sponsor = { name: string; url: string };

export type EventFrontmatter = {
  title: string;
  titleEs: string;
  date: string;
  time?: string;
  endTime?: string;
  category: EventType;
  format: string;
  location?: string;
  description: string;
  descriptionEs: string;
  image?: string;
  collaboration?: boolean;
  collaboratorName?: string;
  collaboratorUrl?: string;
  sponsors?: Sponsor[];
  lumaUrl?: string;
  customRegistrationUrl?: string;
  recordingUrl?: string;
};

export type EventItem = EventFrontmatter & {
  slug: string;
  content: string;
  status: EventStatus;
};

function normalizeDate(value: unknown): string {
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  return String(value);
}

function computeStatus(date: string): EventStatus {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const eventDate = new Date(date);
  eventDate.setHours(0, 0, 0, 0);
  return eventDate >= today ? "upcoming" : "past";
}

async function readEvent(filename: string): Promise<EventItem> {
  const filePath = path.join(CONTENT_DIR, filename);
  const raw = await fs.readFile(filePath, "utf8");
  const { data, content } = matter(raw);
  const slug = filename.replace(/\.md$/, "");
  const fm = data as EventFrontmatter;
  const date = normalizeDate(fm.date);
  return {
    ...fm,
    date,
    slug,
    content,
    status: computeStatus(date),
  };
}

async function readAllMarkdownEvents(): Promise<EventItem[]> {
  let files: string[];
  try {
    files = await fs.readdir(CONTENT_DIR);
  } catch (err) {
    if ((err as NodeJS.ErrnoException)?.code === "ENOENT") return [];
    throw err;
  }
  return Promise.all(files.filter((f) => f.endsWith(".md")).map(readEvent));
}

/**
 * Merge Notion-sourced events with the local markdown files. When a slug
 * appears in both sources, Notion wins — this lets us migrate an event from a
 * `.md` file to the CMS without removing the file or breaking the URL.
 */
function mergeEvents(
  notion: EventItem[] | null,
  markdown: EventItem[],
): EventItem[] {
  if (!notion || notion.length === 0) return markdown;
  const bySlug = new Map<string, EventItem>();
  for (const ev of markdown) bySlug.set(ev.slug, ev);
  for (const ev of notion) bySlug.set(ev.slug, ev);
  return Array.from(bySlug.values());
}

export async function getAllEvents(): Promise<EventItem[]> {
  const [notion, markdown] = await Promise.all([
    getNotionEvents(),
    readAllMarkdownEvents(),
  ]);
  const merged = mergeEvents(notion, markdown);
  // Default sort: most recent first (works for both upcoming and past).
  return merged.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getEventBySlug(slug: string): Promise<EventItem | null> {
  const all = await getAllEvents();
  return all.find((ev) => ev.slug === slug) ?? null;
}

export async function getAllEventSlugs(): Promise<string[]> {
  const all = await getAllEvents();
  return all.map((ev) => ev.slug);
}

export function partitionEvents(events: EventItem[]) {
  const upcoming = events
    .filter((e) => e.status === "upcoming")
    .sort((a, b) => (a.date > b.date ? 1 : -1)); // soonest first
  const past = events
    .filter((e) => e.status === "past")
    .sort((a, b) => (a.date > b.date ? -1 : 1)); // most recent first
  return { upcoming, past };
}
