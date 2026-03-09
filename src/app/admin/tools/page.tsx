import { getTools } from "@/lib/admin/tool-actions";
import { ToolsManager } from "./tools-manager";

export default async function AdminToolsPage() {
  const tools = await getTools();

  const serialized = tools.map((t) => ({
    ...t,
    createdAt: t.createdAt.toISOString(),
    updatedAt: t.updatedAt.toISOString(),
  }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black">Herramientas</h1>
        <p className="text-sm text-muted-foreground">
          Gestiona las herramientas web y controla qué roles pueden acceder a cada una.
        </p>
      </div>
      <ToolsManager tools={serialized} />
    </div>
  );
}
