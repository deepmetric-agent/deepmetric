"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Ene", views: 2400, users: 400 },
  { name: "Feb", views: 1398, users: 310 },
  { name: "Mar", views: 4800, users: 590 },
  { name: "Abr", views: 3908, users: 480 },
  { name: "May", views: 4800, users: 620 },
  { name: "Jun", views: 3800, users: 510 },
  { name: "Jul", views: 4300, users: 670 },
  { name: "Ago", views: 5200, users: 720 },
  { name: "Sep", views: 4100, users: 580 },
  { name: "Oct", views: 6200, users: 830 },
  { name: "Nov", views: 7800, users: 950 },
  { name: "Dic", views: 8400, users: 1020 },
];

export function TrafficChart() {
  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
          <defs>
            <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
              <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis
            dataKey="name"
            tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
            axisLine={{ stroke: "hsl(var(--border))" }}
          />
          <YAxis
            tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
            axisLine={{ stroke: "hsl(var(--border))" }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "8px",
              fontSize: "12px",
            }}
          />
          <Area
            type="monotone"
            dataKey="views"
            stroke="hsl(var(--primary))"
            fillOpacity={1}
            fill="url(#colorViews)"
            name="Page Views"
          />
          <Area
            type="monotone"
            dataKey="users"
            stroke="#10b981"
            fillOpacity={1}
            fill="url(#colorUsers)"
            name="Users"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
