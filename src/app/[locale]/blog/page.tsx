import Image from "next/image";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { getAllPosts, type BlogPost } from "@/lib/blog";

function formatDate(iso: string, locale: string) {
  return new Date(iso).toLocaleDateString(
    locale === "es" ? "es-GT" : "en-US",
    { year: "numeric", month: "long", day: "numeric" },
  );
}

function FeaturedCard({
  post,
  locale,
  readLabel,
}: {
  post: BlogPost;
  locale: string;
  readLabel: string;
}) {
  return (
    <a
      href={`/blog/${post.slug}`}
      className="group block overflow-hidden rounded-3xl border border-foreground/10 bg-background transition-colors hover:border-brand-green/50"
    >
      <div className="grid md:grid-cols-2">
        <div className="relative aspect-[16/10] overflow-hidden md:aspect-auto">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </div>
        <div className="flex flex-col justify-center gap-5 p-8 sm:p-12">
          <div className="flex items-center gap-3 text-xs">
            <span className="rounded-full bg-brand-green/15 px-3 py-1 font-semibold uppercase tracking-[0.14em] text-brand-dark">
              {post.category}
            </span>
            <span className="text-foreground/50">
              {formatDate(post.pubDate, locale)}
            </span>
            <span className="text-foreground/50">·</span>
            <span className="text-foreground/50">
              {post.readingTime} min {readLabel}
            </span>
          </div>
          <h2 className="font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl md:text-[2.5rem]">
            {post.title}
          </h2>
          <p className="text-base leading-relaxed text-foreground/65 sm:text-lg">
            {post.description}
          </p>
          <p className="mt-2 text-sm font-medium text-foreground/80">
            {post.author}
          </p>
        </div>
      </div>
    </a>
  );
}

function PostCard({
  post,
  locale,
  readLabel,
}: {
  post: BlogPost;
  locale: string;
  readLabel: string;
}) {
  return (
    <a
      href={`/blog/${post.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-foreground/10 bg-background transition-colors hover:border-brand-green/50"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>
      <div className="flex flex-1 flex-col gap-4 p-6 sm:p-7">
        <div className="flex items-center gap-2 text-xs">
          <span className="rounded-full bg-brand-green/15 px-2.5 py-1 font-semibold uppercase tracking-[0.14em] text-brand-dark">
            {post.category}
          </span>
          <span className="text-foreground/50">
            {post.readingTime} min {readLabel}
          </span>
        </div>
        <h3 className="font-display text-xl font-bold leading-tight tracking-tight transition-colors group-hover:text-brand-dark sm:text-2xl">
          {post.title}
        </h3>
        <p className="line-clamp-3 text-sm leading-relaxed text-foreground/65">
          {post.description}
        </p>
        <div className="mt-auto flex items-center justify-between pt-2 text-xs text-foreground/55">
          <span className="font-medium text-foreground/80">{post.author}</span>
          <span>{formatDate(post.pubDate, locale)}</span>
        </div>
      </div>
    </a>
  );
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Blog");

  const posts = await getAllPosts();
  const [featured, ...rest] = posts;
  const readLabel = t("read");

  return (
    <>
      <div className="bg-background">
        <div className="container mx-auto px-4">
          <Navbar />
        </div>
      </div>

      <main className="bg-background">
        <div className="container mx-auto px-4 py-20 sm:py-32">
          {/* Header */}
          <header className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-green">
              {t("eyebrow")}
            </p>
            <h1 className="mt-4 font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl">
              {t("title")}
            </h1>
            <p className="mt-6 text-base leading-relaxed text-foreground/70 sm:text-lg">
              {t("subline")}
            </p>
          </header>

          {/* Featured */}
          {featured && (
            <div className="mt-16 sm:mt-20">
              <FeaturedCard
                post={featured}
                locale={locale}
                readLabel={readLabel}
              />
            </div>
          )}

          {/* Grid */}
          {rest.length > 0 && (
            <div className="mt-12 grid gap-8 sm:mt-16 md:grid-cols-2 lg:grid-cols-3">
              {rest.map((post) => (
                <PostCard
                  key={post.slug}
                  post={post}
                  locale={locale}
                  readLabel={readLabel}
                />
              ))}
            </div>
          )}

          {posts.length === 0 && (
            <p className="mt-20 text-center text-foreground/60">
              {t("empty")}
            </p>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}
