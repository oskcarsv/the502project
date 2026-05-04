"use server";

import { getLocale } from "next-intl/server";
import { createLabsInterestRecord } from "@/lib/notion";

export type LabsInterestState =
  | { status: "idle" }
  | { status: "success" }
  | { status: "error"; message: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function submitLabsInterest(
  _prev: LabsInterestState,
  formData: FormData,
): Promise<LabsInterestState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const building = String(formData.get("building") ?? "").trim();

  if (!name || !email || !EMAIL_RE.test(email)) {
    return { status: "error", message: "invalid" };
  }

  const locale = await getLocale();

  try {
    await createLabsInterestRecord({ name, email, building, locale });
    return { status: "success" };
  } catch (err) {
    console.error("[labs:interest] notion write failed", err);
    return { status: "error", message: "server" };
  }
}
