"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import type { UserRole } from "@/lib/auth";

type AuthGuardProps = {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
  fallback?: React.ReactNode;
};

export function AuthGuard({
  children,
  allowedRoles,
  fallback,
}: AuthGuardProps) {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      fallback ?? (
        <div className="flex min-h-[50vh] items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        </div>
      )
    );
  }

  if (!session) {
    redirect("/login");
  }

  if (allowedRoles) {
    const role = (session.user as Record<string, unknown>)?.role as UserRole;
    if (!allowedRoles.includes(role)) {
      return (
        <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4">
          <p className="text-lg font-bold text-destructive">Acceso denegado</p>
          <p className="text-sm text-muted-foreground">
            No tienes permisos para acceder a esta sección.
          </p>
        </div>
      );
    }
  }

  return <>{children}</>;
}
