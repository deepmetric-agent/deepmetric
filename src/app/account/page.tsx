"use client";

import { useState, useTransition } from "react";
import { useSession } from "next-auth/react";
import { Activity, Key, Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { changePassword } from "@/lib/admin/actions";
import Link from "next/link";

export default function AccountPage() {
  const { data: session, status } = useSession();
  const [currentPw, setCurrentPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isPending, startTransition] = useTransition();

  if (status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!session?.user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground">No has iniciado sesión.</p>
      </div>
    );
  }

  const role = (session.user as Record<string, unknown>)?.role as string ?? "VIEWER";

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (newPw.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres.");
      return;
    }
    if (newPw !== confirmPw) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    startTransition(async () => {
      try {
        await changePassword(session!.user!.id!, newPw);
        setSuccess(true);
        setCurrentPw("");
        setNewPw("");
        setConfirmPw("");
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Error al cambiar la contraseña.");
      }
    });
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="border-b border-border bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-3xl items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-2 text-primary">
            <Activity className="h-6 w-6" />
            <span className="text-lg font-black tracking-tighter">
              DeepMetric<span className="text-primary">.fit</span>
            </span>
          </Link>
          <Link href="/" className="text-sm text-muted-foreground hover:text-primary">
            ← Volver
          </Link>
        </div>
      </header>

      <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-12">
        <h1 className="mb-8 text-2xl font-black">Mi cuenta</h1>

        {/* User info */}
        <div className="mb-8 rounded-xl border border-border bg-card p-6">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-xl font-black text-primary">
              {session.user.name?.charAt(0)?.toUpperCase() ?? "U"}
            </div>
            <div>
              <p className="text-lg font-bold">{session.user.name}</p>
              <p className="text-sm text-muted-foreground">{session.user.email}</p>
              <span className="mt-1 inline-block rounded-full bg-primary/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest text-primary">
                {role}
              </span>
            </div>
          </div>
        </div>

        {/* Change password */}
        <div className="rounded-xl border border-border bg-card p-6">
          <div className="mb-4 flex items-center gap-2">
            <Key className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-bold">Cambiar contraseña</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-1 block text-xs font-bold text-muted-foreground">
                Nueva contraseña
              </label>
              <input
                type="password"
                value={newPw}
                onChange={(e) => setNewPw(e.target.value)}
                required
                minLength={6}
                className="h-10 w-full max-w-sm rounded-lg border border-border bg-background px-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-bold text-muted-foreground">
                Confirmar contraseña
              </label>
              <input
                type="password"
                value={confirmPw}
                onChange={(e) => setConfirmPw(e.target.value)}
                required
                minLength={6}
                className="h-10 w-full max-w-sm rounded-lg border border-border bg-background px-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>

            {error && (
              <p className="text-xs font-medium text-destructive">{error}</p>
            )}
            {success && (
              <p className="flex items-center gap-1 text-xs font-medium text-emerald-500">
                <Check className="h-3.5 w-3.5" /> Contraseña actualizada correctamente.
              </p>
            )}

            <Button type="submit" size="sm" disabled={isPending}>
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Guardar contraseña
            </Button>
          </form>
        </div>
      </main>
    </div>
  );
}
