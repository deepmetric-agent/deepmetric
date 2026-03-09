"use client";

import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { Globe } from "lucide-react";

const locales = [
  { code: "es", flag: "ES" },
  { code: "en", flag: "EN" },
];

export function LanguageSelector() {
  const locale = useLocale();
  const router = useRouter();

  function toggle() {
    const next = locale === "es" ? "en" : "es";
    document.cookie = `NEXT_LOCALE=${next};path=/;max-age=31536000`;
    router.refresh();
  }

  const current = locales.find((l) => l.code === locale) ?? locales[0];

  return (
    <button
      onClick={toggle}
      className="flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-xs font-bold text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
      title={locale === "es" ? "Switch to English" : "Cambiar a Español"}
    >
      <Globe className="h-3.5 w-3.5" />
      {current.flag}
    </button>
  );
}
