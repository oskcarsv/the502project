import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { BlogContent } from "@/components/blog-content";
import { LinkedinIcon } from "@/components/social-icons";
import { getAllSlugs, getAllPosts, getPostBySlug } from "@/lib/blog";
import { SITE } from "@/lib/site";

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.flatMap((slug) => [
    { locale: "es", slug },
    { locale: "en", slug },
  ]);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};

  const url = `${locale === "es" ? "" : "/en"}/blog/${slug}`;
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      url: `${SITE.url}${url}`,
      images: [{ url: post.image, width: 1200, height: 630, alt: post.title }],
      publishedTime: post.pubDate,
      authors: [post.author],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [post.image],
    },
  };
}

function formatDate(iso: string, locale: string) {
  return new Date(iso).toLocaleDateString(
    locale === "es" ? "es-GT" : "en-US",
    { year: "numeric", month: "long", day: "numeric" },
  );
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Blog");

  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const allPosts = await getAllPosts();
  const related = allPosts.filter((p) => p.slug !== slug).slice(0, 2);

  return (
    <>
      <div className="bg-background">
        <div className="container mx-auto px-4">
          <Navbar />
        </div>
      </div>

      <main className="bg-background">
        <article>
          {/* Back link */}
          <div className="container mx-auto px-4 pt-8 sm:pt-12">
            <a
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-medium text-foreground/60 transition-colors hover:text-brand-dark"
            >
              <ArrowLeft className="size-4" />
              {t("back")}
            </a>
          </div>

          {/* Article header */}
          <header className="container mx-auto max-w-3xl px-4 pt-10 pb-12 sm:pt-14 sm:pb-16">
            <div className="flex items-center gap-3 text-xs">
              <span className="rounded-full bg-brand-green/15 px-3 py-1 font-semibold uppercase tracking-[0.14em] text-brand-dark">
                {post.category}
              </span>
              <span className="text-foreground/50">
                {post.readingTime} min {t("read")}
              </span>
            </div>

            <h1 className="mt-6 font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
              {post.title}
            </h1>

            <p className="mt-6 text-lg leading-relaxed text-foreground/70 sm:text-xl">
              {post.description}
            </p>

            <div className="mt-8 flex items-center gap-3 border-t border-foreground/10 pt-6">
              <div className="flex size-11 items-center justify-center rounded-full bg-brand-green/15 font-display text-base font-bold text-brand-dark">
                {post.author.charAt(0)}
              </div>
              <div className="flex flex-col">
                {post.authorUrl ? (
                  <a
                    href={post.authorUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-foreground transition-colors hover:text-brand-dark"
                  >
                    {post.author}
                    <LinkedinIcon className="size-3.5 text-foreground/50" />
                  </a>
                ) : (
                  <span className="text-sm font-semibold text-foreground">
                    {post.author}
                  </span>
                )}
                <span className="text-xs text-foreground/55">
                  {formatDate(post.pubDate, locale)}
                </span>
              </div>
            </div>
          </header>

          {/* Cover */}
          <div className="container mx-auto px-4">
            <div className="relative mx-auto aspect-[16/9] max-w-5xl overflow-hidden rounded-3xl bg-foreground/5">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 1024px"
                priority
              />
            </div>
          </div>

          {/* Body */}
          <div className="container mx-auto px-4 py-16 sm:py-20">
            <div className="mx-auto max-w-3xl">
              <BlogContent>{post.content}</BlogContent>

              {/* Author footer */}
              <div className="mt-16 rounded-3xl border border-foreground/10 bg-background p-8 sm:p-10">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-green">
                  {t("about_author")}
                </p>
                <div className="mt-5 flex items-start gap-4">
                  <div className="flex size-14 items-center justify-center rounded-full bg-brand-green/15 font-display text-xl font-bold text-brand-dark">
                    {post.author.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display text-lg font-bold tracking-tight">
                      {post.author}
                    </h3>
                    {post.authorUrl && (
                      <a
                        href={post.authorUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 inline-flex items-center gap-1.5 text-sm text-foreground/65 transition-colors hover:text-brand-dark"
                      >
                        LinkedIn
                        <ArrowUpRight className="size-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Related posts */}
          {related.length > 0 && (
            <section className="border-t border-foreground/10 bg-background">
              <div className="container mx-auto px-4 py-20 sm:py-24">
                <div className="mx-auto max-w-5xl">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-green">
                    {t("keep_reading_eyebrow")}
                  </p>
                  <h2 className="mt-4 font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
                    {t("keep_reading_title")}
                  </h2>

                  <div className="mt-10 grid gap-8 md:grid-cols-2">
                    {related.map((p) => (
                      <a
                        key={p.slug}
                        href={`/blog/${p.slug}`}
                        className="group flex flex-col overflow-hidden rounded-2xl border border-foreground/10 transition-colors hover:border-brand-green/50"
                      >
                        <div className="relative aspect-[16/10] overflow-hidden">
                          <Image
                            src={p.image}
                            alt={p.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                            sizes="(max-width: 768px) 100vw, 50vw"
                          />
                        </div>
                        <div className="flex flex-col gap-3 p-6">
                          <span className="self-start rounded-full bg-brand-green/15 px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-brand-dark">
                            {p.category}
                          </span>
                          <h3 className="font-display text-xl font-bold leading-tight tracking-tight">
                            {p.title}
                          </h3>
                          <p className="line-clamp-2 text-sm leading-relaxed text-foreground/65">
                            {p.description}
                          </p>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          )}
        </article>
      </main>

      <Footer />
    </>
  );
}
