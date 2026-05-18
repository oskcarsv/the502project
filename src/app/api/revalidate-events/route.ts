import { NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";
import { createHmac, timingSafeEqual } from "node:crypto";
import { NOTION_EVENTS_TAG } from "@/lib/notion-events";

// Webhook receiver that purges Next.js cache for the events section when
// Notion content changes. Supports two modes:
//
// 1. **Notion integration webhook** (recommended). When you create a
//    webhook subscription in your Notion connection's "Webhooks" tab,
//    Notion first POSTs a `{ verification_token: "secret_..." }` payload
//    to this URL. We log that token to Vercel function logs so you can
//    paste it back into Notion to verify the subscription. Once verified,
//    every subsequent event arrives signed with `X-Notion-Signature` (an
//    HMAC-SHA256 of the raw request body keyed with the verification
//    token). Store the same token in Vercel as
//    `NOTION_WEBHOOK_VERIFICATION_TOKEN` and we'll authenticate each call.
//
// 2. **Manual / no-code trigger**. Send `x-revalidate-secret:
//    <NOTION_REVALIDATE_SECRET>` (or `?secret=...`) to force a refresh.
//    Useful for `curl`, Zapier, Make, a bookmark, or a Notion Business+
//    automation.

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
  // We need the raw body (as text) to verify the Notion HMAC signature.
  const rawBody = await request.text();
  const body = safeJsonParse(rawBody);

  // --- Path 1: Notion subscription handshake ---------------------------
  // Notion's very first POST after you click "Create subscription"
  // contains only `{ verification_token: "secret_..." }`. We log it so
  // you can read it from the Vercel function logs and paste it back into
  // the Notion UI. Persist the same token as
  // NOTION_WEBHOOK_VERIFICATION_TOKEN to enable signed-event verification.
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

  // --- Path 2: Manual trigger (custom secret header) -------------------
  const manualSecret = process.env.NOTION_REVALIDATE_SECRET;
  const providedSecret =
    request.headers.get("x-revalidate-secret") ??
    new URL(request.url).searchParams.get("secret");

  if (manualSecret && providedSecret && constantTimeEquals(providedSecret, manualSecret)) {
    await revalidateAllEvents();
    return NextResponse.json({
      ok: true,
      mode: "manual",
      revalidatedAt: new Date().toISOString(),
    });
  }

  // --- Path 3: Signed Notion event -------------------------------------
  const verificationToken = process.env.NOTION_WEBHOOK_VERIFICATION_TOKEN;
  const signature = request.headers.get("x-notion-signature");

  if (verificationToken && signature) {
    const expected =
      "sha256=" +
      createHmac("sha256", verificationToken).update(rawBody).digest("hex");

    if (constantTimeEquals(expected, signature)) {
      await revalidateAllEvents();
      return NextResponse.json({
        ok: true,
        mode: "notion",
        event: typeof body?.type === "string" ? body.type : null,
        revalidatedAt: new Date().toISOString(),
      });
    }
  }

  return NextResponse.json(
    { ok: false, error: "Unauthorized" },
    { status: 401 },
  );
}

export const dynamic = "force-dynamic";
