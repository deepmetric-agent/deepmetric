import { reader } from "@/lib/keystatic/reader";
import Link from "next/link";
import { Plus, ExternalLink, Edit2 } from "lucide-react";

export default async function AdminPostsPage() {
  const posts = await reader.collections.posts.all();

  const sorted = posts.sort(
    (a, b) =>
      new Date(b.entry.date ?? 0).getTime() -
      new Date(a.entry.date ?? 0).getTime()
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black">Artículos del Blog</h1>
          <p className="text-sm text-muted-foreground">
            Gestiona los artículos publicados en el blog.
          </p>
        </div>
        <Link
          href="/keystatic/collection/posts/create"
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-bold text-primary-foreground transition-colors hover:bg-primary/90"
        >
          <Plus className="h-4 w-4" />
          Nuevo artículo
        </Link>
      </div>

      <div className="overflow-hidden rounded-xl border border-border bg-card">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              <th className="px-6 py-3 text-left font-medium text-muted-foreground">
                Título
              </th>
              <th className="px-6 py-3 text-left font-medium text-muted-foreground">
                Fecha
              </th>
              <th className="px-6 py-3 text-left font-medium text-muted-foreground">
                Idioma
              </th>
              <th className="px-6 py-3 text-left font-medium text-muted-foreground">
                Tags
              </th>
              <th className="px-6 py-3 text-left font-medium text-muted-foreground">
                Estado
              </th>
              <th className="px-6 py-3 text-right font-medium text-muted-foreground">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {sorted.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="px-6 py-12 text-center text-muted-foreground"
                >
                  No hay artículos aún.{" "}
                  <Link
                    href="/keystatic/collection/posts/create"
                    className="text-primary hover:underline"
                  >
                    Crea el primero
                  </Link>
                </td>
              </tr>
            ) : (
              sorted.map((post) => (
                <tr
                  key={post.slug}
                  className="border-b border-border last:border-0 hover:bg-muted/30"
                >
                  <td className="px-6 py-4">
                    <span className="font-medium">
                      {post.entry.title}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">
                    {post.entry.date
                      ? new Date(post.entry.date).toLocaleDateString("es-ES", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })
                      : "—"}
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-block rounded-full bg-muted px-2 py-0.5 text-[10px] font-bold uppercase">
                      {post.entry.locale}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {post.entry.tags.map((tag: string) => (
                        <span
                          key={tag}
                          className="inline-block rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold text-primary"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {post.entry.draft ? (
                      <span className="inline-block rounded-full bg-amber-500/10 px-2 py-0.5 text-[10px] font-bold text-amber-500">
                        Borrador
                      </span>
                    ) : (
                      <span className="inline-block rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold text-emerald-500">
                        Publicado
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/keystatic/collection/posts/item/${post.slug}`}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                        title="Editar en CMS"
                      >
                        <Edit2 className="h-4 w-4" />
                      </Link>
                      <Link
                        href={`/blog/${post.slug}`}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                        title="Ver en blog"
                        target="_blank"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
