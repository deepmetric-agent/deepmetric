import { Calendar, Clock, User } from "lucide-react";

type PostHeaderProps = {
  title: string;
  date: string | null;
  author: string;
  tags: readonly string[];
  excerpt: string | null;
};

export function PostHeader({
  title,
  date,
  author,
  tags,
  excerpt,
}: PostHeaderProps) {
  return (
    <header className="mb-12 border-b border-border pb-8">
      {/* Tags */}
      {tags.length > 0 && (
        <div className="mb-4 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded bg-primary/10 px-2 py-1 text-xs font-bold uppercase tracking-wider text-primary"
            >
              {tag.replace("-", " ")}
            </span>
          ))}
        </div>
      )}

      {/* Title */}
      <h1 className="mb-6 text-4xl font-black leading-tight md:text-5xl">
        {title}
      </h1>

      {/* Excerpt */}
      {excerpt && (
        <p className="mb-6 text-lg text-muted-foreground">{excerpt}</p>
      )}

      {/* Meta */}
      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <User className="h-4 w-4" />
          {author}
        </div>
        {date && (
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            {new Date(date).toLocaleDateString("es-ES", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>
        )}
      </div>
    </header>
  );
}
