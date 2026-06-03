import { getTranslations } from "next-intl/server";

export async function PrivateEventClosing() {
  const t = await getTranslations("PrivateEvents");

  return (
    <footer className="border-t border-[color:var(--ws-line)]">
      <div className="container mx-auto max-w-3xl px-4 py-10">
        <a
          href="/workshops"
          className="text-sm text-[color:var(--ws-muted)] transition-colors hover:text-[color:var(--ws-accent)]"
        >
          ← {t("nav_back_index")}
        </a>
      </div>
    </footer>
  );
}
