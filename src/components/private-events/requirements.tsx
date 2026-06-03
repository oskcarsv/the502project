import { getLocale, getTranslations } from "next-intl/server";
import { Check } from "lucide-react";
import { WorkshopLabel } from "@/components/private-events/label";
import { localizedPrivateList, type PrivateEvent } from "@/lib/private-events";

type Props = { event: PrivateEvent };

export async function PrivateEventRequirements({ event }: Props) {
  const t = await getTranslations("PrivateEvents");
  const locale = await getLocale();
  const items = localizedPrivateList(
    locale,
    event.requirements,
    event.requirementsEn,
  );

  return (
    <section className="border-t border-[color:var(--ws-line)]">
      <div className="container mx-auto max-w-3xl px-4 py-14 sm:py-16">
        <WorkshopLabel>{t("requirements_who_eyebrow")}</WorkshopLabel>
        <ul className="mt-6 space-y-4">
          {items.map((item, i) => (
            <li key={i} className="flex items-start gap-4">
              <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full border border-[color:var(--ws-accent)]/40 bg-[color:var(--ws-accent)]/10 text-[color:var(--ws-accent)]">
                <Check className="size-3.5" strokeWidth={2.5} />
              </span>
              <span className="text-base leading-relaxed text-[color:var(--ws-fg)] sm:text-lg">
                {item}
              </span>
            </li>
          ))}
        </ul>
        <p className="mt-6 border-l-2 border-[color:var(--ws-accent)] bg-[color:var(--ws-elevated)] py-4 pl-5 pr-4 text-sm leading-relaxed text-[color:var(--ws-muted)] sm:text-base">
          {t("requirements_beginner_note")}
        </p>
      </div>
    </section>
  );
}
