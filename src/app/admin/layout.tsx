"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  BarChart3,
  Wrench,
  Settings,
  HelpCircle,
  Activity,
  Search,
} from "lucide-react";
import { AuthGuard } from "@/components/auth/auth-guard";
import { UserNav } from "@/components/auth/user-nav";
import { cn } from "@/lib/utils";

const sidebarLinks = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/users", label: "Users", icon: Users },
  { href: "/admin/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/admin/tools", label: "Tools", icon: Wrench },
  { href: "/admin/settings", label: "Settings", icon: Settings },
  { href: "/admin/help", label: "Help", icon: HelpCircle },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <AuthGuard allowedRoles={["ADMIN", "CONTENT_MANAGER", "COLLABORATOR"]}>
      <div className="flex h-screen overflow-hidden bg-background">
        {/* Sidebar */}
        <aside className="flex w-64 shrink-0 flex-col border-r border-border bg-card">
          {/* Logo */}
          <div className="flex h-16 items-center gap-2 border-b border-border px-6">
            <Activity className="h-6 w-6 text-primary" />
            <span className="text-lg font-black tracking-tight">
              DeepMetric
            </span>
          </div>

          {/* Nav */}
          <nav className="flex-1 space-y-1 px-3 py-4">
            {sidebarLinks.map((link) => {
              const isActive = pathname?.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <link.icon className="h-4 w-4" />
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="border-t border-border p-4">
            <Link
              href="/"
              className="text-xs font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              ← Volver al sitio
            </Link>
          </div>
        </aside>

        {/* Main content */}
        <div className="flex flex-1 flex-col overflow-hidden">
          {/* Header */}
          <header className="flex h-16 shrink-0 items-center justify-between border-b border-border px-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search..."
                className="h-9 w-64 rounded-lg border border-border bg-background pl-10 pr-4 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
            <UserNav />
          </header>

          {/* Page content */}
          <main className="flex-1 overflow-auto p-6">{children}</main>
        </div>
      </div>
    </AuthGuard>
  );
}
