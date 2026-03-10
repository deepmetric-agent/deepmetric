"use client";

import Link from "next/link";
import { ShieldX } from "lucide-react";
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

export default function DeniedPage() {
  const t = useTranslations("auth");

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 text-center">
      <ShieldX className="mb-6 h-16 w-16 text-destructive/60" />
      <h1 className="mb-2 text-4xl font-black">403</h1>
      <h2 className="mb-2 text-xl font-bold">{t("denied")}</h2>
      <p className="mb-8 max-w-md text-muted-foreground">
        {t("denied_msg")}
      </p>
      <div className="flex gap-4">
        <Link
          href="/"
          className="rounded-lg bg-primary px-6 py-3 text-sm font-bold text-primary-foreground transition-colors hover:bg-primary/90"
        >
          {t("login")}
        </Link>
        <Button
          variant="outline"
          onClick={() => signOut({ callbackUrl: "/login" })}
        >
          {t("logout")}
        </Button>
      </div>
    </div>
  );
}
