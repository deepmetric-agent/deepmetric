"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { Button, buttonVariants } from "@/components/ui/button";
import { LogIn } from "lucide-react";
import { useTranslations } from "next-intl";

export function LoginButton() {
  const { data: session, status } = useSession();
  const t = useTranslations("auth");

  if (status === "loading") {
    return (
      <Button variant="ghost" size="sm" disabled>
        <span className="h-4 w-4 animate-pulse rounded-full bg-muted-foreground/30" />
      </Button>
    );
  }

  if (session) return null;

  return (
    <Link
      href="/login"
      className={buttonVariants({ variant: "outline", size: "sm" }) + " gap-2"}
    >
      <LogIn className="h-4 w-4" />
      {t("login")}
    </Link>
  );
}
