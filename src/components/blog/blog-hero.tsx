"use client";

import { useTranslations } from "next-intl";

export function BlogHero() {
  const t = useTranslations("blog");

  return (
    <section className="mb-12">
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div className="max-w-2xl">
          <h1 className="mb-4 text-4xl font-black leading-tight md:text-5xl">
            {t("title")}
          </h1>
          <p className="text-lg text-muted-foreground">
            {t("subtitle")}
          </p>
        </div>
      </div>
    </section>
  );
}
