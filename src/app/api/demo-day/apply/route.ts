import { NextResponse } from "next/server";
import {
  submitDemoDayApplication,
  validateDemoDayApplication,
} from "@/lib/demo-day-apply";

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json(
      { ok: false, error: "Solicitud inválida." },
      { status: 400 },
    );
  }

  const validated = validateDemoDayApplication(body);
  if (!validated.ok) {
    return NextResponse.json(
      { ok: false, error: validated.error },
      { status: 400 },
    );
  }

  const result = await submitDemoDayApplication(validated.data);
  return NextResponse.json(result);
}

export const dynamic = "force-dynamic";
