"use client";

import { useState, useTransition } from "react";
import { Search, Shield, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { updateUserRole, deleteUser } from "@/lib/admin/actions";

type User = {
  id: string;
  name: string | null;
  email: string;
  image: string | null;
  role: string;
  createdAt: string;
};

const roles = ["ADMIN", "CONTENT_MANAGER", "COLLABORATOR", "VIEWER"] as const;

const roleBadgeVariant: Record<string, string> = {
  ADMIN: "bg-primary/10 text-primary",
  CONTENT_MANAGER: "bg-emerald-500/10 text-emerald-500",
  COLLABORATOR: "bg-amber-500/10 text-amber-500",
  VIEWER: "bg-muted text-muted-foreground",
};

export function UserTable({ users }: { users: User[] }) {
  const [search, setSearch] = useState("");
  const [isPending, startTransition] = useTransition();

  const filtered = users.filter(
    (u) =>
      (u.name ?? "").toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  function handleRoleChange(userId: string, newRole: string) {
    startTransition(async () => {
      try {
        await updateUserRole(userId, newRole);
      } catch (err) {
        console.error("Failed to update role:", err);
      }
    });
  }

  function handleDelete(userId: string) {
    if (!confirm("¿Eliminar este usuario? Esta acción no se puede deshacer.")) return;
    startTransition(async () => {
      try {
        await deleteUser(userId);
      } catch (err) {
        console.error("Failed to delete user:", err);
      }
    });
  }

  return (
    <div className="space-y-6">
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
                Registro
              </th>
              <th className="px-6 py-3 text-right font-medium text-muted-foreground">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-muted-foreground">
                  No se encontraron usuarios.
                </td>
              </tr>
            ) : (
              filtered.map((user) => (
                <tr
                  key={user.id}
                  className="border-b border-border last:border-0 hover:bg-muted/30"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {user.image ? (
                        <img
                          src={user.image}
                          alt=""
                          className="h-8 w-8 rounded-full border border-border object-cover"
                        />
                      ) : (
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                          {(user.name ?? user.email).charAt(0).toUpperCase()}
                        </div>
                      )}
                      <span className="font-medium">{user.name ?? "—"}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">
                    {user.email}
                  </td>
                  <td className="px-6 py-4">
                    <select
                      value={user.role}
                      disabled={isPending}
                      onChange={(e) => handleRoleChange(user.id, e.target.value)}
                      className={`inline-flex items-center gap-1 rounded-full border-none px-2.5 py-0.5 text-xs font-bold focus:ring-1 focus:ring-primary ${roleBadgeVariant[user.role] ?? ""}`}
                    >
                      {roles.map((r) => (
                        <option key={r} value={r}>
                          {r}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">
                    {new Date(user.createdAt).toLocaleDateString("es-ES", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      disabled={isPending}
                      onClick={() => handleDelete(user.id)}
                      className="h-8 w-8 text-destructive hover:bg-destructive/10 hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {isPending && (
        <div className="text-center text-sm text-muted-foreground">
          Actualizando...
        </div>
      )}
    </div>
  );
}
