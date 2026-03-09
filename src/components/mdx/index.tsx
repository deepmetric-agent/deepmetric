import { Info, AlertTriangle, Lightbulb, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const calloutStyles = {
  info: {
    border: "border-primary/30",
    bg: "bg-primary/5",
    icon: <Info className="h-5 w-5 text-primary" />,
  },
  warning: {
    border: "border-yellow-500/30",
    bg: "bg-yellow-500/5",
    icon: <AlertTriangle className="h-5 w-5 text-yellow-500" />,
  },
  tip: {
    border: "border-emerald-500/30",
    bg: "bg-emerald-500/5",
    icon: <Lightbulb className="h-5 w-5 text-emerald-500" />,
  },
  danger: {
    border: "border-destructive/30",
    bg: "bg-destructive/5",
    icon: <AlertCircle className="h-5 w-5 text-destructive" />,
  },
};

function Callout({
  type = "info",
  children,
}: {
  type?: "info" | "warning" | "tip" | "danger";
  children: React.ReactNode;
}) {
  const style = calloutStyles[type] ?? calloutStyles.info;
  return (
    <div
      className={cn(
        "my-6 flex gap-3 rounded-lg border p-4",
        style.border,
        style.bg
      )}
    >
      <div className="mt-0.5 shrink-0">{style.icon}</div>
      <div className="prose-sm">{children}</div>
    </div>
  );
}

function Collapsible({
  title,
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <details className="group my-4 rounded-lg border border-border">
      <summary className="cursor-pointer px-4 py-3 font-medium transition-colors hover:text-primary">
        {title ?? "Ver más"}
      </summary>
      <div className="border-t border-border px-4 py-3">{children}</div>
    </details>
  );
}

function YouTube({ id }: { id: string }) {
  return (
    <div className="my-6 aspect-video overflow-hidden rounded-xl border border-border">
      <iframe
        src={`https://www.youtube.com/embed/${id}`}
        title="YouTube video"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="h-full w-full"
      />
    </div>
  );
}

function ToolDemo({ src, caption }: { src?: string; caption?: string }) {
  if (!src) return null;
  return (
    <figure className="my-6">
      <div className="aspect-video overflow-hidden rounded-xl border border-border">
        <iframe src={src} title={caption ?? "Tool demo"} className="h-full w-full" />
      </div>
      {caption && (
        <figcaption className="mt-2 text-center text-sm text-muted-foreground">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

function ComparisonTable({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-6 overflow-x-auto rounded-lg border border-border">
      {children}
    </div>
  );
}

function Citation({
  author,
  year,
  title,
  url,
}: {
  author?: string;
  year?: string;
  title?: string;
  url?: string;
}) {
  const text = [author, year ? `(${year})` : null, title]
    .filter(Boolean)
    .join(" ");

  if (url) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary underline-offset-2 hover:underline"
      >
        [{text}]
      </a>
    );
  }
  return <span className="text-muted-foreground">[{text}]</span>;
}

export const mdxComponents: Record<string, React.ComponentType<any>> = {
  Callout,
  Collapsible,
  YouTube,
  ToolDemo,
  ComparisonTable,
  Citation,
};
