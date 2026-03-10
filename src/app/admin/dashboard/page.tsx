import { Users, FileText, BarChart3, Activity, Clock, Wrench } from "lucide-react";
import { prisma } from "@/lib/db";
import { reader } from "@/lib/keystatic/reader";
import { tools } from "@/lib/constants";

export default async function DashboardPage() {
  const [userCount, recentUsers, allPosts] = await Promise.all([
    prisma.user.count(),
    prisma.user.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
      select: { id: true, name: true, email: true, image: true, role: true, createdAt: true },
    }),
    reader.collections.posts.all(),
  ]);

  const publishedPosts = allPosts.filter((p) => !p.entry.draft);

  const summaryCards = [
    { title: "Usuarios", value: String(userCount), icon: Users },
    { title: "Blog Posts", value: String(publishedPosts.length), icon: FileText },
    { title: "Herramientas", value: String(tools.length), icon: Wrench },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black">Dashboard</h1>
        <p className="text-muted-foreground">
          Resumen general de la plataforma DeepMetric.
        </p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        {summaryCards.map((card) => (
          <div
            key={card.title}
            className="flex items-center gap-4 rounded-xl border border-border bg-card p-6"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <card.icon className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">{card.title}</p>
              <span className="text-2xl font-bold">{card.value}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Recent Posts */}
        <div className="rounded-xl border border-border bg-card p-6">
          <h2 className="mb-4 text-lg font-bold">Últimos Posts</h2>
          <div className="space-y-3">
            {publishedPosts.length === 0 ? (
              <p className="text-sm text-muted-foreground">Sin posts publicados aún.</p>
            ) : (
              publishedPosts.slice(0, 5).map((post) => (
                <div
                  key={post.slug}
                  className="flex items-center justify-between rounded-lg bg-muted/50 px-4 py-3 text-sm"
                >
                  <span className="font-medium truncate">{post.entry.title}</span>
                  <span className="shrink-0 text-xs text-muted-foreground">
                    {post.entry.date
                      ? new Date(post.entry.date).toLocaleDateString("es-ES", { month: "short", day: "numeric" })
                      : "—"}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recent Users */}
        <div className="rounded-xl border border-border bg-card p-6">
          <h2 className="mb-4 text-lg font-bold">Usuarios Recientes</h2>
          <div className="space-y-4">
            {recentUsers.length === 0 ? (
              <p className="text-sm text-muted-foreground">Sin usuarios registrados aún.</p>
            ) : (
              recentUsers.map((user) => (
                <div key={user.id} className="flex gap-3">
                  <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full bg-primary/10">
                    {user.image ? (
                      <img src={user.image} alt="" className="h-full w-full object-cover" />
                    ) : (
                      <Activity className="h-3.5 w-3.5 text-primary" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{user.name ?? user.email}</p>
                    <p className="text-xs text-muted-foreground">{user.role}</p>
                  </div>
                  <div className="flex shrink-0 items-start gap-1 text-xs text-muted-foreground">
                    <Clock className="mt-0.5 h-3 w-3" />
                    {new Date(user.createdAt).toLocaleDateString("es-ES", { month: "short", day: "numeric" })}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
