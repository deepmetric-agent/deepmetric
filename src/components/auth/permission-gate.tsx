"use client";

import { useSession } from "next-auth/react";
import type { UserRole } from "@/lib/auth";

type PermissionGateProps = {
  children: React.ReactNode;
  allowedRoles: UserRole[];
  fallback?: React.ReactNode;
};

export function PermissionGate({
  children,
  allowedRoles,
  fallback = null,
}: PermissionGateProps) {
  const { data: session } = useSession();

  if (!session) return <>{fallback}</>;

  const role = (session.user as Record<string, unknown>)?.role as UserRole;
  if (!allowedRoles.includes(role)) return <>{fallback}</>;

  return <>{children}</>;
}
