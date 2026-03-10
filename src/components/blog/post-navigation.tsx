"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";

type NavPost = { slug: string; title: string } | null;

type PostNavigationProps = {
  prevPost: NavPost;
  nextPost: NavPost;
};

export function PostNavigation({ prevPost, nextPost }: PostNavigationProps) {
  const t = useTranslations("blog");

  if (!prevPost && !nextPost) return null;

  return (
    <nav className="mt-16 grid grid-cols-1 gap-4 border-t border-border pt-8 sm:grid-cols-2">
      {prevPost ? (
        <Link
          href={`/blog/${prevPost.slug}`}
          className="group flex flex-col gap-1 rounded-xl border border-border p-4 transition-colors hover:border-primary/50"
        >
          <span className="flex items-center gap-1 text-xs font-bold uppercase text-muted-foreground">
            <ArrowLeft className="h-3 w-3" /> {t("prev")}
          </span>
          <span className="font-medium transition-colors group-hover:text-primary">
            {prevPost.title}
          </span>
        </Link>
      ) : (
        <div />
      )}
      {nextPost ? (
        <Link
          href={`/blog/${nextPost.slug}`}
          className="group flex flex-col items-end gap-1 rounded-xl border border-border p-4 text-right transition-colors hover:border-primary/50"
        >
          <span className="flex items-center gap-1 text-xs font-bold uppercase text-muted-foreground">
            {t("next")} <ArrowRight className="h-3 w-3" />
          </span>
          <span className="font-medium transition-colors group-hover:text-primary">
            {nextPost.title}
          </span>
        </Link>
      ) : (
        <div />
      )}
    </nav>
  );
}
