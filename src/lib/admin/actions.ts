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

export async function getUsers() {
  await requireAdmin();
  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      _count: { select: { sessions: true } },
    },
  });
  return users;
}

export async function updateUserRole(userId: string, role: string) {
  await requireAdmin();
  const validRoles = ["ADMIN", "CONTENT_MANAGER", "COLLABORATOR", "VIEWER"];
  if (!validRoles.includes(role)) throw new Error("Invalid role");

  await prisma.user.update({
    where: { id: userId },
    data: { role },
  });
  revalidatePath("/admin/users");
}

export async function deleteUser(userId: string) {
  const session = await requireAdmin();
  if (session.user?.id === userId) throw new Error("Cannot delete yourself");

  await prisma.user.delete({ where: { id: userId } });
  revalidatePath("/admin/users");
}

export async function getDashboardStats() {
  const session = await auth();
  if (!session?.user) throw new Error("Not authenticated");

  const [userCount, postCount, recentUsers] = await Promise.all([
    prisma.user.count(),
    0, // Posts come from Keystatic, not DB
    prisma.user.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
      select: { id: true, name: true, email: true, image: true, role: true, createdAt: true },
    }),
  ]);

  return { userCount, postCount, recentUsers };
}
