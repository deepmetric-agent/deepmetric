"use client";

import { signIn } from "next-auth/react";
import { Activity, Github } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
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
            Inicia sesión para acceder al panel de administración
          </p>
        </div>

        {/* Login */}
        <div className="rounded-xl border border-border bg-card p-8">
          <Button
            className="w-full gap-2"
            onClick={() => signIn("github", { callbackUrl: "/admin/dashboard" })}
          >
            <Github className="h-5 w-5" />
            Continuar con GitHub
          </Button>
        </div>

        <p className="text-xs text-muted-foreground">
          Solo usuarios autorizados pueden acceder al panel.
        </p>
      </div>
    </div>
  );
}
