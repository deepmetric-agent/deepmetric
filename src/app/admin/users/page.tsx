import { prisma } from "@/lib/db";
import { UserTable } from "./user-table";

export default async function UsersPage() {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black">Gestión de Usuarios</h1>
        <p className="text-muted-foreground">
          Administra los usuarios y sus roles en la plataforma.
        </p>
      </div>
      <UserTable users={JSON.parse(JSON.stringify(users))} />
    </div>
  );
}
