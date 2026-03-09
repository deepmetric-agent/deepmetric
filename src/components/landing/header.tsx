"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { navLinks } from "@/lib/constants";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 text-primary">
          <Activity className="h-7 w-7" />
          <span className="text-xl font-black tracking-tighter">
            DeepMetric<span className="text-primary">.fit</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <Button className="hidden sm:flex" size="sm">
            Contactar
          </Button>

          {/* Mobile menu */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setOpen(!open)}
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Abrir menú</span>
          </Button>
        </div>
      </div>

      {/* Mobile nav overlay */}
      {open && (
        <div className="border-t border-border bg-background px-6 py-6 md:hidden">
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-lg font-medium transition-colors hover:text-primary"
              >
                {link.label}
              </Link>
            ))}
            <Button className="mt-2 w-full">Contactar</Button>
          </nav>
        </div>
      )}
    </header>
  );
}
