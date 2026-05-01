import "server-only";
import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

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

export async function getAllEvents(): Promise<EventItem[]> {
  const files = await fs.readdir(CONTENT_DIR);
  const events = await Promise.all(
    files.filter((f) => f.endsWith(".md")).map(readEvent),
  );
  // Default sort: most recent first (works for both upcoming and past).
  return events.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getEventBySlug(slug: string): Promise<EventItem | null> {
  try {
    return await readEvent(`${slug}.md`);
  } catch {
    return null;
  }
}

export async function getAllEventSlugs(): Promise<string[]> {
  const files = await fs.readdir(CONTENT_DIR);
  return files
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
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
