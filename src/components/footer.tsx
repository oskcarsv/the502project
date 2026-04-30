import { useTranslations } from "next-intl";
import {
  DiscordIcon,
  InstagramIcon,
  LinkedinIcon,
  TiktokIcon,
} from "@/components/social-icons";
import { LanguageSwitcher } from "@/components/language-switcher";
import { SOCIAL_LINKS, WHATSAPP_INVITE } from "@/lib/links";

const SITE_LINKS = [
  { key: "events", href: "/eventos" },
  { key: "blog", href: "/blog" },
  { key: "partners", href: "/partners" },
  { key: "jobs", href: "/jobs" },
] as const;

const COMMUNITY_LINKS = [
  { key: "join", href: WHATSAPP_INVITE, external: true },
  { key: "code_of_conduct", href: "/code-of-conduct", external: false },
  { key: "about", href: "/#about", external: false },
] as const;

const SOCIALS = [
  { key: "instagram", href: SOCIAL_LINKS.instagram, Icon: InstagramIcon },
  { key: "linkedin", href: SOCIAL_LINKS.linkedin, Icon: LinkedinIcon },
  { key: "tiktok", href: SOCIAL_LINKS.tiktok, Icon: TiktokIcon },
  { key: "discord", href: SOCIAL_LINKS.discord, Icon: DiscordIcon },
] as const;

export function Footer() {
  const t = useTranslations("Footer");
  const tNav = useTranslations("Nav");
  const year = new Date().getFullYear();

  return (
    <footer className="bg-brand-dark text-white">
      <div className="container mx-auto px-4 py-16 sm:py-20">
        <div className="grid gap-12 md:grid-cols-12">
          {/* Brand */}
          <div className="md:col-span-5">
            <a
              href="/"
              className="font-display text-xl font-bold tracking-tight"
            >
              The 502 Project
            </a>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/60">
              {t("tagline")}
            </p>

            <div className="mt-6 flex items-center gap-2">
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

          {/* Site */}
          <div className="md:col-span-3">
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-white/50">
              {t("site")}
            </h3>
            <ul className="mt-4 space-y-3">
              {SITE_LINKS.map((link) => (
                <li key={link.key}>
                  <a
                    href={link.href}
                    className="text-sm text-white/80 transition-colors hover:text-brand-green"
                  >
                    {tNav(link.key)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Community */}
          <div className="md:col-span-4">
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-white/50">
              {t("community")}
            </h3>
            <ul className="mt-4 space-y-3">
              {COMMUNITY_LINKS.map((link) => (
                <li key={link.key}>
                  <a
                    href={link.href}
                    target={link.external ? "_blank" : undefined}
                    rel={
                      link.external ? "noopener noreferrer" : undefined
                    }
                    className="text-sm text-white/80 transition-colors hover:text-brand-green"
                  >
                    {t(link.key)}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom strip */}
        <div className="mt-16 flex flex-col items-start gap-3 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-6">
            <p className="text-xs text-white/50">
              {t("copyright", { year })}
            </p>
            <LanguageSwitcher />
          </div>
          <p className="text-xs text-white/50">{t("made_in")}</p>
        </div>
      </div>
    </footer>
  );
}
