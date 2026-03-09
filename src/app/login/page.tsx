"use client";

import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { Activity, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

function LoginForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/admin/dashboard";
  const t = useTranslations("auth");

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm space-y-8 text-center">
        {/* Logo */}
        <div className="flex flex-col items-center gap-3">
          <Activity className="h-12 w-12 text-primary" />
          <h1 className="text-2xl font-black tracking-tight">
            DeepMetric<span className="text-primary">.fit</span>
          </h1>
          <p className="text-sm text-muted-foreground">
            {t("login_title")}
          </p>
        </div>

        {/* Login */}
        <div className="rounded-xl border border-border bg-card p-8">
          <Button
            className="w-full gap-2"
            onClick={() => signIn("github", { callbackUrl })}
          >
            <Github className="h-5 w-5" />
            {t("login_github")}
          </Button>
        </div>

        <p className="text-xs text-muted-foreground">
          {t("login_note")}
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
