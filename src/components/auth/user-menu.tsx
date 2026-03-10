"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import {
  User,
  LogOut,
  LayoutDashboard,
  FileText,
  Users,
  BarChart3,
  Wrench,
  Key,
  ChevronDown,
} from "lucide-react";

const menuByRole: Record<string, { href: string; label: string; icon: React.ElementType }[]> = {
  ADMIN: [
    { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/posts", label: "Artículos", icon: FileText },
    { href: "/admin/users", label: "Usuarios", icon: Users },
    { href: "/admin/analytics", label: "Analytics", icon: BarChart3 },
    { href: "/admin/tools", label: "Herramientas", icon: Wrench },
  ],
  CONTENT_MANAGER: [
    { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/posts", label: "Artículos", icon: FileText },
  ],
  COLLABORATOR: [
    { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  ],
  VIEWER: [],
};

export function UserMenu() {
  const { data: session, status } = useSession();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  if (status === "loading" || !session?.user) return null;

  const role = (session.user as Record<string, unknown>)?.role as string ?? "VIEWER";
  const links = menuByRole[role] ?? [];
  const initial = session.user.name?.charAt(0)?.toUpperCase() ?? "U";

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm font-medium transition-colors hover:bg-muted"
      >
        {session.user.image ? (
          <img
            src={session.user.image}
            alt=""
            className="h-7 w-7 rounded-full border border-border object-cover"
          />
        ) : (
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
            {initial}
          </div>
        )}
        <span className="hidden md:inline">{session.user.name}</span>
        <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
      </button>

      {open && (
        <div className="absolute right-0 top-full z-50 mt-2 w-56 overflow-hidden rounded-xl border border-border bg-card shadow-lg">
          {/* User info */}
          <div className="border-b border-border px-4 py-3">
            <p className="text-sm font-bold">{session.user.name}</p>
            <p className="text-xs text-muted-foreground">{session.user.email}</p>
            <span className="mt-1 inline-block rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold text-primary">
              {role}
            </span>
          </div>

          {/* Menu links */}
          {links.length > 0 && (
            <div className="border-b border-border py-1">
              {links.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 px-4 py-2 text-sm transition-colors hover:bg-muted"
                >
                  <item.icon className="h-4 w-4 text-muted-foreground" />
                  {item.label}
                </Link>
              ))}
            </div>
          )}

          {/* Account actions */}
          <div className="py-1">
            <Link
              href="/account"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-4 py-2 text-sm transition-colors hover:bg-muted"
            >
              <Key className="h-4 w-4 text-muted-foreground" />
              Mi cuenta
            </Link>
            <button
              onClick={() => signOut()}
              className="flex w-full items-center gap-3 px-4 py-2 text-sm text-destructive transition-colors hover:bg-destructive/10"
            >
              <LogOut className="h-4 w-4" />
              Cerrar sesión
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
