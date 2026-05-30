"use client";

import * as React from "react";
import { useActionState, useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import {
  submitBuildPitchApplication,
  type BuildPitchState,
} from "@/app/[locale]/build-and-pitch/actions";
import { BUILD_PITCH } from "@/lib/build-pitch";

const initialState: BuildPitchState = { status: "idle" };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Accepts links with or without protocol: something.tld(/path)
const URL_RE = /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/\S*)?$/i;

function normalizeUrl(v: string) {
  const s = v.trim();
  if (!s) return "";
  return /^https?:\/\//i.test(s) ? s : `https://${s}`;
}

type FieldDef = {
  name: string;
  label: string;
  type: "text" | "email" | "tel" | "url" | "textarea" | "select";
  placeholder?: string;
  required?: boolean;
  full?: boolean;
  hint?: string;
  options?: readonly string[];
  optionLabels?: Record<string, string>;
};

type StepDef = {
  index: string;
  title: string;
  subtitle: string;
  fields: FieldDef[];
};

const STEPS: StepDef[] = [
  {
    index: "01",
    title: "Sobre ti",
    subtitle: "Quién aplica.",
    fields: [
      { name: "founderName", label: "Tu nombre completo", type: "text", required: true, placeholder: "Nombre y apellido" },
      { name: "role", label: "¿Cuál es tu rol?", type: "text", required: true, placeholder: "CEO, CTO, fundador, etc." },
      { name: "email", label: "Email", type: "email", required: true, placeholder: "tucorreo@startup.com" },
      { name: "whatsapp", label: "WhatsApp", type: "tel", required: true, placeholder: "Ej. 5012 3456" },
      { name: "linkedin", label: "Tu LinkedIn", type: "url", required: true, full: true, placeholder: "https://linkedin.com/in/…" },
      { name: "video", label: "Video de 1 minuto hablando sobre ti", type: "url", required: true, full: true, placeholder: "Link a tu video (YouTube, Loom, Drive…)", hint: "1 minuto: cuéntanos quién eres, qué construyes y por qué." },
    ],
  },
  {
    index: "02",
    title: "Tu startup",
    subtitle: "Qué estás construyendo.",
    fields: [
      { name: "startup", label: "¿Cuál es el nombre de tu startup / emprendimiento?", type: "text", required: true, full: true, placeholder: "Nombre de tu startup" },
      { name: "problem", label: "¿Qué problema resuelve tu startup / emprendimiento?", type: "textarea", required: true, full: true, placeholder: "Explícanos qué problema resuelven y para quién." },
      { name: "industry", label: "Industria", type: "select", required: true, options: BUILD_PITCH.industries, placeholder: "Selecciona una industria" },
      { name: "stage", label: "Etapa de tu startup", type: "select", required: true, options: BUILD_PITCH.stages, placeholder: "Selecciona una etapa" },
      { name: "mvpLink", label: "Link a tu MVP, demo o producto (opcional)", type: "url", full: true, placeholder: "https://...", hint: "Si tienes algo en línea, compártelo. Lo importante es que tengas algo en qué trabajar ese día." },
      { name: "traction", label: "Tracción actual (opcional)", type: "textarea", full: true, placeholder: "Usuarios, ingresos, crecimiento u otra señal." },
    ],
  },
  {
    index: "03",
    title: "Tu equipo",
    subtitle: "Quiénes construyen contigo.",
    fields: [
      { name: "hasCofounders", label: "¿Tienes co-founders?", type: "select", required: true, options: BUILD_PITCH.yesNo, placeholder: "Selecciona una opción" },
      { name: "canAttend", label: "¿Tú y tus co-founders podrían asistir al Build & Pitch?", type: "select", options: BUILD_PITCH.attendance, placeholder: "Selecciona una opción" },
      { name: "cofounders", label: "Si tienes co-founders, deja sus nombres y roles", type: "textarea", full: true, placeholder: "Nombre y rol de cada co-founder." },
    ],
  },
  {
    index: "04",
    title: "Por qué tú",
    subtitle: "Cuéntanos tu motivación.",
    fields: [
      { name: "sprint", label: "¿Cómo aprovecharás al máximo este sprint de 6 horas?", type: "textarea", required: true, full: true, placeholder: "Qué quieres lograr y avanzar ese día." },
      { name: "moment", label: "¿Por qué crees que este es tu momento de construir y dar a conocer tu startup?", type: "textarea", required: true, full: true, placeholder: "Cuéntanos por qué es tu momento." },
      { name: "why", label: "¿Por qué debes estar en esta edición del Build & Pitch?", type: "textarea", required: true, full: true, placeholder: "Convéncenos en pocas líneas." },
    ],
  },
];

const ALL_FIELDS = STEPS.flatMap((s) => s.fields);

const baseField =
  "w-full border-b bg-transparent px-1 text-lg text-foreground placeholder:text-foreground/35 transition-colors focus:outline-none";

function fieldClasses(invalid: boolean) {
  return `${baseField} ${
    invalid
      ? "border-red-400 focus:border-red-400"
      : "border-foreground/15 focus:border-brand-green"
  }`;
}

function isInvalid(def: FieldDef, value: string) {
  const v = (value ?? "").trim();
  if (!v) return Boolean(def.required);
  if (def.type === "email") return !EMAIL_RE.test(v);
  if (def.type === "url") return !URL_RE.test(v);
  if (def.type === "tel") return !/^\d{8,15}$/.test(v);
  return false;
}

function errorMessage(def: FieldDef, value: string) {
  const v = (value ?? "").trim();
  if (!v) return "Este campo es obligatorio.";
  if (def.type === "email") return "Ingresa un email válido.";
  if (def.type === "url") return "Ingresa un link válido (https://...).";
  if (def.type === "tel") return "Ingresa un número válido (solo números).";
  return "Revisa este campo.";
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex h-14 items-center justify-center gap-2 rounded-md bg-brand-green px-9 text-lg font-semibold text-brand-dark transition-colors hover:bg-brand-green/85 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending ? "Enviando…" : "Enviar aplicación"}
      <ArrowRight className="size-4" />
    </button>
  );
}

export function BuildPitchApplicationForm() {
  const [state, action] = useActionState(
    submitBuildPitchApplication,
    initialState,
  );

  const containerRef = useRef<HTMLDivElement>(null);
  const [values, setValues] = useState<Record<string, string>>({});
  const [step, setStep] = useState(0);
  const [tried, setTried] = useState<boolean[]>([false, false, false, false]);

  const totalRequired = ALL_FIELDS.filter((f) => f.required).length;
  const filledRequired = ALL_FIELDS.filter(
    (f) => f.required && !isInvalid(f, values[f.name] ?? ""),
  ).length;
  const percent = Math.round((filledRequired / totalRequired) * 100);

  const set = (name: string, value: string) =>
    setValues((v) => ({ ...v, [name]: value }));

  const stepInvalidFields = (i: number) =>
    STEPS[i].fields.filter((f) => isInvalid(f, values[f.name] ?? ""));

  const scrollTop = () => {
    containerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const goNext = () => {
    if (stepInvalidFields(step).length > 0) {
      setTried((t) => t.map((v, i) => (i === step ? true : v)));
      return;
    }
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
    scrollTop();
  };

  const goBack = () => {
    setStep((s) => Math.max(s - 1, 0));
    scrollTop();
  };

  const goToStep = (i: number) => {
    if (i <= step) {
      setStep(i);
      scrollTop();
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (stepInvalidFields(STEPS.length - 1).length > 0) {
      e.preventDefault();
      setTried((t) => t.map((v, i) => (i === STEPS.length - 1 ? true : v)));
    }
  };

  if (state.status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-start gap-4 rounded-2xl border border-brand-green/30 bg-brand-green/[0.05] p-8 sm:p-10"
      >
        <div className="flex size-10 items-center justify-center rounded-full bg-brand-green text-brand-dark">
          <Check className="size-5" strokeWidth={2.5} />
        </div>
        <h3 className="font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
          Aplicación recibida.
        </h3>
        <p className="max-w-md text-base leading-relaxed text-foreground/70">
          Gracias. Revisamos cada aplicación a mano y contactamos a las startups
          seleccionadas por correo y WhatsApp.
        </p>
      </motion.div>
    );
  }

  const current = STEPS[step];
  const showErrors = tried[step];
  const isLast = step === STEPS.length - 1;

  return (
    <div ref={containerRef} className="scroll-mt-24">
      {/* Progress header */}
      <div className="mb-10">
        <div className="flex items-center justify-between gap-2">
          {STEPS.map((s, i) => {
            const done = i < step && stepInvalidFields(i).length === 0;
            const reachable = i <= step;
            const isActive = i === step;
            return (
              <button
                key={s.index}
                type="button"
                onClick={() => goToStep(i)}
                disabled={!reachable}
                className={`group flex min-w-0 flex-1 items-center gap-2.5 ${
                  reachable ? "cursor-pointer" : "cursor-not-allowed"
                }`}
              >
                <span
                  className={`flex size-8 shrink-0 items-center justify-center rounded-full border text-xs font-bold transition-colors duration-300 ${
                    isActive
                      ? "border-brand-green bg-brand-green text-brand-dark"
                      : done
                        ? "border-brand-green text-brand-green"
                        : "border-foreground/20 text-foreground/40"
                  }`}
                >
                  {done ? <Check className="size-4" strokeWidth={2.5} /> : s.index}
                </span>
                <span
                  className={`hidden truncate text-[11px] font-semibold uppercase tracking-[0.16em] transition-colors duration-300 sm:block ${
                    isActive ? "text-brand-dark" : "text-foreground/45"
                  }`}
                >
                  {s.title}
                </span>
              </button>
            );
          })}
        </div>

        <div className="mt-4 flex items-center gap-3">
          <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-foreground/10">
            <motion.div
              className="h-full rounded-full bg-brand-green"
              animate={{ width: `${percent}%` }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />
          </div>
          <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-foreground/50">
            Paso {step + 1} de {STEPS.length}
          </span>
        </div>
      </div>

      <form action={action} onSubmit={handleSubmit}>
        {/* Hidden inputs carry all values so the server action always gets the full set */}
        {ALL_FIELDS.map((f) => {
          const raw = values[f.name] ?? "";
          const out = f.type === "url" ? normalizeUrl(raw) : raw;
          return <input key={f.name} type="hidden" name={f.name} value={out} />;
        })}

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.32, ease: "easeOut" }}
            className="rounded-2xl border border-foreground/10 bg-background p-6 sm:p-8 md:p-10"
          >
            <div className="mb-8 flex items-center gap-4">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-brand-green/15 font-display text-base font-bold text-brand-dark">
                {current.index}
              </span>
              <div className="flex flex-col">
                <span className="font-display text-2xl font-bold tracking-tight">
                  {current.title}
                </span>
                <span className="text-sm text-foreground/55">
                  {current.subtitle}
                </span>
              </div>
            </div>

            <div className="grid gap-8 sm:grid-cols-2">
              {current.fields.map((f) => {
                const value = values[f.name] ?? "";
                const invalid = showErrors && isInvalid(f, value);
                const id = `bp-${f.name}`;
                return (
                  <div
                    key={f.name}
                    className={`flex flex-col gap-2 ${f.full ? "sm:col-span-2" : ""}`}
                  >
                    <label
                      htmlFor={id}
                      className="text-xs font-semibold uppercase tracking-[0.18em] text-foreground/50"
                    >
                      {f.label}
                    </label>

                    {f.type === "textarea" ? (
                      <textarea
                        id={id}
                        rows={3}
                        value={value}
                        onChange={(e) => set(f.name, e.target.value)}
                        placeholder={f.placeholder}
                        className={`${fieldClasses(invalid)} resize-none py-3`}
                      />
                    ) : f.type === "select" ? (
                      <select
                        id={id}
                        value={value}
                        onChange={(e) => set(f.name, e.target.value)}
                        className={`${fieldClasses(invalid)} h-12 appearance-none`}
                      >
                        <option value="" disabled>
                          {f.placeholder}
                        </option>
                        {f.options?.map((o) => (
                          <option key={o} value={o}>
                            {f.optionLabels?.[o] ?? o}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input
                        id={id}
                        type={f.type}
                        inputMode={f.type === "tel" ? "numeric" : undefined}
                        value={value}
                        onChange={(e) =>
                          set(
                            f.name,
                            f.type === "tel"
                              ? e.target.value.replace(/\D/g, "")
                              : e.target.value,
                          )
                        }
                        placeholder={f.placeholder}
                        className={`${fieldClasses(invalid)} h-12`}
                      />
                    )}

                    {f.hint ? (
                      <span className="text-xs font-medium text-foreground/45">
                        {f.hint}
                      </span>
                    ) : null}
                    {invalid ? (
                      <span className="text-xs font-semibold text-red-500">
                        {errorMessage(f, value)}
                      </span>
                    ) : null}
                  </div>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>

        {state.status === "error" ? (
          <p className="mt-6 text-sm font-semibold text-red-500">
            Algo salió mal al enviar. Revisa los campos e intenta de nuevo.
          </p>
        ) : null}

        {/* Wizard controls */}
        <div className="mt-8 flex items-center justify-between gap-4">
          {step > 0 ? (
            <button
              type="button"
              onClick={goBack}
              className="inline-flex h-14 items-center gap-2 rounded-md border border-foreground/15 px-6 text-base font-semibold text-brand-dark transition-colors hover:border-foreground/30"
            >
              <ArrowLeft className="size-4" />
              Atrás
            </button>
          ) : (
            <span />
          )}

          {isLast ? (
            <SubmitButton />
          ) : (
            <button
              type="button"
              onClick={goNext}
              className="inline-flex h-14 items-center gap-2 rounded-md bg-brand-green px-9 text-lg font-semibold text-brand-dark transition-colors hover:bg-brand-green/85"
            >
              Continuar
              <ArrowRight className="size-4" />
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
