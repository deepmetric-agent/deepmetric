"use client";

import { useState, useTransition } from "react";
import { Search, Trash2, UserPlus, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { updateUserRole, deleteUser, createUser } from "@/lib/admin/actions";

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
  const [showCreate, setShowCreate] = useState(false);
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newRole, setNewRole] = useState("VIEWER");
  const [createError, setCreateError] = useState("");
  const [generatedPass, setGeneratedPass] = useState("");
  const [copied, setCopied] = useState(false);

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

  function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setCreateError("");
    startTransition(async () => {
      try {
        const result = await createUser({ name: newName, email: newEmail, role: newRole });
        setGeneratedPass(result.generatedPassword);
        setNewName("");
        setNewEmail("");
        setNewRole("VIEWER");
      } catch (err: unknown) {
        setCreateError(err instanceof Error ? err.message : "Error al crear usuario");
      }
    });
  }

  function copyPassword() {
    navigator.clipboard.writeText(generatedPass);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="relative max-w-sm flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Buscar usuarios..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-9 w-full rounded-lg border border-border bg-background pl-10 pr-4 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
        <Button size="sm" className="gap-2" onClick={() => { setShowCreate(!showCreate); setGeneratedPass(""); setCreateError(""); }}>
          <UserPlus className="h-4 w-4" />
          Crear usuario
        </Button>
      </div>

      {/* Create user form */}
      {showCreate && (
        <div className="rounded-xl border border-border bg-card p-6">
          {generatedPass ? (
            <div className="space-y-4">
              <p className="text-sm font-bold text-emerald-500">✓ Usuario creado correctamente</p>
              <div className="rounded-lg bg-muted p-4">
                <p className="mb-1 text-xs font-bold text-muted-foreground">Contraseña generada (envíala al usuario):</p>
                <div className="flex items-center gap-2">
                  <code className="flex-1 text-lg font-bold">{generatedPass}</code>
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={copyPassword}>
                    {copied ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
                <p className="mt-2 text-xs text-muted-foreground">El usuario deberá cambiar esta contraseña al iniciar sesión.</p>
              </div>
              <Button variant="outline" size="sm" onClick={() => { setShowCreate(false); setGeneratedPass(""); }}>
                Cerrar
              </Button>
            </div>
          ) : (
            <form onSubmit={handleCreate} className="grid grid-cols-1 gap-4 sm:grid-cols-4">
              <div>
                <label className="mb-1 block text-xs font-bold text-muted-foreground">Nombre</label>
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  required
                  className="h-9 w-full rounded-lg border border-border bg-background px-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-bold text-muted-foreground">Email</label>
                <input
                  type="email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  required
                  className="h-9 w-full rounded-lg border border-border bg-background px-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-bold text-muted-foreground">Rol</label>
                <select
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value)}
                  className="h-9 w-full rounded-lg border border-border bg-background px-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                >
                  {roles.map((r) => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
              </div>
              <div className="flex items-end">
                <Button type="submit" size="sm" disabled={isPending} className="w-full">
                  {isPending ? "Creando..." : "Crear"}
                </Button>
              </div>
              {createError && (
                <p className="col-span-full text-xs font-medium text-destructive">{createError}</p>
              )}
            </form>
          )}
        </div>
      )}

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
