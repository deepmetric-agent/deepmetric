"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";

const locales = [
  { code: "es", label: "Español" },
  { code: "en", label: "English" },
];

export function LanguageSelector() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const newLocale = e.target.value;
    document.cookie = `NEXT_LOCALE=${newLocale};path=/;max-age=31536000`;
    router.refresh();
  }

  return (
    <select
      value={locale}
      onChange={handleChange}
      className="w-full appearance-none rounded-lg border-none bg-muted px-4 py-2 text-sm focus:ring-1 focus:ring-primary"
    >
      {locales.map((l) => (
        <option key={l.code} value={l.code}>
          {l.label}
        </option>
      ))}
    </select>
  );
}
