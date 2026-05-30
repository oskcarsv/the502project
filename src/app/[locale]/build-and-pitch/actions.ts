"use server";

import { getLocale } from "next-intl/server";
import { createBuildPitchApplication } from "@/lib/notion";
import { BUILD_PITCH, type BuildPitchStage } from "@/lib/build-pitch";

export type BuildPitchState =
  | { status: "idle" }
  | { status: "success" }
  | { status: "error"; message: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const URL_RE = /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/\S*)?$/i;
const PHONE_RE = /^\d{8,15}$/;

function isStage(value: string): value is BuildPitchStage {
  return (BUILD_PITCH.stages as readonly string[]).includes(value);
}

function isIndustry(value: string): boolean {
  return (BUILD_PITCH.industries as readonly string[]).includes(value);
}

export async function submitBuildPitchApplication(
  _prev: BuildPitchState,
  formData: FormData,
): Promise<BuildPitchState> {
  const get = (key: string) => String(formData.get(key) ?? "").trim();

  const startup = get("startup");
  const role = get("role");
  const founderName = get("founderName");
  const email = get("email");
  const whatsapp = get("whatsapp");
  const linkedin = get("linkedin");
  const video = get("video");
  const problem = get("problem");
  const industry = get("industry");
  const stage = get("stage");
  const mvpLink = get("mvpLink");
  const traction = get("traction");
  const hasCofounders = get("hasCofounders");
  const cofounders = get("cofounders");
  const canAttend = get("canAttend");
  const sprint = get("sprint");
  const moment = get("moment");
  const why = get("why");

  const requiredText = [
    startup,
    role,
    founderName,
    linkedin,
    video,
    problem,
    sprint,
    moment,
    why,
  ];

  if (
    requiredText.some((v) => !v) ||
    !EMAIL_RE.test(email) ||
    !PHONE_RE.test(whatsapp) ||
    !isStage(stage) ||
    !isIndustry(industry) ||
    !URL_RE.test(linkedin) ||
    !URL_RE.test(video) ||
    (mvpLink !== "" && !URL_RE.test(mvpLink))
  ) {
    return { status: "error", message: "invalid" };
  }

  const locale = await getLocale();

  try {
    await createBuildPitchApplication({
      startup,
      role,
      founderName,
      email,
      whatsapp,
      linkedin,
      video,
      problem,
      industry,
      stage,
      mvpLink,
      traction,
      hasCofounders,
      cofounders,
      canAttend,
      sprint,
      moment,
      why,
      locale,
    });
    return { status: "success" };
  } catch (err) {
    console.error("[build-pitch:application] notion write failed", err);
    return { status: "error", message: "server" };
  }
}
