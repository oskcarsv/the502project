"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { ArrowLeft, ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { Link } from "@/i18n/navigation";
import {
  DEMO_DAY_FIELD_HINTS,
  DEMO_DAY_STAGES,
  DEMO_DAY_WIZARD_STEPS,
  SELECT_EMPTY,
  SELECT_LABEL,
  getDemoDayApplicationErrors,
  getDemoDayStepErrors,
  getFirstDemoDayInvalidField,
  isDemoDayApplicationComplete,
  type DemoDayApplicationForm,
  type DemoDayWizardStep,
} from "@/lib/demo-day-apply-shared";
import { Reveal } from "./reveal";

const FIELD =
  "min-h-11 w-full min-w-0 border bg-transparent px-4 py-3 text-base text-[var(--demo-fg)] placeholder:text-[var(--demo-muted)]/50 outline-none transition-colors focus:border-[var(--demo-accent)]";

const FIELD_ERROR = "border-red-500/50 focus:border-red-400";
const FIELD_OK = "border-[var(--demo-line)]";

const LABEL =
  "mb-2 block font-space text-xs font-bold uppercase tracking-[0.14em] text-[var(--demo-muted)]";

const HINT = "mt-1.5 break-words text-sm text-[var(--demo-muted)]";
const FIELD_ERR = "mt-1.5 text-sm text-red-400";

type FieldProps = {
  id: string;
  label: string;
  hint?: string;
  required?: boolean;
  error?: string;
  children: ReactNode;
};

function Field({ id, label, hint, required, error, children }: FieldProps) {
  return (
    <div className="min-w-0">
      <label htmlFor={id} className={LABEL}>
        {label}
        {required ? (
          <span className="ml-1 text-[var(--demo-accent)]" aria-hidden>
            *
          </span>
        ) : null}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className={FIELD_ERR} role="alert">
          {error}
        </p>
      ) : hint ? (
        <p className={HINT}>{hint}</p>
      ) : null}
    </div>
  );
}

type BooleanChoiceProps = {
  id: string;
  label: string;
  hint?: string;
  value: boolean | null;
  onChange: (value: boolean) => void;
  error?: string;
  required?: boolean;
};

function BooleanChoice({
  id,
  label,
  hint,
  value,
  onChange,
  error,
  required,
}: BooleanChoiceProps) {
  const labelId = `${id}-label`;
  return (
    <div id={id}>
      <p id={labelId} className={LABEL}>
        {label}
        {required ? (
          <span className="ml-1 text-[var(--demo-accent)]" aria-hidden>
            *
          </span>
        ) : null}
      </p>
      <div className="flex gap-2 sm:gap-3" role="group" aria-labelledby={labelId}>
        {(
          [
            { val: true, text: "Sí" },
            { val: false, text: "No" },
          ] as const
        ).map((option) => {
          const selected = value === option.val;
          return (
            <button
              key={option.text}
              type="button"
              id={option.val ? `${id}-yes` : `${id}-no`}
              onClick={() => onChange(option.val)}
              className={`min-h-11 flex-1 border px-3 py-3 text-sm font-bold uppercase tracking-wide transition-colors sm:px-4 ${
                error
                  ? "border-red-500/50"
                  : selected
                    ? "border-[var(--demo-accent)] bg-[var(--demo-accent)]/10 text-[var(--demo-accent)]"
                    : "border-[var(--demo-line)] text-[var(--demo-muted)] hover:border-[var(--demo-accent)]/50"
              }`}
              aria-pressed={selected}
            >
              {option.text}
            </button>
          );
        })}
      </div>
      {error ? (
        <p id={`${id}-error`} className={FIELD_ERR} role="alert">
          {error}
        </p>
      ) : hint ? (
        <p className={HINT}>{hint}</p>
      ) : null}
    </div>
  );
}

function fieldHint<K extends keyof typeof DEMO_DAY_FIELD_HINTS>(
  key: K,
  error?: string,
): string | undefined {
  return error ? undefined : DEMO_DAY_FIELD_HINTS[key];
}

const INITIAL: DemoDayApplicationForm = {
  companyName: "",
  website: "",
  founded: "",
  stage: SELECT_EMPTY,
  seekingInvestment: null,
  contactName: "",
  contactEmail: "",
  contactPhone: "",
  videoUrl: "",
  hasCoFounders: null,
  coFounderNames: "",
  problem: "",
  solution: "",
  targetMarket: "",
  team: "",
  traction: "",
};

function fieldClass(error?: string) {
  return `${FIELD} ${error ? FIELD_ERROR : FIELD_OK}`;
}

function WizardStepper({
  currentStep,
}: {
  currentStep: DemoDayWizardStep;
}) {
  const currentStepMeta = DEMO_DAY_WIZARD_STEPS[currentStep - 1];

  return (
    <nav aria-label="Pasos del formulario" className="mb-6 sm:mb-10">
      <p className="mb-3 font-space text-[0.65rem] font-bold uppercase tracking-[0.14em] text-[var(--demo-muted)] sm:hidden">
        Paso {currentStep} de {DEMO_DAY_WIZARD_STEPS.length}
        <span className="text-[var(--demo-fg)]"> · {currentStepMeta.label}</span>
      </p>
      <ol className="-mx-1 flex flex-nowrap items-center gap-1 overflow-x-auto px-1 pb-1 sm:mx-0 sm:flex-wrap sm:gap-x-3 sm:gap-y-2 sm:overflow-visible sm:px-0 sm:pb-0 md:gap-x-4">
        {DEMO_DAY_WIZARD_STEPS.map((step, index) => {
          const isActive = step.id === currentStep;
          const isComplete = step.id < currentStep;
          return (
            <li key={step.key} className="flex shrink-0 items-center gap-1.5 sm:gap-2">
              {index > 0 ? (
                <span
                  aria-hidden
                  className={`hidden h-px w-4 md:block md:w-6 ${
                    isComplete || isActive
                      ? "bg-[var(--demo-accent)]/40"
                      : "bg-[var(--demo-line)]"
                  }`}
                />
              ) : null}
              <span
                className={`inline-flex items-center gap-1.5 font-space text-[0.65rem] font-bold uppercase tracking-[0.14em] sm:gap-2 md:text-xs ${
                  isActive
                    ? "text-[var(--demo-accent)]"
                    : isComplete
                      ? "text-[var(--demo-fg)]"
                      : "text-[var(--demo-muted)]/60"
                }`}
                aria-current={isActive ? "step" : undefined}
              >
                <span
                  className={`flex size-6 shrink-0 items-center justify-center border text-[0.6rem] sm:size-7 ${
                    isActive
                      ? "border-[var(--demo-accent)] bg-[var(--demo-accent)] text-[var(--demo-bg)]"
                      : isComplete
                        ? "border-[var(--demo-accent)]/50 text-[var(--demo-accent)]"
                        : "border-[var(--demo-line)]"
                  }`}
                >
                  {isComplete ? "✓" : step.id}
                </span>
                <span className="hidden whitespace-nowrap md:inline">{step.label}</span>
              </span>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export function DemoApplyForm() {
  const [form, setForm] = useState(INITIAL);
  const [step, setStep] = useState<DemoDayWizardStep>(1);
  const [fieldErrors, setFieldErrors] = useState<
    Partial<Record<keyof DemoDayApplicationForm, string>>
  >({});
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitMethod, setSubmitMethod] = useState<"notion" | "mailto" | null>(
    null,
  );

  const currentStepMeta = DEMO_DAY_WIZARD_STEPS[step - 1];

  const update = <K extends keyof DemoDayApplicationForm>(
    key: K,
    value: DemoDayApplicationForm[K],
  ) => {
    setForm((prev) => {
      const next = { ...prev, [key]: value };
      if (key === "hasCoFounders" && value === false) {
        next.coFounderNames = "";
      }
      return next;
    });
    setFieldErrors((prev) => {
      if (!prev[key]) return prev;
      const next = { ...prev };
      delete next[key];
      if (key === "hasCoFounders") delete next.coFounderNames;
      return next;
    });
    setError(null);
  };

  const validateStep = (targetStep: DemoDayWizardStep) => {
    const errors = getDemoDayStepErrors(targetStep, form);
    if (Object.keys(errors).length === 0) return true;
    setFieldErrors(errors);
    return false;
  };

  const scrollToFirstError = (
    errors: Partial<Record<keyof DemoDayApplicationForm, string>>,
    targetStep?: DemoDayWizardStep,
  ) => {
    const firstKey = getFirstDemoDayInvalidField(errors, targetStep);
    if (firstKey) {
      const el =
        document.getElementById(firstKey) ??
        document.getElementById(`${firstKey}-yes`);
      el?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const goNext = () => {
    if (!validateStep(step)) {
      setError("Revisa los campos marcados antes de continuar.");
      scrollToFirstError(getDemoDayStepErrors(step, form), step);
      return;
    }
    setError(null);
    setFieldErrors({});
    if (step < DEMO_DAY_WIZARD_STEPS.length) {
      setStep((step + 1) as DemoDayWizardStep);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const goBack = () => {
    setError(null);
    setFieldErrors({});
    if (step > 1) {
      setStep((step - 1) as DemoDayWizardStep);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const onSubmit = async (event?: FormEvent) => {
    event?.preventDefault();

    if (!validateStep(step)) {
      setError("Revisa los campos marcados antes de enviar.");
      scrollToFirstError(getDemoDayStepErrors(step, form), step);
      return;
    }

    const errors = getDemoDayApplicationErrors(form);
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) {
      setError("Revisa los campos marcados antes de enviar.");
      scrollToFirstError(errors);
      return;
    }

    if (!isDemoDayApplicationComplete(form)) return;

    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/demo-day/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const json = (await res.json()) as {
        ok: boolean;
        error?: string;
        method?: "notion" | "mailto";
        mailto?: string;
      };

      if (!res.ok || !json.ok) {
        setError(
          json.error ?? "No pudimos enviar tu aplicación. Intenta de nuevo.",
        );
        return;
      }

      setSubmitMethod(json.method ?? null);

      if (json.method === "mailto" && json.mailto) {
        window.location.href = json.mailto;
      }

      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setError("Error de conexión. Revisa tu red e intenta de nuevo.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <Reveal>
        <div className="relative overflow-hidden border border-[var(--demo-line)] bg-[var(--demo-bg)] px-4 py-12 text-center sm:px-8 sm:py-16 md:px-12 md:py-20">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[var(--demo-accent)]/30"
          />
          <CheckCircle2 className="mx-auto size-12 text-[var(--demo-accent)] sm:size-14" />
          <h2 className="mt-6 font-display text-[clamp(1.75rem,6vw,3.5rem)] font-extrabold uppercase tracking-tight sm:mt-8">
            Aplicación enviada
          </h2>

          {submitMethod === "mailto" ? (
            <p className="mx-auto mt-4 max-w-lg break-words text-sm text-[var(--demo-muted)] sm:mt-5 sm:text-base">
              Se abrió tu correo con la aplicación prellenada. Envíala para
              completar el proceso.
            </p>
          ) : (
            <p className="mx-auto mt-4 max-w-lg break-words text-sm text-[var(--demo-muted)] sm:mt-5 sm:text-base">
              Recibimos tu aplicación. Te contactaremos por correo si avanzas.
            </p>
          )}

          <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:mt-10 sm:flex-row sm:items-center sm:gap-4">
            <Link
              href="/demo-day"
              className="group inline-flex min-h-11 items-center justify-center gap-2 bg-[var(--demo-accent)] px-6 py-3 text-sm font-bold uppercase tracking-wide text-[var(--demo-bg)] transition-transform hover:-translate-y-0.5 sm:px-8 sm:py-4"
            >
              <ArrowLeft className="size-4" />
              Volver al Demo Day
            </Link>
          </div>
        </div>
      </Reveal>
    );
  }

  return (
    <form
      onSubmit={(event) => event.preventDefault()}
      noValidate
    >
      <WizardStepper currentStep={step} />

      <div className="space-y-6">
        <h2 className="font-display text-lg font-extrabold uppercase tracking-tight sm:text-xl">
          {currentStepMeta.label}
        </h2>

        {step === 1 ? (
          <div className="grid gap-6 sm:grid-cols-2">
            <Field
              id="companyName"
              label="Nombre de la empresa"
              required
              hint={fieldHint("companyName", fieldErrors.companyName)}
              error={fieldErrors.companyName}
            >
              <input
                id="companyName"
                name="companyName"
                className={fieldClass(fieldErrors.companyName)}
                value={form.companyName}
                onChange={(e) => update("companyName", e.target.value)}
                autoComplete="organization"
                aria-invalid={!!fieldErrors.companyName}
              />
            </Field>
            <Field
              id="website"
              label="Sitio web"
              required
              hint={fieldHint("website", fieldErrors.website)}
              error={fieldErrors.website}
            >
              <input
                id="website"
                name="website"
                type="text"
                inputMode="url"
                autoComplete="url"
                className={fieldClass(fieldErrors.website)}
                value={form.website}
                onChange={(e) => update("website", e.target.value)}
                placeholder="https://tuempresa.com"
                aria-invalid={!!fieldErrors.website}
                aria-describedby={
                  fieldErrors.website ? "website-error" : undefined
                }
              />
            </Field>
            <Field
              id="founded"
              label="Año de fundación"
              required
              hint={fieldHint("founded", fieldErrors.founded)}
              error={fieldErrors.founded}
            >
              <input
                id="founded"
                name="founded"
                type="text"
                inputMode="numeric"
                maxLength={4}
                className={fieldClass(fieldErrors.founded)}
                value={form.founded}
                onChange={(e) => update("founded", e.target.value)}
                placeholder="2024"
                aria-invalid={!!fieldErrors.founded}
                aria-describedby={
                  fieldErrors.founded ? "founded-error" : undefined
                }
              />
            </Field>
            <Field
              id="stage"
              label="Etapa"
              required
              hint={fieldHint("stage", fieldErrors.stage)}
              error={fieldErrors.stage}
            >
              <select
                id="stage"
                name="stage"
                className={fieldClass(fieldErrors.stage)}
                value={form.stage}
                onChange={(e) =>
                  update(
                    "stage",
                    e.target.value as DemoDayApplicationForm["stage"],
                  )
                }
                aria-invalid={!!fieldErrors.stage}
              >
                <option value={SELECT_EMPTY} disabled>
                  {SELECT_LABEL}
                </option>
                {DEMO_DAY_STAGES.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </Field>
            <div className="sm:col-span-2">
              <BooleanChoice
                id="seekingInvestment"
                label="¿Están buscando inversión?"
                hint={fieldHint(
                  "seekingInvestment",
                  fieldErrors.seekingInvestment,
                )}
                value={form.seekingInvestment}
                onChange={(val) => update("seekingInvestment", val)}
                error={fieldErrors.seekingInvestment}
                required
              />
            </div>
          </div>
        ) : null}

        {step === 2 ? (
          <div className="grid gap-6 sm:grid-cols-2">
            <Field
              id="contactName"
              label="Tu nombre"
              required
              hint={fieldHint("contactName", fieldErrors.contactName)}
              error={fieldErrors.contactName}
            >
              <input
                id="contactName"
                name="contactName"
                className={fieldClass(fieldErrors.contactName)}
                value={form.contactName}
                onChange={(e) => update("contactName", e.target.value)}
                autoComplete="name"
                aria-invalid={!!fieldErrors.contactName}
              />
            </Field>
            <Field
              id="contactEmail"
              label="Correo"
              required
              hint={fieldHint("contactEmail", fieldErrors.contactEmail)}
              error={fieldErrors.contactEmail}
            >
              <input
                id="contactEmail"
                name="contactEmail"
                type="email"
                className={fieldClass(fieldErrors.contactEmail)}
                value={form.contactEmail}
                onChange={(e) => update("contactEmail", e.target.value)}
                autoComplete="email"
                aria-invalid={!!fieldErrors.contactEmail}
              />
            </Field>
            <Field
              id="contactPhone"
              label="Teléfono"
              required
              hint={fieldHint("contactPhone", fieldErrors.contactPhone)}
              error={fieldErrors.contactPhone}
            >
              <input
                id="contactPhone"
                name="contactPhone"
                type="tel"
                className={fieldClass(fieldErrors.contactPhone)}
                value={form.contactPhone}
                onChange={(e) => update("contactPhone", e.target.value)}
                autoComplete="tel"
                placeholder="+502 5555 5555"
                aria-invalid={!!fieldErrors.contactPhone}
              />
            </Field>
            <div className="sm:col-span-2">
              <Field
                id="videoUrl"
                label="Video de 1 minuto"
                required
                hint={fieldHint("videoUrl", fieldErrors.videoUrl)}
                error={fieldErrors.videoUrl}
              >
                <input
                  id="videoUrl"
                  name="videoUrl"
                  type="url"
                  inputMode="url"
                  className={fieldClass(fieldErrors.videoUrl)}
                  value={form.videoUrl}
                  onChange={(e) => update("videoUrl", e.target.value)}
                  placeholder="https://youtu.be/…"
                  aria-invalid={!!fieldErrors.videoUrl}
                  aria-describedby={
                    fieldErrors.videoUrl ? "videoUrl-error" : undefined
                  }
                />
              </Field>
            </div>
            <div className="sm:col-span-2">
              <BooleanChoice
                id="hasCoFounders"
                label="¿Tienes socios?"
                hint={fieldHint("hasCoFounders", fieldErrors.hasCoFounders)}
                value={form.hasCoFounders}
                onChange={(val) => update("hasCoFounders", val)}
                error={fieldErrors.hasCoFounders}
                required
              />
            </div>
            {form.hasCoFounders ? (
              <div className="sm:col-span-2">
                <Field
                  id="coFounderNames"
                  label="Nombre de los socios"
                  required
                  hint={fieldHint(
                    "coFounderNames",
                    fieldErrors.coFounderNames,
                  )}
                  error={fieldErrors.coFounderNames}
                >
                  <input
                    id="coFounderNames"
                    name="coFounderNames"
                    className={fieldClass(fieldErrors.coFounderNames)}
                    value={form.coFounderNames}
                    onChange={(e) => update("coFounderNames", e.target.value)}
                    aria-invalid={!!fieldErrors.coFounderNames}
                  />
                </Field>
              </div>
            ) : null}
          </div>
        ) : null}

        {step === 3 ? (
          <div className="grid gap-6">
            {(
              [
                {
                  id: "problem" as const,
                  label: "Problema",
                  rows: 3,
                },
                {
                  id: "solution" as const,
                  label: "Solución y producto",
                  rows: 3,
                },
                {
                  id: "targetMarket" as const,
                  label: "Mercado objetivo",
                  rows: 3,
                },
              ] as const
            ).map((item) => (
              <Field
                key={item.id}
                id={item.id}
                label={item.label}
                required
                hint={fieldHint(item.id, fieldErrors[item.id])}
                error={fieldErrors[item.id]}
              >
                <textarea
                  id={item.id}
                  name={item.id}
                  rows={item.rows}
                  className={`${fieldClass(fieldErrors[item.id])} min-h-[5.5rem] resize-y sm:min-h-[6rem]`}
                  value={form[item.id]}
                  onChange={(e) => update(item.id, e.target.value)}
                  aria-invalid={!!fieldErrors[item.id]}
                />
              </Field>
            ))}
          </div>
        ) : null}

        {step === 4 ? (
          <div className="grid gap-6">
            {(
              [
                {
                  id: "team" as const,
                  label: "Equipo fundador",
                  rows: 4,
                },
                {
                  id: "traction" as const,
                  label: "Tracción actual",
                  rows: 4,
                },
              ] as const
            ).map((item) => (
              <Field
                key={item.id}
                id={item.id}
                label={item.label}
                required
                hint={fieldHint(item.id, fieldErrors[item.id])}
                error={fieldErrors[item.id]}
              >
                <textarea
                  id={item.id}
                  name={item.id}
                  rows={item.rows}
                  className={`${fieldClass(fieldErrors[item.id])} min-h-[7rem] resize-y sm:min-h-[8rem]`}
                  value={form[item.id]}
                  onChange={(e) => update(item.id, e.target.value)}
                  aria-invalid={!!fieldErrors[item.id]}
                />
              </Field>
            ))}
          </div>
        ) : null}
      </div>

      {error ? (
        <p
          role="alert"
          className="mt-6 break-words border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-300 sm:mt-8"
        >
          {error}
        </p>
      ) : null}

      <div
        className={`mt-6 flex flex-col-reverse gap-3 sm:mt-8 sm:flex-row sm:items-center sm:gap-4 ${
          step > 1 ? "sm:justify-between" : "sm:justify-end"
        }`}
      >
          {step > 1 ? (
            <button
              type="button"
              onClick={goBack}
              className="inline-flex min-h-11 w-full items-center justify-center gap-2 border border-[var(--demo-line)] px-6 py-3 text-sm font-bold uppercase tracking-wide text-[var(--demo-muted)] transition-colors hover:border-[var(--demo-accent)] hover:text-[var(--demo-accent)] sm:w-auto sm:py-4"
            >
              <ArrowLeft className="size-4" />
              Anterior
            </button>
          ) : null}

          {step < DEMO_DAY_WIZARD_STEPS.length ? (
            <button
              type="button"
              onClick={goNext}
              className="group inline-flex min-h-11 w-full items-center justify-center gap-2 bg-[var(--demo-accent)] px-6 py-3 text-sm font-bold uppercase tracking-wide text-[var(--demo-bg)] transition-transform hover:-translate-y-0.5 sm:w-auto sm:px-9 sm:py-4 sm:text-base"
            >
              Siguiente
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </button>
          ) : (
            <button
              type="button"
              onClick={() => void onSubmit()}
              disabled={submitting}
              className="group inline-flex min-h-11 w-full items-center justify-center gap-2 bg-[var(--demo-accent)] px-6 py-3 text-sm font-bold uppercase tracking-wide text-[var(--demo-bg)] transition-transform hover:-translate-y-0.5 disabled:opacity-60 sm:w-auto sm:px-9 sm:py-4 sm:text-base"
            >
              {submitting ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Enviando…
                </>
              ) : (
                <>
                  Enviar aplicación
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                </>
              )}
            </button>
          )}
      </div>
    </form>
  );
}
