"use client";

import { useState } from "react";
import { Twitter, Linkedin, Link2, Check } from "lucide-react";
import { useTranslations } from "next-intl";

type ShareButtonsProps = {
  title: string;
  slug: string;
};

export function ShareButtons({ title, slug }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const t = useTranslations("blog");
  const url = `https://deepmetric.fit/blog/${slug}`;

  function copyLink() {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
        {t("share")}
      </span>
      <a
        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        title="Twitter / X"
      >
        <Twitter className="h-4 w-4" />
      </a>
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        title="LinkedIn"
      >
        <Linkedin className="h-4 w-4" />
      </a>
      <button
        onClick={copyLink}
        className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        title={t("copy_link")}
      >
        {copied ? (
          <Check className="h-4 w-4 text-emerald-500" />
        ) : (
          <Link2 className="h-4 w-4" />
        )}
      </button>
    </div>
  );
}
