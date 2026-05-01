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
            <SheetContent className="w-full p-0 sm:max-w-sm">
              <div className="flex h-full flex-col">
                <div className="flex items-center justify-between border-b border-foreground/10 px-6 py-5">
                  <SheetTitle className="font-display text-lg font-bold tracking-tight">
                    The 502 Project
                  </SheetTitle>
                  <SheetDescription className="sr-only">
                    {t("subline")}
                  </SheetDescription>
                </div>

                <nav className="flex flex-1 flex-col gap-1 px-4 py-6">
                  {NAV_KEYS.map((key) => (
                    <a
                      key={key}
                      href={NAV_HREFS[key]}
                      className="rounded-md px-3 py-3 text-sm font-medium uppercase tracking-[0.18em] text-foreground/80 transition-colors hover:bg-foreground/5 hover:text-brand-dark"
                    >
                      {tNav(key)}
                    </a>
                  ))}
                </nav>

                <div className="flex flex-col gap-4 border-t border-foreground/10 px-6 py-6">
                  <a
                    href={WHATSAPP_INVITE}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-brand-green px-5 text-sm font-semibold text-brand-dark transition-colors hover:bg-brand-green/85"
                  >
                    {t("cta_primary")}
                    <ArrowRight className="size-4" />
                  </a>
                  <div className="flex justify-center">
                    <LanguageSwitcher tone="light" />
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
