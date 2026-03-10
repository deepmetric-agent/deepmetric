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
              <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#38bdf8" stopOpacity={0.05} />
            </linearGradient>
            <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#34d399" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#34d399" stopOpacity={0.05} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.15} stroke="#94a3b8" />
          <XAxis
            dataKey="name"
            tick={{ fill: "#94a3b8", fontSize: 12 }}
            axisLine={{ stroke: "#64748b" }}
            tickLine={{ stroke: "#64748b" }}
          />
          <YAxis
            tick={{ fill: "#94a3b8", fontSize: 12 }}
            axisLine={{ stroke: "#64748b" }}
            tickLine={{ stroke: "#64748b" }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1e293b",
              border: "1px solid #334155",
              borderRadius: "8px",
              fontSize: "12px",
              color: "#e2e8f0",
            }}
          />
          <Area
            type="monotone"
            dataKey="views"
            stroke="#38bdf8"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorViews)"
            name="Page Views"
          />
          <Area
            type="monotone"
            dataKey="users"
            stroke="#34d399"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorUsers)"
            name="Users"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
