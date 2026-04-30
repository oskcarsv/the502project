"use client";

import { ArrowRight, Menu } from "lucide-react";
import { useTranslations } from "next-intl";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { buttonVariants } from "@/components/ui/button";
import { LanguageSwitcher } from "@/components/language-switcher";
import { WHATSAPP_INVITE } from "@/lib/links";
import { cn } from "@/lib/utils";

const NAV_KEYS = ["events", "blog", "partners", "jobs"] as const;
const NAV_HREFS: Record<(typeof NAV_KEYS)[number], string> = {
  events: "/eventos",
  blog: "/blog",
  partners: "/partners",
  jobs: "/jobs",
};

export function Navbar() {
  const t = useTranslations("Hero");
  const tNav = useTranslations("Nav");

  return (
    <header>
      <div className="flex h-16 items-center justify-between">
        <a href="/" className="flex items-center gap-2">
          <span className="font-display text-xl font-bold tracking-tight">
            The 502 Project
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_KEYS.map((key) => (
            <a
              key={key}
              href={NAV_HREFS[key]}
              className="text-xs font-medium uppercase tracking-[0.18em] text-foreground/70 transition-colors hover:text-brand-dark"
            >
              {tNav(key)}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden md:block">
            <LanguageSwitcher tone="light" />
          </div>
          <a
            href={WHATSAPP_INVITE}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden h-10 items-center gap-2 rounded-md bg-brand-green px-5 text-sm font-semibold text-brand-dark transition-colors hover:bg-brand-green/85 md:inline-flex"
          >
            {t("cta_primary")}
            <ArrowRight className="size-4" />
          </a>

          <Sheet>
            <SheetTrigger
              className={cn(
                buttonVariants({ variant: "ghost", size: "icon" }),
                "size-10 md:hidden",
              )}
            >
              <Menu className="size-5" />
              <span className="sr-only">Toggle menu</span>
            </SheetTrigger>
            <SheetContent>
              <SheetTitle className="font-display text-xl font-bold tracking-tight">
                The 502 Project
              </SheetTitle>
              <SheetDescription className="sr-only">
                {t("subline")}
              </SheetDescription>
              <nav className="mt-8 flex flex-col gap-5 px-4">
                {NAV_KEYS.map((key) => (
                  <a
                    key={key}
                    href={NAV_HREFS[key]}
                    className="text-sm font-medium uppercase tracking-[0.18em] text-foreground/80 hover:text-brand-dark"
                  >
                    {tNav(key)}
                  </a>
                ))}
                <a
                  href={WHATSAPP_INVITE}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex h-11 items-center gap-2 rounded-md bg-brand-green px-5 text-sm font-semibold text-brand-dark transition-colors hover:bg-brand-green/85"
                >
                  {t("cta_primary")}
                  <ArrowRight className="size-4" />
                </a>
                <div className="mt-2">
                  <LanguageSwitcher tone="light" />
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
