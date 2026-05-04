"use client";

import * as React from "react";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { useTranslations } from "next-intl";
import { ArrowRight, Check } from "lucide-react";
import { motion } from "motion/react";
import { submitLabsInterest, type LabsInterestState } from "@/app/[locale]/labs/actions";

const initialState: LabsInterestState = { status: "idle" };

function SubmitButton() {
  const t = useTranslations("Labs");
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex h-12 items-center justify-center gap-2 bg-brand-green px-7 font-mono text-[11px] uppercase tracking-[0.22em] text-brand-dark transition-colors hover:bg-brand-green/85 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending ? t("form_submitting") : t("form_submit")}
      <ArrowRight className="size-3.5" />
    </button>
  );
}

const fieldClass =
  "h-12 border-b border-[color:var(--labs-line)] bg-transparent px-1 font-editorial text-lg text-[color:var(--labs-fg)] placeholder:text-[color:var(--labs-muted)]/60 transition-colors focus:border-brand-green focus:outline-none";

const labelClass =
  "font-mono text-[10px] uppercase tracking-[0.28em] text-[color:var(--labs-muted)]";

export function LabsInterestForm({ onClose }: { onClose?: () => void }) {
  const t = useTranslations("Labs");
  const [state, action] = useActionState(submitLabsInterest, initialState);

  if (state.status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-start gap-4 border border-brand-green/30 bg-brand-green/[0.04] p-8 sm:p-10"
      >
        <div className="flex size-9 items-center justify-center rounded-full bg-brand-green text-brand-dark">
          <Check className="size-4" strokeWidth={2.5} />
        </div>
        <h3 className="font-editorial text-3xl leading-tight tracking-[-0.01em] text-[color:var(--labs-fg)] sm:text-4xl">
          {t("form_success_title")}
        </h3>
        <p className="text-base leading-relaxed text-[color:var(--labs-muted)]">
          {t("form_success_body")}
        </p>
      </motion.div>
    );
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      action={action}
      className="flex flex-col gap-7"
    >
      <div className="flex flex-col gap-2">
        <label htmlFor="labs-name" className={labelClass}>
          {t("form_name")}
        </label>
        <input
          id="labs-name"
          name="name"
          type="text"
          required
          autoComplete="name"
          placeholder={t("form_name_placeholder")}
          className={fieldClass}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="labs-email" className={labelClass}>
          {t("form_email")}
        </label>
        <input
          id="labs-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder={t("form_email_placeholder")}
          className={fieldClass}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="labs-building" className={labelClass}>
          {t("form_building")}
        </label>
        <textarea
          id="labs-building"
          name="building"
          rows={3}
          placeholder={t("form_building_placeholder")}
          className={`${fieldClass} h-auto resize-none py-3`}
        />
      </div>

      {state.status === "error" ? (
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-red-400">
          {t("form_error")}
        </p>
      ) : null}

      <div className="mt-2 flex items-center gap-6">
        <SubmitButton />
        {onClose ? (
          <button
            type="button"
            onClick={onClose}
            className="font-mono text-[11px] uppercase tracking-[0.22em] text-[color:var(--labs-muted)] transition-colors hover:text-[color:var(--labs-fg)]"
          >
            {t("form_back")}
          </button>
        ) : null}
      </div>
    </motion.form>
  );
}
