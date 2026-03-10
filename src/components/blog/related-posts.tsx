"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";

type RelatedPost = {
  slug: string;
  title: string;
  tags: readonly string[];
  date: string | null;
};

export function RelatedPosts({ posts }: { posts: RelatedPost[] }) {
  const t = useTranslations("blog");

  if (posts.length === 0) return null;

  return (
    <section className="mt-16 border-t border-border pt-8">
      <h2 className="mb-6 text-xl font-bold">{t("related")}</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group rounded-xl border border-border p-4 transition-colors hover:border-primary/50"
          >
            <p className="font-medium transition-colors group-hover:text-primary">
              {post.title}
            </p>
            {post.tags.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-1">
                {post.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-bold uppercase tracking-widest text-primary/60"
                  >
                    {tag.replace("-", " ")}
                  </span>
                ))}
              </div>
            )}
          </Link>
        ))}
      </div>
    </section>
  );
}
