import { Users, FileText, BarChart3, Activity, Clock } from "lucide-react";

const summaryCards = [
  {
    title: "Total Users",
    value: "1,284",
    change: "+12%",
    icon: Users,
  },
  {
    title: "Blog Posts",
    value: "42",
    change: "+3",
    icon: FileText,
  },
  {
    title: "Active Metrics",
    value: "8.4K",
    change: "+18%",
    icon: BarChart3,
  },
];

const recentActivity = [
  {
    action: "New user registered",
    detail: "carlos@example.com signed up via GitHub",
    time: "2 min ago",
  },
  {
    action: "Blog post published",
    detail: '"Comparativa de Sensores HRV" by Luisma',
    time: "1 hour ago",
  },
  {
    action: "Tool update deployed",
    detail: "Power Guide v2.3 — new wind model",
    time: "3 hours ago",
  },
  {
    action: "Analytics threshold reached",
    detail: "Monthly pageviews exceeded 10K",
    time: "Yesterday",
  },
];

const platformPerformance = [
  { metric: "Avg. Response Time", value: "142ms", status: "good" },
  { metric: "Uptime (30d)", value: "99.97%", status: "good" },
  { metric: "Error Rate", value: "0.03%", status: "good" },
  { metric: "Active Sessions", value: "28", status: "neutral" },
  { metric: "Cache Hit Rate", value: "94.2%", status: "good" },
];

export default function DashboardPage() {
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
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold">{card.value}</span>
                <span className="text-xs font-medium text-emerald-500">
                  {card.change}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Platform Performance */}
        <div className="rounded-xl border border-border bg-card p-6">
          <h2 className="mb-4 text-lg font-bold">Platform Performance</h2>
          <div className="space-y-3">
            {platformPerformance.map((item) => (
              <div
                key={item.metric}
                className="flex items-center justify-between rounded-lg bg-muted/50 px-4 py-3 text-sm"
              >
                <span className="text-muted-foreground">{item.metric}</span>
                <span className="font-medium">{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="rounded-xl border border-border bg-card p-6">
          <h2 className="mb-4 text-lg font-bold">Recent Activity</h2>
          <div className="space-y-4">
            {recentActivity.map((item, i) => (
              <div key={i} className="flex gap-3">
                <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <Activity className="h-3.5 w-3.5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{item.action}</p>
                  <p className="text-xs text-muted-foreground">
                    {item.detail}
                  </p>
                </div>
                <div className="flex shrink-0 items-start gap-1 text-xs text-muted-foreground">
                  <Clock className="mt-0.5 h-3 w-3" />
                  {item.time}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
