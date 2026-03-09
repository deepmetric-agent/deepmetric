"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageSelector } from "@/components/language-selector";
import { LoginButton } from "@/components/auth/login-button";
import { UserMenu } from "@/components/auth/user-menu";

const navKeys = [
  { key: "tools", href: "#herramientas" },
  { key: "services", href: "#servicios" },
  { key: "about", href: "#sobre-mi" },
  { key: "blog", href: "/blog" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const t = useTranslations("nav");

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/logoclaro.png"
            alt="DeepMetric"
            width={240}
            height={60}
            className="block h-12 w-auto mix-blend-multiply dark:hidden"
            priority
          />
          <Image
            src="/logooscuro.png"
            alt="DeepMetric"
            width={240}
            height={60}
            className="hidden h-12 w-auto mix-blend-screen dark:block"
            priority
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {navKeys.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              {t(link.key)}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <LanguageSelector />
          <ThemeToggle />
          <UserMenu />
          <LoginButton />
          <Link href="#contacto" className="hidden sm:flex">
            <Button size="sm">{t("contact")}</Button>
          </Link>

          {/* Mobile menu */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setOpen(!open)}
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Menu</span>
          </Button>
        </div>
      </div>

      {/* Mobile nav overlay */}
      {open && (
        <div className="border-t border-border bg-background px-6 py-6 md:hidden">
          <nav className="flex flex-col gap-4">
            {navKeys.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-lg font-medium transition-colors hover:text-primary"
              >
                {t(link.key)}
              </Link>
            ))}
            <Link href="#contacto" onClick={() => setOpen(false)}>
              <Button className="mt-2 w-full">{t("contact")}</Button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
