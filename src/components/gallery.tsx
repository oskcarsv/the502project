"use client";

import * as React from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { motion, type Variants } from "motion/react";
import { useTranslations } from "next-intl";

type EventType = "hackathon" | "workshop" | "talk" | "mentorship" | "meetup";

type Event = {
  id: string;
  title: string;
  date: string;
  type: EventType;
  // Drop event photos into /public/img/gallery/ and reference here.
  image?: string;
  /** Aspect ratio drives the masonry rhythm. Mix tall/square/wide for variety. */
  aspect: string;
};

// Past events — chronological order (most recent first → oldest at bottom).
// Aspect ratios are intentionally varied for masonry drama.
const EVENTS: Event[] = [
  {
    id: "mentorship-session",
    title: "Mentorship Session",
    date: "8 Abr 2026",
    type: "mentorship",
    image: "/img/gallery/mentoring-session.jpg",
    aspect: "aspect-[3/4]",
  },
  {
    id: "openclaw-bitcoin-ia",
    title: "OpenClaw: Bitcoin & IA",
    date: "26 Mar 2026",
    type: "talk",
    image: "/img/gallery/openclaw.jpeg",
    aspect: "aspect-[2/3]",
  },
  {
    id: "cursor-hackathon-uvg",
    title: "Cursor Hackathon UVG",
    date: "7 Mar 2026",
    type: "hackathon",
    image: "/img/gallery/cursor-hackathon.jpg",
    aspect: "aspect-square",
  },
  {
    id: "she-ships-guatemala",
    title: "She Ships Guatemala",
    date: "6 Mar 2026",
    type: "hackathon",
    image: "/img/gallery/she-ships.jpeg",
    aspect: "aspect-[3/4]",
  },
  {
    id: "build-and-pitch",
    title: "Build & Pitch",
    date: "7 Feb 2026",
    type: "hackathon",
    image: "/img/gallery/build-pitch.jpeg",
    aspect: "aspect-[4/3]",
  },
  {
    id: "v0-prompt-to-production",
    title: "v0: Prompt to Production",
    date: "6 Feb 2026",
    type: "workshop",
    image: "/img/gallery/prompt-to-production.jpeg",
    aspect: "aspect-square",
  },
  {
    id: "finanzas-emprendedores",
    title: "Finanzas para Emprendedores",
    date: "29 Ene 2026",
    type: "talk",
    image: "/img/gallery/finanzas-emprendedores.jpg",
    aspect: "aspect-[3/4]",
  },
  {
    id: "the502-convivio",
    title: "The 502 Convivio",
    date: "18 Dic 2025",
    type: "meetup",
    image: "/img/gallery/convivio.jpeg",
    aspect: "aspect-[2/3]",
  },
  {
    id: "from-idea-to-product",
    title: "From Idea to Product",
    date: "11 Dic 2025",
    type: "talk",
    image: "/img/gallery/from-idea-product.jpeg",
    aspect: "aspect-[4/3]",
  },
  {
    id: "ai-agents-notion",
    title: "AI Agents con Notion",
    date: "25 Nov 2025",
    type: "workshop",
    image: "/img/gallery/ai-agents-notion.jpeg",
    aspect: "aspect-[3/4]",
  },
];

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

function EventCard({
  event,
  typeLabel,
}: {
  event: Event;
  typeLabel: string;
}) {
  return (
    <div
      className={`group relative overflow-hidden rounded-2xl bg-brand-dark ${event.aspect}`}
    >
      {event.image ? (
        <Image
          src={event.image}
          alt={event.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      ) : (
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(86,239,159,0.18),transparent_55%),radial-gradient(circle_at_80%_85%,rgba(86,239,159,0.08),transparent_50%)]" />
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

      <span className="absolute left-4 top-4 rounded-full border border-white/15 bg-black/40 px-3 py-1 text-xs font-medium text-white/90 backdrop-blur">
        {typeLabel}
      </span>

      <div className="absolute inset-x-0 bottom-0 p-5 text-white sm:p-6">
        <div className="mb-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-brand-green">
          {event.date}
        </div>
        <h3 className="font-display text-lg font-bold leading-tight tracking-tight sm:text-xl">
          {event.title}
        </h3>
      </div>
    </div>
  );
}

export function Gallery() {
  const t = useTranslations("Gallery");

  return (
    <section className="bg-background">
      <div className="container mx-auto px-4 py-24 sm:py-32">
        <div className="mx-auto mb-12 max-w-3xl text-center sm:mb-16">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-green">
            {t("eyebrow")}
          </p>
          <h2 className="mt-4 font-display text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
            {t("title")}
          </h2>
          <p className="mt-5 text-base leading-relaxed text-foreground/70 sm:text-lg">
            {t("subline")}
          </p>
        </div>

        {/* Masonry — CSS columns. Items flow into 1/2/3 columns, varied aspect ratios create the bento rhythm. */}
        <div className="mx-auto max-w-6xl columns-1 gap-5 sm:columns-2 lg:columns-3 [&>*]:mb-5">
          {EVENTS.map((event) => (
            <motion.div
              key={event.id}
              className="break-inside-avoid"
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
            >
              <EventCard event={event} typeLabel={t(`types.${event.type}`)} />
            </motion.div>
          ))}
        </div>

        <div className="mt-14 flex justify-center">
          <a
            href="/eventos"
            className="group inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-brand-dark transition-colors hover:text-brand-green"
          >
            {t("cta")}
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  );
}
