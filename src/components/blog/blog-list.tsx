"use client";

import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";

type Post = {
  slug: string;
  entry: {
    title: string;
    date: string | null;
    tags: readonly string[];
    heroImage: string | null;
    excerpt: string | null;
    locale: string;
  };
};

function estimateReadingTime(excerpt: string | null): number {
  if (!excerpt) return 5;
  const words = excerpt.split(/\s+/).length;
  return Math.max(3, Math.ceil(words / 40));
}

function PostCard({ post, locale, t }: { post: Post; locale: string; t: (key: string) => string }) {
  const readTime = estimateReadingTime(post.entry.excerpt);
  const dateLocale = locale === "es" ? "es-ES" : "en-US";

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-colors hover:border-primary/50"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden bg-muted">
        {post.entry.heroImage ? (
          <Image
            src={post.entry.heroImage}
            alt={post.entry.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/10 to-primary/5">
            <span className="text-4xl font-black text-primary/20">DM</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-6">
        {/* Tags */}
        {post.entry.tags.length > 0 && (
          <div className="mb-3 flex flex-wrap gap-2">
            {post.entry.tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] font-black uppercase tracking-widest text-primary"
              >
                {tag.replace("-", " ")}
              </span>
            ))}
          </div>
        )}

        {/* Title */}
        <h3 className="mb-2 text-xl font-bold leading-snug transition-colors group-hover:text-primary">
          {post.entry.title}
        </h3>

        {/* Excerpt */}
        {post.entry.excerpt && (
          <p className="mb-6 line-clamp-3 text-sm text-muted-foreground">
            {post.entry.excerpt}
          </p>
        )}

        {/* Meta */}
        <div className="mt-auto flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <Calendar className="h-3.5 w-3.5" />
            {post.entry.date
              ? new Date(post.entry.date).toLocaleDateString(dateLocale, {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })
              : t("no_date")}
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-3.5 w-3.5" />
            {readTime} {t("read_time")}
          </div>
        </div>
      </div>
    </Link>
  );
}

export function BlogList({ posts }: { posts: Post[] }) {
  const t = useTranslations("blog");
  const locale = useLocale();

  if (posts.length === 0) {
    return (
      <div className="py-20 text-center">
        <p className="text-lg text-muted-foreground">
          {t("empty")}
        </p>
      </div>
    );
  }

  return (
    <section className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <PostCard key={post.slug} post={post} locale={locale} t={t} />
      ))}
    </section>
  );
}
