"use client";

import * as React from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { LinkedinIcon } from "@/components/social-icons";

type Member = {
  id: string;
  name: string;
  role: string;
  image?: string;
  linkedin?: string;
};

const FOUNDER: Member = {
  id: "oscar",
  name: "Oscar",
  role: "Founder",
  image: "/img/team/oscar.jpeg",
  linkedin: "https://www.linkedin.com/in/theoscarvibes/",
};

const BUILDERS: Member[] = [
  { id: "gabriel", name: "Gabriel", role: "Creative Technologist" },
  { id: "luis", name: "Luis", role: "Ecosystem Lead" },
  { id: "johan", name: "Johan", role: "Community Events Support" },
  { id: "eunice", name: "Eunice", role: "Community Builder" },
];

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

function FounderCard({ member }: { member: Member }) {
  return (
    <div className="group flex flex-col items-center text-center">
      <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-brand-dark">
        {member.image && (
          <Image
            src={member.image}
            alt={member.name}
            fill
            className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 60vw, 240px"
          />
        )}
      </div>

      <h3 className="mt-5 font-display text-xl font-bold leading-tight tracking-tight">
        {member.name}
      </h3>
      <p className="mt-1 text-sm text-foreground/60">{member.role}</p>

      {member.linkedin && (
        <a
          href={member.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${member.name} on LinkedIn`}
          className="mt-3 flex size-9 items-center justify-center rounded-full border border-foreground/10 text-foreground/70 transition-colors hover:border-brand-green hover:bg-brand-green/10 hover:text-brand-dark"
        >
          <LinkedinIcon className="size-4" />
        </a>
      )}
    </div>
  );
}

function BuilderCard({ member }: { member: Member }) {
  return (
    <div className="group flex flex-col items-center gap-1 text-center">
      <span className="size-1.5 rounded-full bg-brand-green transition-transform duration-300 group-hover:scale-150" />
      <h3 className="mt-3 font-display text-lg font-bold leading-tight tracking-tight">
        {member.name}
      </h3>
      <p className="text-sm text-foreground/60">{member.role}</p>
      {member.linkedin && (
        <a
          href={member.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${member.name} on LinkedIn`}
          className="mt-2 inline-flex size-8 items-center justify-center rounded-full border border-foreground/10 text-foreground/70 transition-colors hover:border-brand-green hover:bg-brand-green/10 hover:text-brand-dark"
        >
          <LinkedinIcon className="size-3.5" />
        </a>
      )}
    </div>
  );
}

export function Team() {
  const t = useTranslations("Team");

  return (
    <section className="bg-background">
      <div className="container mx-auto px-4 py-24 sm:py-32">
        <div className="mx-auto mb-16 max-w-3xl text-center sm:mb-20">
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

        {/* Founder — featured with photo */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="mx-auto mb-20 max-w-[220px] sm:max-w-[260px]"
        >
          <FounderCard member={FOUNDER} />
        </motion.div>

        {/* Community Builders — text-only, no avatars */}
        <div className="mx-auto max-w-4xl">
          <p className="mb-10 text-center text-xs font-semibold uppercase tracking-[0.18em] text-foreground/50 sm:mb-12">
            {t("builders_label")}
          </p>
          <div className="grid grid-cols-2 gap-y-10 sm:grid-cols-4 sm:gap-y-0">
            {BUILDERS.map((member) => (
              <motion.div
                key={member.id}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
              >
                <BuilderCard member={member} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
