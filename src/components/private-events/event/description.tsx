import { getLocale, getTranslations } from "next-intl/server";
import { WorkshopLabel } from "@/components/private-events/label";
import {
  localizedPrivateList,
  type PrivateEvent,
} from "@/lib/private-events";

type Props = { event: PrivateEvent };

export async function PrivateEventDescription({ event }: Props) {
  const t = await getTranslations("PrivateEvents");
  const locale = await getLocale();
  const paragraphs = localizedPrivateList(
    locale,
    event.description,
    event.descriptionEn,
  );
  const topics = localizedPrivateList(locale, event.agenda, event.agendaEn);

  return (
    <section className="border-t border-[color:var(--ws-line)]">
      <div className="container mx-auto max-w-3xl px-4 py-14 sm:py-16">
        <WorkshopLabel>{t("description_eyebrow")}</WorkshopLabel>
        <div className="mt-5 space-y-4">
          {paragraphs.map((paragraph, i) => (
            <p
              key={i}
              className="text-lg leading-relaxed text-[color:var(--ws-fg)]/90"
            >
              {paragraph}
            </p>
          ))}
        </div>

        <div className="mt-10 border-t border-[color:var(--ws-line)] pt-8">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[color:var(--ws-fg)]">
            {t("agenda_eyebrow")}
          </p>
          <ul className="mt-5 grid gap-x-8 gap-y-3 sm:grid-cols-2">
            {topics.map((topic, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-[color:var(--ws-accent)]" />
                <span className="text-sm leading-relaxed text-[color:var(--ws-muted)] sm:text-base">
                  {topic}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
