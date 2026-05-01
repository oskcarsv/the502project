import "server-only";
import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

const CONTENT_DIR = path.join(process.cwd(), "content/blog");

export type BlogFrontmatter = {
  title: string;
  description: string;
  author: string;
  authorUrl?: string;
  pubDate: string;
  image: string;
  category: string;
};

export type BlogPost = BlogFrontmatter & {
  slug: string;
  content: string;
  readingTime: number;
};

function estimateReadingTime(content: string): number {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 220));
}

function normalizePubDate(value: unknown): string {
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  return String(value);
}

async function readPost(filename: string): Promise<BlogPost> {
  const filePath = path.join(CONTENT_DIR, filename);
  const raw = await fs.readFile(filePath, "utf8");
  const { data, content } = matter(raw);
  const slug = filename.replace(/\.md$/, "");
  const fm = data as BlogFrontmatter;
  return {
    ...fm,
    pubDate: normalizePubDate(fm.pubDate),
    slug,
    content,
    readingTime: estimateReadingTime(content),
  };
}

export async function getAllPosts(): Promise<BlogPost[]> {
  const files = await fs.readdir(CONTENT_DIR);
  const posts = await Promise.all(
    files.filter((f) => f.endsWith(".md")).map(readPost),
  );
  return posts.sort((a, b) => (a.pubDate < b.pubDate ? 1 : -1));
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    return await readPost(`${slug}.md`);
  } catch {
    return null;
  }
}

export async function getAllSlugs(): Promise<string[]> {
  const files = await fs.readdir(CONTENT_DIR);
  return files.filter((f) => f.endsWith(".md")).map((f) => f.replace(/\.md$/, ""));
}
