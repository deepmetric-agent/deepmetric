"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { LogOut, Settings, User, Shield } from "lucide-react";

export function UserNav() {
  const { data: session } = useSession();

  if (!session?.user) return null;

  const role = (session.user as Record<string, unknown>)?.role as string;
  const isAdmin = role === "ADMIN" || role === "CONTENT_MANAGER";

  return (
    <div className="flex items-center gap-3">
      {isAdmin && (
        <Link
          href="/admin/dashboard"
          className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold text-primary transition-colors hover:bg-primary/10"
        >
          <Shield className="h-3.5 w-3.5" />
          Admin
        </Link>
      )}

      <div className="flex items-center gap-2">
        {session.user.image ? (
          <img
            src={session.user.image}
            alt={session.user.name ?? ""}
            className="h-7 w-7 rounded-full border border-border"
          />
        ) : (
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
            {session.user.name?.charAt(0) ?? <User className="h-3.5 w-3.5" />}
          </div>
        )}
        <span className="hidden text-sm font-medium md:inline">
          {session.user.name}
        </span>
      </div>

      <button
        onClick={() => signOut()}
        className="flex h-7 w-7 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        title="Cerrar sesión"
      >
        <LogOut className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
