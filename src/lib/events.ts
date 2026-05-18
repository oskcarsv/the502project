import "server-only";
import { getNotionEvents } from "./notion-events";

export type EventType = "hackathon" | "workshop" | "talk" | "mentorship" | "meetup";
export type EventStatus = "upcoming" | "past";

export type Sponsor = { name: string; url: string };

export type EventFrontmatter = {
  // Spanish is the default site locale (no URL prefix), so `title` and
  // `description` hold Spanish copy. `titleEn` / `descriptionEn` are the
  // English variants and fall back to the Spanish copy when empty.
  title: string;
  titleEn?: string;
  date: string;
  time?: string;
  endTime?: string;
  category: EventType;
  format: string;
  location?: string;
  description: string;
  descriptionEn?: string;
  image?: string;
  // `collaboratorName` may include an inline markdown link to the collaborator.
  collaboratorName?: string;
  sponsors?: Sponsor[];
  registrationUrl?: string;
};

export type EventItem = EventFrontmatter & {
  slug: string;
  content: string;
  status: EventStatus;
};

export async function getAllEvents(): Promise<EventItem[]> {
  const events = await getNotionEvents();
  // Most recent first (works for both upcoming and past).
  return events.slice().sort((a, b) => (a.date < b.date ? 1 : -1));
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
