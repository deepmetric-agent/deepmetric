"use client";

import { useTranslations } from "next-intl";

type TagFilterProps = {
  tags: string[];
  activeTag: string | null;
  onSelect: (tag: string | null) => void;
};

export function TagFilter({ tags, activeTag, onSelect }: TagFilterProps) {
  const t = useTranslations("blog");

  return (
    <div className="mb-8 flex flex-wrap gap-2">
      <button
        onClick={() => onSelect(null)}
        className={`rounded-full px-3 py-1.5 text-xs font-bold transition-colors ${
          activeTag === null
            ? "bg-primary text-primary-foreground"
            : "bg-muted text-muted-foreground hover:text-foreground"
        }`}
      >
        {t("all_posts")}
      </button>
      {tags.map((tag) => (
        <button
          key={tag}
          onClick={() => onSelect(tag)}
          className={`rounded-full px-3 py-1.5 text-xs font-bold transition-colors ${
            activeTag === tag
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground hover:text-foreground"
          }`}
        >
          {tag.replace("-", " ")}
        </button>
      ))}
    </div>
  );
}
