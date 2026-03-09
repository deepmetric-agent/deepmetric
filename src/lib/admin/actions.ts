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

export async function createUser(data: {
  name: string;
  email: string;
  role: string;
}) {
  await requireAdmin();
  const validRoles = ["ADMIN", "CONTENT_MANAGER", "COLLABORATOR", "VIEWER"];
  if (!validRoles.includes(data.role)) throw new Error("Invalid role");

  const existing = await prisma.user.findUnique({ where: { email: data.email } });
  if (existing) throw new Error("Email already registered");

  const { hashSync } = await import("bcryptjs");
  const generatedPassword =
    Math.random().toString(36).slice(2, 8) +
    Math.random().toString(36).slice(2, 4).toUpperCase() +
    "!";
  const passwordHash = hashSync(generatedPassword, 12);

  const user = await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      role: data.role,
      passwordHash,
    },
  });

  revalidatePath("/admin/users");
  return { userId: user.id, generatedPassword };
}

export async function changePassword(userId: string, newPassword: string) {
  const session = await auth();
  if (!session?.user) throw new Error("Not authenticated");

  const role = (session.user as Record<string, unknown>)?.role as string;
  const isSelf = session.user.id === userId;
  if (!isSelf && role !== "ADMIN") throw new Error("Not authorized");

  if (newPassword.length < 6) throw new Error("Password too short");

  const { hashSync } = await import("bcryptjs");
  const passwordHash = hashSync(newPassword, 12);

  await prisma.user.update({
    where: { id: userId },
    data: { passwordHash },
  });
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
