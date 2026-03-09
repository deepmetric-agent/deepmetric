"use client";

import { useState } from "react";
import { Search, MoreHorizontal, Shield, UserCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type MockUser = {
  id: string;
  name: string;
  email: string;
  role: string;
  image: string | null;
  lastActive: string;
};

const mockUsers: MockUser[] = [
  {
    id: "1",
    name: "Luisma",
    email: "luisma@deepmetric.fit",
    role: "ADMIN",
    image: null,
    lastActive: "Ahora",
  },
  {
    id: "2",
    name: "Carlos Ruiz",
    email: "carlos@example.com",
    role: "COLLABORATOR",
    image: null,
    lastActive: "Hace 2h",
  },
  {
    id: "3",
    name: "Ana García",
    email: "ana@example.com",
    role: "CONTENT_MANAGER",
    image: null,
    lastActive: "Hace 1d",
  },
  {
    id: "4",
    name: "Pedro Martín",
    email: "pedro@example.com",
    role: "VIEWER",
    image: null,
    lastActive: "Hace 3d",
  },
];

const roleBadgeVariant: Record<string, string> = {
  ADMIN: "bg-primary/10 text-primary",
  CONTENT_MANAGER: "bg-emerald-500/10 text-emerald-500",
  COLLABORATOR: "bg-amber-500/10 text-amber-500",
  VIEWER: "bg-muted text-muted-foreground",
};

export default function UsersPage() {
  const [search, setSearch] = useState("");

  const filtered = mockUsers.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black">Users</h1>
          <p className="text-muted-foreground">
            Gestión de usuarios y roles de la plataforma.
          </p>
        </div>
        <Button size="sm">Invitar usuario</Button>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          placeholder="Buscar usuarios..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="h-9 w-full rounded-lg border border-border bg-background pl-10 pr-4 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        />
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-border bg-card">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              <th className="px-6 py-3 text-left font-medium text-muted-foreground">
                Usuario
              </th>
              <th className="px-6 py-3 text-left font-medium text-muted-foreground">
                Email
              </th>
              <th className="px-6 py-3 text-left font-medium text-muted-foreground">
                Rol
              </th>
              <th className="px-6 py-3 text-left font-medium text-muted-foreground">
                Último acceso
              </th>
              <th className="px-6 py-3 text-right font-medium text-muted-foreground">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((user) => (
              <tr
                key={user.id}
                className="border-b border-border last:border-0 hover:bg-muted/30"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                      {user.name.charAt(0)}
                    </div>
                    <span className="font-medium">{user.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-muted-foreground">
                  {user.email}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-bold ${roleBadgeVariant[user.role] ?? ""}`}
                  >
                    <Shield className="h-3 w-3" />
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4 text-muted-foreground">
                  {user.lastActive}
                </td>
                <td className="px-6 py-4 text-right">
                  <Button variant="ghost" size="icon-sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
