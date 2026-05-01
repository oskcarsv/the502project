"use client";

import * as React from "react";
import { Eye, GraduationCap, TrendingUp } from "lucide-react";
import { motion, useAnimation, useInView } from "motion/react";
import { useTranslations } from "next-intl";

const MISSION_KEYS = ["visibility", "investment", "education"] as const;
const MISSION_ICONS: Record<(typeof MISSION_KEYS)[number], React.ElementType> =
  {
    visibility: Eye,
    investment: TrendingUp,
    education: GraduationCap,
  };

export function About() {
  const t = useTranslations("About");

  const ref = React.useRef<HTMLElement>(null);
  const controls = useAnimation();
  const inView = useInView(ref, { once: true, amount: 0.2 });

  React.useEffect(() => {
    if (inView) controls.start("visible");
  }, [inView, controls]);

  return (
    <section ref={ref} className="bg-background">
      <div className="container mx-auto px-4 py-20 sm:py-32">
        {/* Header block */}
        <div className="mx-auto max-w-3xl text-center">
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            animate={controls}
            variants={{ visible: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.5 }}
            className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-green"
          >
            {t("eyebrow")}
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={controls}
            variants={{ visible: { opacity: 1, y: 0 } }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="mt-4 font-display text-3xl font-bold leading-tight tracking-tight sm:text-5xl"
          >
            {t("title")}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={controls}
            variants={{ visible: { opacity: 1, y: 0 } }}
            transition={{ delay: 0.25, duration: 0.6 }}
            className="mt-5 text-base leading-relaxed text-foreground/70 sm:mt-6 sm:text-lg"
          >
            {t("body")}
          </motion.p>
        </div>

        {/* Mission pillars */}
        <div className="mx-auto mt-14 grid max-w-5xl gap-8 sm:mt-20 sm:gap-12 md:grid-cols-3">
          {MISSION_KEYS.map((key, i) => {
            const Icon = MISSION_ICONS[key];
            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 24 }}
                animate={controls}
                variants={{ visible: { opacity: 1, y: 0 } }}
                transition={{
                  delay: 0.4 + i * 0.12,
                  duration: 0.6,
                  type: "spring",
                  stiffness: 100,
                  damping: 12,
                }}
                className="flex flex-row items-start gap-5 sm:flex-col sm:gap-4"
              >
                <div className="flex size-12 shrink-0 items-center justify-center rounded-md bg-brand-green/15">
                  <Icon className="size-6 text-brand-green" />
                </div>
                <div className="flex flex-1 flex-col gap-3 sm:gap-4">
                  <h3 className="font-display text-xl font-bold leading-tight tracking-tight">
                    {t(`${key}.title`)}
                  </h3>
                  <p className="text-sm leading-relaxed text-foreground/65 sm:text-base">
                    {t(`${key}.description`)}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
