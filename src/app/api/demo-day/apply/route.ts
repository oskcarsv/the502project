import { NextResponse } from "next/server";
import { DEMO_DAY } from "@/lib/demo-day";
import {
  submitDemoDayApplication,
  validateDemoDayApplication,
} from "@/lib/demo-day-apply";

export async function POST(request: Request) {
  if (!DEMO_DAY.applicationsOpen) {
    return NextResponse.json(
      { ok: false, error: "La convocatoria del Demo Day ya cerró." },
      { status: 403 },
    );
  }

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

  try {
    const result = await submitDemoDayApplication(validated.data);
    if (!result.ok) {
      return NextResponse.json(result, { status: 500 });
    }
    return NextResponse.json(result);
  } catch (error) {
    console.error("[demo-day/apply] Unexpected error:", error);
    return NextResponse.json(
      {
        ok: false,
        error: "Ocurrió un error inesperado al enviar tu aplicación.",
      },
      { status: 500 },
    );
  }
}

export const dynamic = "force-dynamic";
