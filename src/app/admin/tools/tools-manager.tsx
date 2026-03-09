"use client";

import { useState, useTransition } from "react";
import {
  Plus,
  Trash2,
  ExternalLink,
  Power,
  PowerOff,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { createTool, updateTool, deleteTool } from "@/lib/admin/tool-actions";

type Tool = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  url: string;
  icon: string | null;
  allowedRoles: string;
  active: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
};

const ALL_ROLES = ["ADMIN", "CONTENT_MANAGER", "COLLABORATOR", "VIEWER"] as const;

const roleBadge: Record<string, string> = {
  ADMIN: "bg-primary/10 text-primary",
  CONTENT_MANAGER: "bg-emerald-500/10 text-emerald-500",
  COLLABORATOR: "bg-amber-500/10 text-amber-500",
  VIEWER: "bg-muted text-muted-foreground",
};

export function ToolsManager({ tools }: { tools: Tool[] }) {
  const [isPending, startTransition] = useTransition();
  const [showCreate, setShowCreate] = useState(false);
  const [error, setError] = useState("");

  // Create form state
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");
  const [icon, setIcon] = useState("");
  const [selectedRoles, setSelectedRoles] = useState<string[]>(["ADMIN"]);

  function toggleRole(role: string) {
    setSelectedRoles((prev) =>
      prev.includes(role) ? prev.filter((r) => r !== role) : [...prev, role]
    );
  }

  function handleNameChange(value: string) {
    setName(value);
    setSlug(
      value
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "")
    );
  }

  function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (selectedRoles.length === 0) {
      setError("Selecciona al menos un rol.");
      return;
    }
    startTransition(async () => {
      try {
        await createTool({
          name,
          slug,
          url,
          description: description || undefined,
          icon: icon || undefined,
          allowedRoles: selectedRoles.join(","),
        });
        setName("");
        setSlug("");
        setUrl("");
        setDescription("");
        setIcon("");
        setSelectedRoles(["ADMIN"]);
        setShowCreate(false);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Error al crear");
      }
    });
  }

  function handleToggleActive(tool: Tool) {
    startTransition(async () => {
      await updateTool(tool.id, { active: !tool.active });
    });
  }

  function handleRolesChange(tool: Tool, role: string) {
    const current = tool.allowedRoles.split(",").map((r) => r.trim());
    const updated = current.includes(role)
      ? current.filter((r) => r !== role)
      : [...current, role];
    if (updated.length === 0) return;
    startTransition(async () => {
      await updateTool(tool.id, { allowedRoles: updated.join(",") });
    });
  }

  function handleDelete(id: string) {
    if (!confirm("¿Eliminar esta herramienta?")) return;
    startTransition(async () => {
      await deleteTool(id);
    });
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Button
          size="sm"
          className="gap-2"
          onClick={() => {
            setShowCreate(!showCreate);
            setError("");
          }}
        >
          <Plus className="h-4 w-4" />
          Nueva herramienta
        </Button>
      </div>

      {/* Create form */}
      {showCreate && (
        <div className="rounded-xl border border-border bg-card p-6">
          <h3 className="mb-4 text-sm font-bold">Crear herramienta</h3>
          <form onSubmit={handleCreate} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-xs font-bold text-muted-foreground">
                  Nombre
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  required
                  className="h-9 w-full rounded-lg border border-border bg-background px-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  placeholder="HRV Analyzer"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-bold text-muted-foreground">
                  Slug
                </label>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  required
                  className="h-9 w-full rounded-lg border border-border bg-background px-3 text-sm text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-bold text-muted-foreground">
                  URL
                </label>
                <input
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  required
                  className="h-9 w-full rounded-lg border border-border bg-background px-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  placeholder="https://hrv.deepmetric.fit"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-bold text-muted-foreground">
                  Icono (Lucide)
                </label>
                <input
                  type="text"
                  value={icon}
                  onChange={(e) => setIcon(e.target.value)}
                  className="h-9 w-full rounded-lg border border-border bg-background px-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  placeholder="Activity"
                />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-bold text-muted-foreground">
                Descripción
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={2}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                placeholder="Herramienta para análisis de variabilidad de la frecuencia cardíaca"
              />
            </div>
            <div>
              <label className="mb-2 block text-xs font-bold text-muted-foreground">
                Roles con acceso
              </label>
              <div className="flex flex-wrap gap-2">
                {ALL_ROLES.map((role) => (
                  <button
                    key={role}
                    type="button"
                    onClick={() => toggleRole(role)}
                    className={`rounded-full px-3 py-1 text-xs font-bold transition-colors ${
                      selectedRoles.includes(role)
                        ? roleBadge[role]
                        : "bg-muted/50 text-muted-foreground opacity-50"
                    } border ${
                      selectedRoles.includes(role)
                        ? "border-current/20"
                        : "border-transparent"
                    }`}
                  >
                    {role}
                  </button>
                ))}
              </div>
            </div>
            {error && (
              <p className="text-xs font-medium text-destructive">{error}</p>
            )}
            <div className="flex gap-2">
              <Button type="submit" size="sm" disabled={isPending}>
                {isPending ? "Creando..." : "Crear herramienta"}
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setShowCreate(false)}
              >
                Cancelar
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Tools list */}
      {tools.length === 0 && !showCreate ? (
        <div className="rounded-xl border border-dashed border-border py-12 text-center text-muted-foreground">
          <p className="mb-2 text-sm">No hay herramientas configuradas.</p>
          <Button
            size="sm"
            variant="outline"
            onClick={() => setShowCreate(true)}
          >
            Crear la primera
          </Button>
        </div>
      ) : (
        <div className="space-y-3">
          {tools.map((tool) => {
            const roles = tool.allowedRoles
              .split(",")
              .map((r) => r.trim());
            return (
              <div
                key={tool.id}
                className={`rounded-xl border bg-card p-5 transition-opacity ${
                  tool.active
                    ? "border-border"
                    : "border-border/50 opacity-60"
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <h3 className="text-sm font-bold">{tool.name}</h3>
                      {!tool.active && (
                        <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-bold text-muted-foreground">
                          Desactivada
                        </span>
                      )}
                    </div>
                    {tool.description && (
                      <p className="mt-1 text-xs text-muted-foreground">
                        {tool.description}
                      </p>
                    )}
                    <a
                      href={tool.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 inline-flex items-center gap-1 text-xs text-primary hover:underline"
                    >
                      {tool.url}
                      <ExternalLink className="h-3 w-3" />
                    </a>

                    {/* Role toggles */}
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {ALL_ROLES.map((role) => (
                        <button
                          key={role}
                          onClick={() => handleRolesChange(tool, role)}
                          disabled={isPending}
                          className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold transition-all ${
                            roles.includes(role)
                              ? roleBadge[role]
                              : "bg-muted/30 text-muted-foreground/40 line-through"
                          }`}
                        >
                          {role}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      disabled={isPending}
                      onClick={() => handleToggleActive(tool)}
                      title={
                        tool.active ? "Desactivar" : "Activar"
                      }
                    >
                      {tool.active ? (
                        <Power className="h-4 w-4 text-emerald-500" />
                      ) : (
                        <PowerOff className="h-4 w-4 text-muted-foreground" />
                      )}
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive hover:bg-destructive/10"
                      disabled={isPending}
                      onClick={() => handleDelete(tool.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {isPending && (
        <div className="text-center text-sm text-muted-foreground">
          Actualizando...
        </div>
      )}
    </div>
  );
}
