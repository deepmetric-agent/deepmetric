import { TrendingUp, Eye, Clock, MousePointer } from "lucide-react";

const metrics = [
  {
    label: "Page Views (30d)",
    value: "12,482",
    change: "+22%",
    icon: Eye,
  },
  {
    label: "Avg. Session Duration",
    value: "3m 42s",
    change: "+8%",
    icon: Clock,
  },
  {
    label: "Bounce Rate",
    value: "34.2%",
    change: "-5%",
    icon: MousePointer,
  },
  {
    label: "Conversions",
    value: "187",
    change: "+15%",
    icon: TrendingUp,
  },
];

const topPages = [
  { path: "/", views: 4210, title: "Landing Page" },
  { path: "/blog", views: 2834, title: "Blog Listing" },
  {
    path: "/blog/comparativa-sensores-hrv",
    views: 1892,
    title: "Comparativa de Sensores HRV",
  },
  { path: "/app/", views: 1456, title: "Power Guide" },
  { path: "/route/", views: 1102, title: "Route Analyzer" },
];

export default function AnalyticsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black">Analytics</h1>
        <p className="text-muted-foreground">
          Métricas de rendimiento y tráfico de la plataforma.
        </p>
      </div>

      {/* Metric cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((m) => (
          <div
            key={m.label}
            className="rounded-xl border border-border bg-card p-6"
          >
            <div className="mb-3 flex items-center justify-between">
              <m.icon className="h-5 w-5 text-muted-foreground" />
              <span
                className={`text-xs font-bold ${m.change.startsWith("+") ? "text-emerald-500" : "text-destructive"}`}
              >
                {m.change}
              </span>
            </div>
            <p className="text-2xl font-bold">{m.value}</p>
            <p className="text-xs text-muted-foreground">{m.label}</p>
          </div>
        ))}
      </div>

      {/* Chart placeholder */}
      <div className="rounded-xl border border-border bg-card p-6">
        <h2 className="mb-4 text-lg font-bold">Traffic Overview</h2>
        <div className="flex h-64 items-center justify-center rounded-lg bg-muted/50 text-muted-foreground">
          <p className="text-sm">
            Gráfico de tráfico (integrar Recharts en producción)
          </p>
        </div>
      </div>

      {/* Top pages */}
      <div className="rounded-xl border border-border bg-card p-6">
        <h2 className="mb-4 text-lg font-bold">Top Pages</h2>
        <div className="space-y-3">
          {topPages.map((page, i) => (
            <div
              key={page.path}
              className="flex items-center justify-between rounded-lg bg-muted/50 px-4 py-3"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                  {i + 1}
                </span>
                <div>
                  <p className="text-sm font-medium">{page.title}</p>
                  <p className="text-xs text-muted-foreground">{page.path}</p>
                </div>
              </div>
              <span className="text-sm font-bold">
                {page.views.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
