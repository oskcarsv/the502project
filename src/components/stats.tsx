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
      <div className="container mx-auto px-4 py-24 sm:py-32">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={controls}
          variants={{ visible: { opacity: 1, y: 0 } }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center font-display text-4xl font-bold leading-tight tracking-tight sm:text-5xl"
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
                className="group flex flex-col items-center border border-foreground/10 bg-background p-10 text-center"
              >
                <div className="mb-6 rounded-full bg-brand-dark p-4 transition-transform group-hover:scale-105">
                  <Icon className="size-8 text-brand-green" />
                </div>
                <div className="mb-2 font-display text-5xl font-bold leading-none tracking-tight text-brand-dark sm:text-6xl">
                  {t(`${key}.value`)}
                </div>
                <div className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-foreground/80">
                  {t(`${key}.label`)}
                </div>
                <p className="text-sm leading-relaxed text-foreground/65">
                  {t(`${key}.description`)}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
