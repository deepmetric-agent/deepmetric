"use server";

import { prisma } from "@/lib/db";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";

async function requireAdmin() {
  const session = await auth();
  if (!session?.user) throw new Error("Not authenticated");
  const role = (session.user as Record<string, unknown>)?.role as string;
  if (role !== "ADMIN") throw new Error("Not authorized");
  return session;
}

export async function getTools() {
  await requireAdmin();
  return prisma.tool.findMany({ orderBy: { order: "asc" } });
}

export async function createTool(data: {
  name: string;
  slug: string;
  url: string;
  description?: string;
  icon?: string;
  allowedRoles: string;
}) {
  await requireAdmin();

  const existing = await prisma.tool.findUnique({ where: { slug: data.slug } });
  if (existing) throw new Error("Ya existe una herramienta con ese slug");

  const maxOrder = await prisma.tool.aggregate({ _max: { order: true } });

  await prisma.tool.create({
    data: {
      name: data.name,
      slug: data.slug,
      url: data.url,
      description: data.description ?? null,
      icon: data.icon ?? null,
      allowedRoles: data.allowedRoles,
      order: (maxOrder._max.order ?? 0) + 1,
    },
  });
  revalidatePath("/admin/tools");
}

export async function updateTool(
  id: string,
  data: {
    name?: string;
    url?: string;
    description?: string;
    icon?: string;
    allowedRoles?: string;
    active?: boolean;
  }
) {
  await requireAdmin();
  await prisma.tool.update({ where: { id }, data });
  revalidatePath("/admin/tools");
}

export async function deleteTool(id: string) {
  await requireAdmin();
  await prisma.tool.delete({ where: { id } });
  revalidatePath("/admin/tools");
}

export async function getUserTools() {
  const session = await auth();
  if (!session?.user) return [];
  const role =
    ((session.user as Record<string, unknown>)?.role as string) ?? "VIEWER";

  const tools = await prisma.tool.findMany({
    where: { active: true },
    orderBy: { order: "asc" },
  });

  return tools.filter((t) =>
    t.allowedRoles.split(",").map((r) => r.trim()).includes(role)
  );
}
