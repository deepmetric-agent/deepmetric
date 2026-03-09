"use client";

import Link from "next/link";
import { ArrowRight, Zap, Map, Heart, FileText } from "lucide-react";
import { tools } from "@/lib/constants";
import { useTranslations } from "next-intl";

const iconMap: Record<string, React.ReactNode> = {
  Zap: <Zap className="h-6 w-6" />,
  Map: <Map className="h-6 w-6" />,
  Heart: <Heart className="h-6 w-6" />,
  FileText: <FileText className="h-6 w-6" />,
};

const toolDescKeys: Record<string, string> = {
  "Power Guide": "power_guide",
  "Route Analyzer": "route_analyzer",
  "HRV Compare": "hrv_compare",
  "CPET Report": "cpet_report",
};

export function ToolsGrid() {
  const t = useTranslations("tools");

  return (
    <section id="herramientas" className="bg-muted/30 px-6 py-20 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Section header */}
        <div className="mb-12 flex flex-col items-start gap-2">
          <h2 className="text-3xl font-bold tracking-tight">
            {t("title")}
          </h2>
          <div className="h-1 w-20 rounded-full bg-primary" />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {tools.map((tool) => (
            <Link
              key={tool.name}
              href={tool.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex flex-col gap-4 overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5"
            >
              {/* Icon */}
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                {iconMap[tool.icon]}
              </div>

              {/* Content */}
              <div>
                <h3 className="text-xl font-bold">{tool.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {t(toolDescKeys[tool.name])}
                </p>
              </div>

              {/* Link */}
              <div className="mt-auto pt-4">
                <span className="inline-flex items-center gap-1 text-sm font-bold text-primary transition-all group-hover:gap-2">
                  {t("more")}{" "}
                  <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
