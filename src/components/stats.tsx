"use client";

import * as React from "react";
import { Calendar, Handshake, Users } from "lucide-react";
import { motion, useAnimation, useInView } from "motion/react";
import { useTranslations } from "next-intl";

const STAT_KEYS = ["members", "events", "sponsors"] as const;
const STAT_ICONS: Record<(typeof STAT_KEYS)[number], React.ElementType> = {
  members: Users,
  events: Calendar,
  sponsors: Handshake,
};

export function Stats() {
  const t = useTranslations("Stats");

  const ref = React.useRef<HTMLElement>(null);
  const controls = useAnimation();
  const inView = useInView(ref, { once: true, amount: 0.2 });

  React.useEffect(() => {
    if (inView) controls.start("visible");
  }, [inView, controls]);

  return (
    <section ref={ref} className="bg-background">
      <div className="container mx-auto px-4 py-20 sm:py-32">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={controls}
          variants={{ visible: { opacity: 1, y: 0 } }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center font-display text-3xl font-bold leading-tight tracking-tight sm:text-5xl"
        >
          {t("title")}
        </motion.h2>

        <motion.div
          initial="hidden"
          animate={controls}
          variants={{ hidden: {}, visible: {} }}
          className="mx-auto grid max-w-6xl md:grid-cols-3"
        >
          {STAT_KEYS.map((key, i) => {
            const Icon = STAT_ICONS[key];
            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 30 }}
                animate={controls}
                variants={{ visible: { opacity: 1, y: 0 } }}
                transition={{
                  delay: 0.2 + i * 0.15,
                  duration: 0.6,
                  type: "spring",
                  stiffness: 100,
                  damping: 12,
                }}
                className="group flex flex-row items-center gap-5 border border-foreground/10 bg-background p-6 sm:flex-col sm:items-center sm:p-10 sm:text-center"
              >
                <div className="shrink-0 rounded-full bg-brand-dark p-3 transition-transform group-hover:scale-105 sm:mb-6 sm:p-4">
                  <Icon className="size-6 text-brand-green sm:size-8" />
                </div>
                <div className="flex flex-1 flex-col gap-1.5 sm:items-center sm:gap-0">
                  <div className="flex items-baseline gap-3 sm:flex-col sm:gap-2">
                    <div className="font-display text-4xl font-bold leading-none tracking-tight text-brand-dark sm:text-6xl">
                      {t(`${key}.value`)}
                    </div>
                    <div className="text-xs font-semibold uppercase tracking-[0.18em] text-foreground/80 sm:mb-4 sm:text-sm">
                      {t(`${key}.label`)}
                    </div>
                  </div>
                  <p className="text-sm leading-relaxed text-foreground/65 sm:mt-0">
                    {t(`${key}.description`)}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
