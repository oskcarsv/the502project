import { NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";
import { createHmac, timingSafeEqual } from "node:crypto";
import { NOTION_EVENTS_TAG } from "@/lib/notion-events";

// Webhook receiver for the Notion integration's webhook subscription
// (Notion → "the502project web" → Webhooks tab). Two phases:
//
// 1. Subscription handshake. The very first POST after you click
//    "Create subscription" contains `{ verification_token: "secret_..." }`.
//    We log the token to the Vercel function logs so you can paste it back
//    into Notion's "Verify subscription" modal AND store it in Vercel as
//    `NOTION_WEBHOOK_VERIFICATION_TOKEN`.
//
// 2. Signed events. Every subsequent POST carries an `X-Notion-Signature`
//    header (HMAC-SHA256 of the raw body, keyed with the verification
//    token). We verify the signature, then invalidate the events caches so
//    the change becomes visible immediately.

async function revalidateAllEvents() {
  revalidateTag(NOTION_EVENTS_TAG, "default");
  revalidatePath("/eventos", "page");
  revalidatePath("/en/eventos", "page");
  revalidatePath("/eventos/[slug]", "page");
  revalidatePath("/en/eventos/[slug]", "page");
}

function safeJsonParse(text: string): Record<string, unknown> | null {
  if (!text) return null;
  try {
    return JSON.parse(text) as Record<string, unknown>;
  } catch {
    return null;
  }
}

function constantTimeEquals(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  try {
    return timingSafeEqual(Buffer.from(a), Buffer.from(b));
  } catch {
    return false;
  }
}

export async function POST(request: Request) {
  // Raw body is required to verify the HMAC signature byte-for-byte.
  const rawBody = await request.text();
  const body = safeJsonParse(rawBody);

  // --- Phase 1: subscription handshake ---------------------------------
  if (
    body &&
    typeof body.verification_token === "string" &&
    typeof body.type !== "string"
  ) {
    console.log(
      "[notion-webhook] >>> verification_token received. " +
        "Paste this into Notion's 'Verify subscription' modal AND store it " +
        "in Vercel as NOTION_WEBHOOK_VERIFICATION_TOKEN: " +
        body.verification_token,
    );
    return NextResponse.json({ ok: true, handshake: true });
  }

  // --- Phase 2: signed event -------------------------------------------
  const verificationToken = process.env.NOTION_WEBHOOK_VERIFICATION_TOKEN;
  const signature = request.headers.get("x-notion-signature");

  if (!verificationToken || !signature) {
    return NextResponse.json(
      { ok: false, error: "Unauthorized" },
      { status: 401 },
    );
  }

  const expected =
    "sha256=" +
    createHmac("sha256", verificationToken).update(rawBody).digest("hex");

  if (!constantTimeEquals(expected, signature)) {
    return NextResponse.json(
      { ok: false, error: "Invalid signature" },
      { status: 401 },
    );
  }

  await revalidateAllEvents();

  return NextResponse.json({
    ok: true,
    event: typeof body?.type === "string" ? body.type : null,
    revalidatedAt: new Date().toISOString(),
  });
}

export const dynamic = "force-dynamic";
