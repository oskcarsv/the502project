"use client";

import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import {
  DiscordIcon,
  InstagramIcon,
  LinkedinIcon,
  TiktokIcon,
} from "@/components/social-icons";
import { SOCIAL_LINKS, WHATSAPP_INVITE } from "@/lib/links";

const SOCIALS = [
  { key: "instagram", href: SOCIAL_LINKS.instagram, Icon: InstagramIcon },
  { key: "linkedin", href: SOCIAL_LINKS.linkedin, Icon: LinkedinIcon },
  { key: "tiktok", href: SOCIAL_LINKS.tiktok, Icon: TiktokIcon },
  { key: "discord", href: SOCIAL_LINKS.discord, Icon: DiscordIcon },
] as const;

export function FinalCTA() {
  const t = useTranslations("FinalCTA");

  return (
    <section className="bg-background">
      <div className="container mx-auto px-4 py-20 sm:py-28">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl bg-brand-dark px-6 py-16 text-center text-white sm:px-12 sm:py-20 lg:px-20 lg:py-24"
        >
          {/* Soft green wash inside the card */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
          >
            <div className="absolute left-1/2 top-0 h-[400px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-green/15 blur-[120px]" />
          </div>

          <div className="relative">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-green">
              {t("eyebrow")}
            </p>
            <h2 className="mt-4 font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              {t("title")}
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg">
              {t("subline")}
            </p>

            <div className="mt-10 flex flex-col items-center gap-6 sm:mt-12">
              <a
                href={WHATSAPP_INVITE}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-14 items-center gap-2 rounded-md bg-brand-green px-9 text-lg font-semibold text-brand-dark transition-colors hover:bg-brand-green/85"
              >
                {t("cta_primary")}
                <ArrowRight className="size-4" />
              </a>

              <div className="flex items-center gap-3">
                <span className="text-sm text-white/55">
                  {t("cta_secondary")}
                </span>
                <div className="flex items-center gap-2">
                  {SOCIALS.map(({ key, href, Icon }) => (
                    <a
                      key={key}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={key}
                      className="flex size-10 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-brand-green hover:bg-brand-green/10 hover:text-brand-green"
                    >
                      <Icon className="size-4" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
