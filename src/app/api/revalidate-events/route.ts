import { NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";
import { NOTION_EVENTS_TAG } from "@/lib/notion-events";

// Triggers an on-demand refresh of every event-related cache entry.
//
// Configure a Notion automation (or any external scheduler) to call this URL
// after publishing/editing an event. Example:
//
//   POST https://the502project.com/api/revalidate-events
//   x-revalidate-secret: <NOTION_REVALIDATE_SECRET>
//
// If NOTION_REVALIDATE_SECRET is unset the endpoint is closed off.
export async function POST(request: Request) {
  const secret = process.env.NOTION_REVALIDATE_SECRET;
  if (!secret) {
    return NextResponse.json(
      { ok: false, error: "Revalidation secret not configured" },
      { status: 503 },
    );
  }

  const provided =
    request.headers.get("x-revalidate-secret") ??
    new URL(request.url).searchParams.get("secret");

  if (provided !== secret) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  revalidateTag(NOTION_EVENTS_TAG, "default");
  revalidatePath("/eventos", "page");
  revalidatePath("/en/eventos", "page");
  revalidatePath("/eventos/[slug]", "page");
  revalidatePath("/en/eventos/[slug]", "page");

  return NextResponse.json({ ok: true, revalidatedAt: new Date().toISOString() });
}

export const dynamic = "force-dynamic";
