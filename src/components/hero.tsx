"use client";

import * as React from "react";
import { ArrowRight, Calendar, Handshake, Users } from "lucide-react";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { Navbar } from "@/components/navbar";
import {
  DiscordIcon,
  InstagramIcon,
  LinkedinIcon,
  TiktokIcon,
} from "@/components/social-icons";
import { SOCIAL_LINKS, WHATSAPP_INVITE } from "@/lib/links";

const STAT_KEYS = ["members", "events", "sponsors"] as const;
const STAT_ICONS: Record<(typeof STAT_KEYS)[number], React.ElementType> = {
  members: Users,
  events: Calendar,
  sponsors: Handshake,
};

const SOCIALS = [
  { key: "instagram", href: SOCIAL_LINKS.instagram, Icon: InstagramIcon },
  { key: "linkedin", href: SOCIAL_LINKS.linkedin, Icon: LinkedinIcon },
  { key: "tiktok", href: SOCIAL_LINKS.tiktok, Icon: TiktokIcon },
  { key: "discord", href: SOCIAL_LINKS.discord, Icon: DiscordIcon },
] as const;

export function Hero() {
  const t = useTranslations("Hero");
  const tStats = useTranslations("Stats");

  const titleWords = t("title").split(" ");

  return (
    <div className="flex flex-1 flex-col bg-background">
      <div className="container mx-auto flex flex-1 flex-col px-4">
        <Navbar />

        {/* Hero */}
        <main className="flex flex-1 items-center">
          <section className="w-full py-12 sm:py-16">
            <div className="flex flex-col items-center text-center">
              {/* Title */}
              <motion.h1
                initial={{ filter: "blur(10px)", opacity: 0, y: 40 }}
                animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="mx-auto max-w-6xl font-display text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl"
              >
                {titleWords.map((text, index) => (
                  <motion.span
                    key={`${text}-${index}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 + index * 0.15, duration: 0.6 }}
                    className="mx-2 inline-block md:mx-4"
                  >
                    {text}
                  </motion.span>
                ))}
              </motion.h1>

              {/* Subline */}
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.6 }}
                className="mx-auto mt-10 max-w-3xl text-lg text-foreground/70 sm:text-xl md:text-2xl"
              >
                {t("subline")}
              </motion.p>

              {/* Stats row — community by the numbers, above CTA */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.3, duration: 0.6 }}
                className="mt-16 flex flex-wrap items-center justify-center gap-x-12 gap-y-6 sm:gap-x-20"
              >
                {STAT_KEYS.map((key, i) => {
                  const Icon = STAT_ICONS[key];
                  return (
                    <motion.div
                      key={key}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: 1.3 + i * 0.12,
                        duration: 0.5,
                        type: "spring",
                        stiffness: 100,
                        damping: 12,
                      }}
                      className="flex items-center gap-2.5"
                    >
                      <Icon className="size-7 text-brand-green" />
                      <span className="font-display text-3xl font-bold leading-none text-brand-dark sm:text-4xl">
                        {tStats(`${key}.value`)}
                      </span>
                      <span className="text-base text-foreground/70 sm:text-lg">
                        {tStats(`${key}.label`).toLowerCase()}
                      </span>
                    </motion.div>
                  );
                })}
              </motion.div>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 1.8,
                  duration: 0.6,
                  type: "spring",
                  stiffness: 100,
                  damping: 12,
                }}
                className="mt-14 flex flex-col items-center gap-6"
              >
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
                  <span className="text-sm text-foreground/55">
                    {t("cta_follow")}
                  </span>
                  <div className="flex items-center gap-2">
                    {SOCIALS.map(({ key, href, Icon }) => (
                      <a
                        key={key}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={key}
                        className="flex size-10 items-center justify-center rounded-full border border-foreground/10 text-foreground/70 transition-colors hover:border-brand-green hover:bg-brand-green/10 hover:text-brand-dark"
                      >
                        <Icon className="size-4" />
                      </a>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

        </main>
      </div>
    </div>
  );
}
